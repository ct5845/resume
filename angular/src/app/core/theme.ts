const THEME_KEY = 'theme';

export enum Theme {
	light = 'cupcake',
	dark = 'forest'
}

export const systemTheme = () => {
	const systemIsDark = window ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

	return systemIsDark ? Theme.dark : Theme.light;
};

export const getTheme = () => (localStorage ? (localStorage.getItem(THEME_KEY) as Theme | null) : null);

export const storeTheme = (theme: Theme | null): void => {
	if (!localStorage) {
		return;
	}
	if (theme) {
		document.cookie = `theme=${theme};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
		localStorage.setItem(THEME_KEY, theme);
	} else {
		document.cookie = `theme=;path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
		localStorage.removeItem(THEME_KEY);
	}
};

export const setTheme = (theme: Theme) => {
	document.documentElement.setAttribute('data-theme', theme);
};
