package resume

import (
	"html/template"
	"log/slog"
	"os"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
)

func HTML(filepath string) (template.HTML, error) {
	p := parser.New()

	content, err := os.ReadFile(filepath)
	if err != nil {
		slog.Error("error reading file", "filepath", filepath, "err", err)
		return "", err
	}

	doc := p.Parse(content)

	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	return template.HTML(markdown.Render(doc, renderer)), nil
}
