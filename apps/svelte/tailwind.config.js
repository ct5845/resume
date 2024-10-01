import tailwindPreset from "../../libs/style/tailwind.config.js";

console.log('TAILWINDCSS SVETE: LOADED');
/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    tailwindPreset
  ],
  content: ['./src/**/*.svelte'],
}