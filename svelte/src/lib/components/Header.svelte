<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Theme from '$lib/components/Theme.svelte';
	import type { Basics } from '$lib/core';
	import Contact from '$lib/components/Contact.svelte';
	import { base } from "$app/paths";
	let basics: Basics;

	export { basics };
</script>

<a aria-label="home" href="{base}">
	<Logo class="h-10 w-10" />
</a>
<div class="flex-1"></div>
<Theme />
<Contact {basics} />
