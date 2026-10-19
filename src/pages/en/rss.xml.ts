import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../../../site.config.mjs';
import { ui } from '../../i18n';

export async function GET(context: APIContext) {
  const posts = (await getCollection('enPosts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: ui.en.siteTitle,
    description: ui.en.siteDescription,
    site: context.site ?? site.url,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/posts/${post.id}/`,
      categories: [post.data.topic, ...(post.data.tags ?? [])],
    })),
    customData: `<language>en</language>`,
  });
}
