<script lang="ts">
	import type { BasicLocation } from '$lib/core';
	import Icon from '@iconify/svelte';
	let name: string;
	let role: string;
	let location: BasicLocation;

	let splitName = name?.split(' ') ?? [];

	export { name, role, location };
</script>

<h1 class="text-6xl font-extrabold leading-[5.1rem] print:text-5xl">
	<a
		href="/"
		class="bg-gradient-to-r from-primary to-secondary box-decoration-clone px-4 text-white print:bg-none print:px-0 print:text-primary"
	>
		{#each splitName as token}
			{token}
			<br class="print:hidden" />
		{/each}
	</a>
</h1>
<h2 class="mt-6 text-4xl font-bold tracking-wide text-secondary-focus print:mt-2 print:text-3xl">
	{role}
</h2>
<p class="mt-2 font-medium print:mt-1">
	<span>{location?.city}</span>
	<span class="mx-2 print:mx-1">•</span>
	<Icon class="mr-2 inline-block print:!hidden" icon={location?.icon['svelte']} />
	<span>{location?.countryCode}</span>
</p>
