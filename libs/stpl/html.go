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
	if err = parsedTpl.Execute(&buf, model); err != nil {
		slog.Error("error executing template")
		return "", err
	}

	return template.HTML(buf.String()), nil
}
