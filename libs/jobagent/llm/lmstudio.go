package llm

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/ct5845/resume/libs/jobagent/types"
)

// LMStudioClient talks to LM Studio's OpenAI-compatible /chat/completions endpoint.
// The same code shape works for Ollama, vLLM, and any other OpenAI-compatible server
// — only BaseURL and Model change.
type LMStudioClient struct {
	BaseURL     string       // e.g. "http://localhost:1234/v1"
	Model       string       // the model string as shown in LM Studio
	Temperature float64      // 0.0 for deterministic classification
	HTTPClient  *http.Client // optional; falls back to a sensible default
}

// NewLMStudioClient constructs a client with sensible defaults.
// Override BaseURL/Model as needed after construction.
func NewLMStudioClient(model string) *LMStudioClient {
	return &LMStudioClient{
		BaseURL:     "http://localhost:1234/v1",
		Model:       model,
		Temperature: 0.0,
		HTTPClient: &http.Client{
			Timeout: 120 * time.Second, // local models can be slow on first call
		},
	}
}

// ----- OpenAI-compatible request/response shapes -----

type chatRequest struct {
	Model          string          `json:"model"`
	Messages       []chatMessage   `json:"messages"`
	Temperature    float64         `json:"temperature"`
	MaxTokens      int             `json:"max_tokens,omitempty"`
	ResponseFormat *responseFormat `json:"response_format,omitempty"`
	Thinking       *thinkingConfig `json:"thinking,omitempty"`
}

// thinkingConfig controls extended thinking on models that support it (e.g. Qwen3).
// We disable it for scoring: the structured schema already scaffolds reasoning,
// temperature is 0, and thinking mode routes output to reasoning_content instead
// of content — adding latency and tokens with no benefit.
type thinkingConfig struct {
	Type string `json:"type"` // "disabled" | "enabled"
}

type chatMessage struct {
	Role             string `json:"role"` // "system" | "user" | "assistant"
	Content          string `json:"content"`
	ReasoningContent string `json:"reasoning_content"` // populated by thinking models (e.g. Qwen3)
}

// responseFormat constrains the model's output. LM Studio (and recent
// OpenAI-compatible servers) require either "json_schema" with a schema or
// "text". The looser "json_object" is no longer accepted.
type responseFormat struct {
	Type       string      `json:"type"`                  // "json_schema"
	JSONSchema *jsonSchema `json:"json_schema,omitempty"` // required when Type == "json_schema"
}

type jsonSchema struct {
	Name   string         `json:"name"`             // identifier; doesn't affect behaviour
	Strict bool           `json:"strict,omitempty"` // true = no fields outside the schema
	Schema map[string]any `json:"schema"`           // JSON Schema document
}

// scoreSchema is the JSON Schema describing the Score struct. It's used to
// constrain the model's output via response_format.json_schema so the result
// is guaranteed to parse into types.Score.
//
// Kept as a map literal (rather than generated from the struct) because the
// schema is small, stable, and easier to read inline than via reflection.
var scoreSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"score": map[string]any{
			"type":        "integer",
			"minimum":     0,
			"maximum":     10,
			"description": "Overall fit, 0 (no fit) to 10 (perfect fit).",
		},
		"one_line": map[string]any{
			"type":        "string",
			"description": "One-sentence summary suitable for a digest line.",
			"maxLength":   120,
		},
		"why_fits": map[string]any{
			"type":        "string",
			"description": "1-3 sentences on what makes this a fit. One sentence only if dealbreakers were hit.",
			"maxLength":   300,
		},
		"concerns": map[string]any{
			"type":        "string",
			"description": "1-3 sentences on what's not ideal, or 'None' if none. One sentence only if dealbreakers were hit.",
			"maxLength":   300,
		},
		"stack_alignment": map[string]any{
			"type": "string",
			"enum": []string{"strong", "partial", "weak", "unclear"},
		},
		"seniority_match": map[string]any{
			"type": "string",
			"enum": []string{"match", "too_junior", "too_senior", "unclear"},
		},
		"location_match": map[string]any{
			"type": "string",
			"enum": []string{"match", "mismatch", "unclear"},
		},
		"dealbreakers_hit": map[string]any{
			"type":  "array",
			"items": map[string]any{"type": "string"},
		},
		"must_investigate": map[string]any{
			"type":  "array",
			"items": map[string]any{"type": "string"},
		},
	},
	// Order matters: constrained decoding fills fields in required order.
	// Dealbreakers and location come first so the model evaluates hard stops
	// before spending tokens on stack/seniority/culture analysis.
	"required": []string{
		"dealbreakers_hit", "location_match", "seniority_match",
		"score", "one_line", "why_fits", "concerns",
		"stack_alignment", "must_investigate",
	},
	"additionalProperties": false,
}

