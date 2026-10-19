---
title: "New computer setup checklist"
description: "Set up a new dev machine from a written order: tools, a version manager, access, then the editor. Reissue secrets instead of copying them through chat."
pubDate: 2026-10-19T22:00:00+08:00
topic: devops
tags: ["setup", "checklist", "secrets"]
keyword: "dev machine checklist"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Should setup be one script?"
    a: "Script the installers. Stop for logins and second factors. Never put a password in the script."
  - q: "Can I copy SSH keys from the old laptop?"
    a: "Generate a new key, add the public key, and remove the old one when the old machine is retired. Do not send private keys in chat or a shared drive."
  - q: "Must editors match?"
    a: "Match runtimes, package install, and formatting. Themes and keybindings can differ."
---

A new laptop is slow because the install order lives in one person’s memory: which runtime, which registry login, which key. Write the order down so the next person does not need that memory.

## Before you install

List what you cannot lose: the password manager (do this first), hosting logins and second factors, which keys can be reissued, and how internal package registries authenticate. If you cannot name the registry login, stop. You will discover it halfway through and redo the morning.

## Order

| Step | Done when | Typical miss |
| --- | --- | --- |
| OS tools and a shell | The terminal runs | Skipping updates, then compilers fail |
| Version manager | The project’s pinned runtime installs | A global runtime that does not match the repo |
| Git host and SSH | You can clone the repo | A key with too much access, or the old key left in place |
| Package registry | Install matches the lockfile | The registry URL only in someone’s dotfiles |
| Project services | The documented health check passes | A leftover container on the same port |
| Editor | Format-on-save matches CI | A plugin version the repo does not use |

## Secrets

The checklist names where to request a credential and which file it belongs in. It never contains a live token. Use `.env.example` for names only. Ignore the real env file. Do not copy a browser profile over to "save time logging in."

Prove the document by watching someone else follow it on a clean account, without your help. Every place they stop is a line to fix. If nobody has followed it in a quarter, it is stale. CI can catch "works on my machine" after this point; this list is everything required before CI exists. See also [GitHub Actions that fail loudly](/en/posts/github-actions-automation-guide/).
