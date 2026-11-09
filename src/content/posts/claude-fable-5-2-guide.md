---
title: "Claude Fable 5.2：日常仍用 Opus，难任务再升级"
description: "Anthropic 在 2026 年 11 月 9 日发布 Claude Fable 5.2 与 Mythos 5.2。本文说明日常工作为何留在 Opus 5.5、何时升到 Fable，以及缓存、effort 档位、快速模式和发布周额度怎么核对。"
pubDate: 2026-11-10T08:00:00+08:00
topic: ai-tools
tags: ["Claude", "Fable", "模型选型", "API 成本"]
keyword: "Claude Fable 5.2 选型与价格"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "Fable 5.2 和 Mythos 5.2 是两个模型吗？"
    a: "Anthropic 写明二者是同一个底层模型。Fable 加了网络安全和生物方面的防护，一般用户用这一版；Mythos 5.2 只给通过 Cyber Verification Program 或 Life Sciences Verification Program 审核的机构。Claude Enterprise 客户还可以通过 Claude Security 用到包含 Mythos 5.2 的代码扫描。普通办公和编程调用模型 ID claude-fable-5-2。"
  - q: "每天的编码和写材料，要换成 Fable 吗？"
    a: "先留在 Opus 5.5。Anthropic 建议大多数编码和知识工作从 Opus 5.5 做起，开放式的难技术活再升到 Fable 或 Mythos，简单重复的活降到 Sonnet 5.5 或 Haiku 5.5。Fable 5.2 标准价是每百万 token 输入 8 美元、输出 40 美元，Opus 5.5 是 4 美元和 20 美元。部分榜上每个任务更省，是因为用掉的 token 更少，不是单价更低。"
  - q: "开了提示缓存，就一定更便宜吗？"
    a: "只调用一次时更贵。Fable 5.2 的 5 分钟缓存写入是每百万 10 美元，高于普通输入的 8 美元；1 小时写入是 16 美元。同一段前缀在 5 分钟缓存里至少再读一次，或在 1 小时缓存里至少再读两次，这段前缀的花费才会低于全程不缓存。两次调用的间隔超过缓存时长，命中失效，写入等于白付。"
  - q: "问题被安全策略拦住后，回复还算 Fable 写的吗？"
    a: "被拦住的那次不算。官方写明，网络安全类问题改由 Opus 4.8 回答，生物类问题改由 Opus 5 回答。早期测试里，Fable 5.2 的拦截大约比 Fable 5.1 少 55%，其中网络安全大约少 60%，生物大约少 40%。拦截后的回复不能拿来当 Fable 的质量样本。VentureBeat 转述系统卡：这类回退写在第一方产品和选择加入的 API 上，不同平台可能不一样。"
  - q: "发布周的额外 Fable 用量怎么确认？"
    a: "发布文没有写点击路径，也没有写截止的钟点，只用了 this week。打开你正在用的付费套餐用量页，核对两句原文：已经包含 Fable 的计划和座位，按订阅时长获得 1 到 3 次 Fable 重置；Pro 以及 Team 的标准座位，Fable 最多占每周用量限额的 50%。Max、Ultra 或其他座位没有在这句里重申，以用量页上的数字为准。"
---

2026 年 11 月 9 日，Anthropic 发布 Claude Fable 5.2 和 Claude Mythos 5.2。两件和账单直接相关的事同时发生：输出速度最多比 5.1 快 30%，标准 API 价从每百万 token 输入 10 美元、输出 50 美元，降到输入 8 美元、输出 40 美元，正好少 20%。模型 ID 是 `claude-fable-5-2`。

对还在用 AI 写材料、改代码、跑自动化的人，这次不该读成「把现有模型全部换成 Fable」。Anthropic 自己的用法说明是：大多数编码和知识工作从 Opus 5.5 开始，开放式的难技术活再往上走到 Fable 或 Mythos，重复、好验收的活往下走到 Sonnet 5.5 或 Haiku 5.5。Fable 还可以当顾问或调度，让更小的模型去干简单的步骤。

模型按任务分工的总原则，见 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/)。这篇只补 11 月 9 日这一版：价怎么算、effort 怎么升、快速模式什么时候值、发布周的额度去哪看、被拦住的问题会落到哪一个 Opus。

