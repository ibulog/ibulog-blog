// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import iconImage from './assets/icon.jpg';

export const SITE_TITLE = 'いぶろぐ雑記';
export const SITE_DESCRIPTION = 'ITとか、UXライティングとか、車とか';
export const SITE_BASE_URL = 'https://ibulog.me';
export const ICON_IMAGE = iconImage;

export const NAV_ITEMS = [
	{ label: 'About', href: '/' },
	{ label: 'Jobs', href: '/job' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Tags', href: '/tags' },
] as const;

export const HEADING_LEVEL = 2;