---
title: "Make or n8n"
description: "Choose Make or n8n by where data may live and who will operate the server. Keep both if one team has SaaS chores and another has internal systems."
pubDate: 2026-10-19T22:00:00+08:00
topic: automation
tags: ["Make", "n8n", "automation"]
keyword: "Make vs n8n"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Should we migrate every Make scenario?"
    a: "No. Move a flow only when data location, cost, or an internal network forces it. Leave the rest until the process itself changes."
  - q: "Is self-hosted n8n free?"
    a: "The software can be self-hosted. The machine, backups, upgrades, and the person who gets paged are the cost."
  - q: "Can we import scenarios unchanged?"
    a: "Do not plan on it. Redraw the business steps and compare both tools on the same sample rows before you cut over."
---

Make and n8n both draw "event, then actions." The useful differences are who runs the worker and where the data sits, not which one has more icons.

## Three gates

1. If customer data cannot leave your network, a hosted product is out. Look at self-hosted n8n.
2. If nobody will patch a server, do not self-host. Use a hosted plan.
3. Either way, failures need an alert. "We will check the UI" is not an alert.

## Same questions, different bills

| Question | Make | n8n, self-hosted | n8n cloud |
| --- | --- | --- | --- |
| Who runs it | The vendor | You | The vendor |
| Data | Vendor cloud | Your network | Vendor cloud |
| Bill | Usage tiers | Machine and time | Vendor plan |
| Best when | SaaS-only chores, no operator | Internal systems, an owner exists | You want less ops and accept the cloud |

Count modules times runs per month on a real scenario. Do not estimate from the cheapest advertised tier. Prices move; recheck the vendor page before you buy.

## Do not migrate for taste

List the trigger, fields, rules, and destination. Rebuild that list on the new tool. Run the same good row, the same broken row, and the same downstream failure. Switch only when the outputs match. Keep old and new in parallel against a test channel first.

SaaS-to-SaaS work can stay on the tool you already pay for. Internal systems go to n8n if you have an owner. Code that needs review stays in [GitHub Actions](/en/posts/github-actions-automation-guide/). A first n8n sketch is in [Your first n8n workflow](/en/posts/n8n-first-workflow/).
