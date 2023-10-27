const THEME_KEY = 'theme';

export enum Theme {
  light = 'cupcake',
  dark = 'forest'
}

export const systemTheme = () => {
  const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return systemIsDark ? Theme.dark : Theme.light;
};

export const getTheme = () => localStorage.getItem(THEME_KEY) as Theme | null;

export const storeTheme = (theme: Theme | null): void => {
  if (theme) {
    localStorage.setItem(THEME_KEY, theme);
  } else {
    localStorage.removeItem(THEME_KEY);
  }
};

export const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};
