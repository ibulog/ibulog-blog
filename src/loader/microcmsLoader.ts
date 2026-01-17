import { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } from "astro:env/server";

const MICROCMS_HEADERS = {
  "X-MICROCMS-API-KEY": MICROCMS_API_KEY,
};

const fetchMicrocmsCollection = async (endpoint: string) => {
  const baseUrl = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/`;
  const url = new URL(`${baseUrl}${endpoint}`);
  const response = await fetch(url, {
    headers: MICROCMS_HEADERS,
  });
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  return await response.json();
};

const fetchMicrocmsEntry = async (endpoint: string, id: string, draftKey?: string) => {
  const baseUrl = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/`;
  const url = draftKey ? new URL(`${baseUrl}${endpoint}/${id}?draftKey=${draftKey}`) : new URL(`${baseUrl}${endpoint}/${id}`);

  const response = await fetch(url, {
    headers: MICROCMS_HEADERS,
  });
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}/${id}: ${response.statusText}`);
  return await response.json();
};

// 通常のContent Collection用のLoader
export const microcmsLoader = (endpoint: string) => {
  return async () => {
    try {
      const data = await fetchMicrocmsCollection(endpoint);
      return data.contents;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }
}

// Live Content Collection用のLoader
export const microcmsLiveLoader = (endpoint: string) => {
  return {
    name: `microcms-live-loader-${endpoint}`,
    loadCollection: async () => {
      try {
        const data = await fetchMicrocmsCollection(endpoint);
        return {
          entries: data.contents.map((content) => ({
            id: content.id,
            data: content,
          })),
        };
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        throw error;
      }
    },
    loadEntry: async ({ filter }) => {
      try {
        const data = await fetchMicrocmsEntry(endpoint, filter.id, filter.draftKey);
        return {
          id: String(data.id),
          data: data,
        };
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}/${filter.id}:`, error);
        throw error;
      }
    }
  }
}