#!/usr/bin/env node
/**
 * 构建产物 SEO 自检：在部署前拦截低级问题（缺 description、缺 H1、canonical 缺失等）。
 * 用法：npm run build && npm run seo:audit
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const { site } = await import(path.join(ROOT, 'site.config.mjs'));

if (!fs.existsSync(DIST)) {
  console.error('未找到 dist 目录，请先执行 npm run build');
  process.exit(1);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const issues = [];
const stats = { pages: htmlFiles.length, words: 0, internalLinks: 0 };

const pick = (re, s) => (re.exec(s) || [])[1] || '';

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  const add = (msg) => issues.push(`${rel}: ${msg}`);

  const title = pick(/<title>([\s\S]*?)<\/title>/, html);
  if (!title) add('缺少 title');
  else if (title.length > 70) add(`title 过长（${title.length} 字符）`);

  const desc = pick(/<meta name="description" content="([\s\S]*?)"/, html);
  if (!desc) add('缺少 meta description');
  else if (desc.length < 50 || desc.length > 170)
    add(`description 长度不理想（${desc.length} 字符，建议 50-165）`);

  if (!/<link rel="canonical"/.test(html)) add('缺少 canonical');

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1]);
  if (h1s.length === 0) add('缺少 H1');
  else if (h1s.length > 1) add(`H1 不唯一（${h1s.length} 个）`);

  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ');
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const enWords = (text.match(/[A-Za-z]+/g) || []).length;
  const isEnPost = rel.startsWith('en/posts/') || rel.startsWith(`en${path.sep}posts${path.sep}`);
  if (rel.startsWith('posts/') && cjk < site.content.minWords * 0.6)
    add(`正文字数偏少（约 ${cjk} 字）`);
  if (isEnPost && enWords < 280) add(`英文正文字数偏少（约 ${enWords} 词）`);
  stats.words += cjk;

  const internal = [...html.matchAll(/href="(\/[^"]*)"/g)].length;
  stats.internalLinks += internal;
  if ((rel.startsWith('posts/') || isEnPost) && internal < 3) add(`内链偏少（${internal} 个）`);

  const imgs = [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  for (const img of imgs) if (!/alt=/.test(img)) add('存在无 alt 的图片');
}

const sitemap = fs.existsSync(path.join(DIST, 'sitemap-index.xml'));
if (!sitemap) issues.push('缺少 sitemap-index.xml');

console.log('─'.repeat(60));
console.log(`页面总数：${stats.pages}    正文总字数：${stats.words}    内链总数：${stats.internalLinks}`);
if (issues.length === 0) {
  console.log('✓ SEO 自检通过，未发现问题');
} else {
  console.log(`✗ 发现 ${issues.length} 个问题：`);
  issues.slice(0, 40).forEach((i) => console.log('  - ' + i));
}

fs.mkdirSync(path.join(ROOT, '.content-cache'), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, '.content-cache', 'seo-report.json'),
  JSON.stringify({ ranAt: new Date().toISOString(), stats, issues }, null, 2)
);

process.exit(issues.length > 0 ? 1 : 0);
