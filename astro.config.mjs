import { defineConfig } from "astro/config";
import { readFileSync } from "fs";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

function readLocalEnv() {
  try {
    return Object.fromEntries(
      readFileSync(".env.local", "utf-8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"))
        .map((l) => {
          const i = l.indexOf("=");
          return [l.slice(0, i), l.slice(i + 1)];
        }),
    );
  } catch {
    return {};
  }
}

const env = { ...process.env, ...readLocalEnv() };

export default defineConfig({
  site: "https://castilloitsystems.com",
  output: "static",
  trailingSlash: "never",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-VE" } },
      filter: (page) => !page.includes("/404"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": new URL("./", import.meta.url).pathname,
      },
    },
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY || ""),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY || ""),
      "process.env.PLAUSIBLE_DOMAIN": JSON.stringify(
        env.PLAUSIBLE_DOMAIN || "castilloitsystems.com",
      ),
      "process.env.GA_MEASUREMENT_ID": JSON.stringify(
        env.GA_MEASUREMENT_ID || "",
      ),
      "process.env.N8N_WEBHOOK_URL": JSON.stringify(env.N8N_WEBHOOK_URL || ""),
      "process.env.N8N_WEBHOOK_TOKEN": JSON.stringify(
        env.N8N_WEBHOOK_TOKEN || "",
      ),
    },
  },
});
