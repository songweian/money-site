---
title: "Core Web Vitals checklist"
description: "Slow pages and weak indexing are often technical, not a writing problem. Work through LCP, CLS, and INP, then sitemap, canonical, and robots mistakes."
pubDate: 2026-10-19
topic: devops
tags: ["performance", "SEO", "Web Vitals"]
keyword: "Core Web Vitals checklist"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Which metric first?"
    a: "Largest Contentful Paint, if the main image or headline is late. Layout shift next, if the page jumps. Interaction delay after those two are calm."
  - q: "Do I need a perfect lab score?"
    a: "No. Fix the field issues on the templates that get traffic. A perfect score on an empty page does not help the article template."
  - q: "Can ads hurt the score?"
    a: "Yes. Reserve space for slots so the layout does not jump, and do not load extra tags you are not using."
---

When a site is slow or poorly indexed, the draft is rarely the first bug. The template is: a late hero image, a layout that moves, or a canonical tag pointing at the wrong host.

## Three metrics, three causes

| Metric | Usual cause | First fix |
| --- | --- | --- |
| LCP | Hero image or a blocking font | Give the image dimensions, a modern format, and priority |
| CLS | Images, ads, or embeds without a box | Reserve the height before the asset arrives |
| INP | Long tasks on click | Split the work, drop tags that do not earn their cost |

Measure the article template on a phone-sized viewport. A fast homepage with a slow post is still a slow site.

## Indexing basics

- One canonical URL per page, on the hostname you want indexed.
- A sitemap that lists those URLs, linked from `robots.txt`.
- `robots.txt` that does not block CSS, the sitemap, or the posts by accident.
- Titles and descriptions written for the page, not copied from the homepage.

Submit the sitemap in Search Console after the canonical host is stable. Changing the host later wastes the crawl you just asked for.

## After each deploy

Check one article, the homepage, `robots.txt`, and the sitemap. If the custom domain and the default host disagree, fix DNS or cache before you add more content. Deployment steps are in [Deploy on Cloudflare Pages](/en/posts/cloudflare-pages-static-site-deploy/).
