// Package mcp exposes jobagent capabilities as MCP tools for Claude Desktop.
package mcp

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// NewServer builds an MCP server with all registered tools.
// The caller is responsible for wiring in the LLM client and criteria.
func NewServer(client LLMClient, criteria types.Criteria) *server.MCPServer {
	s := server.NewMCPServer(
		"jobagent",
		"1.0.0",
		server.WithToolCapabilities(false),
	)

	s.AddTool(scoreJobTool(), scoreJobHandler(client, criteria))

	return s
}

// LLMClient is the subset of llm.Client needed by this package.
// Declared here to avoid an import cycle: mcp → llm → types is fine,
// but keeping the dependency explicit makes the boundary clear.
type LLMClient interface {
	Score(ctx context.Context, p types.Posting, crit types.Criteria) (types.Score, error)
}

func scoreJobTool() mcp.Tool {
	return mcp.NewTool(
		"score_job",
		mcp.WithDescription("Score a job posting against your personal criteria. Returns a structured fit assessment with a 0-10 score, reasoning, and stack/seniority/location signals."),
		mcp.WithString("text",
			mcp.Required(),
			mcp.Description("The raw text of the job posting."),
		),
		mcp.WithString("url",
			mcp.Description("Optional URL back to the original posting. Included in the result for reference."),
		),
		mcp.WithReadOnlyHintAnnotation(true),
		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithIdempotentHintAnnotation(true),
		mcp.WithOpenWorldHintAnnotation(true),
	)
}

func scoreJobHandler(client LLMClient, criteria types.Criteria) server.ToolHandlerFunc {
	return func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		text, err := req.RequireString("text")
		if err != nil {
			return mcp.NewToolResultError(err.Error()), nil
		}
		url := req.GetString("url", "")

		posting := types.Posting{
			Source: "mcp",
			Text:   text,
			URL:    url,
		}

		score, err := client.Score(ctx, posting, criteria)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("scoring failed: %s", err)), nil
		}

		result := scoredResult{
			Score:           score.Score,
			OneLine:         score.OneLine,
			WhyFits:         score.WhyFits,
			Concerns:        score.Concerns,
			StackAlignment:  score.StackAlignment,
			SeniorityMatch:  score.SeniorityMatch,
			LocationMatch:   score.LocationMatch,
			DealbreakersHit: score.DealbreakersHit,
			MustInvestigate: score.MustInvestigate,
			URL:             url,
		}

		out, err := json.MarshalIndent(result, "", "  ")
		if err != nil {
			return nil, fmt.Errorf("marshal result: %w", err)
		}

		return mcp.NewToolResultText(string(out)), nil
	}
}

type scoredResult struct {
	Score           int      `json:"score"`
	OneLine         string   `json:"one_line"`
	WhyFits         string   `json:"why_fits"`
	Concerns        string   `json:"concerns"`
	StackAlignment  string   `json:"stack_alignment"`
	SeniorityMatch  string   `json:"seniority_match"`
	LocationMatch   string   `json:"location_match"`
	DealbreakersHit []string `json:"dealbreakers_hit"`
	MustInvestigate []string `json:"must_investigate"`
	URL             string   `json:"url,omitempty"`
}
