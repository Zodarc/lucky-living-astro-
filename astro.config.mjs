import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://spokycurates.com',

  server: {
    host: '0.0.0.0',
    port: 5000,
  },

  integrations: [
  sitemap({
    filter: (page) =>
      !page.includes('/404') &&
      !page.includes('/500'),
  }),
  react(),
  keystatic(),
],
  output: 'hybrid',
  adapter: vercel(),

  trailingSlash: 'always',

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: true,
    },
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});