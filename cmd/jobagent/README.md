# jobagent

A small CLI that fetches job postings from configured sources, classifies them
against your personal criteria via an LLM, and prints a ranked daily digest.

## What this is (v1)

The v1 scaffold deliberately has the smallest possible scope:

- **One source:** Hacker News "Who is hiring?" (via the public Algolia API).
- **One LLM backend:** LM Studio (or any OpenAI-compatible server: Ollama, vLLM, etc.).
- **One output:** terminal digest.

Persistence (SQLite store for dedupe), additional sources, markdown delivery, and
the MCP server wrapper come in subsequent iterations.

## Architecture

```
cmd/jobagent/main.go             — CLI entry, wiring
libs/jobagent/types              — shared shapes (Posting, Criteria, Score)
libs/jobagent/config             — YAML config loader
libs/jobagent/source/            — pluggable sources
                source.go        — interface
                hn.go            — HN Who is Hiring via Algolia
libs/jobagent/llm/               — pluggable LLM backends
                llm.go           — interface
                prompt.go        — shared system/user prompt builders
                lmstudio.go      — OpenAI-compatible HTTP client
```

`Source` and `llm.Client` are interfaces. Adding a new source means dropping a
file into `libs/jobagent/source/`. Adding Anthropic or Bedrock means dropping a
file into `libs/jobagent/llm/`. Nothing else changes.

## Running it

### 1. Start LM Studio

Load a recent instruction-tuned model. Anything 7B+ that supports JSON output
will do — Qwen 2.5 7B, Llama 3.1 8B, Mistral Small all work fine.

Start the local server (LM Studio: Developer tab → Start Server). The default
endpoint is `http://localhost:1234/v1`.

Note the exact model string LM Studio shows for the loaded model — you'll need
it for `config.yaml`.

### 2. Configure

```bash
cp config.example.yaml config.yaml
# edit config.yaml — at minimum, set llm.model to your loaded model's string
```

`config.yaml` is gitignored. The example is checked in as a template.

### 3. Run

```bash
go run ./cmd/jobagent -v -limit 3
```

The `-limit 3` flag caps the run at 3 postings while you iterate on prompts and
criteria. Drop it for a full run once things look right.

Expected output: a terminal digest with strong matches, "worth a look" items,
and counts.

## Design notes

**Why LM Studio first?** Free, fast, no API costs while iterating on prompts.
The interface is OpenAI-compatible, so the same code talks to Ollama, vLLM,
Groq, etc. Switching to Anthropic or Bedrock later is a new file in
`libs/jobagent/llm/` and one line in `main.go`.

**Why structured JSON output?** Classification is a structured-data problem.
Free-text reasoning is less reliable, harder to render, and impossible to
analyse over time. The score schema is small enough to fit in the prompt and
strict enough that a parse error is a real bug, not a model quirk.

**Why HN Who is Hiring first?** It has a real API (no scraping), high
signal-to-noise for engineering roles, and a stable monthly cadence — easy
to test against, easy to be polite to.

**Temperature 0.0.** Classification should be deterministic. The same posting
plus same criteria should always score the same. This also makes evals trivial:
re-run, compare to baseline, any change is a real change.

## Next iterations

- SQLite store for dedupe across runs (`libs/jobagent/store/`)
- Markdown daily briefing (`libs/jobagent/deliver/`)
- Anthropic and Bedrock LLM backends
- MCP server wrapper exposing `score_job`, `daily_brief`, `search_jobs` as tools
- Second source (RSS for company feeds; eventually Wellfound)
- Eval suite (`evals/`) — golden test set + prompt regression detection
