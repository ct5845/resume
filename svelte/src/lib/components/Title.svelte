<script lang="ts">
	export let level: number;
	export let tag: string = `h${level}`;

	let classes: string | undefined = undefined;
	let className: string | undefined = undefined;

	$: switch (level) {
		case 1:
			classes = `text-5xl font-extrabold tracking-tighter mb-6 print:text-2xl print:mb-3 ${className ?? ''}`;
			break;
		case 2:
			classes = `text-3xl mb-2 text-primary font-bold print:text-xl print:mb-1 ${className ?? ''}`;
			break;
		case 3:
			classes =
				`text-2xl mb-2 text-secondary flex flex-row justify-between print:text-lg print:mb-1 ${className ?? ''}`;
			break;
	}

	export { className as class };
</script>

<svelte:element this={tag} class={classes}>
	<slot />
</svelte:element>
