package store

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// record is what gets written to the JSONL file — a ScoredPosting plus a timestamp.
type record struct {
	types.ScoredPosting
	ScoredAt time.Time `json:"scored_at"`
}

// JSONLStore is a Store backed by an append-only JSONL file.
// At startup it reads the file once into memory for fast Has() lookups.
// Save() appends to the file; no re-reads happen during a run.
type JSONLStore struct {
	path string
	seen map[string]struct{} // key: "source\x00id"
	f    *os.File
}

// NewJSONLStore opens (or creates) the JSONL file at path and loads existing
// records into memory. The caller must call Close() when done.
func NewJSONLStore(path string) (*JSONLStore, error) {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return nil, fmt.Errorf("store: create directory: %w", err)
	}

	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0o644)
	if err != nil {
		return nil, fmt.Errorf("store: open %s: %w", path, err)
	}

	seen := make(map[string]struct{})
	scanner := bufio.NewScanner(f)
	// Increase buffer for large posting texts.
	scanner.Buffer(make([]byte, 1<<20), 10<<20)
	for scanner.Scan() {
		var r record
		if err := json.Unmarshal(scanner.Bytes(), &r); err != nil {
			// Corrupt line — skip rather than fail, but report it.
			fmt.Fprintf(os.Stderr, "store: skipping malformed record: %v\n", err)
			continue
		}
		seen[storeKey(r.Posting.Source, r.Posting.ID)] = struct{}{}
	}
	if err := scanner.Err(); err != nil {
		_ = f.Close()
		return nil, fmt.Errorf("store: read %s: %w", path, err)
	}

	return &JSONLStore{path: path, seen: seen, f: f}, nil
}

// Close flushes and closes the underlying file.
func (s *JSONLStore) Close() error {
	return s.f.Close()
}

func (s *JSONLStore) Has(_ context.Context, source, id string) (bool, error) {
	_, ok := s.seen[storeKey(source, id)]
	return ok, nil
}

func (s *JSONLStore) Save(_ context.Context, sp types.ScoredPosting) error {
	key := storeKey(sp.Posting.Source, sp.Posting.ID)
	if _, exists := s.seen[key]; exists {
		return nil
	}

	r := record{ScoredPosting: sp, ScoredAt: time.Now().UTC()}
	line, err := json.Marshal(r)
	if err != nil {
		return fmt.Errorf("store: marshal record: %w", err)
	}

	line = append(line, '\n')
	if _, err := s.f.Write(line); err != nil {
		return fmt.Errorf("store: write record: %w", err)
	}

	s.seen[key] = struct{}{}
	return nil
}

func (s *JSONLStore) ListSince(_ context.Context, t time.Time) ([]types.ScoredPosting, error) {
	// Re-read the file from the start so we pick up records written in this run.
	if _, err := s.f.Seek(0, 0); err != nil {
		return nil, fmt.Errorf("store: seek: %w", err)
	}

	var out []types.ScoredPosting
	scanner := bufio.NewScanner(s.f)
	scanner.Buffer(make([]byte, 1<<20), 10<<20)
	for scanner.Scan() {
		var r record
		if err := json.Unmarshal(scanner.Bytes(), &r); err != nil {
			continue
		}
		if !r.ScoredAt.Before(t) {
			out = append(out, r.ScoredPosting)
		}
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("store: read %s: %w", s.path, err)
	}
	return out, nil
}

func storeKey(source, id string) string {
	return source + "\x00" + id
}
