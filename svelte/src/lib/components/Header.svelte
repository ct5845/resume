<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Theme from '$lib/components/Theme.svelte';
	import type { Basics } from '$lib/core';
	import Contact from '$lib/components/Contact.svelte';
	let basics: Basics;

	export { basics };
</script>

<a aria-label="home" href="/">
	<Logo class="h-10 w-10" />
</a>
<div class="flex-1"></div>
<Theme />
<Contact {basics} />
