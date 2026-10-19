---
title: "Meeting notes that do not invent facts"
description: "Use a meeting prompt that quotes the transcript and refuses guessed owners or dates. The host checks names before anyone else sees the notes."
pubDate: 2026-10-19T22:00:00+08:00
topic: prompt
tags: ["meetings", "prompts", "notes"]
keyword: "meeting notes prompt"
author: "AI Efficiency Lab"
draft: false
aiGenerated: false
faq:
  - q: "Can I upload the audio file directly?"
    a: "Transcribe first. Notes you can audit need a sentence you can point at. A raw audio file is a poor citation."
  - q: "May the model fill in a due date?"
    a: "Only if someone said that date. Otherwise write 'not stated' and let the host set it."
  - q: "Do we write a new prompt every meeting?"
    a: "No. Keep the rules. Swap the purpose, the attendee list, and the transcript. Three variants (weekly, customer, review) are enough."
---

A fluent summary of a meeting is dangerous when the owners and dates were never said. The prompt’s job is to refuse those inventions.

## Prepare the input

Use a transcript with speaker names when you can. Add a one-line purpose and the attendee list. Tell the model it may use only those names. Mark inaudible stretches yourself so it does not "repair" them.

## The rule block

Ask for four sections: context, decisions, actions, open questions. Every decision and action must quote a transcript line. Anything without a quote goes under "model guess" and is not sent to the group. If no owner was named, write "unassigned." If no date was named, write "not stated." Contradictions stay as contradictions.

| Section | Keep | Drop |
| --- | --- | --- |
| Context | Purpose and topics actually discussed | The model’s advice |
| Decisions | Quotes where someone decided | "Everyone basically agreed" |
| Actions | Verb, owner, date, quote | A person who was not in the room |
| Open | Conflicts and gaps | A compromise nobody chose |

## The host’s three minutes

Check names against the attendee list, dates against the quotes, and that internal notes are not in the version you send. If a line is wrong, resend only that line with its quote. Do not regenerate the whole note or you will invalidate what you already checked.

Keep one template and change the variables. Customer meetings can add a section for promises you are about to make, because those sentences are the risky ones. The general template method is in [A prompt template you can reuse](/en/posts/prompt-engineering-templates/).
