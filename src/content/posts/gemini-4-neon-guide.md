---
title: "Gemini 4 Neon 上线：定位在 Carbon 和 Hydrogen 之间，先别整站换"
description: "2026 年 11 月 18 日 Google 发布 Gemini 4 Neon。付费 API、Pro 和 Ultra 能用；Standard 每百万 token 输入 3 美元、输出 15 美元，现在比 Carbon 引入价更贵。不要把官方任务成本当成单价。"
pubDate: 2026-11-19T06:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "Gemini", "API 成本", "选型"]
keyword: "Gemini 4 Neon"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "免费 Gemini 用户现在能用 Neon 吗？"
    a: "应用里不能按免费用户来安排。官方只把 Gemini 应用的入口写给 Google AI Pro 和 Ultra。@GeminiApp 从 2026-11-18T21:37:20Z 起确认，Pro 和 Ultra 可以在手机、桌面和网页的 Chat 与 Tasks 里选 4 Neon，标签是 Deeper analysis。API 定价页写明 Neon 不在免费层。没有 Pro 或 Ultra、也还没开付费 API 的人，这周用不上 Neon。"
  - q: "要把 Argon 或 3.1 Pro 全换成 Neon 吗？"
    a: "不要整站换。Cloud 文档把 Neon 当作 gemini-3.1-pro-preview 的目标升级，也当作 Argon 上一般编码与企业推理负载的目标升级；从 3.8 Flash 迁来的复杂编码或科学负载也可以以它为目标。这是升级建议，不是停用通知。模型页仍并列 Carbon、Neon、Hydrogen 和 Argon。9to5Google 称应用里 Neon 替换了 Argon、3.1 Pro 下线，那是对界面的观察。官方只确认了 Deeper analysis 这个标签。先用三份自己的任务试，再决定哪一类改模型 ID。"
  - q: "Neon 是否比 Carbon 更便宜？"
    a: "要分标价和任务成本，还要分 11 月 30 日前后。2026-11-19 的定价页上，Neon Standard 是每百万 token 输入 3 美元、输出 15 美元。Carbon 和 Argon 到 2026-11-30 是 2 美元和 10 美元，12 月 1 日起是 4 美元和 20 美元。同样的 token 数量下，Neon 现在比引入价贵 50%，12 月 1 日之后才低 25%。博客称默认 high 下每任务成本比 Carbon 低 32%，那是 Google 自己的测试。Carbon 每轮可能用更多思考 token。你的账单可以不一样。"
  - q: "thinking_level 怎么设，还能传 minimal 吗？"
    a: "Cloud 文档写 Neon 有 low、medium、high、xhigh 四档，默认 high。xhigh 可以用。Argon 和 gemini-3.8-flash 默认是 medium；gemini-3.1-pro-preview 和 gemini-4-argon 最高只到 high。传 thinking_budget，或把 thinking_level 设为 MINIMAL，会返回 HTTP 400。显式缓存 cached_content 也不支持，只有隐式缓存，提示至少 4,096 token 才会自动考虑。"
  - q: "SWE-sweep 39% 表示我的仓库也能到这个分吗？"
    a: "不能。博客把 39.0% 写在 Google Antigravity 里，并称 SOTA。模型卡的 SWE-sweep Provider harness 也是 39.0%。mini-SWE harness 是 12.8%。两个 harness 不同，不能合成一个数，也不能当成你的仓库通过率。模型卡里 Opus 5.5 和 GPT-6.2 Sol 的对照分，同样是那套评测，不是你的结果。"
---

2026 年 11 月 18 日，Google 正式发布 Gemini 4 Neon。介绍文由 Google DeepMind 高级副总裁、Google 首席 AI 架构师 Koray Kavukcuoglu 署名，标日是 Nov 18, 2026。它是 Gemini 4 家族里 Carbon、Hydrogen 之后的新模型。The Decoder 把这次发布概括成一个月内的第四款新 Gemini 模型。那是该报道的概括，不是 Google 的原话。

官方 X 的发布时间，按 UTC：Sundar Pichai 是 21:33:40，Google DeepMind 是 21:34:04，GeminiApp 是 21:37:20，Google 是 21:51:33。对应北京时间 2026 年 11 月 19 日凌晨 5:33 到 5:51。

官方博客把 Neon 放在复杂编码、分析推理和生产级企业工作流上，位置在 Carbon 和 Hydrogen 之间。Carbon 处理最难、周期最长的项目。Hydrogen 处理快速的日常执行。Neon 平衡深度和效率，给复杂但频繁的工作流提供前沿级推理，并且更快、单位任务成本更低。这句是官方定位。更快、单位任务成本更低，不是已经核对过的单价对比。模型卡写明，Gemini 4 Neon is adapted from Gemini 4 Carbon，也就是由 Carbon 改编而来。知识截止是 2026 年 3 月。Safety & Security Report 将在接下来几天提供。本文不把还没公开的报告补成数字。

