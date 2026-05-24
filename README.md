# Christopher Turner's Resume

This project generates my resume as static HTML using Go and Tailwind CSS.

## Versions

1. [Markdown Version](./RESUME.md)
2. [HTML Version](./build/index.html) (generated locally)
3. [PDF Version](./libs/public/christopher-turners-resume.pdf)

## Development

### Prerequisites
- Go 1.21+
- Node.js (for Tailwind CSS)

### Setup
```bash
# Install dependencies
npm install

# Watch for changes and regenerate
npm run dev
```

### Build
```bash
# Generate static files to build/
npm run build
# or
go run .
```

Output is written to `build/index.html` and `build/public/styles.css`.

## Workflow

1. Update [RESUME.md](./RESUME.md)
2. Run the watcher: `npm run dev`
3. Open `build/index.html` in a browser
4. Generate PDF by printing from the browser (`ctrl` + `p`)
