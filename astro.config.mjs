import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

import remarkBreaks from 'remark-breaks';
import remarkCodeBlock from "./src/remark/remark-code-block";
import remarkLinkCard from "./src/remark/remark-link-card";

// https://astro.build/config
export default defineConfig({
  site: "https://ibulog.me",
  integrations: [
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
    remarkPlugins: [remarkBreaks, remarkCodeBlock, remarkLinkCard],
    extendDefaultPlugins: true,
  },
  image: {
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss()],
  }
});
