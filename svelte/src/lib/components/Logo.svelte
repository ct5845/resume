<script lang="ts">
	import { CT_LOGO } from '$lib/core';
	let className: string;

	export { className as class };
</script>

<svg class={className} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
	<!-- eslint-disable-next-line svelte/no-at-html-tags  -->
	{@html CT_LOGO}
</svg>
