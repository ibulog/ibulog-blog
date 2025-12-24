import { defineConfig } from "astro/config";
import embeds from "astro-embed/integration";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

import remarkBreaks from 'remark-breaks';
import remarkCodeBlock from "./src/remark/remark-code-block";

// https://astro.build/config
export default defineConfig({
  site: "https://ibulog.me",
  integrations: [
    embeds(),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkBreaks, remarkCodeBlock],
    extendDefaultPlugins: true,
  },
  image: {
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss()],
  }
});
