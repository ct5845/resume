<script setup lang="ts">
	import { page } from '$app/stores';

	import Icon from '@iconify/svelte';
	import {
		EDUCATION_ROUTE,
		HOME_ROUTE,
		INTERESTS_ROUTE,
		SKILLS_ROUTE,
		WORK_ROUTE
	} from '$lib/core';
	import type { Route } from '$lib/core';

	let routes: { next?: Route; prev?: Route };
	$: switch ($page.url.pathname) {
		case HOME_ROUTE.path:
			routes = { next: WORK_ROUTE };
			break;
		case WORK_ROUTE.path:
			routes = { next: EDUCATION_ROUTE, prev: HOME_ROUTE };
			break;
		case EDUCATION_ROUTE.path:
			routes = { next: SKILLS_ROUTE, prev: WORK_ROUTE };
			break;
		case SKILLS_ROUTE.path:
			routes = { next: INTERESTS_ROUTE, prev: EDUCATION_ROUTE };
			break;
		case INTERESTS_ROUTE.path:
			routes = { prev: SKILLS_ROUTE };
			break;
		default:
			routes = {};
	}
</script>

{#if routes}
	{#if routes.prev}
		<a href="{routes.prev.path}" class="btn shadow">
			<Icon class="text-lg" icon="ion:chevron-back" />
			<div class="flex flex-col items-start">
				<span class="text-sm font-bold">{routes.prev.name}</span>
				<span class="text-xs font-thin">Previous</span>
			</div>
		</a>
	{/if}
	<div class="flex-1"></div>
	{#if routes.next}
		<a href="{routes.next.path}" class="btn btn-neutral shadow-md">
			<div class="flex flex-col items-start">
				<span class="text-sm font-bold">{routes.next.name}</span>
				<span class="text-xs font-thin">Next</span>
			</div>
			<Icon class="text-lg" icon="ion:chevron-forward" />
		</a>
	{/if}
{/if}
