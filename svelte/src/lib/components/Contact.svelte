<script lang="ts">
	import Icon from '@iconify/svelte';
	import Profiles from '$lib/components/Profiles.svelte';
	import type { Basics } from '$lib/core';

	let basics: Basics;

	export { basics };
</script>

<div class="dropdown dropdown-end ml-2">
	<label tabIndex="0" for="profile-menu" class="btn btn-primary shadow">
		<Icon icon="mdi:account-box" class="text-lg" />
		<span>Contact</span>
	</label>
	<ul
		tabIndex="0"
		id="profile-menu"
		class="menu dropdown-content rounded-box menu-lg z-10 mt-2 bg-base-200 p-2 shadow-md">
		<Profiles {basics} />
	</ul>
</div>
