<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	let className: string | undefined = undefined;
	export { className as class};
</script>

<section class="mx-auto max-w-prose print:mx-0 print:max-w-none {className}">
	<Title level={1}><slot name="header" /></Title>
	<slot name="content" />
</section>
