import { z } from "astro/zod";



export const testCollectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});