## 这次发布具体是什么

按 Anthropic 当天的发布文，可以收成下面几句。

**同一个底座，两套入口。** Fable 和 Mythos 是同一个底层模型。Fable 带有网络安全和生物方面的防护，因此可以对一般用户开放。要做这些领域里正当用途的机构，通过 Life Sciences Verification Program 或 Cyber Verification Program 申请 Mythos。Claude Enterprise 客户即使没进网络安全那项审核，也可以使用 Claude Security；这个产品用 Anthropic 最强的一组模型扫描代码库，其中现在包括 Mythos 5.2。它是代码扫描，不是给每个企业座位开一个无防护的 Mythos 聊天框。

**在哪能用。** Fable 5.2 当天起在各平台提供，发布文点名了 Amazon Web Services、Google Cloud 和 Microsoft Azure，开发者在 Claude Platform 上用 `claude-fable-5-2`。付费 Claude 计划和 Claude Code 也能用。可选的快速模式（fast mode）列在 Claude Code、Claude Platform、Google Cloud 上的 Claude Models（Anthropic 托管和 Google 托管），以及 Microsoft Foundry 里由 Anthropic 托管的部署。发布文没有把 AWS 写进快速模式的名单。Mythos 的快速模式只给通过审核计划的机构。

**定位。** CNBC 采访了 Anthropic 研究产品管理负责人 Dianne Penn。报道把 Fable 5.2 写成主要面向 power users 和 power use cases，擅长复杂、开放的技术工作，并写道日常任务更适合 Anthropic 在 9 月发布的 Opus 5.5。Penn 谈到工程、数学和机器人里的难题，原意是：这类能力以后可能会慢慢下到 Opus 这一档，但现在仍能看出性能差别，前沿场景用得上这个差别。

CNBC 同时把发布放在公司筹备上市的背景里，写道 IPO 可能最快在下周进行。上市进展不能拿来证明模型在你的任务上更好用。

## 单价降了 20%，日常模型仍然更便宜

下面是 Claude 官方定价页上的标准价，单位是美元 / 每百万 token。页面会改，下单和改预算前再打开一次。本文核对的是 2026 年 11 月 9 日能打开的那一版。

| 模型 | 输入 | 5 分钟缓存写入 | 1 小时缓存写入 | 缓存命中 | 输出 |
| --- | --- | --- | --- | --- | --- |
| Fable 5.2 / Mythos 5.2 | 8 | 10 | 16 | 0.20 | 40 |
| Fable 5.1 / Mythos 5.1 | 10 | 12.50 | 20 | 0.25 | 50 |
| Opus 5.5 | 4 | 5 | 8 | 0.20 | 20 |
| Sonnet 5.5 | 2 | 2.50 | 4 | 0.10 | 10 |
| Haiku 5.5（提示不超过 10 万 token） | 0.10 | 0.125 | 0.20 | 0.01 | 0.50 |
| Haiku 5.5（提示超过 10 万 token） | 0.50 | 0.625 | 1 | 0.05 | 2.50 |

几条容易看错的关系：

- 和 Fable 5.1 比，输入、输出、缓存写入和缓存命中都降到原来的 80%。10 美元降到 8 美元，50 美元降到 40 美元，0.25 美元降到 0.20 美元。
- 和 Opus 5.5 比，Fable 的未缓存输入和输出都是两倍。缓存命中价两边都是 0.20 美元。同样一段会反复出现的前缀，开缓存对 Fable 更要紧，因为不缓存时它的输入更贵。
- Haiku 5.5 按整次请求的提示长度分档。官方写明，提示长度把缓存读取和缓存写入都算进去。超过 10 万 token 的那一档，输入和输出都是低档的 5 倍。刚好 10 万 token 仍走低档，多一个 token 就整单改走高档。
- Fortune 用 OpenAI 的 GPT-6 Astra 做对照：Astra 标准价是输入 10 美元、输出 50 美元，缓存输入每百万 1.00 美元。据此，Fable 5.2 的标准输入输出便宜 20%，缓存命中便宜 80%（0.20 美元相对 1.00 美元）。这是标价对比，不是同一个任务的账单对比。Astra 和更便宜的中间档怎么分工，可以接着看 [GPT-6.1 Terra 的价格和换档](/posts/gpt-6-1-terra-cost-guide/)。

