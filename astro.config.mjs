import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Allows the canonical site URL to be overridden per-environment (e.g. a
// staging deploy) without touching source. Falls back to production.
const SITE_URL = process.env.SITE_URL ?? 'https://spokycurates.com';

export default defineConfig({
  site: SITE_URL,

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
  ],

  output: 'static',

  trailingSlash: 'ignore',

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
  allowedHosts: true,
      }
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
