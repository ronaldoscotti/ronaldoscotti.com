import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ronaldoscotti.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