批处理是另一栏。定价页写 Batch API 对输入和输出打五折，Fable 5.2 是输入 4 美元、输出 20 美元，和 Opus 5.5 的交互式标准价相同。快速模式不能和 Batch 一起用。不急的夜间任务先看这栏，人在旁边等的排障再看快速模式。

Google 托管的那一档快速模式，定价页写明价格由 Google Cloud 定，不要把 Claude API 上的 16 美元和 80 美元直接抄进 GCP 预算。

## 榜上的高分，默认档位拿不到

Claude 应用和 Claude Code 的默认 effort 是 Medium。发布文主表里的许多分数，标注的是该模型最高可用档，除非另有说明。看到 49.1% 就以为打开 Claude 就是这个数，会对不上。

发布文表格里，和这次选型最相关的几行如下。这些是 Anthropic 公布的测试，不是本站复现，也不能当成你的仓库或工单会得到同样的百分比。

| 测试 | Fable 5.2 | 对照 |
| --- | --- | --- |
| FrontierCode 2.0（代理式编程） | Xhigh 49.1%；High 45.3% | Opus 5.5 最好成绩 45.5%；GPT-6 Astra 42.8%；Gemini 4 Carbon 41.1%（表上标的是 Medium） |
| FrontierSWE v2 | 69.9% | Opus 5.5 为 62.3%，GPT-6 Astra 为 65.5%，Gemini 4 Carbon 为 61.2% |
| AutomationBench（业务流程） | 51.4% | Gemini 4 Carbon 53.9%，Opus 5.5 为 42.5% |
| OSWorld 2.1 | 89.3%（offline set, partial） | Opus 5.5 为 87.2% |
| Remote Labor Index | High 41.3% | Opus 5.5 为 21.3% |
| Chartography（读图表，无工具） | 主表最高 73.4%；Medium 为 66.4% | Opus 5.5 的 Max 为 64.4% |
| WANDR（大规模采集，relaxed score） | 主表最高 82.1% | Opus 5.5 为 72.3%。另有说明：Medium 的 Fable 打平 Opus 的最高分 |

FrontierCode 问的是改动能不能被开源仓库的维护者合并。发布文写：High 的 45.3% 和 Opus 5.5 的 45.5% 接近，每个任务的成本大约一半；同一档还领先 Astra 的 42.8%，成本大约相当。Xhigh 的 49.1% 是他们测过的已发布模型里最高的。

VentureBeat 11 月 9 日的报道引用了系统卡里这 132 个任务的平均花费，可以用来看「升一档要多花多少」，仍然是厂商测试的口径：

- Medium：37.6%，平均每任务 2.48 美元
- High：45.3%，平均 6.72 美元
- Xhigh：49.1%，平均 14.19 美元
- Opus 5.5 在 Max：平均 12.82 美元，分数和 Fable 的 High 接近
- GPT-6 Astra 在 Max：平均 6.68 美元
- 把 Fable 开到 Max：平均 44.70 美元，分数低于更便宜的 Xhigh。VentureBeat 还写，若超时按 0 分计，Max 会从 45.7% 降到 44.4%

同一篇报道里的 5.1 对照也值得留着：Fable 5.1 在 Xhigh 是 32.4%，平均 8.68 美元。Fable 5.2 用默认的 Medium 就高出约 5.2 个百分点，每个任务的成本大约低 71%。若升级后把档位钉死在 Xhigh，分数高出约 16.7 个百分点，每个任务却大约贵 63%。单价降了 20%，把档位拉满仍可能更贵。

另外两张成本图只说明「哪个档位就够」：

- WANDR：Medium 打平 Opus 5.5 的最高分，每个任务大约是其成本的 40%。主表上的 82.1% 是更高档，不要把它写成 Medium 的分数。
- Chartography：Medium 的 66.4% 高于 Opus 5.5 Max 的 64.4%，成本不到十分之一。主表上的 73.4% 是最高档。
- Humanity’s Last Exam（带工具）：发布文写 Low 档的 Fable 打平 Opus 的最高分，成本不到十分之一。主表上 Fable 的最高分是 74.2%，Opus 是 67.7%。Low 打平的是 Opus 那一档，不是 74.2%。

