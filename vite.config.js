import { defineConfig } from 'vite';

export default defineConfig({
  // relative base so the built site works on any static host
  // (GitHub Pages sub-path, Netlify, Vercel, plain folder…)
  base: './',
  build: {
    target: 'es2020',
  },
});
