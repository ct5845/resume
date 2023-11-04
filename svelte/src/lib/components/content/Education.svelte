<script lang="ts">
  import * as resume from '$lib/assets/resume.json';
  import Title from "$lib/components/Title.svelte";
  import Content from "$lib/components/Content.svelte";
  let className: string | undefined = undefined;
  export { className as class};
</script>

<Content class={className}>
  <span slot="header">Education</span>
  <ul slot="content">
    {#each resume.education as experience}
      <li>
        <Title level={3} tag="h2">{experience.institution}</Title>
        <p class="mb-2 text-xl print:mb-1 print:text-xs">{experience.studyType}</p>
      </li>
    {/each}
  </ul>
</Content>



