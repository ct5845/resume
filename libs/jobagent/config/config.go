// Package config loads the agent's configuration from a YAML file.
//
// The config bundles the user's job-search Criteria with runtime settings
// (which LLM backend to use, which model, how many postings to score per run).
package config

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/ct5845/resume/libs/jobagent/types"
	"gopkg.in/yaml.v3"
)

type Config struct {
	// LLM backend selection
	LLM LLMConfig `yaml:"llm"`

	// Runtime limits
	MaxPostings int `yaml:"max_postings"` // cap per run during development; 0 = no limit

	// File-system paths for persistent data
	Paths PathsConfig `yaml:"paths"`

	// The user's search profile
	Criteria types.Criteria `yaml:"criteria"`
}

type PathsConfig struct {
	// SeenStore is the JSONL file used to deduplicate postings across runs.
	// Defaults to ~/.jobagent/seen.jsonl
	SeenStore string `yaml:"seen_store"`

	// BriefingsDir is where daily markdown briefings are written.
	// Defaults to ~/.jobagent/briefings/
	BriefingsDir string `yaml:"briefings_dir"`
}

type LLMConfig struct {
	Backend string `yaml:"backend"` // "lmstudio" | (later) "anthropic" | "bedrock"
	BaseURL string `yaml:"base_url"`
	Model   string `yaml:"model"`
}

func Load(path string) (*Config, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read config %s: %w", path, err)
	}

	var cfg Config
	if err := yaml.Unmarshal(raw, &cfg); err != nil {
		return nil, fmt.Errorf("parse config %s: %w", path, err)
	}

	home, err := os.UserHomeDir()
	if err != nil {
		return nil, fmt.Errorf("config: resolve home dir: %w", err)
	}

	// Sensible defaults
	if cfg.LLM.Backend == "" {
		cfg.LLM.Backend = "lmstudio"
	}
	if cfg.LLM.Backend == "lmstudio" && cfg.LLM.BaseURL == "" {
		cfg.LLM.BaseURL = "http://localhost:1234/v1"
	}
	if cfg.LLM.Backend == "lmstudio" && cfg.LLM.Model == "" {
		return nil, fmt.Errorf("config: llm.model is required for lmstudio backend")
	}

	if cfg.Paths.SeenStore == "" {
		cfg.Paths.SeenStore = filepath.Join(home, ".jobagent", "seen.jsonl")
	}
	if cfg.Paths.BriefingsDir == "" {
		cfg.Paths.BriefingsDir = filepath.Join(home, ".jobagent", "briefings")
	}

	return &cfg, nil
}
