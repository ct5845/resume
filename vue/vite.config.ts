import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import favicons from '@peterek/vite-plugin-favicons';

const githubPagesDest = '/resume/vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? githubPagesDest: '';
  const favIconOptions = command === 'build'? { path: githubPagesDest }:{};

  return {
    base,
    plugins: [favicons('public/favicon.svg', favIconOptions), vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }};
});
