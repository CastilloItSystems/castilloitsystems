import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://castilloitsystems.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-VE' } },
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': new URL('./', import.meta.url).pathname,
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
      'process.env.PLAUSIBLE_DOMAIN': JSON.stringify(
        process.env.PLAUSIBLE_DOMAIN || 'castilloitsystems.com'
      ),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(process.env.GA_MEASUREMENT_ID || ''),
      'process.env.N8N_WEBHOOK_URL': JSON.stringify(process.env.N8N_WEBHOOK_URL || ''),
      'process.env.N8N_WEBHOOK_TOKEN': JSON.stringify(process.env.N8N_WEBHOOK_TOKEN || ''),
    },
  },
});
