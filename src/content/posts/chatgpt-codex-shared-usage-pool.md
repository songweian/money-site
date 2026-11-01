---
title: "ChatGPT 与 Codex 额度将合并，12 月前先记用量"
description: "OpenAI 宣布从 12 月起，Plus、Pro 和 Business 的额度在 ChatGPT 与 Codex 之间共享，并按 token 计量。本文说明聊天与写代码如何共用一个池，以及个人、开发者和团队管理员现在可以做的核对。"
pubDate: 2026-11-01T09:00:00+08:00
topic: ai-tools
tags: ["ChatGPT", "Codex", "订阅额度", "用量"]
keyword: "ChatGPT Codex 共享额度"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "12 月几号开始共用额度？"
    a: "OpenAI 只写了从 12 月开始，没有公布具体日期。在帮助中心或产品里看到明确日期之前，按尚未切换继续记用量，不要把某一个猜测的日子写进排期。"
  - q: "各方案有多少 token？"
    a: "没有公布。Plus、Pro、Business 的具体 token 额度，帮助中心这次没有给出数字。Settings → Usage 上显示什么，就以页面上的剩余额度和重置时间为准，不要自行换算。"
  - q: "Instant chat 占额度吗？"
    a: "不占用。日常短问答可以放在 Instant chat。智能体、长任务和 Codex 按 ChatGPT 与 Codex 共享池里的 token 计，更高级的模型和更复杂的任务通常消耗更多。"
  - q: "换成更便宜的模型，额度会回来吗？"
    a: "不会。切换模型不会恢复共享池里已经消耗的额度。更省的模型要在任务开始前就选。更高级的模型和更复杂的任务，通常消耗更多。"
  - q: "额度用完了怎么办？"
    a: "可以等重置、升级方案，或购买 credits，继续使用符合条件的功能。合并后的剩余额度和重置时间在 Settings → Usage。哪些功能符合购买 credits 之后的使用范围，以当天的页面为准。"
  - q: "Plus 的每 5 小时消息数能当成承诺吗？"
    a: "不能。GPT-6 Astra 5–45、GPT-6.1 Sol 15–160、GPT-6 Sol 15–150、GPT-6 Luna 350–3,000，是 Plus 和 Business Standard 的本地消息估算。GPT-6.1 Terra 的 35–285 写在 Business Standard 席位上。这些是估算，不是保证，也不是未公布的 token 上限。"
---

从 12 月起，Plus、Pro 和 Business 的使用额度要在 ChatGPT 和 Codex 之间共用。OpenAI 在帮助中心文章《Understanding ChatGPT and Codex usage limits》里宣布了这件事：随着 ChatGPT Work 的智能体能力并入 ChatGPT 主体验，这三档方案的额度放进同一个池子，并且统一按 token 计量。

具体哪一天切换，OpenAI 没有写。各方案一共有多少 token，也没有写。TokenPost 在 2026-10-31（美东时间）的报道里指出，OpenAI 此前只在结账页提示过这一变化。IT之家在 2026-11-01 做了报道。预算和内部通知以帮助中心的句子为准。报道用来核对这件事已经被公开谈到，不用来补充帮助中心没有写的数字。

上周 200 美元档怎么对账，已经写在 [Claude Ultra 与 ChatGPT Pro：200 美元档怎么对账](/posts/claude-ultra-chatgpt-pro-quota-change/)。这篇只讲 12 月这次合并：占额度的聊天和写代码会开始互相挤占；模型选得越强、任务越大，同一个池子掉得越快。

## 帮助中心这次写明了什么

把新宣布的规则收成可以照着做的几句：