按 token 标价，先记住这一句。2026 年 11 月 19 日的定价页上，Neon 的 Standard 是每百万 token 输入 3.00 美元、输出 15.00 美元。Carbon 和 Argon 的引入价仍是 2.00 美元和 10.00 美元，用到 2026 年 11 月 30 日。所以现在 Neon 的标价比 Carbon 的引入价更贵。博客里的每任务成本，是 Google 自己的测试口径。不要把那句当成定价页上的单价，也不要当成下一张账单一定更便宜。

谁能用、家族怎么分工、一次调用怎么乘、旧参数会在哪一步返回 400，以及榜单哪两个数不能合成，分节写在下面。任务先按难易拆开，沿用 [本周 AI 模型按任务分工，不要整站换新](/posts/october-ai-model-roles/)。10 月 28 日 Carbon 发布时的定位，见 [Gemini 4 Carbon 发布：多数人还用不上，先把账算清](/posts/gemini-4-carbon-what-it-means/)。那篇不在这里重写。本文只补 Neon。定价页会改。改预算之前再打开一次。本文核对定价页的日期是 2026 年 11 月 19 日。

## 谁从 11 月 18 日起用得上

官方博客用 “Start building with Gemini 4 Neon today” 作为入口标题，并写明从当日起陆续开放。陆续开放的意思是：不是每一个账号在同一分钟出现。某一端暂时没有，先按下面的产品名单核对，不要把新闻本身否掉。名单以这篇博客和官方 X 为准。

| 入口 | 谁能用 | 当天写明的范围 |
| --- | --- | --- |
| 开发者 | Gemini API 付费层 | Google AI Studio 和 Android Studio。定价页写明 Neon 不在免费层 |
| AI Studio | 所有 Google AI Pro 和 Ultra 订阅 | 可以在 AI Studio 里试 Neon |
| Google Antigravity | 付费的 Google AI Pro 或 Ultra | 可以试 Neon。企业入口见下一行 |
| 企业 | Gemini for business，以及 Google Antigravity | 经 API，或在模型下拉框里选 |
| Gemini 应用 | Google AI Pro 或 Ultra | 在模型下拉框里选 Gemini 4 Neon。官方没有把这个入口写给免费用户 |
| 网络安全防御者 | 符合条件的 Fairwind Program 成员 | 接下来几天开始获得 Gemini 4 Neon for cyber。申请需联系 Cloud 账户团队 |

@GeminiApp 从 2026-11-18T21:37:20Z 起确认了应用侧的范围：从当日起，Pro 和 Ultra 可以在手机、桌面和网页使用；Chat 和 Tasks 的模型下拉框里可以选 4 Neon，标签是 Deeper analysis；Tasks 现在可以跑在 Neon 上。官方帖确认的标签只有 Deeper analysis 这一条。免费用户不在这句名单里。还没有 Pro 或 Ultra 的人，这周不要在应用里找 Neon。

9to5Google 的 Abner Li 在 2026 年 11 月 18 日下午 1:34（太平洋时间）写了一篇核对稿。它是附加观察，不是官方公告。该文称：Gemini 应用里 Neon 替换了 Argon；3.1 Pro 终于下线；3.5 Flash-Lite 在付费用户的选择器里变成 Auto。该文记录的选择器是四档：Auto；Everyday help 对应 4 Hydrogen；Deeper analysis 对应 4 Neon；Code & complex work 对应 4 Carbon。

这四档里，和官方帖对得上的只有 Deeper analysis。其余文案会变，以你账号里打开的下拉为准。本站 Hydrogen 那篇记录过 11 月 12 日同一来源看到的另一组标签。两篇都是对界面的观察，不必合成一份永久菜单。更不要据此宣布 API 里的 Argon 已经停用。模型页仍把 Carbon、Neon、Hydrogen、Argon 并列。Argon 没有从这张模型页上消失。

## 在 Gemini 4 家族里怎么分工

博客的分工可以收成三行，供这周排任务，不是质量保证。

- Carbon：最难、周期长的项目。
- Hydrogen：快速的日常执行。
- Neon：两边之间。复杂、但又会反复出现的工作流。官方说它提供前沿级推理，同时更快、单位任务成本更低。后半句留到价格一节拆开，这里只保留定位。

日常高量的活不要因为 Neon 居中，就从 Hydrogen 上挪走。Hydrogen 的入口、单价和默认思考档，见 [Gemini 4 Hydrogen 上线：日常任务的新默认，别整站换最贵的](/posts/gemini-4-hydrogen-guide/)。最难的长周期项目继续留在 Carbon。Neon 由 Carbon 改编而来，这是模型卡的原句，不是「Neon 已经取代 Carbon」。

Google Cloud 的 “Developer's guide to Gemini 4 Neon” 另给了一张升级建议。它是建议，不是停用通知。

