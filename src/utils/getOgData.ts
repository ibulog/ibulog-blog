import ogs from 'open-graph-scraper';

export interface OgData {
	title?: string;
	image?: string;
}

export async function getOgData(url: string): Promise<OgData> {
	try {
		const { result } = await ogs({ url, fetchOptions: { headers: { 'user-agent': 'bot' } } });
		return {
			title: result.ogTitle || result.twitterTitle || undefined,
			image: result.ogImage?.[0]?.url,
		};
	} catch (error) {
		console.error(`Failed to fetch OGP data for ${url}:`, error);
		return {};
	}
}

