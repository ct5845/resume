<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Basics } from '$lib/core';
	let basics: Basics;

	export { basics };
</script>

<li class="hidden text-info print:mb-1 print:list-item">
	<Icon icon="mdi:email-outline" class="print:mr-1" />
	<span>ct5845@gmail.com</span>
</li>
<li class="hidden text-info print:mb-1 print:list-item">
	<Icon icon="material-symbols:link" />
	<span>{basics.url.replace('https://', '')}</span>
</li>
{#each basics.profiles as profile}
	<li class="text-info print:mb-1">
		<a href={profile.url}>
			<Icon icon={profile.icon['svelte']} class="print:mr-1" />
			<span class="print:hidden">{profile.network}</span>
			<span class="hidden print:inline">{profile.url.replace('https://', '')}</span>
		</a>
	</li>
{/each}
