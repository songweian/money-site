import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(4).max(70),
    // 摘要：搜索引擎最常抓取的片段，60-160 字最佳
    description: z.string().min(40).max(165),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topic: z.string(),
    tags: z.array(z.string()).default([]),
    // 主关键词：文章页面的 SEO 焦点
    keyword: z.string().optional(),
    author: z.string().default('AI 效能实验室'),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
    heroImage: z.string().optional(),
    // FAQ 结构化数据：命中 Google 富媒体结果（FAQ rich result）的关键
    faq: z
      .array(
        z.object({
          q: z.string().min(4),
          a: z.string().min(10),
        })
      )
      .optional(),
    // AI 生成元数据，便于后期复盘
    aiGenerated: z.boolean().default(true),
  }),
});

export const collections = { posts };
