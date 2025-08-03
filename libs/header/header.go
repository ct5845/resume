package header

import (
	_ "embed"
	"html/template"
	"log/slog"

	"github.com/ct5845/resume/libs/stpl"
)

//go:embed header.html
var headerHTML string

//go:embed download.svg
var downloadSVG string

//go:embed link.svg
var linkSVG string

type viewModel struct {
	DownloadSVG template.HTML
	LinkSVG     template.HTML
}

func HTML() (template.HTML, error) {
	downloadSVG, err := stpl.HTML(downloadSVG, nil)

	if err != nil {
		slog.Error("couldnt get downloadsvg")
		return "", err
	}

	linkSVG, err := stpl.HTML(linkSVG, nil)

	if err != nil {
		slog.Error("couldnt get linksvg")
		return "", err
	}

	model := viewModel{
		DownloadSVG: downloadSVG,
		LinkSVG:     linkSVG,
	}

	return stpl.HTML(headerHTML, model)
}
