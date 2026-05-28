# Christopher Turner's Resume

This repo contains two things: a resume site and a job-search agent.

---

## Resume site

Generates my resume as static HTML using Go and Tailwind CSS.

### Versions

1. [Markdown Version](./RESUME.md)
2. [HTML Version](./build/index.html) (generated locally)
3. [PDF Version](./libs/public/christopher-turners-resume.pdf)

### Development

Prerequisites: Go 1.24+, Node.js (for Tailwind CSS)

```bash
npm install       # install Tailwind
npm run dev       # watch and regenerate on change
npm run build     # one-shot build to build/
```

Output: `build/index.html` and `build/public/styles.css`.

### Workflow

1. Update [RESUME.md](./RESUME.md)
2. Run `npm run dev`
3. Open `build/index.html` in a browser
4. Print to PDF via the browser (`ctrl` + `p`)

---

## jobagent

A CLI that fetches job postings, scores them against my criteria via an LLM,
and writes a ranked markdown briefing.

### Prerequisites

- Go 1.24+
- LM Studio (or another OpenAI-compatible backend) with a model loaded
- A `config.yaml` — copy `config.example.yaml` and fill in your criteria

### CLI

```bash
go run ./cmd/jobagent -config config.yaml -v -limit 10
```

Scores up to 10 unseen postings and writes a briefing to `~/.jobagent/briefings/`.

### MCP server (Claude Desktop)

```bash
go build -o ./bin/jobagent-mcp ./cmd/jobagent-mcp
```

Then add to your Claude Desktop config (`~/AppData/Roaming/Claude/claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "jobagent": {
      "command": "C:\\path\\to\\jobagent-mcp.exe",
      "args": ["-config", "C:\\path\\to\\config.yaml"]
    }
  }
}
```

Exposes the `score_job` tool — paste a job posting into Claude and ask it to score the role.
