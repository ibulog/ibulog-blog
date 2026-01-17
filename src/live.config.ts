import { defineLiveCollection } from "astro:content";
import { microcmsLiveLoader } from "./loader/microcmsLoader";
import { testCollectionSchema } from "./loader/microcmsSchema";

const testLiveCollection = defineLiveCollection({
  loader: microcmsLiveLoader("test"),
  schema: testCollectionSchema,
});

export const collections: Record<string, any> = {
  testLive: testLiveCollection,
};
