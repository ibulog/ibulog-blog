import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ibulog.blog',
  integrations: [mdx(), sitemap({
    customPages: [
      'http://ibulog.blog/20220818-au-hikari-home-gateway-dhcp',
      'http://ibulog.blog/20220716-raid-z-hdd-replace',
      'http://ibulog.blog/20210313-cloudflare-pages-hugo',
      'http://ibulog.blog/20210201-manjaro-root-zfs',
      'http://ibulog.blog/20201216-kind-zfs',
      'http://ibulog.blog/20201124-linux-youtube-4k60',
      'http://ibulog.blog/20200614-systemd-boot'
      ]
    })
  ],
});
