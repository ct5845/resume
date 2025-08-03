package public

import (
	"embed"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

//go:embed *
var files embed.FS

// CopyTo copies all embedded public files to the specified directory
func CopyTo(destDir string) error {
	publicDir := filepath.Join(destDir, "public")
	
	// Create public directory
	err := os.MkdirAll(publicDir, 0755)
	if err != nil {
		return err
	}
	
	// Walk through embedded files
	return fs.WalkDir(files, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		
		// Skip directories and .go files
		if d.IsDir() || filepath.Ext(path) == ".go" {
			return nil
		}
		
		// Read embedded file
		data, err := files.ReadFile(path)
		if err != nil {
			return err
		}
		
		// Write to destination
		destPath := filepath.Join(publicDir, path)
		err = os.WriteFile(destPath, data, 0644)
		if err != nil {
			return err
		}
		
		fmt.Printf("Copied %s\n", destPath)
		return nil
	})
}