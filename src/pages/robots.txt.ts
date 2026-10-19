import type { APIRoute } from 'astro';
import { site } from '../../site.config.mjs';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
Disallow: /search/

Sitemap: ${new URL('/sitemap-index.xml', site.url).toString()}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
