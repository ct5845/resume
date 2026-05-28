// Package source defines the interface a posting source must implement,
// plus implementations for each supported source.
//
// Adding a new source means dropping in a new file that implements Source.
package source

import (
	"context"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// Source fetches job postings. Implementations should be polite to upstream
// services: cache where possible, respect rate limits, and avoid scraping
// where an API exists.
type Source interface {
	// Name is a stable identifier used in Posting.Source and for logging.
	Name() string

	// Fetch returns all postings the source knows about right now.
	// Deduplication against previously-seen postings is the caller's job.
	Fetch(ctx context.Context) ([]types.Posting, error)
}
