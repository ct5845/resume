<script lang="ts">
	import { copy, uuid } from '$lib/utils';
	import LinkIcon from '$lib/assets/icons/link.svelte';
	type Props = {
		href: string;
		children: any;
	};
	type CopyState = 'copying' | 'copied' | 'failed';

	const id = uuid();
	let copyState = $state<CopyState>('copying');
	let popoverText = $derived.by(() => {
		switch (copyState) {
			case 'copying':
				return 'Copying';
			case 'copied':
				return 'Copied!';
			case 'failed':
				return 'Failed to copy';
		}
	});

	const copyEmail = async () => {
		copyState = 'copying';
		copyState = (await copy(href)) ? 'copied' : 'failed';
	};

	let { href, children }: Props = $props();
</script>

<a class="link link-primary print:link-neutral truncate" {href}>{@render children()}</a>
<button
	style="anchor-name: --{id}; width: fit-content;"
	class="print:hidden fill-primary"
	popovertarget={id}
	onclick={() => copyEmail()}
	aria-label="Copy Link"
>
	<LinkIcon />
</button>
<div role="tooltip" popover="" class="popover popover-base-200" style="position-anchor: --{id}" {id}>
	{popoverText}
</div>
