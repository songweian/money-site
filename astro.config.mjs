// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site.config.mjs';

// Cloudflare Pages / GitHub Pages 均可直接使用静态输出
export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'always',
  build: {
    // 站内链接保持带斜杠，减少 301，利于收录
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // 列表页权重略高
        if (item.url.endsWith(site.url + '/') || /\/topics\/[^/]+\/$/.test(item.url)) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        }
        return item;
      },
    }),
  ],
  vite: {
    build: {
      // 静态资源内联阈值，减少请求数
      assetsInlineLimit: 4096,
    },
  },
});
