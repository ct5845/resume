<script lang="ts">
	import { page } from '$app/stores';
	import type { Route } from '$lib/core';
	import Profiles from '$lib/components/content/Profiles.svelte';
	import Icon from '@iconify/svelte';
	import { base } from "$app/paths";
	export let routes: Route[];
</script>

<ul class="menu menu-lg">
	{#each routes as route, index}
		{@const active = $page.url.pathname === route.path}
		<li>
			<a href="{base}{route.path}" class={active ? 'ring-2 ring-primary' : ''}>
				{#if route.iconClass}
					<div class="mx-1 h-4 w-4 {route.iconClass} {active ? 'bg-primary' : 'bg-neutral'}"></div>
				{/if}
				{#if route.icon}
					<Icon class="text-lg" icon={route.icon} />
				{/if}
				<span class:text-primary={active}>{route.name}</span>
			</a>
			{#if index === routes.length - 1}
				<div class="divider"></div>
			{/if}
		</li>
	{/each}

	<Profiles />
</ul>
