<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Theme from '$lib/components/Theme.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<a aria-label="home" href="./">
	<Logo class="h-10 w-10" />
</a>
<div class="flex-1"></div>
<Theme />
<Contact />
