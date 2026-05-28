package llm

import (
	"fmt"
	"strings"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// BuildSystemPrompt produces the system message used for scoring calls.
// It bakes the user's criteria and the required output schema into a single
// instruction block. The same prompt is used regardless of LLM backend so that
// switching backends doesn't change scoring behaviour.
func BuildSystemPrompt(crit types.Criteria) string {
	var b strings.Builder

	b.WriteString(`You are a job-search assistant. Your job is to score job postings against the user's criteria and return a single JSON object matching the schema below.

Be honest and calibrated. A score of 10 means a near-perfect fit. A score of 5 means there's something interesting but significant concerns. A score of 0 means clear dealbreaker or completely unrelated role.

**Bail early on dealbreakers.** Fill in "dealbreakers_hit", "location_match", and "seniority_match" first. If any dealbreaker is hit, set score to 0 and keep "why_fits", "concerns", and "one_line" to a single short sentence — do not analyse the role further.

Do not invent details the posting does not contain. If something is unclear, say so in "must_investigate" rather than guessing.

# User's criteria

`)

	b.WriteString("**Acceptable seniority levels:** ")
	b.WriteString(strings.Join(crit.Seniority, ", "))
	b.WriteString("\n\n")

	b.WriteString("**Location — must be one of:** ")
	b.WriteString(strings.Join(crit.Location.MustBe, ", "))
	b.WriteString("\n")
	b.WriteString("**Location dealbreakers:** ")
	b.WriteString(strings.Join(crit.Location.Dealbreaker, ", "))
	b.WriteString("\n\n")

	b.WriteString("**Stack the user loves:** ")
	b.WriteString(strings.Join(crit.Stack.Love, ", "))
	b.WriteString("\n")
	b.WriteString("**Stack the user is fine with:** ")
	b.WriteString(strings.Join(crit.Stack.Fine, ", "))
	b.WriteString("\n")
	b.WriteString("**Stack the user tolerates:** ")
	b.WriteString(strings.Join(crit.Stack.Tolerate, ", "))
	b.WriteString("\n")
	b.WriteString("**Stack the user wants to avoid:** ")
	b.WriteString(strings.Join(crit.Stack.Avoid, ", "))
	b.WriteString("\n\n")

	if len(crit.RoleMustHaves) > 0 {
		b.WriteString("**Role must-haves:**\n")
		for _, m := range crit.RoleMustHaves {
			b.WriteString("- " + m + "\n")
		}
		b.WriteString("\n")
	}

	if len(crit.Dealbreakers) > 0 {
		b.WriteString("**Dealbreakers (hard no):**\n")
		for _, d := range crit.Dealbreakers {
			b.WriteString("- " + d + "\n")
		}
		b.WriteString("\n")
	}

	if crit.FreeformNotes != "" {
		b.WriteString("**Additional notes from the user:**\n")
		b.WriteString(crit.FreeformNotes + "\n\n")
	}

	b.WriteString(`# Required output schema

Return ONLY a JSON object (no markdown fences, no commentary) matching this schema:

{
  "dealbreakers_hit": [<dealbreakers from the user's list that this posting clearly hits, or []>],
  "location_match":   "<match|mismatch|unclear>",
  "seniority_match":  "<match|too_junior|too_senior|unclear>",
  "score": <integer 0-10>,
  "one_line": "<one-sentence summary for a digest>",
  "why_fits": "<1-3 sentences on what makes this a fit — one sentence only if dealbreakers were hit>",
  "concerns": "<1-3 sentences on what's not ideal, or 'None' — one sentence only if dealbreakers were hit>",
  "stack_alignment": "<strong|partial|weak|unclear>",
  "must_investigate": [<specific things the user should check before applying, or []>]
}
`)

	return b.String()
}

// BuildUserPrompt produces the user message containing the posting itself.
func BuildUserPrompt(p types.Posting) string {
	return fmt.Sprintf(`Score the following job posting against the user's criteria.

Source: %s
Author: %s
URL: %s

--- POSTING TEXT ---
%s
--- END POSTING ---

Return only the JSON object.`, p.Source, p.Author, p.URL, p.Text)
}
