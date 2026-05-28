// Package types defines the core data shapes shared across jobagent packages.
// Keeping these in one place avoids import cycles between source, llm, and store.
package types

import "time"

// Posting is a single job posting fetched from any source.
// Different sources fill in different fields; only ID, Source, Text, and FetchedAt
// are guaranteed populated.
type Posting struct {
	ID        string    `json:"id"`         // unique within (Source, ID); used for dedupe
	Source    string    `json:"source"`     // e.g. "hn-whoishiring"
	URL       string    `json:"url"`        // link back to the original posting
	Author    string    `json:"author"`     // optional, source-dependent
	Text      string    `json:"text"`       // the raw posting text/HTML stripped
	FetchedAt time.Time `json:"fetched_at"`
}

// Criteria is the user's job-search profile. Loaded from config.yaml at startup.
// Rendered into the system prompt so the LLM can score postings against it.
type Criteria struct {
	Seniority     []string `yaml:"seniority"`      // e.g. [senior, lead, principal]
	Location      Location `yaml:"location"`
	Stack         Stack    `yaml:"stack"`
	RoleMustHaves []string `yaml:"role_must_haves"`
	Dealbreakers  []string `yaml:"dealbreakers"`
	FreeformNotes string   `yaml:"freeform_notes"` // any extra context for the LLM
}

type Location struct {
	MustBe      []string `yaml:"must_be"`     // acceptable locations/arrangements
	Dealbreaker []string `yaml:"dealbreaker"` // hard-no locations/arrangements
}

type Stack struct {
	Love     []string `yaml:"love"`     // technologies that strongly attract
	Fine     []string `yaml:"fine"`     // technologies the user is happy to work with
	Tolerate []string `yaml:"tolerate"` // technologies the user accepts but doesn't love
	Avoid    []string `yaml:"avoid"`    // technologies the user would rather skip
}

// Score is the structured output of an LLM classification call.
// Field names match the JSON schema sent to the model.
type Score struct {
	Score            int      `json:"score"`             // 0-10 overall fit
	OneLine          string   `json:"one_line"`          // short summary for digest
	WhyFits          string   `json:"why_fits"`          // reasoning, 1-3 sentences
	Concerns         string   `json:"concerns"`          // reasoning, 1-3 sentences
	StackAlignment   string   `json:"stack_alignment"`   // strong | partial | weak | unclear
	SeniorityMatch   string   `json:"seniority_match"`   // match | too_junior | too_senior | unclear
	LocationMatch    string   `json:"location_match"`    // match | mismatch | unclear
	DealbreakersHit  []string `json:"dealbreakers_hit"`  // empty list if none
	MustInvestigate  []string `json:"must_investigate"`  // things to check before applying
}

// ScoredPosting is a Posting plus its Score. The unit the digest works with.
type ScoredPosting struct {
	Posting Posting `json:"posting"`
	Score   Score   `json:"score"`
}