type chatResponse struct {
	Choices []struct {
		Message chatMessage `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
		Type    string `json:"type"`
	} `json:"error,omitempty"`
}

// Score sends a single classification call to LM Studio and parses the result.
func (c *LMStudioClient) Score(ctx context.Context, p types.Posting, crit types.Criteria) (types.Score, error) {
	var zero types.Score

	if c.HTTPClient == nil {
		c.HTTPClient = &http.Client{Timeout: 120 * time.Second}
	}

	body := chatRequest{
		Model:       c.Model,
		Temperature: c.Temperature,
		MaxTokens:   1200,
		// Disable thinking: the structured schema already scaffolds reasoning and
		// thinking mode routes output to reasoning_content, not content.
		Thinking: &thinkingConfig{Type: "disabled"},
		// Constrain output to the Score schema. LM Studio enforces this server-side:
		// the decoder is restricted so only schema-conformant tokens are sampled.
		// Stronger guarantee than the older "json_object" mode.
		ResponseFormat: &responseFormat{
			Type: "json_schema",
			JSONSchema: &jsonSchema{
				Name:   "score",
				Strict: true,
				Schema: scoreSchema,
			},
		},
		Messages: []chatMessage{
			{Role: "system", Content: BuildSystemPrompt(crit)},
			{Role: "user", Content: BuildUserPrompt(p)},
		},
	}

	buf, err := json.Marshal(body)
	if err != nil {
		return zero, fmt.Errorf("marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.BaseURL+"/chat/completions", bytes.NewReader(buf))
	if err != nil {
		return zero, fmt.Errorf("build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return zero, fmt.Errorf("lm studio request: %w", err)
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return zero, fmt.Errorf("read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return zero, fmt.Errorf("lm studio returned %d: %s", resp.StatusCode, string(raw))
	}

	var parsed chatResponse
	if err := json.Unmarshal(raw, &parsed); err != nil {
		return zero, fmt.Errorf("decode response envelope: %w (body: %s)", err, string(raw))
	}
	if parsed.Error != nil {
		return zero, fmt.Errorf("lm studio error: %s", parsed.Error.Message)
	}
	if len(parsed.Choices) == 0 {
		return zero, fmt.Errorf("lm studio returned no choices (body: %s)", string(raw))
	}

	content := parsed.Choices[0].Message.Content
	if content == "" {
		// Thinking models (e.g. Qwen3) emit their output in reasoning_content
		// and leave content empty. The JSON answer is still valid — use it.
		content = parsed.Choices[0].Message.ReasoningContent
	}
	if content == "" {
		return zero, fmt.Errorf("model returned empty content (full response: %s)", string(raw))
	}

	// Some models still wrap JSON in markdown fences despite json_object mode.
	// Defensively strip common wrappings before parsing.
	content = stripJSONFences(content)

	var score types.Score
	if err := json.Unmarshal([]byte(content), &score); err != nil {
		return zero, fmt.Errorf("decode score JSON: %w (content: %s)", err, content)
	}

	return score, nil
}

func stripJSONFences(s string) string {
	s = trimSpace(s)
	for _, prefix := range []string{"```json", "```JSON", "```"} {
		if hasPrefix(s, prefix) {
			s = s[len(prefix):]
			break
		}
	}
	if hasSuffix(s, "```") {
		s = s[:len(s)-3]
	}
	return trimSpace(s)
}

// tiny string helpers kept local to avoid pulling in strings for one-liners
func trimSpace(s string) string {
	start := 0
	end := len(s)
	for start < end && isSpace(s[start]) {
		start++
	}
	for end > start && isSpace(s[end-1]) {
		end--
	}
	return s[start:end]
}
func isSpace(b byte) bool        { return b == ' ' || b == '\n' || b == '\t' || b == '\r' }
func hasPrefix(s, p string) bool { return len(s) >= len(p) && s[:len(p)] == p }
func hasSuffix(s, p string) bool { return len(s) >= len(p) && s[len(s)-len(p):] == p }
