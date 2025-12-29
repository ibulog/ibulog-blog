// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import iconImage from './assets/icon.jpg';
import notFoundImage from './assets/404.jpg';

export const SITE_TITLE = 'いぶろぐ雑記';
export const SITE_DESCRIPTION = 'ITとか、UXライティングとか、車とか';
export const SITE_BASE_URL = 'https://ibulog.me';
export const ICON_IMAGE = iconImage;
export const NOT_FOUND_IMAGE = notFoundImage;

export const NAV_ITEMS = [
	{ label: 'About', href: '/' },
	{ label: 'Jobs', href: '/job' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Tags', href: '/tags' },
] as const;

export const PAGE_KINDS = {
	ABOUT: 'About',
	BLOG: 'Blog',
	JOBS: 'Jobs',
	TAGS: 'Tags',
} as const;

export const HEADING_LEVEL = 2;

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

export const SOCIAL_LINKS = {
	X: 'https://x.com/ibulog_',
	GITHUB: 'https://github.com/ibulog',
} as const;

export const RECENT_ARTICLES_COUNT = 5;
export const PAGINATION_PAGE_SIZE = 10;