| 你现在的负载 | 文档怎么建议 |
| --- | --- |
| `gemini-3.1-pro-preview` | 以 Neon 为目标升级路径 |
| `gemini-4-argon` 上的一般编码与企业推理 | 以 Neon 为目标升级 |
| 从 `gemini-3.8-flash` 迁来的复杂编码或科学负载 | 也可以以 Neon 为目标 |
| 高量日常 agent 循环 | 留在 `gemini-4-hydrogen` |
| 批量分类 | 留在 `gemini-3.5-flash-lite` |
| 经 Fairwind 批准的网络安全测试 | 留在 `gemini-4-carbon-cyber-permissive` |

表里的「目标升级」不等于今天必须改生产 ID，也不等于旧 ID 已经调用失败。Argon 仍在模型页上。先用后面的三份任务看采纳、返工和计费 token，再决定哪一类改字符串。

## 价格：标价和一次调用的演算

单价出处是定价页和发布博客，核对日期 2026 年 11 月 19 日。Carbon 的 What's new 页面也写了 Neon 的定位和单价，改预算时和这两处一起看。页面会改。下面的乘法只用这一天写明的 Standard 数字。

Neon 没有免费层。Standard 付费层，单位是美元 / 每百万 token：

| 项目 | Neon Standard |
| --- | --- |
| 输入 | 3.00 |
| 输出（含 thinking tokens） | 15.00 |
| 上下文缓存 | 0.15，仅隐式，不支持显式 |
| Used to improve our products | No（付费层） |

0.15 ÷ 3.00 = 0.05。缓存输入是普通输入的 5%，实付 5%。博客把这叫做 95% discount。优惠 95% 是少付 95%，不是实付 95%。命中才有 0.15。页面不保证每次命中。显式缓存不支持，不能靠自己创建缓存对象来拿到这个价。

同一天、同一张定价页上的对照：

| 模型 | 免费层 | 付费输入 | 付费输出（含思考） | 付费缓存 |
| --- | --- | --- | --- | --- |
| Neon Standard | 无 | 3.00 | 15.00 | 0.15，仅隐式 |
| Hydrogen 付费层 | 有。免费层 Used to improve our products 为 Yes，付费层为 No | 1.50 | 7.50 | 0.075 |
| Carbon、Argon Standard，至 2026-11-30 | 无 | 2.00 | 10.00 | 0.10，仅隐式 |
| Carbon、Argon Standard，2026-12-01 起 | 无 | 4.00 | 20.00 | 0.20，仅隐式 |

Carbon 和 Argon 这两行的截止钟点，页面没有写。引入价用到哪一天、12 月 1 日之后怎么跳，见 [Gemini 4 Carbon 已开放：引入价用到 11 月 30 日](/posts/gemini-4-carbon-ga-swarm-guide/)。本文只保留和 Neon 比单价时要用的数字。

把标价分成两段看，不要合成一句「Neon 更便宜」。

- 现在，到 2026 年 11 月 30 日：Neon 的 3.00 比引入价 2.00 高 50%，因为 (3.00 − 2.00) / 2.00 = 0.50。输出 15.00 对 10.00，同样是 50%。缓存 0.15 也高于引入期的 0.10。
- 2026 年 12 月 1 日起：Carbon 和 Argon 变为 4.00 和 20.00。Neon 的 3.00 和 15.00 比它们低 25%，因为 (4.00 − 3.00) / 4.00 = 0.25，(20.00 − 15.00) / 20.00 = 0.25。缓存 0.15 也低于届时的 0.20。
- 和 Hydrogen 的付费层比：3.00 / 1.50 = 2，15.00 / 7.50 = 2，0.15 / 0.075 = 2。Neon 的三格单价都是 Hydrogen 的 2 倍。高量日常循环留在 Hydrogen，先是定位，也体现在这张单价表上。

Grounding 不在 token 单价里。用 Google Search 或 Maps 做 grounding：每月 5,000 次免费，与所有 Gemini 3 及更新的模型共享，之后每 1,000 次请求 14 美元。Search 另有每天 1,500 次请求的上限，太平洋时间午夜重置。你提交的一次请求可能触发多次 Search，按实际查询计费。不要把 14 美元 / 千次理解成每次对话 0.014 美元。Maps 的每天上限，本文不另写，因为核对到的每天 1,500 次是 Search 的句子。

本文没有写入 Neon 的 Batch、Flex 或 Priority 单价。付费层总述里的 Batch 五折，不能直接当成已经核对过的 Neon 单价。这三档要进预算，先在定价页的 Neon 表格里看到数字，再套进下面的公式。公式里的单价不要换成总述里的比例。

被处理的每一个 token 都计费。这包括 thinking tokens。使用 grounding 时，内部工具的系统指令和函数声明也计费。对话框里看得见的那一段，可以短于计费输出。抄账单时抄计费输出。

