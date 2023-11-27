# Resume

This is my resume, a mobile, desktop and printer friendly implementation of my resume (to date).
Built in 2 different stacks to learn and compare.

## Built in!

- Svelte; https://ct-resume-svelte.vercel.app/
- Vue; https://ct-resume-vue.vercel.app/

## Technologies

### Svelte
- [x] Svelte 4
- [x] SvelteKit 1

### Vue
- [x] Vue 3
- [x] Pinia
- [x] Vue Router 4

### Both
- [x] Tailwind
- [x] DaisyUI
- [x] Vercel
- [x] Typescript


## Comparison

Caveat!! Vue was the first project I did, and I should loop back round to it to optimise. This is based on a reaaaallly small project with no complex components, so take these with a pinch of salt, it's more for my own reflection.

### Lines of Code

| Project | Language | LOC |
|---------|----------|-----|
| Svelte  | Svelte | 584 |
| Svelte  | Typescript | 211 |
| Vue | Vue | 579 |
| Vue | Typescript | 247 |

Svelte coming in at 795 lines of code.
Vue coming in at 826 lines of code.

### Rendering/Performance

| Project | First Contentfull Paint | Total Blocking Time | Speed Index | Requests | DOM Content Loaded | Load | Transferred | Resources |
|---------|-------------------------|---------------------|-------------|----------|--------------------|------|-------------|-----------|
| Vue | 2.3s                    | 0ms                 | 2.3s | 10 | 150ms | 235ms| 96.6kB      | 277kB |
| Svelte | 1.6s                    | 0ms                 | 1.6s | 25 | 194ms | 217ms |88.2kB | 229kB | 
