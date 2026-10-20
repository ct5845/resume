package pdf

import (
	"fmt"
	"os/exec"
	"path/filepath"
)

const edgePath = `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

// Print renders the built index.html to build/public/christopher-turners-resume.pdf using headless Edge.
func Print(buildDir string) error {
	indexPath, err := filepath.Abs(filepath.Join(buildDir, "index.html"))
	if err != nil {
		return err
	}

	pdfPath, err := filepath.Abs(filepath.Join(buildDir, "public", "christopher-turners-resume.pdf"))
	if err != nil {
		return err
	}

	cmd := exec.Command(edgePath,
		"--headless",
		"--disable-gpu",
		"--no-pdf-header-footer",
		"--print-to-pdf="+pdfPath,
		"file:///"+filepath.ToSlash(indexPath),
	)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("pdf printing failed: %v\nOutput: %s", err, output)
	}

	return nil
}
