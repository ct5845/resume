<script lang="ts">
	export let level: number;
	export let tag: string = `h${level}`;

	let className: string;
	let externalClassNames: string | undefined;

	$: switch (level) {
		case 1:
			className = 'text-5xl font-extrabold tracking-tighter mb-6 print:text-2xl print:mb-3';
			break;
		case 2:
			className = 'text-3xl mb-2 text-primary font-bold print:text-xl print:mb-1';
			break;
		case 3:
			className =
				'text-2xl mb-2 text-secondary flex flex-row justify-between print:text-lg print:mb-1';
			break;
	}

	export { externalClassNames as class };
</script>

<svelte:element this={tag} class="{className} {externalClassNames}">
	<slot />
</svelte:element>
