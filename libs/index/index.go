package index

import (
	_ "embed"
	"html/template"

	"github.com/ct5845/resume/libs/stpl"
)

//go:embed index.html
var indexHTML string

type viewModel struct {
	Header template.HTML
	Resume template.HTML
}

func HTML(resume template.HTML, header template.HTML) (template.HTML, error) {
	model := viewModel{
		Resume: resume,
		Header: header,
	}

	return stpl.HTML(indexHTML, model)
}
