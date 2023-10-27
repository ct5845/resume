/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  screens: {
    print: { raw: 'print' },
    screen: { raw: 'screen' }
  },
  darkMode: ['class', '[data-theme="forest"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito sans', ...fontFamily.sans]
      },
      colors: {
        primary: 'hsl(var(--p) / 1)',
        secondary: 'hsl(var(--s) / 1)'
      },
      spacing: {
        92: '23rem',
        152: '38rem'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
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
  }
};
