/** @type {import('tailwindcss').Config} */

import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = ['./index.html', './src/**/*.{vue,js,ts}'];
export const screens = {
  print: { raw: 'print' },
  screen: { raw: 'screen' }
};
export const darkMode = ['class', '[data-theme="forest"]'];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Nunito sans', ...fontFamily.sans]
    },
    colors: {
      primary: 'hsl(var(--p) / 1)',
      secondary: 'hsl(var(--s) / 1)'
    },
    spacing: {
      prose: '65ch',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  }
};
export const plugins = [require('daisyui')];
export const daisyui = {
  darkTheme: 'forest',
  themes: [
    {
      cupcake: {
        ...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
        '--rounded-btn': '0.5rem',
        '--btn-text-case': 'normal'
      }
    },
    {
      forest: {
        ...require('daisyui/src/theming/themes')['[data-theme=forest]'],
        '--rounded-btn': '0.5rem',
        '--btn-text-case': 'normal'
      }
    }
  ]
};
