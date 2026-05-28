package source

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// HNWhoIsHiring fetches top-level comments from the current "Ask HN: Who is hiring?"
// thread via the Algolia API (the search backend HN uses).
//
// Strategy:
//   1. Find the most recent "whoishiring" submission via Algolia search.
//   2. Fetch its children (top-level comments = individual job postings).
//   3. Return each comment as a Posting.
//
// The Algolia API is documented at https://hn.algolia.com/api
// and is the same API the official HN search uses. No scraping required.
type HNWhoIsHiring struct {
	HTTPClient *http.Client
}

func NewHNWhoIsHiring() *HNWhoIsHiring {
	return &HNWhoIsHiring{
		HTTPClient: &http.Client{Timeout: 30 * time.Second},
	}
}

func (h *HNWhoIsHiring) Name() string { return "hn-whoishiring" }

func (h *HNWhoIsHiring) Fetch(ctx context.Context) ([]types.Posting, error) {
	if h.HTTPClient == nil {
		h.HTTPClient = &http.Client{Timeout: 30 * time.Second}
	}

	threadID, err := h.findCurrentThread(ctx)
	if err != nil {
		return nil, fmt.Errorf("find current thread: %w", err)
	}

	comments, err := h.fetchThreadComments(ctx, threadID)
	if err != nil {
		return nil, fmt.Errorf("fetch thread comments: %w", err)
	}

	now := time.Now().UTC()
	postings := make([]types.Posting, 0, len(comments))
	for _, c := range comments {
		// Top-level comments only — skip replies. The Algolia tree response
		// is already rooted at the thread, so top-level == direct children.
		if c.Text == "" {
			continue
		}
		postings = append(postings, types.Posting{
			ID:        fmt.Sprintf("%d", c.ID),
			Source:    h.Name(),
			URL:       fmt.Sprintf("https://news.ycombinator.com/item?id=%d", c.ID),
			Author:    c.Author,
			Text:      stripHTML(c.Text),
			FetchedAt: now,
		})
	}

	return postings, nil
}

// ----- Algolia API shapes -----

type algoliaSearchResp struct {
	Hits []struct {
		ObjectID string `json:"objectID"`
		Title    string `json:"title"`
	} `json:"hits"`
}

type algoliaItem struct {
	ID       int            `json:"id"`
	Author   string         `json:"author"`
	Text     string         `json:"text"`
	Title    string         `json:"title"`
	Children []*algoliaItem `json:"children"`
}

// findCurrentThread returns the ID of the most recent "Ask HN: Who is hiring?"
// thread. It searches by author=whoishiring and takes the newest match whose
// title starts with "Ask HN: Who is hiring".
func (h *HNWhoIsHiring) findCurrentThread(ctx context.Context) (int, error) {
	// search_by_date returns newest-first
	u := "https://hn.algolia.com/api/v1/search_by_date?tags=story,author_whoishiring&hitsPerPage=10"
	req, err := http.NewRequestWithContext(ctx, "GET", u, nil)
	if err != nil {
		return 0, err
	}
	resp, err := h.HTTPClient.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return 0, fmt.Errorf("algolia search returned %d: %s", resp.StatusCode, string(body))
	}

	var sr algoliaSearchResp
	if err := json.NewDecoder(resp.Body).Decode(&sr); err != nil {
		return 0, fmt.Errorf("decode search response: %w", err)
	}

	for _, hit := range sr.Hits {
		if strings.HasPrefix(strings.ToLower(hit.Title), "ask hn: who is hiring") {
			var id int
			if _, err := fmt.Sscanf(hit.ObjectID, "%d", &id); err == nil {
				return id, nil
			}
		}
	}
	return 0, fmt.Errorf("no current 'Who is hiring' thread found in latest results")
}

// fetchThreadComments returns the top-level comments of the given thread.
func (h *HNWhoIsHiring) fetchThreadComments(ctx context.Context, threadID int) ([]*algoliaItem, error) {
	u := fmt.Sprintf("https://hn.algolia.com/api/v1/items/%d", threadID)
	req, err := http.NewRequestWithContext(ctx, "GET", u, nil)
	if err != nil {
		return nil, err
	}
	resp, err := h.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("algolia items returned %d: %s", resp.StatusCode, string(body))
	}

	var root algoliaItem
	if err := json.NewDecoder(resp.Body).Decode(&root); err != nil {
		return nil, fmt.Errorf("decode item response: %w", err)
	}
	return root.Children, nil
}

// stripHTML removes the basic HTML wrapping HN uses in comment text:
// <p> for paragraph breaks, <a href="…">…</a> for links, &#xX; entities.
// Good enough for prompt construction; not a general-purpose HTML sanitiser.
var (
	tagRE    = regexp.MustCompile(`<[^>]+>`)
	entityRE = regexp.MustCompile(`&#?[a-zA-Z0-9]+;`)
)

func stripHTML(s string) string {
	// Convert paragraph breaks to double newlines first so meaning survives.
	s = strings.ReplaceAll(s, "<p>", "\n\n")
	s = tagRE.ReplaceAllString(s, "")
	s = entityRE.ReplaceAllStringFunc(s, decodeEntity)
	// Collapse runs of whitespace but keep paragraph breaks.
	s = strings.ReplaceAll(s, "\r\n", "\n")
	return strings.TrimSpace(s)
}

func decodeEntity(e string) string {
	switch e {
	case "&amp;":
		return "&"
	case "&lt;":
		return "<"
	case "&gt;":
		return ">"
	case "&quot;":
		return `"`
	case "&#x27;", "&apos;":
		return "'"
	case "&nbsp;":
		return " "
	default:
		return e // leave unknown entities in place; they're rare and harmless
	}
}
