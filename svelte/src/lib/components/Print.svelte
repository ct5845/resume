<script lang="ts">
	import * as resume from '$lib/assets/resume.json';
	import Identity from '$lib/components/Identity.svelte';
	import Profiles from '$lib/components/content/Profiles.svelte';
	import Work from '$lib/components/content/Work.svelte';
	import Education from '$lib/components/content/Education.svelte';
	import Skills from '$lib/components/content/Skills.svelte';
	import Interests from '$lib/components/content/Interests.svelte';
	let className: string;
	export { className as class };
</script>

<main
	class="mx-auto h-full min-h-screen max-w-[525pt] grid-cols-[1fr_150pt] text-black {className}">
	<div class="border-r-2 pr-2">
		<Identity
			name={resume.basics.name}
			role={resume.basics.role}
			location={resume.basics.location} />
		<Work class="border-t-2 mt-2 pt-2" />
	</div>
	<div class="pl-2">
		<ul>
			<Profiles />
		</ul>
		<Education class="border-t-2 mt-2 pt-2" />
		<Skills class="border-t-2 mt-2 pt-2" />
		<Interests class="border-t-2 mt-2 pt-2"/>
	</div>
</main>