业务流程那一行要单独看。AutomationBench 上 Fable 是 51.4%，Gemini 4 Carbon 是 53.9%，Opus 是 42.5%。VentureBeat 称系统卡里 51.4% 对应 Max，Low 是 39.7%。编程榜领先，不代表跨应用办事也领先。Carbon 多数账号目前还调用不到，开放顺序见 [Gemini 4 Carbon 发布](/posts/gemini-4-carbon-what-it-means/)。

OSWorld 也有两个口径，不要加在一起。发布文表格的 89.3% 标明是 offline set, partial。VentureBeat 另写，系统卡里「每一步都完成」的比例是 Fable 54.6%、Opus 53.2%、Fable 5.1 为 47.6%。

## 对正在用 AI 干活的人意味着什么

**日常主力的标价没有被 Fable 反超。** Opus 5.5 仍是每百万输入 4 美元、输出 20 美元。Anthropic 把它叫做最强的日常模型。小团队把邮件、说明、单点修改全换到 8 美元 / 40 美元，账单按 token 会先变贵。变便宜的前提是：更高的档位用更少的来回就把事做完，而且你能量到返工时间下降。

**难的、一开始说不清的技术活，值得单开一类。** 官方的原话方向是最有野心的开放式技术工作。Fable 也可以只在卡住时出场：Haiku、Sonnet 或 Opus 向它请教更难的子问题（顾问），或者由它把简单步骤派给更小的模型（调度）。两种用法都是为了少付 Fable 的输出 token。

**办公自动化不要只看编程分。** 业务流程榜上 Carbon 更高，而且大约一半的题仍然做不完。会改 CRM、会对外发信、会触发放款的流程，继续由人收口。自动化一旦循环重试，费用放大的方式见 [AI 自动化越跑越贵怎么办](/posts/ai-automation-cost-control/)。

**发布周有一笔额外的 Fable 用量，但不是无限。** 已经包含 Fable 的计划和座位，按订阅了多久，获得 1 到 3 次 Fable 重置。Pro，以及 Team 的标准座位，Fable 最多占每周用量限额的 50%。这和 10 月底 Max 更名 Ultra 时的额度说明不是同一段文字，当时怎么读用量，见 [Claude Ultra 与 ChatGPT Pro 的对账](/posts/claude-ultra-chatgpt-pro-quota-change/)。

**被拦住时，你对话的已经不是 Fable。** 网络安全类改由 Opus 4.8 回答，生物类改由 Opus 5 回答。早期测试里拦截大约少了 55%，不代表你的问题不会被拦。用这次回复评估 Fable，会把 Opus 的表现记成 Fable。

## 现在可以做的七件事

### 1. 先按任务把模型写死

从上周的工作里抽三类，每类只留一个模型，先跑五天再谈扩大。

| 你手上的活 | 先用 | 依据 |
| --- | --- | --- |
| 日常编码、改一处已经定位的问题、写普通说明 | Opus 5.5，默认 Medium | 官方建议的日常模型，标价是 Fable 的一半 |
| 分类、抽取、客服初稿、短摘要 | 提示不超过 10 万 token 时用 Haiku 5.5，规则更复杂时用 Sonnet 5.5 | 单价低一个到两个数量级 |
| 目标含糊、要来回查代码或资料的技术活 | Fable 5.2，先 Medium，不够再 High | 官方让你从 Opus 往上升的那一档 |
| 网络安全或生命科学的实质研究 | 走审核计划申请 Mythos，或企业客户使用 Claude Security | Fable 会拦截，并改由 Opus 回答 |
| 人在屏幕前等下一句 | 再考虑快速模式 | 速度最多约 2.5 倍，API 标价是两倍 |
| 第二天才会看的批量活 | Batch，或直接用更小的模型 | Fable 批处理是 4 美元 / 20 美元，且不能开快速模式 |

五天结束只允许改一类任务的模型。两类一起改，就分不清是模型的差别还是题目的差别。

