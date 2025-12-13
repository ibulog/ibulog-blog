import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const tags = [
  "CI/CD",
  "Frontend",
  "History",
  "Infrastructure",
  "Linux",
  "Other",
  "Roadster",
  "UX Writing",
] as const;

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.enum(tags)).min(1),
    heroImage: image().optional(),
  }),
});

export const collections = <const>{
  blog: blogCollection,
};
