<script lang="ts">
	import MediaQuery from 'svelte-media-queries';
	import Identity from '$lib/components/Identity.svelte';
	import * as resume from '$lib/assets/resume.json';
	import Navigation from '$lib/components/Navigation.svelte';
	import { ROUTES_NO_HOME, MEDIA_QUERIES } from '$lib/core';

	const basics = resume.basics;
</script>

<MediaQuery query={MEDIA_QUERIES} let:matches>
	{#if matches}
		{#if matches['md-']}
			<section class="flex h-full min-h-[75vh] flex-col items-center justify-center text-center">
				<Identity name={basics.name} location={basics.location} role={basics.role} />
			</section>
		{:else}
			<section class="flex min-h-[75vh] flex-row items-center">
				<Navigation {basics} routes={ROUTES_NO_HOME}>
					<Identity
						slot="header"
						name={basics.name}
						location={basics.location}
						role={basics.role} />
				</Navigation>
			</section>
		{/if}
	{/if}
</MediaQuery>
