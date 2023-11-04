<script lang="ts">
	import type { Basics, Route } from '$lib/core';
	import NavigationItems from '$lib/components/NavigationItems.svelte';
	export let routes: Route[];
	export let basics: Basics;
	export let showHeader = false;
</script>

{#if showHeader}
	<header class="px-2 pb-2">
		<slot name="header" />
	</header>
	<div class="divider"></div>
{/if}

<NavigationItems {basics} {routes} />