- **时间**：从 12 月开始。具体日期没有公布。排期里不要写「12 月某日」。
- **范围**：Plus、Pro、Business。触发原因是把 ChatGPT Work 的智能体能力并入 ChatGPT 主体验。
- **计法**：使用额度在 ChatGPT 与 Codex 之间共享。用量统一按 token 计量。消耗多少，取决于所选模型和任务。更高级的模型、更复杂的任务，通常消耗更多。
- **例外**：Instant chat（即时对话）不占用额度。
- **预期**：OpenAI 表示，预计大多数用户等待额度重置的频率不会比现在更高。这句话是官方对大多数人的预期。它不能代替你自己账号上的记录，也不能推出「重度用户一定不受影响」。
- **查看**：合并之后，在 Settings → Usage 看剩余额度和重置时间。
- **用完**：可以等重置、升级方案，或购买 credits，继续使用符合条件的功能。哪些功能符合条件，以当时的 Usage 页面和帮助中心为准。本文不另编一份名单。

各方案的具体 token 额度没有公布。下文凡是出现数字的地方，都来自帮助中心已经写明的窗口、估算或席位价格。未公布的 token 上限，不填成一个整数。

## 现在的池子，和 12 月的池子

帮助中心现有说明《Managing usage with GPT-6 Astra in Work and Codex》写的是当前规则：Work 和 Codex 已经共享一个额度，普通 Chat 另有单独限额。12 月的新规则是另一句：Work 的智能体能力进入 ChatGPT 主体验之后，Plus、Pro、Business 的额度改为在 ChatGPT 与 Codex 之间共享。

两套说法按时间分开读。

| 项目 | 目前 | 12 月起宣布的规则 |
| --- | --- | --- |
| 普通 Chat | 单独限额 | 主体验并入 Work 的智能体能力后，方案额度与 Codex 共享 |
| Work 与 Codex | 已经共享一个额度 | 共享范围写成 ChatGPT 与 Codex，统一按 token 计量 |
| Instant chat | 以现有页面上你看得到的说明为准 | 不占用额度 |
| 具体 token 上限 | 未公布 | 仍未公布 |
| 切换日期 | 现行规则继续有效 | 只写了 12 月，没有具体日期 |

Plus 和 Business Standard 在 Work/Codex 上有两层限额：5 小时窗口，以及每周窗口。Pro 100、Pro 200、Pro 500 目前在 Work/Codex 没有 5 小时限额，但仍有包含额度。切换模型不会恢复共享池里已经用掉的额度。模型从 Astra 换成 Luna，只影响接下来这一次扣多少，不把前面扣掉的加回来。

下面这张表是帮助中心给出的每 5 小时本地消息估算。它不是保证，也不是各方案的 token 上限。Plus 和 Business Standard 对应前四行。GPT-6.1 Terra 那一行，写明的范围是 Business Standard 席位。

| 模型 | 每 5 小时本地消息估算 | 写明的适用范围 |
| --- | --- | --- |
| GPT-6 Astra | 5–45 | Plus、Business Standard |
| GPT-6.1 Sol | 15–160 | Plus、Business Standard |
| GPT-6 Sol | 15–150 | Plus、Business Standard |
| GPT-6 Luna | 350–3,000 | Plus、Business Standard |
| GPT-6.1 Terra | 35–285 | Business Standard 席位 |

区间很宽。Astra 写的是 5 到 45，Luna 写的是 350 到 3,000。同一窗口里能做完多少，和任务有关。拿区间的上限去排期，等于把估算当成了配额。每周窗口的具体条数，这次核对到的句子里没有，表里不补。

## 为什么要当成「一个 token 池」来管

当前的分开计法是：普通聊天走 Chat 自己的限额，写代码走 Work 和 Codex 那个已经共享的池。12 月之后，ChatGPT 主体验和 Codex 记在同一份额度上，统一按 token 扣。下午用会占额度的对话把方案写长，晚上用 Codex 改仓库，扣的是同一个池。两边不再各有各的天花板。

Instant chat 是写明的例外，不进这个池。短问答留在 Instant，就不会挤占晚上的编码额度。要动智能体、要连续改文件、要跑长任务的工作，会进共享池。

