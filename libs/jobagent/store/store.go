// Package store defines the interface for persisting scored postings and
// checking which postings have already been seen.
//
// Adding a new backend means implementing Store in a new file in this package;
// nothing else changes.
package store

import (
	"context"
	"time"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// Store persists scored postings and answers dedupe queries.
// Implementations must be safe for sequential use within a single run;
// concurrent access is not required.
type Store interface {
	// Has reports whether a posting with the given (source, id) pair has
	// already been scored and saved.
	Has(ctx context.Context, source, id string) (bool, error)

	// Save persists a scored posting. Calling Save for a posting that already
	// exists is a no-op (it will not duplicate the record).
	Save(ctx context.Context, sp types.ScoredPosting) error

	// ListSince returns all scored postings saved at or after t.
	// Used by the briefing to collect everything scored today.
	ListSince(ctx context.Context, t time.Time) ([]types.ScoredPosting, error)
}
