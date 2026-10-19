---
title: "Deploy on Cloudflare Pages"
description: "Ship a static site on Cloudflare Pages with a clear build command, a custom domain, and a way to purge a stale page. Most outages are config, not the framework."
pubDate: 2026-10-19
topic: devops
tags: ["Cloudflare", "deploy", "static sites"]
keyword: "Cloudflare Pages deploy"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Git integration or direct upload?"
    a: "Git integration is simpler if the host can build the repo. Direct upload fits when the build already runs in CI and you only need to publish the output folder."
  - q: "The custom domain shows an old page. What now?"
    a: "Confirm the deployment that the domain points at, then purge the cache for that URL. A CDN can keep the previous HTML after a successful upload."
  - q: "Where do API tokens live?"
    a: "In the CI secret store or the host's environment settings. Not in the repository and not in a screenshot."
---

Cloudflare Pages is a good fit for a static build: an output directory, a CDN, and a custom hostname. The failures we see are almost never the framework. They are the build command, the Node version, or a domain still pointed at yesterday's files.

## Decide how it ships

| Path | You provide | You avoid |
| --- | --- | --- |
| Connect the Git repo | Build command and output directory | A second upload step |
| Upload from CI | The finished `dist` folder and an API token | Giving the host your source if you would rather not |

Pin the Node version the project expects. A silent jump from 18 to 22, or the reverse, is a common reason the build works locally and fails remotely.

## Domain and cache

Add the hostname on the Pages project and make the DNS record match what the project asks for, usually a proxied CNAME. Wait until the certificate shows active before you debug the HTML.

If the new deploy is live on the `pages.dev` URL but the custom domain is stale, you are looking at cache or at the wrong production branch. Purge that URL. Do not rewrite the site to "fix" a cached file.

## Secrets

Build-time variables belong in the project or in CI secrets. A token that can deploy the site can also replace it. Limit the token to that account and that purpose. Rotate it when someone who had access leaves.

For the performance checks worth running after launch, see [Core Web Vitals checklist](/en/posts/web-performance-seo-checklist/).
