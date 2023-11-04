<script lang="ts">
  import * as resume from '$lib/assets/resume.json';
  import Title from '$lib/components/Title.svelte';
  import Content from "$lib/components/Content.svelte";
  let className: string | undefined = undefined;
  export { className as class};
</script>

<Content class={className}>
  <span slot="header">Skills</span>
  <ul slot="content">
    <li>
      <Title level={2} class="mb-4 print:hidden">Languages</Title>
      <Title level={3} class="hidden print:block">Languages</Title>
      <ul class="print:flex print:flex-row print:flex-wrap">
        {#each resume.skills.languages.primary as skill}
          <li>
						<span
              class="badge badge-secondary badge-lg mb-1 text-lg font-semibold print:badge-ghost print:badge-sm">
							{skill}
						</span>
          </li>
        {/each}
      </ul>
      <ul class="flex flex-row flex-wrap print:mb-1">
        {#each resume.skills.languages.secondary as skill}
          <li>
						<span class="badge badge-neutral mb-1 mr-2 print:badge-ghost print:badge-sm">
							{skill}
						</span>
          </li>
        {/each}
        {#each resume.skills.languages.tertiary as skill}
          <li>
            <span class="badge badge-ghost badge-sm mb-1 mr-2 print:badge-sm">{skill}</span>
          </li>
        {/each}
      </ul>
    </li>
    <li>
      <Title level={2} class="my-4 print:hidden">Frameworks</Title>
      <Title level={3} class="hidden print:block">Frameworks</Title>
      <ul class="print:flex print:flex-row print:flex-wrap">
        {#each resume.skills.frameworks.primary as skill}
          <li>
						<span
              class="badge badge-accent badge-lg mb-1 text-lg font-semibold print:badge-ghost print:badge-sm">
							{skill}
						</span>
          </li>
        {/each}
      </ul>
      <ul class="flex flex-row flex-wrap print:mb-1">
        {#each resume.skills.frameworks.secondary as skill}
          <li>
						<span class="badge badge-neutral mb-1 mr-2 print:badge-ghost print:badge-sm">
							{skill}
						</span>
          </li>
        {/each}
        {#each resume.skills.frameworks.tertiary as skill}
          <li>
            <span class="badge badge-ghost badge-sm mb-1 mr-2 print:badge-sm">{skill}</span>
          </li>
        {/each}
      </ul>
    </li>
    <li>
      <Title level={2} class="my-4 print:hidden">Tools/Other</Title>
      <Title level={3} class="hidden print:block">Tools/Other</Title>
      <ul class="flex flex-row flex-wrap">
        {#each resume.skills.tools.primary as skill}
          <li>
						<span class="badge badge-neutral mb-1 mr-2 print:badge-ghost print:badge-sm">
							{skill}
						</span>
          </li>
        {/each}
        {#each resume.skills.tools.secondary as skill}
          <li>
						<span class="badge badge-neutral mb-1 mr-2 print:badge-ghost print:badge-sm">
							{skill}
						</span>
          </li>
        {/each}
      </ul>
    </li>
  </ul>
</Content>