### 一次调用：token 数是示例假设，单价是官方的

下面的 token 数、次数和缓存命中量都是**示例假设**，不是官方统计，也不是你的账单。输出按含思考 token 的计费输出理解。除了单独标出的那一版，不假设缓存命中。只使用 Standard。不含 grounding。

用量甲：普通输入 100 万 token，即 1 个百万 token；计费输出 20 万 token，即 0.2 个百万 token。

- Neon：1 × 3.00 + 0.2 × 15.00 = 6.00 美元。
- Carbon 或 Argon，至 2026-11-30：1 × 2.00 + 0.2 × 10.00 = 4.00 美元。
- Carbon 或 Argon，2026-12-01 起：1 × 4.00 + 0.2 × 20.00 = 8.00 美元。
- Hydrogen 付费层：1 × 1.50 + 0.2 × 7.50 = 3.00 美元。

在这组假设里，token 结构相同。Neon 的 6.00 比当前引入价的 4.00 多 2.00 美元，多出来的比例是 50%。12 月 1 日之后，同样的 token 在 Carbon 或 Argon 上是 8.00 美元，Neon 少 2.00 美元，少的比例是 25%。Hydrogen 是 3.00 美元，是 Neon 的一半，因为输入单价和输出单价各自都是一半。

若一个月跑 20 次用量甲，都不缓存，都走 Standard：Neon 是 20 × 6.00 = 120 美元；引入价下的 Carbon 或 Argon 是 20 × 4.00 = 80 美元；12 月 1 日之后是 20 × 8.00 = 160 美元；Hydrogen 是 20 × 3.00 = 60 美元。20 次也是假设。差额只在计费 token 一样多时成立。

缓存只在账单出现 context caching 时改公式。仍用用量甲，假设 1 个百万输入里有 0.8 按缓存价、0.2 仍是普通输入。这是假设的命中。提示不到 4,096 token，不要指望这一行出现。

- Neon：0.2 × 3.00 + 0.8 × 0.15 + 0.2 × 15.00 = 0.60 + 0.12 + 3.00 = 3.72 美元。
- Carbon 或 Argon，至 2026-11-30：0.2 × 2.00 + 0.8 × 0.10 + 0.2 × 10.00 = 0.40 + 0.08 + 2.00 = 2.48 美元。
- Carbon 或 Argon，2026-12-01 起：0.2 × 4.00 + 0.8 × 0.20 + 0.2 × 20.00 = 0.80 + 0.16 + 4.00 = 4.96 美元。

省下的是那 0.8 个百万输入的差价。Neon 是 0.8 × (3.00 − 0.15) = 2.28 美元。输出的 3.00 美元没动。3.72 比不缓存的 6.00 少的，就是这 2.28。引入期内，即使按这个命中假设，Neon 的 3.72 仍高于 Carbon 的 2.48。

再看博客的任务成本为什么不能写进这张表。博客称：默认 high 思考档下，Neon 的每任务成本比 Carbon 低 32%；在 Vals 和 Agent Arena 的 high 档，Neon 处于 Pareto 前沿，比顶尖竞争模型低约 50% 到 80% 的每任务成本；xhigh 仍比竞争模型的最高档低 36% 以上的每任务成本。这些都是 Google 自己的测试。用量甲里 token 相同，引入期内 Neon 更贵，不是低 32%。要在引入期内出现更低的任务账单，Neon 的计费 token 必须更少。Carbon 每轮可能用更多思考 token。官方没有公布你这一次会少用多少。

可以用单价反推一个打平点，仍然只是算术。输入仍是 1 个百万 token，Neon 计费输出保持 0.2。引入价下，Carbon 要和 Neon 的 6.00 美元打平：1 × 2.00 + x × 10.00 = 6.00，所以 x = 0.40 个百万 token，也就是 40 万。40 万不是官方阈值。它只说明：在这组假设里，Carbon 的计费输出要达到 Neon 的 2 倍，两边的账单才一样。你的控制台如果不是这个倍数，32% 就不会出现。

Grounding 另算一笔，次数也是示例假设。假设这个月实际 Search 查询 6,500 次，而且没有哪一天超过 1,500 次。共享的免费额度用掉 5,000 次，超出 1,500 次。1,500 / 1,000 × 14 = 21 美元。这 21 美元不在上面的 6.00 美元里。5,000 次是 Gemini 3 及更新模型共用的，不是 Neon 单独再给 5,000 次。

对外按包月报价、把 AI 成本包进固定服务费的小团队，11 月 30 日之前不要用 Carbon 的 2 美元和 10 美元给 Neon 报价，也不要用博客的「低 32%」去折。预算先按 3.00 和 15.00，再给默认 high、思考 token 可能变多留出余量。12 月 1 日之后，Carbon 的标价高于 Neon，任务账单仍要看 token。改预算之前再打开一次定价页。

