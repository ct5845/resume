<script lang="ts">
	import { Theme } from '$lib/core';
	import { isDark, isSystem, theme } from '$lib/stores';
	import Icon from '@iconify/svelte';
	const themes = Theme;

	$: themeIcons = [
		{
			name: 'material-symbols:sunny',
			class: !$isSystem && !$isDark ? 'swap-on' : 'swap-off'
		},
		{
			name: 'material-symbols:sunny-outline',
			class: $isSystem && !$isDark ? 'swap-on' : 'swap-off'
		},
		{
			name: 'material-symbols:mode-night',
			class: !$isSystem && $isDark ? 'swap-on' : 'swap-off'
		},
		{
			name: 'material-symbols:mode-night-outline',
			class: $isSystem && $isDark ? 'swap-on' : 'swap-off'
		}
	];

	$: themeButtons = [
		{
			icon: 'material-symbols:sunny',
			name: 'Light',
			value: Theme.light,
			active: $theme === Theme.light,
			update: () => theme.update(themes.light)
		},
		{
			icon: 'material-symbols:mode-night',
			name: 'Dark',
			value: Theme.light,
			active: $theme === Theme.dark,
			update: () => theme.update(themes.dark)
		},
		{
			icon: 'material-symbols:computer',
			name: 'System',
			value: null,
			active: $theme === null,
			update: () => theme.update(null)
		}
	];
</script>

<div class="dropdown dropdown-end">
	<label for="theme-menu" tabIndex="0" class="btn btn-secondary btn-outline shadow">
		<span class="swap swap-active swap-flip">
			{#each themeIcons as icon}
				<Icon icon={icon.name} class="text-lg {icon.class}" />
			{/each}
		</span>
		<span>Theme</span>
	</label>
	<ul
		id="theme-menu"
		tabIndex="0"
		class="menu dropdown-content rounded-box menu-lg z-10 mt-2 bg-base-200 p-2 shadow-md">
		{#each themeButtons as button}
			<li>
				<button class:active={button.active} on:click={button.update} type="button">
					<Icon icon={button.icon} />
					<span>{button.name}</span>
				</button>
			</li>
		{/each}
	</ul>
</div>
