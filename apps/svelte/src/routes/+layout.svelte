<script>
	import Header from '$lib/components/Header.svelte';
	import '../../../../libs/style/styles.css';

	let { children } = $props();
</script>

<div
	class="grid grid-cols-[minmax(0,auto)_minmax(0,75ch)_minmax(0,auto)] px-scale print:px-0 size-full"
>
	<div></div>
	<main class="flex flex-col gap-scale">
		<Header />
		<div class="grow prose max-w-none text-pretty">
			{@render children()}
		</div>
	</main>
	<div></div>
</div>