## 接口规格：ID、窗口、思考档、缓存

模型 ID 是 `gemini-4-neon`。定价页和模型页都用这个字符串。模型页仍并列 Carbon、Neon、Hydrogen、Argon。改调用时只改你决定试的那一条路径，不要把 Argon 从代码里删掉当作「已经下线」。

上下文是一个窗口：输入、输出和思考合在一起，上限 1,048,576 token。输出上限要和这个窗口分开记。三处官方文字用了不同的写法，本文不收成一个数。

| 出处 | 输出上限怎么写 |
| --- | --- |
| 模型页 | Max output 64K / 1M tokens |
| 模型卡 | 默认同步输出 up to 64K；经后台长解码 up to 1M |
| Cloud 开发者指南 | 单段前台输出，流式和非流式，最高 65,536；长解码可到 1,048,576 |

1,048,576 在这里出现两次，含义不同。一次是全家共用的上下文窗口，含输入和思考。一次是 Cloud 指南里长解码的输出上限。引用时带上出处。不要写成「所以同步请求也能一次吐出 100 万」。

`thinking_level` 有四档：`low`、`medium`、`high`、`xhigh`。Cloud 文档写 Neon 的默认是 high。Argon 和 `gemini-3.8-flash` 的默认是 medium。xhigh 在 Neon 上可用。`gemini-3.1-pro-preview` 和 `gemini-4-argon` 最高只到 high。传 `thinking_budget`，或把 `thinking_level` 设为 `MINIMAL`，会返回 HTTP 400。从还在传这两样的旧调用迁过来，先改请求，再换模型 ID。

缓存分两种。显式缓存 `cached_content` 不支持。隐式缓存自动生效，最低提示长度是 4,096 token。这个门槛从 3.8 Flash 的 6,144 token 降下来。不到 4,096，不要按 0.15 美元做预算。

模型页写的模态是 Text、Image、Audio、Video、PDF。Cloud 文档还写，可以内联，或用 `gs://` 传入 Microsoft Office 与 OpenDocument。本文不另写「不支持图片生成」或「不支持音频生成」，因为核对过的原文没有这句。

知识截止按模型卡，是 2026 年 3 月。2026 年 3 月之后的价格、菜单和新闻，要当外部材料喂进去，不要指望模型自己记得 11 月 18 日这场发布。

## 官方榜单怎么读

下面全部归到官方博客、模型卡，或博客点名的第三方测试。都不是你的仓库、报表或客服对话的通过率。不同 harness 的分数分开写，不合成一个数。方法论放在模型卡指向的评测说明里，链接见文末。Neon 不是全面第一。表里有三行，别的模型更高，后面会点名。

博客的关键数字，引用时保留「他们的榜、他们的成本」：

- Artificial Analysis Intelligence Index，xhigh：总体第 3，61 分。博客把它放在更大、更慢的模型之后，并写它前于可比模型。
- Vals Index：第 2，70.9%，处于 Pareto 前沿。
- Agent Arena Index：可控性第 2；全球第 2，1336 分，跨 4,200 次以上的真实 agent 会话。
- Legal Research Bench 和 Tax Agent Bench：第 1。博客这句没有给百分比，本文不补。
- Surge AI：在金融、会计、表格建模、复杂约束遵从等多数基准上第 1。同样没有在这句给出每一项的百分比。
- Chartography 73.5%。Agents' Last Exam v1.1 是 75.8%。Zapier 的 AutomationBench 第 1，56.3%。Andon Labs 的 Vending-Bench 2 第 1，榜上数字是 16,843 美元。这是该榜的结果，不是 API 单价。
- Terminal-Bench Science 70.5%，RiemannBench 84.0%，HLE-Diamond 71.3%。博客称这三项 best in class。
- Artificial Analysis Coding Agent Index 第 1，分数是 58.6。博客给的是这个数，本文不加百分号。Terminal-Bench 4.1 是 65.2%。FrontierCode 2.0 在默认 high 档是 46.2%。
- SWE-sweep 必须拆开。mini-SWE harness 是 12.8%。在 Google Antigravity 里是 39.0%，博客称 SOTA。39.0% 不是 mini-SWE 的分数，也不是你自己的仓库会到达的通过率。

网络安全只记防御场景的分数，不写测试步骤。对象是 Neon for cyber。

- AutoBaxBench 的 hard 档 76%。博客称 SOTA，并称较 Carbon 更安全。
- WebExploitBench v1.2：博客是 51.26%，模型卡是 51.3%。两个口径并列，不收成一个数。
- SEC-bench Pro 90.5%，博客称 SOTA，并称每题成本约为竞争大模型的一半。一半是他们的每题成本，不是定价页标价。
- CWE-bench v2 是 70.7%，较 Carbon 高 3.4 个百分点。

安全与行为是博客里的内部评测，不是独立审计。

