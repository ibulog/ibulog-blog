import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { microcmsLoader } from "./loader/microcmsLoader";
import { testCollectionSchema } from "./loader/microcmsSchema";

const jobCollection = defineCollection({
  loader: microcmsLoader("jobs"),
  schema: z.object({
    companyName: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    team: z.string(),
    work: z.string(),
    companyUrl: z.string(),
  }),
});

const testCollection = defineCollection({
  loader: microcmsLoader("test"),
  schema: testCollectionSchema,
});

const selfIntroductionCollection = defineCollection({
  loader: microcmsLoader("self-introduction"),
  schema: z.object({
    text: z.string(),
  }),
});

const tagCollection = defineCollection({
  loader: microcmsLoader("tags"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(reference("tag")),
    heroImage: image().optional(),
  }),
});

export const collections: Record<string, any> = {
  blog: blogCollection,
  job: jobCollection,
  tag: tagCollection,
  selfIntroduction: selfIntroductionCollection,
  test: testCollection,
};
