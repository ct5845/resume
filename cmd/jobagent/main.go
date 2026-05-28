// Command jobagent fetches job postings from configured sources, scores them
// against the user's criteria via an LLM, and prints a digest to the terminal.
package main

import (
	"context"
	"flag"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"sort"
	"syscall"
	"time"

	"github.com/ct5845/resume/libs/jobagent/config"
	"github.com/ct5845/resume/libs/jobagent/deliver"
	"github.com/ct5845/resume/libs/jobagent/llm"
	"github.com/ct5845/resume/libs/jobagent/source"
	"github.com/ct5845/resume/libs/jobagent/store"
	"github.com/ct5845/resume/libs/jobagent/types"
)

func main() {
	configPath := flag.String("config", "config.yaml", "path to config.yaml")
	limit := flag.Int("limit", 0, "score at most N postings (0 = use config max_postings, also 0 = unlimited)")
	verbose := flag.Bool("v", false, "verbose logging")
	flag.Parse()

	logLevel := slog.LevelInfo
	if *verbose {
		logLevel = slog.LevelDebug
	}
	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: logLevel})))

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	if err := run(ctx, *configPath, *limit); err != nil {
		slog.Error("run failed", "error", err)
		os.Exit(1)
	}
}

func run(ctx context.Context, configPath string, cliLimit int) error {
	cfg, err := config.Load(configPath)
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	maxPostings := cliLimit
	if maxPostings == 0 {
		maxPostings = cfg.MaxPostings
	}

	// Build the LLM client. Currently only LM Studio; Anthropic and Bedrock
	// would slot in via additional cases here.
	var client llm.Client
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

	st, err := store.NewJSONLStore(cfg.Paths.SeenStore)
	if err != nil {
		return fmt.Errorf("open store: %w", err)
	}
	defer st.Close()
	slog.Debug("store opened", "path", cfg.Paths.SeenStore)

	// Build the source. Currently only HN; add more sources here and iterate.
	src := source.NewHNWhoIsHiring()

	slog.Info("fetching postings", "source", src.Name())
	postings, err := src.Fetch(ctx)
	if err != nil {
		return fmt.Errorf("fetch from %s: %w", src.Name(), err)
	}
	slog.Info("fetched postings", "count", len(postings))

	// Filter postings already seen in previous runs.
	unseen := postings[:0]
	for _, p := range postings {
		seen, err := st.Has(ctx, p.Source, p.ID)
		if err != nil {
			return fmt.Errorf("store lookup: %w", err)
		}
		if !seen {
			unseen = append(unseen, p)
		}
	}
	skipped := len(postings) - len(unseen)
	if skipped > 0 {
		slog.Info("skipped already-seen postings", "count", skipped)
	}
	postings = unseen
	newPostings := len(postings)

	if maxPostings > 0 && len(postings) > maxPostings {
		slog.Info("limiting postings for this run", "limit", maxPostings)
		postings = postings[:maxPostings]
	}

	scored := make([]types.ScoredPosting, 0, len(postings))
	var failed int
	for i, p := range postings {
		if ctx.Err() != nil {
			return ctx.Err()
		}
		slog.Info("scoring", "i", i+1, "of", len(postings), "id", p.ID)

		start := time.Now()
		score, err := client.Score(ctx, p, cfg.Criteria)
		if err != nil {
			slog.Warn("score failed; skipping", "id", p.ID, "error", err)
			failed++
			continue
		}
		slog.Debug("scored", "id", p.ID, "score", score.Score, "took", time.Since(start))

		sp := types.ScoredPosting{Posting: p, Score: score}
		if err := st.Save(ctx, sp); err != nil {
			return fmt.Errorf("store save: %w", err)
		}
		scored = append(scored, sp)
	}

	// Sort by score, highest first
	sort.Slice(scored, func(i, j int) bool {
		return scored[i].Score.Score > scored[j].Score.Score
	})

	printDigest(scored, failed)

	md := &deliver.Markdown{Dir: cfg.Paths.BriefingsDir}
	if err := md.Deliver(ctx, scored, newPostings); err != nil {
		return fmt.Errorf("write briefing: %w", err)
	}
	slog.Info("briefing written", "dir", cfg.Paths.BriefingsDir)

	return nil
}

// printDigest writes a terminal-friendly digest to stdout. The "real" markdown
// output goes via a deliver package — added in the next iteration.
func printDigest(scored []types.ScoredPosting, failed int) {
	fmt.Println()
	fmt.Println("=== Job Agent Daily Digest ===")
	total := len(scored) + failed
	if failed > 0 {
		fmt.Printf("Scored %d/%d postings (%d failed to score — check logs)\n\n", len(scored), total, failed)
	} else {
		fmt.Printf("Scored %d postings\n\n", len(scored))
	}

	strong, worth, filtered := 0, 0, 0
	for _, s := range scored {
		switch {
		case s.Score.Score >= 8:
			strong++
		case s.Score.Score >= 5:
			worth++
		default:
			filtered++
		}
	}
	fmt.Printf("Strong matches (>= 8): %d\n", strong)
	fmt.Printf("Worth a look (5-7):    %d\n", worth)
	fmt.Printf("Filtered (< 5):        %d\n\n", filtered)

	if strong > 0 {
		fmt.Println("--- Strong matches ---")
		for _, s := range scored {
			if s.Score.Score < 8 {
				continue
			}
			printOne(s)
		}
	}

	if worth > 0 {
		fmt.Println("--- Worth a look ---")
		for _, s := range scored {
			if s.Score.Score < 5 || s.Score.Score >= 8 {
				continue
			}
			fmt.Printf("[%d] %s — %s\n", s.Score.Score, s.Score.OneLine, s.Posting.URL)
		}
		fmt.Println()
	}
}

func printOne(s types.ScoredPosting) {
	fmt.Printf("[%d/10] %s\n", s.Score.Score, s.Score.OneLine)
	fmt.Printf("  URL:      %s\n", s.Posting.URL)
	fmt.Printf("  Why fits: %s\n", s.Score.WhyFits)
	if s.Score.Concerns != "" && s.Score.Concerns != "None" {
		fmt.Printf("  Concerns: %s\n", s.Score.Concerns)
	}
	fmt.Printf("  Stack:    %s    Seniority: %s    Location: %s\n",
		s.Score.StackAlignment, s.Score.SeniorityMatch, s.Score.LocationMatch)
	if len(s.Score.MustInvestigate) > 0 {
		fmt.Printf("  Investigate:\n")
		for _, m := range s.Score.MustInvestigate {
			fmt.Printf("    - %s\n", m)
		}
	}
	fmt.Println()
}
