---
title: "Your first n8n workflow"
description: "Build one n8n workflow for a repeated task: a trigger, a fetch, a single decision, a write, and an alert when it fails. Skip anything you cannot redo by hand."
pubDate: 2026-10-19T22:00:00+08:00
topic: automation
tags: ["n8n", "automation", "alerts"]
keyword: "first n8n workflow"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Do I have to self-host?"
    a: "No. Use the cloud to prove the flow. Self-host when data must stay on your network or when someone will actually patch the server."
  - q: "What is a good first task?"
    a: "Something you do at least three times a week, with fixed steps, that you can redo by hand if the run is wrong."
  - q: "Will a failed node lose earlier writes?"
    a: "Successful earlier steps stay done. Make writes idempotent with a business id, and keep the original input so you can replay it."
---

n8n is a way to draw "when this happens, do these steps." The first workflow should be boring: one trigger, a clear input, one decision, one destination, and a message when it breaks.

## Pick the task

Automate work that happens at least three times a week and does not need a fresh judgment each time. Form to spreadsheet, a daily summary into chat, mail with a label into a to-do. Do not start with refunds or production database merges.

## Four stages

| Stage | Does | Does not |
| --- | --- | --- |
| Trigger | Manual, clock, or webhook | Hide the time zone |
| Fetch | Read the raw row or payload | Decide yet |
| Decide | One condition | Five rules in one expression |
| Write | Save the result and notify | Retry a payment blindly |

A green node is not a business success. APIs return HTTP 200 with an error in the body. Check that field.

Store credentials in n8n’s credential store, one per service. Retry reads. Do not retry sends unless a second send is harmless. On failure, notify a person with the workflow name, the node, and an id such as an order number. Pause the trigger if the same error repeats, then replay saved inputs.

## When to leave the diagram

Long loops, code review, and repo secrets belong in [GitHub Actions](/en/posts/github-actions-automation-guide/). n8n can receive the event and post the alert. For Make versus n8n, read [Make or n8n](/en/posts/make-vs-n8n/).

Before you enable the schedule, run three cases: a good row, a missing field, and a downstream failure.
