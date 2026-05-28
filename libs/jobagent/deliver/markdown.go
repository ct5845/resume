package deliver

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// Markdown writes a daily briefing file to dir/briefing-YYYY-MM-DD.md.
// Each run overwrites the day's file so it always reflects all postings scored today.
type Markdown struct {
	Dir string
}

func (m *Markdown) Deliver(_ context.Context, postings []types.ScoredPosting, scanned int) error {
	if err := os.MkdirAll(m.Dir, 0o755); err != nil {
		return fmt.Errorf("create briefings dir: %w", err)
	}

	date := time.Now().Format("2006-01-02")
	path := filepath.Join(m.Dir, "briefing-"+date+".md")

	var b strings.Builder
	writeMarkdown(&b, postings, scanned, date)

	return os.WriteFile(path, []byte(b.String()), 0o644)
}

func writeMarkdown(b *strings.Builder, postings []types.ScoredPosting, scanned int, date string) {
	var strong, worth, filtered []types.ScoredPosting
	for _, sp := range postings {
		switch {
		case sp.Score.Score >= 8:
			strong = append(strong, sp)
		case sp.Score.Score >= 5:
			worth = append(worth, sp)
		default:
			filtered = append(filtered, sp)
		}
	}

	fmt.Fprintf(b, "# Briefing — %s\n\n", date)
	fmt.Fprintf(b, "**Scanned %d new postings.** %d strong matches, %d worth a look, %d filtered.\n\n",
		scanned, len(strong), len(worth), len(filtered))

	// Strong matches
	fmt.Fprintf(b, "## Strong matches (8+)\n\n")
	if len(strong) == 0 {
		fmt.Fprintf(b, "_None this run._\n\n")
	} else {
		for _, sp := range strong {
			writeStrongEntry(b, sp)
		}
	}

	// Worth a look
	fmt.Fprintf(b, "## Worth a look (5–7)\n\n")
	if len(worth) == 0 {
		fmt.Fprintf(b, "_None this run._\n\n")
	} else {
		for _, sp := range worth {
			concern := sp.Score.Concerns
			if concern == "" || concern == "None" {
				concern = "—"
			}
			fmt.Fprintf(b, "- **[%d]** [%s](%s) — %s\n",
				sp.Score.Score, sp.Score.OneLine, sp.Posting.URL, concern)
		}
		fmt.Fprintf(b, "\n")
	}

	// Filtered
	fmt.Fprintf(b, "## Filtered (< 5)\n\n")
	if len(filtered) == 0 {
		fmt.Fprintf(b, "_None filtered._\n\n")
	} else {
		fmt.Fprintf(b, "<details><summary>%d postings filtered. Click to expand.</summary>\n\n", len(filtered))
		for _, sp := range filtered {
			reason := primaryFilterReason(sp)
			fmt.Fprintf(b, "- **[%d]** %s — %s\n", sp.Score.Score, sp.Score.OneLine, reason)
		}
		fmt.Fprintf(b, "\n</details>\n")
	}
}

func writeStrongEntry(b *strings.Builder, sp types.ScoredPosting) {
	fmt.Fprintf(b, "### [%d/10] %s\n", sp.Score.Score, sp.Score.OneLine)
	fmt.Fprintf(b, "[Original posting](%s)\n\n", sp.Posting.URL)

	fmt.Fprintf(b, "**Why this fits:** %s\n", sp.Score.WhyFits)

	concerns := sp.Score.Concerns
	if concerns == "" {
		concerns = "None noted"
	}
	fmt.Fprintf(b, "**Concerns:** %s\n", concerns)

	fmt.Fprintf(b, "**Stack:** %s · **Seniority:** %s · **Location:** %s\n\n",
		sp.Score.StackAlignment, sp.Score.SeniorityMatch, sp.Score.LocationMatch)

	if len(sp.Score.MustInvestigate) > 0 {
		fmt.Fprintf(b, "**Investigate before applying:**\n")
		for _, item := range sp.Score.MustInvestigate {
			fmt.Fprintf(b, "- %s\n", item)
		}
		fmt.Fprintf(b, "\n")
	}

	fmt.Fprintf(b, "---\n\n")
}

// primaryFilterReason returns the most useful single reason a posting was filtered.
// Prefers the first dealbreaker hit; falls back to the dimension mismatches.
func primaryFilterReason(sp types.ScoredPosting) string {
	if len(sp.Score.DealbreakersHit) > 0 {
		return sp.Score.DealbreakersHit[0]
	}
	var parts []string
	if sp.Score.SeniorityMatch != "match" && sp.Score.SeniorityMatch != "" && sp.Score.SeniorityMatch != "unclear" {
		parts = append(parts, "seniority: "+sp.Score.SeniorityMatch)
	}
	if sp.Score.LocationMatch == "mismatch" {
		parts = append(parts, "location mismatch")
	}
	if sp.Score.StackAlignment == "weak" {
		parts = append(parts, "weak stack match")
	}
	if len(parts) > 0 {
		return strings.Join(parts, "; ")
	}
	return sp.Score.Concerns
}