### 2. 把缓存写进同一张账单

定价页的规则是：5 分钟缓存写入为输入价的 1.25 倍，1 小时为 2 倍。Fable、Mythos 以及对应的 5.1，命中价是输入价的 2.5%（Fable 5.2 为 0.20 美元）。一般模型的命中价是输入价的 10%，官方因此说 5 分钟缓存读一次就回本、1 小时要读两次。Fable 的命中更便宜，但写入仍然高于普通输入，所以「只跑一次」依旧更贵。

按 Fable 5.2 的前缀单价，自己可以复算（单位：美元 / 每百万 token 的前缀）：

- 不缓存，用两次：8 + 8 = 16
- 5 分钟写入一次再命中一次：10 + 0.20 = 10.20，低于 16
- 1 小时写入一次再命中一次：16 + 0.20 = 16.20，仍略高于两次不缓存的 16
- 1 小时写入一次再命中两次：16 + 0.20 + 0.20 = 16.40，低于三次不缓存的 24

因此：5 分钟缓存要准备至少再用一次；1 小时缓存要准备至少再用两次。间隔超过 5 分钟或 1 小时，命中消失。

下面是一组**示例假设**，用来看整单，不是官方样例账单。假设有一段 8 万 token 的固定前缀（系统说明加不变的资料），每次另加 4,000 token 新输入、1,000 token 输出，连续 6 次，间隔短于 5 分钟。

不缓存时，Fable 单次输入 84,000 × 8 / 1,000,000 = 0.672 美元，输出 0.04 美元，单次 0.712 美元，6 次 4.272 美元。

改用 5 分钟缓存：写入 80,000 × 10 / 1,000,000 = 0.80 美元；命中 5 次共 0.08 美元；6 次新输入共 0.192 美元；6 次输出共 0.24 美元。合计 1.312 美元。

如果这 6 次只发生 1 次：写入加新输入加输出是 0.80 + 0.032 + 0.04 = 0.872 美元，高于不缓存的 0.712 美元。

同一组假设换成 Opus 5.5：不缓存时单次输入 84,000 × 4 / 1,000,000 = 0.336 美元，输出 0.02 美元，6 次 2.136 美元。5 分钟缓存的写入价是 5 美元，写入 0.40 美元，命中 5 次 0.08 美元，新输入 0.096 美元，输出 0.12 美元，合计 0.696 美元。Sonnet 5.5 不缓存是 6 × 0.178 = 1.068 美元。提示总长 84,000，不超过 10 万 token，Haiku 5.5 不缓存是 6 × 0.0089 = 0.0534 美元。质量过关的话，这张表本身就说明重复活留在更低的一档。

真正贵的往往不是单价，而是失败后整段重试、把整份资料每次都重新送进去。缓存键里如果混进了时间戳、单号，命中率会接近零。

### 3. effort 从 Medium 往上加，不要一上来开到最大

Claude 应用和 Claude Code 不改设置就是 Medium。按上面 VentureBeat 转述的 FrontierCode 花费，建议只做这三步：

1. 五件真实的难任务先全部用 Medium。记下人是否采纳、返工几分钟、控制台里的费用。
2. 只有 Medium 的返工明显、而且这件任务值回票价时，把这一件升到 High。FrontierCode 上 High 的平均花费是 6.72 美元，Medium 是 2.48 美元。
3. High 仍然做不完、维护者或同事的验收标准又写得清时，再试 Xhigh（平均 14.19 美元）。同一张榜上 Max 平均 44.70 美元且分数没有更高。没有你自己的对照之前，不要为了「开到最大」选 Max。

读图表、做采集这一类，发布文已经写了 Medium 或 Low 就能打平 Opus 的最高分。这类活升到 Xhigh，多花的 token 没有榜上的理由。

### 4. 快速模式只给「人在等吐字」的那一次

Fable 5.2 的快速模式是每百万输入 16 美元、输出 80 美元，正好是标准价的两倍，速度最多约 2.5 倍，不是每次都有 2.5 倍。按价目表，1 万输入 token 加 4,000 输出 token：标准价 0.08 + 0.16 = 0.24 美元，快速模式 0.16 + 0.32 = 0.48 美元。