按 token 计量之后，额度够不够，同时取决于两件事：你选了哪个模型，以及这件事有多大。帮助中心写明，更高级的模型和复杂任务通常消耗更多。一次长的编码，和一次 Instant 里的短问答，不在同一种消耗里。先选模型、再决定任务边界，比用完再换模型有用，因为换模型不会把共享池恢复。

OpenAI 预计大多数人不会比现在更频繁地干等重置。把占额度的聊天和编码叠在一起的人，仍然值得在切换前量自己的用量。预期说的是大多数用户。你的账号落在哪一侧，看 Settings → Usage，不看这句预期本身。

## 四类读者分别会碰到什么

**Plus 个人用户。** 你现在的 Work/Codex 有 5 小时窗口和每周窗口。上表里 Astra、GPT-6.1 Sol、GPT-6 Sol、Luna 的区间，就是这一档能引用的每 5 小时估算，而且只是估算。12 月起，主体验里占额度的对话会和 Codex 用同一个池。日常一问一答放到 Instant，不占额度。必须用更强模型才能做完的长任务，按帮助中心的说法会消耗更多。中途换成更便宜的模型，不会把已经扣掉的额度加回来。

**重度 Codex 开发者。** 复杂编码通常对应更高级的模型和更大的任务，这类工作消耗更多 token。共享之后，非 Instant 的聊天会从写代码的额度里分走一部分。可以用的习惯是：短问题用 Instant；日常、量比较大的任务优先用更省额度的模型；真正难的编码再交给 Sol 或 Astra。GPT-6.1 Terra 是 2026-10-26 发布的日常模型，OpenAI 称同样的额度在 Work 和 Codex 里，能完成比 GPT-6.1 Sol 或 GPT-6 Astra 多得多的任务。价格和哪些活适合先换，写在 [GPT-6.1 Terra 来了：API 价格减半，哪些活该先换过去](/posts/gpt-6-1-terra-cost-guide/)，这里不重复那篇的价目。Terra 的 35–285 条估算只标注在 Business Standard 席位上。Plus 或 Pro 不要把这一行抄进自己的计划。

**Business 团队管理员。** 2026-10-29 的 Business 发布说明里新增了 Premium 席位：用量是 Standard 的 5 倍，没有 5 小时限额；年付 100 美元/人/月，月付 125 美元/人/月。Standard 的标价是年付 20 美元、月付 25 美元。Standard 仍有 5 小时窗口和每周窗口。会在同一周里既长时间使用主体验、又长时间跑 Codex 的人，优先看 Premium。包含额度用完之后，继续使用的路径包括购买 credits。谁可以买、单月到什么程度要停、谁来审批，写成团队自己的支出规则。限额和告警怎么落成清单，沿用 [AI 自动化越跑越贵怎么办](/posts/ai-automation-cost-control/) 里的记录方法，把共享池记成一个成本科目。发布说明没有把「5 倍」换算成消息条数，采购单上也不要自行换算。

**Pro 用户。** Pro 100、Pro 200、Pro 500 目前在 Work/Codex 没有 5 小时限额，但包含额度还在，用完一样会停。12 月起，这份额度同样在 ChatGPT 与 Codex 之间共享，按 token 计。2026-10-29 的发布说明同时写了两件相关的事：Pro 100 和 Pro 500 的 Work/Codex 额度翻倍，此前宣布的 Pro 200 削减取消。分档的细账以上面那篇 200 美元档的文章为准，本文不把那张对照表再写一遍。Pro 各档的具体 token 数，OpenAI 没有公布。没有 5 小时窗口，仍然要看 Usage。

## 12 月之前可以做完的核对

日期没公布，所以准备按「还没切换」来做，不要卡在某一个猜测的日子上。每一步只用页面上能看见的信息。

