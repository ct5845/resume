import { derived, writable } from 'svelte/store';
import { getTheme, setTheme, storeTheme, systemTheme, Theme } from '$lib/core';

const createTheme = () => {
	const { subscribe, set } = writable(getTheme());

	return {
		subscribe,
		update: (value: Theme | null) => {
			set(value);
			storeTheme(value);
			setTheme(value ?? systemTheme());
		}
	};
};

export const theme = createTheme();

export const absoluteTheme = derived(theme, ($theme) => $theme ?? systemTheme());

export const isSystem = derived(theme, ($theme) => $theme === null);

export const isDark = derived(absoluteTheme, ($absoluteTheme) => $absoluteTheme === Theme.dark);
