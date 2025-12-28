import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const microcmsLoader = (endpoint: string) => {
  return async () => {
  try {
    const response = await fetch(`https://${import.meta.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`, {
      headers: {
        "X-MICROCMS-API-KEY": import.meta.env.MICROCMS_API_KEY,
      },
    });
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);

    const data = await response.json();
    return data.contents;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }
};

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

const selfIntroductionCollection = defineCollection({
  loader: microcmsLoader("self-introduction"),
  schema: z.object({
    text: z.string(),
  }),
});

export const tags = [
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
  job: jobCollection,
  selfIntroduction: selfIntroductionCollection,
};
