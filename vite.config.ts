
  import { defineConfig } from 'vite';
  import { svelte } from '@sveltejs/vite-plugin-svelte';
  import path from 'path';

  export default defineConfig({
    plugins: [svelte()],
    resolve: {
      extensions: ['.js', '.ts', '.svelte', '.json'],
      alias: {
        '$lib': path.resolve(__dirname, './src/lib'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });