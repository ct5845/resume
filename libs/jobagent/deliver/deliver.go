// Package deliver writes scored postings to output channels.
// The Deliverer interface is the extension point; Markdown is the first implementation.
package deliver

import (
	"context"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// Deliverer writes a slice of scored postings to some output.
type Deliverer interface {
	Deliver(ctx context.Context, postings []types.ScoredPosting, scanned int) error
}
