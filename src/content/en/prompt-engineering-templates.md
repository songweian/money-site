---
title: "A prompt template you can reuse"
description: "Most weak prompts are missing context, not adjectives. Use five fields, a fixed output shape, and a small test set so the same prompt keeps working for the team."
pubDate: 2026-10-19
topic: prompt
tags: ["prompts", "templates", "workflow"]
keyword: "reusable prompt template"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Are longer prompts better?"
    a: "No. A short prompt that states the task, limits, and output shape beats a long one full of praise words."
  - q: "Why do results change each run?"
    a: "Sampling is random. Lower the temperature and require a fixed format when you need the same structure every time."
  - q: "Do we rewrite prompts after every model upgrade?"
    a: "Keep the template. Once a quarter, rerun five fixed tasks and change a line only if the pass rate drops."
---

If a model "does not get it," the prompt usually left out something you assumed. Write that assumption down. A template is just those assumptions in a stable order.

## Five fields

| Field | If you skip it |
| --- | --- |
| Task | The answer solves a different problem |
| Context | Tone and audience drift |
| Limits | The model invents numbers or policy |
| Output shape | You cannot reuse the result |
| Example | Style jumps around |

Output shape is the one teams skip. Ask for a table, a JSON object, or fixed headings if a script or a colleague will consume the text.

## Copy this skeleton

```
Task: {what to produce}
Reader: {who it is for}
Limits: Use only the material below. If a fact is missing, write "unknown".
Material:
{paste}
Output: {exact headings or fields}
Example: {one short sample}
```

Store templates by job (email, meeting notes, code review), not by product name. Products change. Add the date you last tested the prompt, and one failure you have already seen.

## Tune one line at a time

Keep five real inputs. Change a single line, rerun all five, and write down whether the pass rate moved. If you change three lines at once, you will not know which one helped. A new teammate should be able to fill the braces and get an acceptable draft. If they still need a walkthrough, the example is too thin.

See a stricter version for meetings in [A meeting-notes prompt](/en/posts/meeting-notes-prompt/).
