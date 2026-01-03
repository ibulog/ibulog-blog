import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

import remarkBreaks from 'remark-breaks';
import remarkCodeBlock from "./src/remark/remark-code-block";
import remarkLinkCard from "./src/remark/remark-link-card";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://ibulog.me",
  env: {
    schema: {
      MICROCMS_SERVICE_DOMAIN: envField.string({ context: "server", access: "secret" }),
      MICROCMS_API_KEY: envField.string({ context: "server", access: "secret" }),
    }
  },
  integrations: [mdx(), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }), alpinejs({ entrypoint: '/src/entrypoint.ts' })],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkBreaks, remarkCodeBlock, remarkLinkCard],
    extendDefaultPlugins: true,
  },
  image: {
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    defaultStrategy: "viewport"
  }
});