- Terminal-Bench 4.0 的拒绝率 1.98%，Terminal-Bench-Science 是 0%。
- Terminal-Bench 4.0 的作弊率 0.0%。编码作弊评测里的技巧比例 2.45%，博客称这是 Gemini 4 里最低。
- misaligned action 是 0.09%。agent honesty 的通过率是 99.2%。
- 相对 Carbon，under-service 降低 43% 到 56%，overreach 降低 15% 到 35%。博客没有在这句给出更窄的中文定义，本文不另译。
- Gray Swan 的 IPI，在最高思考档加上实时防护时，攻击成功率 0.0%。博客称与其他 Gemini 模型相当。
- 博客称，内部 Antigravity 测试里的 fabrication rate 是目前最低。没有公布百分比。本文不编一个百分比。

模型卡的对照表是 2026 年 11 月的版本，列的是 Neon、Claude Opus 5.5、GPT-6.2 Sol。顺序就是这个顺序。表里的 “—” 表示模型卡该格没有给出分数。Sol 的发布和 API 标价见 [GPT-6.2 Astra 和 Sol 来了：旗舰降价两成，普通聊天里还用不了](/posts/gpt-6-2-astra-sol-guide/)。榜上的分差不能拿去改那篇的单价，也不能把 Sol 的标价套到 Neon 上。

| 榜 | Neon | Opus 5.5 | GPT-6.2 Sol |
| --- | --- | --- | --- |
| AA Index v5.0.1 | 61 | 59 | 57 |
| Vals Index v2.2 | 70.9% | 70.1% | 66.1% |
| CursorBench 4.1 | 65.4% | 58.1% | — |
| Terminal-bench 4.1（Cheating adjusted accuracy） | 65.2% | 65.8% | 61.5% |
| FrontierCode 2.0 | 46.2% | 47.3% | 43.8% |
| SWE-sweep Provider harness | 39.0% | 10.1% | 8.3% |
| SWE-sweep Mini-SWE harness | 12.8% | 3.6% | 11.6% |
| AutomationBench | 56.3% | 42.5% | 41.3% |
| Agents' Last Exam v1.1 | 75.8% | 71.6% | 73.0% |
| RiemannBench | 84.0% | 80.0% | 80.0% |
| Terminal-Bench-Science 0.1 | 70.5% | 63.3% | 68.0% |
| HLE-Diamond | 71.3% | 67.9% | 64.0% |
| MKA Climb WSR | 56.5% | 53.0% | 52.7% |
| Chartography | 73.5% | 66.3% | 75.1% |
| LVBench | 89.0% | 83.7% | 87.6% |
| GraphWalks 256k to 1M，BFS（F1） | 95.2% | 66.8% | 80.1% |
| CWE-Bench v2 | 70.7% | 67.1% | 66.0% |
| SEC-bench Pro | 90.5% | — | 88.3% |
| WebExploitBench v1.2 | 51.3% | 37.1% | — |

这张表里，Neon 不是每一行都最高。Terminal-bench 4.1 上，Opus 5.5 是 65.8%，Neon 是 65.2%，Opus 5.5 更高。FrontierCode 2.0 上，Opus 5.5 是 47.3%，Neon 是 46.2%，Opus 5.5 更高。Chartography 上，GPT-6.2 Sol 是 75.1%，Neon 是 73.5%，Sol 更高。博客的 Terminal-Bench Science 70.5%，和模型卡的 Terminal-Bench-Science 0.1 的 70.5%，百分比相同，名称以各页原文为准，不要另算一次。博客的 Antigravity 39.0% 和模型卡的 Provider harness 39.0% 也分开保留：一个写在 Antigravity 上，一个写在 Provider harness 上。mini-SWE 的 12.8% 是另一行。

## 这周可以做的几件事

只做能在自己的任务上记下的事。榜单分差不代替这张记录。

1. **先拿三份自己的难任务，对照现有模型和 Neon。** 从过去两周的工作里抽三份。要难，但还不是那种最长周期、必须留给 Carbon 的项目。每份都要人能在一天内判断对错。例如一段确实要改的业务规则，一份缺了数字就应该停下来的说明，一条已经在跑的复杂工作流里的单步。现用模型和 `gemini-4-neon` 各跑一遍。只记三项：人是否直接采纳、返工几分钟、控制台里的计费输入和计费输出（含思考）。花费用计费 token 乘 3.00 和 15.00，不要用「低 32%」代替乘法。三份一起换成默认，就分不清是模型变了还是题目变了。

2. **高量日常流程留在 Hydrogen。** Cloud 文档写，高量日常 agent 循环留在 `gemini-4-hydrogen`，批量分类留在 `gemini-3.5-flash-lite`。Neon 的付费单价是 Hydrogen 的 2 倍。这类活不要因为 Neon 上了榜就升档。