定价页写明，缓存倍数叠在快速模式的价格之上。快速模式里的写入和命中，不是标准价表上的 10 美元和 0.20 美元。5 分钟写入按 1.25 倍算是 1.25 × 16 = 20 美元 / 每百万 token，命中按 Fable 的 0.025 倍算是 0.025 × 16 = 0.40 美元。这是按页面上的倍数推算，定价页没有单独印出这一列，以用量明细为准。

Opus 5.5 的快速模式标价是 8 美元和 40 美元，与 Fable 的标准价相同。人只是觉得 Opus 吐字慢，先开 Opus 的快速模式。任务本身需要 Fable 时，再用 Fable 的标准价。两件事都占着，等于用两倍 Fable 标价买速度。时间主要花在编译、测试或等外部系统时，加快吐字帮不上。

快速模式的平台名单以发布文和定价页为准。Google 托管的价格另计。Batch 不能开快速模式。

### 5. 让 Fable 当顾问或调度

顾问，对应官方的 Advisor：Haiku、Sonnet 或 Opus 碰到更难的子问题时来问它。可以按这个顺序：

1. 小模型或 Opus 先做。留下目标、已试过的做法、失败现象。
2. 卡住再叫 Fable。只要下一步计划和验收标准，不要求它把整段活重写一遍。
3. 计划交回原来的模型执行。
4. 只有没通过验收的步骤再送回 Fable。

调度，对应官方的 Orchestrator：Fable 把简单步骤派给更小的模型。顺序是先拆步骤、写清每步用哪一档、写清怎样算做完，再让小模型执行，Fable 只看没通过的输出。

两种用法都要有人看最后一次对外的动作：发信、付款、改权限、合并到主分支。编程助手进仓库的权限和审查，不因为换了 Fable 而放宽。

### 6. 这周打开用量页，记下重置了几次

发布文的原意可以拆成三句，不要合成一句「本周 Fable 随便用」：

- 对象是符合条件的付费计划，时间用词是 this week，没有给出截止钟点。
- 已经包含 Fable 的计划和座位，按订阅时长获得 1 到 3 次 Fable 重置。
- Pro，以及 Team 计划的标准座位，Fable 最多占每周用量限额的 50%。

Max、Ultra、Team 的更高座位，这句没有再写一遍。10 月底的页面曾经把 Max 和 Ultra 的 Fable 写成最多用到周限额的一半，并把当时的 Pro 写成要另开 usage credits。那是另一天的规则。这周以你账号里的用量页为准，看三件事：Fable 是否包含在内、额外重置了几次、它最多能占周限额的百分之多少。

重置要留给上面表格里的「难技术活」。用一次重置去跑 Haiku 就能做的分类，这周的促销就浪费了。用量页看不清时，做一件小任务前后各记一次数字，比猜新闻标题可靠。

### 7. 被拦住的回复，改记到 Opus 名下

官方写明：Fable 5.2 的分类器会拦住高风险的网络活动，包括渗透测试、生成利用代码、基于二进制的漏洞工作，以及研究性生物里的大多数任务。拦住之后，网络安全由 Opus 4.8 回答，生物由 Opus 5 回答。早期测试覆盖 claude.ai、Claude Code 和 Cowork，拦截大约比 Fable 5.1 少 55%（网络安全大约少 60%，生物大约少 40%）。

发布文还写，在一类范围更小的人工智能研发话题上，会明确回退到 Opus 5，例子包括某些非标准加速器上的内核开发。回退是透明的，但你如果只看正文、不看模型名，仍可能把 Opus 的答案记成 Fable。

VentureBeat 转述系统卡时补充：这类网络和生物的回退，出现在第一方产品以及选择加入的 API 用户上，不同提供方的行为可能不同。上线前在你真实调用的那个平台发一条已知会被拦住的测试问题，看回复来自哪一个模型。评估 Fable 的样本里，把这次剔出去。

需要做漏洞发现和修复、又通过了审核的团队，申请 Mythos，或由 Enterprise 使用 Claude Security。不要用反复改写提示词的方式去绕过 Fable 的拦截。

## 接 API 和敏感数据时多看两眼

