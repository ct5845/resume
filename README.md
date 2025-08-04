# Christopher Turner's Resume

This project contains my resume built with Go and Tailwind CSS.

## Versions

1. [Markdown Version](./RESUME.md)
2. [Go Web Server](http://localhost:8080) (run locally)
3. [PDF Version](./libs/public/christopher-turners-resume.pdf)

## Development

### Prerequisites
- Go 1.21+
- Node.js (for Tailwind CSS)

### Setup
```bash
# Install dependencies
npm install

# Run development server with hot reload
npm run dev
# or
npm run watch
```

### Build
```bash
# Build and run the Go application
npm run build
# or
go run .
```

The application serves the resume on `http://localhost:8080`

## Workflow

1. Update my [Resume](./RESUME.md)
2. Run the development server: `npm run dev`
3. View changes at `http://localhost:8080`
4. Generate PDF by printing from the browser (`ctrl` + `p`)

