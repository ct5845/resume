<script lang="ts">
	import * as resume from '$lib/assets/resume.json';
	import Title from '$lib/components/Title.svelte';
	import Content from '$lib/components/Content.svelte';
</script>

<Content>
	<span slot="header">Work Experience</span>

	<ul slot="content">
		{#each resume.work as experience}
			<li>
				<Title level={2}>{experience.position}</Title>
				<Title level={3}>
					<span>{experience.name}</span>
					<span class="text-accent">
						{experience.startDate} - {experience.endDate ?? 'Present'}
					</span>
				</Title>
				<ul class="mb-6 list-disc pl-4">
					{#each experience.highlights as highlight}
						<li>
							{highlight}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</Content>
