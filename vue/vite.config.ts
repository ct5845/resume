import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import favicons from '@peterek/vite-plugin-favicons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [favicons('public/favicon.svg'), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
