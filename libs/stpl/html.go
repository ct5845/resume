package stpl

import (
	"bytes"
	"html/template"
	"log/slog"
)

func HTML(stringTemplate string, model any) (template.HTML, error) {
	newTpl := template.New(stringTemplate)
	parsedTpl, err := newTpl.Parse(stringTemplate)

	if err != nil {
		slog.Error("error parsing template")
		return "", err
	}

	var buf bytes.Buffer
	executedTpl := parsedTpl.Execute(&buf, model)

	if executedTpl != nil {
		slog.Error("errorinng executing template")
		return "", err
	}

	return template.HTML(buf.String()), nil
}
