# Christopher Turner's Resume

This project contains my resume, it's also doubles up as a playground from some starter kits for different languages.

## Versions

1. [Markdown Version](./RESUME_SHORT.md)
2. [SvelteKit Version](https://ct5845.github.io/resume/)
3. [PDF Version](./libs/public/resume.pdf)

## Workflow

1. Update my [Resume](./RESUME.md)

1. Use `marked` to parse this into some basic html
    ```bash
    $ npm run resume:build
    $ npm run svelte:build
    ```
1. Run locally to check `npm run svelte:dev`.
1. Check it in.
1. Visit the website `ctrl` + `p` - print as PDF and save.

