<script lang="ts">
	import * as resume from '$lib/assets/resume.json';
	import Title from '$lib/components/Title.svelte';
	import Content from '$lib/components/Content.svelte';
</script>

<Content>
	<Title level={1} slot="header">Education</Title>
	<ul slot="content">
		{#each resume.education as experience}
			<li>
				<Title level={3} tag="h2">{experience.institution}</Title>
				<p class="mb-2 text-xl print:mb-1 print:text-xs">{experience.studyType}</p>
			</li>
		{/each}
	</ul>
</Content>