3. **最难的留在 Carbon。** 长周期、要反复验证的项目继续用 Carbon。Neon 的定位是复杂但频繁，不是把 Carbon 整列换掉。12 月 1 日之后 Carbon 的标价更高，也不是把最难任务挪走的理由。先看返工，再看账单。

4. **有 Pro 或 Ultra 的，先在应用里把 Tasks 放到 Neon。** 在 Chat 和 Tasks 的下拉框里找 4 Neon，官方确认的标签是 Deeper analysis。手机、桌面和网页都在 @GeminiApp 的范围内。选一件你这周真的会交给 Tasks 的事，看它有没有做完、有没有编一个你没法核对的数。免费账号不要在应用里找这一项。付费开发者走 API 时，模型 ID 用 `gemini-4-neon`，入口是 AI Studio 或 Android Studio。企业走 Gemini for business 的 API 或下拉框。Antigravity 上，付费的 Pro 或 Ultra 可以试。

5. **改生产 ID 之前，先看默认 high 和缓存。** 不写 `thinking_level` 时，Cloud 文档的默认是 high，计费输出可能比你按 medium 估的更长。不要传 `thinking_budget`，不要传 `MINIMAL`，这两样会 HTTP 400。不要传 `cached_content`。显式缓存不支持。提示想要 0.15 美元的缓存价，至少要有 4,096 token，而且要在账单里看到命中。模型页还能看到 Argon 时，不要因为应用菜单换了标签，就把 API 里的 Argon 删掉。

一周结束只留一个变化：某一类复杂但频繁的任务改到 Neon，或者确认留在原模型。返工变多的那一类退回去。记录用一张空表，不要填演示数字。

| 日期 | 任务 | 模型 | 思考档 | 直接采纳 | 返工（分钟） | 计费输入 | 计费输出 | 单价出处 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 填当天 | 一件真实任务 | 现用模型或 Neon | 实际使用的档 | 是或否 | 填分钟 | 控制台 | 含思考 | 2026-11-19 定价页，用前再看 |

会直接对外发送、付款、改权限的步骤，继续由人确认。模型可以做草稿和对照，发送按钮不因为换了 Neon 就自动打开。

## 这些说法不要直接当成你的结果

- 「更快、单位任务成本更低」是官方定位。3.00 美元和 15.00 美元才是 2026-11-19 定价页上的 Standard 标价。现在这组标价高于 Carbon 和 Argon 的引入价。
- 默认 high 下每任务成本低 32%，Vals 和 Agent Arena 上低约 50% 到 80%，xhigh 低 36% 以上，都是 Google 的测试口径。Carbon 每轮可能用更多思考 token。你的账单以控制台为准。
- 用量甲的 100 万和 20 万 token、一个月 20 次、缓存命中 0.8 个百万 token、打平所需的 40 万输出、Search 的 6,500 次，都是示例假设。换成你的日志之后，只有单价来自上述定价页。
- 61 分、70.9%、1336 分、73.5%、75.8%、56.3%、16,843 美元、70.5%、84.0%、71.3%、58.6、65.2%、46.2%、12.8%、39.0%，以及模型卡表里的每一格，都是对应榜的结果。39.0% 只属于 Antigravity 或 Provider harness。mini-SWE 是 12.8%。
- AutoBaxBench 76%、WebExploitBench 的 51.26% 与 51.3%、SEC-bench Pro 90.5%、CWE-bench v2 的 70.7% 和「高 3.4 个百分点」，是博客或模型卡的防御向分数。每题成本「大约一半」不是你的发票。
- 1.98%、0%、0.0%、2.45%、0.09%、99.2%、43% 到 56%、15% 到 35%、IPI 的 0.0%，是博客的内部或厂商口径。fabrication rate「目前最低」没有百分比。
- 9to5Google 的选择器文案、Argon 被替换、3.1 Pro 下线、3.5 Flash-Lite 变成 Auto，都是该报道对应用界面的观察。API 里的 Argon 不以这篇报道为停用依据。
- The Decoder 的「一个月内第四款」是该报道的概括。

## 常见问题

### 免费 Gemini 用户现在能用 Neon 吗？

应用里不能按免费用户来安排。官方只把 Gemini 应用的入口写给 Google AI Pro 和 Ultra。@GeminiApp 从 2026-11-18T21:37:20Z 起确认，Pro 和 Ultra 可以在手机、桌面和网页的 Chat 与 Tasks 里选 4 Neon，标签是 Deeper analysis。API 定价页写明 Neon 不在免费层。没有 Pro 或 Ultra、也还没开付费 API 的人，这周用不上 Neon。

### 要把 Argon 或 3.1 Pro 全换成 Neon 吗？

