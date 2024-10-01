<script lang="ts">
  const themeColors = [
    { bg: 'bg-primary', fg: 'text-primary-content', name: 'Primary' },
    { bg: 'bg-secondary', fg: 'text-secondary-content', name: 'Secondary' },
    { bg: 'bg-accent', fg: 'text-accent-content', name: 'Accent' },
    { bg: 'bg-neutral', fg: 'text-neutral-content', name: 'Neutral' },
  ];

  let { theme } = $props();
</script>

<section class="rounded aspect-video shadow-z3 overflow-hidden border-2 flex" data-theme="{theme}">
  <div class="bg-base-100 p-scale flex flex-col justify-end gap-scale grow">
    <h3 class="text-base-content text-4xl" aria-label="Contrast for Surface colors">{theme}</h3>
    <div class="flex gap-scale" aria-label="Theme Colors">
      {#each themeColors as color}
        <div class="{color.bg} grow max-w-14 sm:max-w-20 md:max-w-24 aspect-square flex items-center justify-center" aria-label={color.name}>
          <span class={color.fg} aria-label="Contract for {color.name} Color">A</span>
        </div>
      {/each}
    </div>
  </div>
  <div aria-label="Elevated Surface Colors" class="grow max-w-28 min-w-12 flex flex-col self-stretch">
    <div class="bg-base-200 grow flex items-center justify-center" aria-label="Higher Surface color swatch">
      <span aria-label="Contrast for Surface Color" class="text-base-content">a</span>
    </div>
    <div class="bg-base-300 grow flex items-center justify-center" aria-label="Highest Surface color swatch">
      <span aria-label="Contrast for Surface Color" class="text-base-content">a</span>
    </div>
  </div>
</section>