**preserved thinking 现在对所有 API 账户生效。** 发布文把它写成反蒸馏措施：避免有人改写 Claude 先前的上下文，用来套取推理过程。官方让开发者对照 preserved thinking 文档更新集成。手里有自己封装的客户端时，先在测试环境打一次现有请求，确认服务端没有因为新增的思考内容而拒绝或截断，再放到生产。这是集成检查，不是让你关掉防护。

**安全监测的保留期。** 更复杂的滥用要看多次请求的模式，所以 Fable 和 Mythos 依赖一段时间的用量监测，而不是只看单次回复。Enterprise Frontier Safeguards 把自动监测放到客户自己的基础设施上，因此可以和零数据保留配合，目前是私有测试，发布文点名的客户包括 Bridgewater、Salesforce 和 Stripe。符合条件的客户，在接上这套监测之前，仍可以按零数据保留继续用这两个模型。其他客户是 30 天保留，用于安全监测。

合同不允许提示和回复被保留 30 天的团队，先问清自己属于哪一种，再把客户数据、源代码或日志送进代理。不确定时，用可以公开的样本做选型测试。

## 常见问题

### Fable 5.2 和 Mythos 5.2 是两个模型吗？

二者是同一个底层模型。Fable 有网络安全和生物防护，一般用户用这一版，模型 ID 是 `claude-fable-5-2`。Mythos 5.2 给通过两项审核计划的机构。Enterprise 客户可以通过 Claude Security 用到包含 Mythos 的代码扫描。

### 每天的编码和写材料，要换成 Fable 吗？

先留在 Opus 5.5。开放式的难技术活再升到 Fable，简单重复的活降到 Sonnet 5.5 或 Haiku 5.5。Fable 的标准单价是 Opus 的两倍。榜上每个任务更省，来自更少的 token，不是更低的单价。

### 开了提示缓存，就一定更便宜吗？

只调用一次时更贵。5 分钟缓存的同一段前缀至少再读一次，1 小时缓存至少再读两次，这段前缀才比不缓存便宜。间隔超过缓存时长，命中失效。

### 问题被安全策略拦住后，回复还算 Fable 写的吗？

不算。网络安全改由 Opus 4.8 回答，生物改由 Opus 5 回答。早期测试里拦截大约少了 55%，拦住之后的质量不能记成 Fable。不同平台是否同样回退，用你真实的调用路径测一次。

### 发布周的额外 Fable 用量怎么确认？

发布文没有写点击路径和截止钟点。打开付费套餐的用量页：已经包含 Fable 的计划和座位按订阅时长重置 1 到 3 次；Pro 和 Team 标准座位的 Fable 最多占周限额的 50%。其他座位以用量页为准。

## 信息来源

- Anthropic：[Claude Fable 5.2 and Mythos 5.2](https://www.anthropic.com/claude-fable-and-mythos-5-2)（2026-11-09）
- Anthropic：[Pricing](https://platform.claude.com/docs/en/about-claude/pricing)（文中单价、缓存倍数、快速模式、Batch 与 Haiku 分档）
- CNBC：[Anthropic releases Claude Fable 5.2 and Claude Mythos 5.2 ahead of IPO](https://www.cnbc.com/2026/11/09/anthropic-claude-fable-5-2-mythos-5-2.html)（2026-11-09）
- VentureBeat：[Anthropic releases Claude Fable 5.2 and Mythos 5.2, pairing new, record-high benchmarks with 20% API cost reduction](https://venturebeat.com/technology/anthropic-releases-claude-fable-5-2-and-mythos-5-2-pairing-new-record-high-benchmarks-with-20-api-cost-reduction)（2026-11-09；文中每个任务的美元花费和 Max 档分数引自该报道对系统卡的转述）
- Fortune：[Anthropic debuts Claude Fable, Mythos 5.2 models, priced 20% below OpenAI’s GPT-6 Astra](https://fortune.com/2026/11/09/anthropic-debuts-updated-claude-fable-and-mythos-models-undercutting-price-of-openais-gpt-6-astra-by-up-to-80/)（2026-11-09；GPT-6 Astra 的 10 美元 / 50 美元与缓存 1.00 美元）
