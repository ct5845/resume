<script lang="ts">
	import * as resume from '$lib/assets/resume.json';
	import Title from '$lib/components/Title.svelte';
	import Content from '$lib/components/Content.svelte';
</script>

<Content>
	<Title level={1} slot="header">Interests</Title>
	<ul slot="content">
		{#each resume.interests as interest}
			<li>
				<Title level={2} class="print:hidden">{interest.name}</Title>
				<ul class="mb-4 print:hidden">
					{#each interest.keywords as item}
						<li class="mb-2">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html item}
						</li>
					{/each}
				</ul>
				<Title level={2} class="hidden print:block">{interest.name}</Title>
				<p class="hidden print:block">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html interest.shortText}
				</p>
			</li>
		{/each}
	</ul>
</Content>
