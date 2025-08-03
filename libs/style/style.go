package style

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

// CompileCSS runs Tailwind to compile the CSS file
func CompileCSS(outputDir string) error {
	// Create output directory for CSS
	cssDir := filepath.Join(outputDir, "public")
	err := os.MkdirAll(cssDir, 0755)
	if err != nil {
		return err
	}

	// Define paths
	inputCSS := filepath.Join("libs", "style", "styles.css")
	outputCSS := filepath.Join(cssDir, "styles.css")
	
	// Run Tailwind CSS compilation using @tailwindcss/cli
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("cmd", "/c", "npx @tailwindcss/cli --input "+inputCSS+" --output "+outputCSS+" --minify")
	} else {
		cmd = exec.Command("npx", "@tailwindcss/cli", "--input", inputCSS, "--output", outputCSS, "--minify")
	}
	
	// Set working directory to project root
	cmd.Dir = "."
	
	// Run the command
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("tailwind compilation failed: %v\nOutput: %s", err, output)
	}

	return nil
}