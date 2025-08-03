package main

import (
	"fmt"
	"log/slog"
	"os"
	"path/filepath"

	"github.com/ct5845/resume/libs/header"
	"github.com/ct5845/resume/libs/index"
	"github.com/ct5845/resume/libs/public"
	"github.com/ct5845/resume/libs/resume"
	"github.com/ct5845/resume/libs/style"
)

func main() {
	resumeHTML, err := resume.HTML("RESUME.md")

	if err != nil {
		slog.Error("Error retrieving the resumeHTML")
		panic(err)
	}

	headerHTML, err := header.HTML()

	if err != nil {
		slog.Error("Error retrieving the headerHTML")
		panic(err)
	}

	indexHTML, err := index.HTML(resumeHTML, headerHTML)

	if err != nil {
		panic(err)
	}

	// Clear and recreate build/go directory
	buildDir := filepath.Join("build")
	err = os.RemoveAll(buildDir)
	if err != nil {
		panic(err)
	}

	err = os.MkdirAll(buildDir, 0755)
	if err != nil {
		panic(err)
	}

	// Write index.html
	indexPath := filepath.Join(buildDir, "index.html")
	err = os.WriteFile(indexPath, []byte(indexHTML), 0644)
	if err != nil {
		panic(err)
	}

	// Compile CSS with Tailwind
	err = style.CompileCSS(buildDir)
	if err != nil {
		slog.Error("Error compiling CSS", "error", err)
		panic(err)
	}

	// Copy public files
	err = public.CopyTo(buildDir)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Generated %s\n", indexPath)
	fmt.Printf("Compiled CSS to %s\n", filepath.Join(buildDir, "public", "styles.css"))
}