不要整站换。Cloud 文档把 Neon 当作 gemini-3.1-pro-preview 的目标升级，也当作 Argon 上一般编码与企业推理负载的目标升级；从 3.8 Flash 迁来的复杂编码或科学负载也可以以它为目标。这是升级建议，不是停用通知。模型页仍并列 Carbon、Neon、Hydrogen 和 Argon。9to5Google 称应用里 Neon 替换了 Argon、3.1 Pro 下线，那是对界面的观察。官方只确认了 Deeper analysis 这个标签。先用三份自己的任务试，再决定哪一类改模型 ID。

### Neon 是否比 Carbon 更便宜？

要分标价和任务成本，还要分 11 月 30 日前后。2026-11-19 的定价页上，Neon Standard 是每百万 token 输入 3 美元、输出 15 美元。Carbon 和 Argon 到 2026-11-30 是 2 美元和 10 美元，12 月 1 日起是 4 美元和 20 美元。同样的 token 数量下，Neon 现在比引入价贵 50%，12 月 1 日之后才低 25%。博客称默认 high 下每任务成本比 Carbon 低 32%，那是 Google 自己的测试。Carbon 每轮可能用更多思考 token。你的账单可以不一样。

### thinking_level 怎么设，还能传 minimal 吗？

Cloud 文档写 Neon 有 low、medium、high、xhigh 四档，默认 high。xhigh 可以用。Argon 和 gemini-3.8-flash 默认是 medium；gemini-3.1-pro-preview 和 gemini-4-argon 最高只到 high。传 thinking_budget，或把 thinking_level 设为 MINIMAL，会返回 HTTP 400。显式缓存 cached_content 也不支持，只有隐式缓存，提示至少 4,096 token 才会自动考虑。

### SWE-sweep 39% 表示我的仓库也能到这个分吗？

不能。博客把 39.0% 写在 Google Antigravity 里，并称 SOTA。模型卡的 SWE-sweep Provider harness 也是 39.0%。mini-SWE harness 是 12.8%。两个 harness 不同，不能合成一个数，也不能当成你的仓库通过率。模型卡里 Opus 5.5 和 GPT-6.2 Sol 的对照分，同样是那套评测，不是你的结果。

## 信息来源

- Google 博客，Koray Kavukcuoglu（标日 Nov 18, 2026）：[Introducing Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)。定位、当天入口、95% 缓存折扣、每任务成本、榜单和内部安全数字，以这篇为准。
- 官方 X，时间均为 2026-11-18 UTC：[@sundarpichai，21:33:40](https://x.com/sundarpichai/status/2123167780988125621)、[@GoogleDeepMind，21:34:04](https://x.com/GoogleDeepMind/status/2123167884411077030)、[@GeminiApp，21:37:20](https://x.com/GeminiApp/status/2123168704662012079)、[@Google，21:51:33](https://x.com/Google/status/2123172282574987698)。应用侧 Pro 与 Ultra、Deeper analysis、Chat 和 Tasks，以 @GeminiApp 这条为准。
- 模型卡：[Gemini 4 Neon model card](https://deepmind.google/models/model-cards/gemini-4-neon/)。由 Carbon 改编、知识截止 2026 年 3 月、Safety & Security Report 将在接下来几天提供、同步输出与长解码的写法，以及文中的对照表，以模型卡为准。
- 评测方法：[Gemini 4 Neon evals methodology](https://deepmind.com/models/evals-methodology/gemini-4-neon)。
- 定价页（本文于 2026-11-19 核对）：[Gemini API pricing](https://aistudio.google.com/docs/pricing)。Neon、Hydrogen、Carbon、Argon 的 Standard 单价，免费层，缓存，数据使用，以及 Search / Maps grounding，以该页为准。页面会改。
- 模型页：[Gemini models](https://aistudio.google.com/docs/models)。模型 ID、Carbon / Neon / Hydrogen / Argon 并列、上下文、Max output 的 64K / 1M，以及 Text、Image、Audio、Video、PDF，以该页为准。
- Carbon 的 What's new：[What's new in Gemini 4 Carbon](https://aistudio.google.com/docs/whats-new-gemini-4-carbon)。其中对 Neon 的定位和单价，改预算前与博客、定价页一起看。
- Google Cloud 开发者指南：[Developer's guide to Gemini 4 Neon](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-4-neon)。65,536 与 1,048,576、thinking_level 的默认和 400、缓存门槛、Office 文档、以及升级建议，以这篇为准。
- 9to5Google，Abner Li（2026-11-18，1:34 pm PT）：[Gemini 4 Neon announcement](https://9to5google.com/2026/11/18/gemini-4-neon-announcement/)。应用选择器、Argon、3.1 Pro 和 Auto 的说法以这篇为准，不要写成官方。
- The Decoder：[Google ships Gemini 4 Neon](https://the-decoder.com/google-ships-gemini-4-neon-its-fourth-new-gemini-model-in-a-month/)。「一个月内第四款」只作为该报道的概括。

成本例子里的 token 数、次数和缓存命中量都是示例假设，只使用上述官方单价做乘法。
