// Package llm defines the interface LLM backends must implement for scoring
// job postings, plus shared prompt-building helpers used by all backends.
//
// Adding a new backend (e.g. Anthropic, Bedrock) means dropping in a new file
// in this package that implements Client; nothing else changes.
package llm

import (
	"context"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// Client scores a single posting against the user's criteria.
// Implementations must be safe for concurrent use.
type Client interface {
	Score(ctx context.Context, p types.Posting, crit types.Criteria) (types.Score, error)
}
