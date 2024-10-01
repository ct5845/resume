import tailwindTypography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";
import daisyui from "daisyui";
import scaling from "./scaling.plugin";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    fontFamily: {
      sans: ['Lora', 'sans-serif']
    },
    extend: {
      boxShadow: {
        z1: '8px 8px 0 0 rgb(0 0 0 / 0.65);',
        z2: '10px 10px 0 0 rgb(0 0 0 / 0.75);',
        z3: '14px 14px 0 0 rgb(0 0 0 / 0.85);',
      }
    }
  },
  daisyui: {
    themes: [{
      light: {
        'primary': '#004b4a',
        'secondary': '#2e4746',
        'accent': '#2e445e',
        'neutral': '#2b3231',
        'neutral-content': '#ecf2f1',
        'base-100': colors.amber['50']
      },
      dark: {
        'primary': '#84d9d6',
        'secondary': '#b5d0ce',
        'accent': '#b6cdec',
        'neutral': '#dde4e3',
        'neutral-content': '#252b2b',
        'base-100': colors.teal['950'],
        'base-200': colors.teal['900'],
        'base-300': colors.teal['800'],
      }
    }]
  },
  plugins: [
    tailwindTypography,
    daisyui,
    scaling,
  ],
};

