<script lang="ts">
	import * as resume from '$lib/assets/resume.json';
	import Icon from '@iconify/svelte';
	const basics = resume.basics;
</script>

<li class="hidden text-info print:mb-1 print:list-item">
	<Icon icon="mdi:email-outline" class="print:mr-1 inline" />
	<span>ct5845@gmail.com</span>
</li>
<li class="hidden text-info print:mb-1 print:list-item">
	<Icon icon="material-symbols:link" class="inline" />
	<span>{basics.url.replace('https://', '')}</span>
</li>
{#each basics.profiles as profile}
	<li class="text-info print:mb-1">
		<a href={profile.url}>
			<Icon icon={profile.icon['svelte']} class="print:mr-1 inline" />
			<span class="print:hidden">{profile.network}</span>
			<span class="hidden print:inline">{profile.url.replace('https://', '')}</span>
		</a>
	</li>
{/each}
