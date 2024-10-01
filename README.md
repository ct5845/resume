# Christopher Turner's Resume

This project contains my [resume](./RESUME.md), it's also doubles up as a playground from some starter kits for different languages.

## Workflow

1. I (strive to) maintain my [Resume](./RESUME.md) and [Resume Short](./RESUME_SHORT.md).

1. Use `marked` to parse this into some basic html
    ```bash
    $ npx marked -i RESUME_SHORT.md -o apps/svelte/src/routes/+page.svelte
    $ npm run svelte:build
    ```
1. Check it in.