1. **先记一两周的基线。** 从今天起连续 7 到 14 天，每天下班前打开 Settings → Usage。记六列：日期、主要模型、入口（Instant、会占额度的 ChatGPT，或 Codex）、有没有撞上 5 小时窗口、有没有撞上每周窗口、页面上的剩余提示。剩余提示原文照抄。不要把估算区间换算成「还剩多少 token」。各方案的 token 额度没有公布，换算没有依据。
2. **把短问答挪到 Instant。** Instant chat 不占用额度。日常问答、临时措辞、很短的确认，放在 Instant。要调用智能体、要连续改文件、要跑长任务的，再进会计额度的入口。挪完之后的几天，对照第 1 步，看 Codex 还能不能做完你原来的量。如果 Codex 明显变宽裕，说明先前有一部分额度花在了可以不占额度的对话上。
3. **任务开始前就选定模型。** 日常任务优先用更省额度的模型，例如 Terra 和 Luna。复杂编码再用 Sol 或 Astra。帮助中心已经说明，更高级的模型和复杂任务通常消耗更多，而且切换模型不会恢复共享池里的额度。选错之后再换，扣掉的部分不会退回。Terra 能不能覆盖你的日常活，用这一两周的返工情况判断。判断标准沿用 Terra 那篇，不在这里重列价格。
4. **团队先点名，再改席位。** 列出谁会同时大量聊天和写代码。这些人对照 Premium：用量为 Standard 的 5 倍，且没有 5 小时限额，年付 100 美元/人/月，月付 125 美元/人/月。其余人先留在 Standard（年付 20 美元、月付 25 美元），继续受 5 小时窗口和每周窗口约束。等基线里出现同一周两边都撞限额的人，再加 Premium。公告当天不把全员席位一起上调。
5. **credits 放在用完之后，并写上支出上限。** 额度用完，帮助中心写的三条路是：等重置、升级方案、购买 credits 继续使用符合条件的功能。这天的工作能停，就等重置。不能停，再比较升级和 credits。支出上限写在你们自己的规则里：谁能购买、一个月到什么程度必须停、谁审批。额度数字还没公布的时候，不要把 credits 写成一个固定的「大概够用」月预算。
6. **准备一条不完全依赖这一池的退路。** 共享池上线之后，如果会占额度的聊天和 Codex 把额度一起用完，仓库和文案都需要还能往下做的办法。团队里编程助手怎么进仓库、怎么审查，继续看 [AI 编程助手选型与团队落地规范](/posts/ai-coding-assistant-team-guide/)。备选工具的额度和价格以各家当前页面为准。本文不引用没有核对过的数字。
7. **看到切换提示的当天再对一次页面。** 12 月的具体日期没有公布。帮助中心或产品内出现明确说明之后，打开 Settings → Usage，核对合并后的剩余额度和重置时间，并和这两周的基线对比。对不上的地方，以当天的帮助中心为准。前面的估算表只用来认识模型之间的差别，不当成切换之后的配额。

基线不用做得很复杂。一个人一张表就够：七到十四行，一行一天。团队把表收上来，只看两件事。第一，谁在 5 小时窗口上停过。第二，谁的聊天和 Codex 会在同一周里一起变紧。看不出这两件事的人，保持现在的席位和模型。看出来的人，再执行上面的第 3 步和第 4 步。

## 没有写上页面的，就不要写进预算

- 12 月的具体日期没有公布。排期写成某一个具体日子，没有出处。
- Plus、Pro、Business 各方案的具体 token 额度没有公布。任何「大约多少 token」都不进入本文，也不进入预算表。
- 每 5 小时的本地消息区间是估算。区间上限不是配额。Pro 目前没有这道 5 小时限额，不要把 Plus 的估算套到 Pro 上。
- Pro 目前没有 5 小时限额，包含额度仍然存在。用完可以等重置、升级方案，或购买 credits。
- 切换模型不恢复共享池额度。省额度靠的是任务开始前就选更省的模型，以及把短对话放进 Instant。
- 「大多数用户不会更频繁地等待重置」是 OpenAI 的预期。你是否属于大多数，用自己的 Usage 记录回答。
- Premium 的用量是 Standard 的 5 倍，并且没有 5 小时限额。价格按发布说明里的年付和月付执行。本文不把 5 倍换算成消息条数。
- GPT-6.1 Terra「能完成多得多的任务」是 OpenAI 的表述。本文不把它改写成一个倍数。35–285 的估算只对应 Business Standard 席位。

