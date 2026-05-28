// Command jobagent-mcp is an MCP server that exposes jobagent tools to Claude Desktop.
// It reads the same config.yaml as the main CLI and communicates via stdio.
//
// Claude Desktop config (~/.config/claude/claude_desktop_config.json):
//
//	{
//	  "mcpServers": {
//	    "jobagent": {
//	      "command": "/path/to/jobagent-mcp",
//	      "args": ["-config", "/path/to/config.yaml"]
//	    }
//	  }
//	}
package main

import (
	"flag"
	"fmt"
	"log/slog"
	"os"

	"github.com/mark3labs/mcp-go/server"

	"github.com/ct5845/resume/libs/jobagent/config"
	"github.com/ct5845/resume/libs/jobagent/llm"
	jobmcp "github.com/ct5845/resume/libs/jobagent/mcp"
)

func main() {
	configPath := flag.String("config", "config.yaml", "path to config.yaml")
	flag.Parse()

	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: slog.LevelInfo})))

	if err := run(*configPath); err != nil {
		slog.Error("startup failed", "error", err)
		os.Exit(1)
	}
}

func run(configPath string) error {
	cfg, err := config.Load(configPath)
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	var client jobmcp.LLMClient
	switch cfg.LLM.Backend {
	case "lmstudio":
		c := llm.NewLMStudioClient(cfg.LLM.Model)
		if cfg.LLM.BaseURL != "" {
			c.BaseURL = cfg.LLM.BaseURL
		}
		client = c
	default:
		return fmt.Errorf("unknown llm backend %q", cfg.LLM.Backend)
	}

	s := jobmcp.NewServer(client, cfg.Criteria)
	return server.ServeStdio(s)
}