改席位、改全员使用规范之前，再打开一次文末的帮助中心。这些句子厂商会改。结账页上如果还留着较早的提示，以帮助中心全文为准。TokenPost 已经指出，这一变化此前只在结账页被提示过。

## 常见问题

### 12 月几号开始共用额度？

OpenAI 只写了从 12 月开始，没有公布具体日期。在帮助中心或产品里看到明确日期之前，按尚未切换继续记用量。

### 各方案有多少 token？

没有公布。Plus、Pro、Business 的具体 token 额度，帮助中心这次没有给出数字。Settings → Usage 上显示什么，就以什么为准。

### Instant chat 占额度吗？

不占用。日常短问答可以放在 Instant。智能体、长任务和 Codex 按共享池里的 token 计。

### 换成更便宜的模型，额度会回来吗？

不会。切换模型不会恢复共享池里已经消耗的额度。更省的模型要在任务开始前就选。更高级的模型和更复杂的任务，通常消耗更多。

### 额度用完了怎么办？

可以等重置、升级方案，或购买 credits，继续使用符合条件的功能。合并后的剩余额度和重置时间在 Settings → Usage。

### Plus 的每 5 小时消息数能当成承诺吗？

不能。GPT-6 Astra 5–45、GPT-6.1 Sol 15–160、GPT-6 Sol 15–150、GPT-6 Luna 350–3,000，是 Plus 和 Business Standard 的本地消息估算。GPT-6.1 Terra 的 35–285 写在 Business Standard 席位上。这些是估算，不是保证，也不是未公布的 token 上限。

## 信息来源

核对日期：2026-11-01。额度规则以当天仍公开的帮助中心为准，厂商会改。

- OpenAI 帮助中心：[Understanding ChatGPT and Codex usage limits](https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits)：12 月起 Plus、Pro、Business 的额度在 ChatGPT 与 Codex 之间共享，统一按 token 计量，Instant chat 不占额度，Settings → Usage 查看剩余额度与重置时间，用完可等重置、升级或购买 credits。具体日期和各方案 token 额度未公布。OpenAI 预计大多数用户等待重置的频率不会比现在更高。
- OpenAI 帮助中心：[Managing usage with GPT-6 Astra in Work and Codex](https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex)：目前 Work 与 Codex 已共享额度，普通 Chat 另有限额。5 小时窗口、每周窗口、切换模型不恢复额度，以及每 5 小时本地消息估算，同属帮助中心已核对的用量说明。
- OpenAI 帮助中心：[ChatGPT Business release notes](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes)（2026-10-29）：Pro 100 与 Pro 500 的 Work/Codex 额度翻倍，取消此前宣布的 Pro 200 削减；Premium 席位用量为 Standard 的 5 倍、无 5 小时限额，年付 100 美元/人/月、月付 125 美元/人/月；Standard 年付 20 美元、月付 25 美元。
- OpenAI 帮助中心：[ChatGPT Business models and limits](https://help.openai.com/en/articles/12003714-chatgpt-business-models-and-limits)：Business 席位的模型与限额。正文里的席位价格和 Premium 倍数采用 2026-10-29 发布说明；估算区间与窗口规则采用帮助中心已核对的句子。
- TokenPost（2026-10-31 美东时间）：[相关报道](https://www.tokenpost.com/news/technology/45608)。本文采用的一点是：OpenAI 此前只在结账页提示过这一变化。
- IT之家（2026-11-01）：[相关报道](https://www.ithome.com/1/020/645.htm)。额度句子以 OpenAI 帮助中心为准。
