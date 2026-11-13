---
title: "Gemini 4 Hydrogen 上线：日常任务的新默认，别整站换最贵的"
description: "Google 于 2026 年 11 月 12 日发布面向日常编码和代理式任务的 Gemini 4 Hydrogen，本文核对开放范围、2026-11-13 定价页上的单价，以及从 3.8 Flash 迁移时不要只改模型 ID 的原因。"
pubDate: 2026-11-13T17:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "Gemini", "API 成本", "选型"]
keyword: "Gemini 4 Hydrogen"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "免费用户现在能在 Gemini 应用里用上 Hydrogen 吗？"
    a: "Google Search 从 2026 年 11 月 12 日起对所有用户全球开放。Gemini 应用里，免费用户是在自动选模认为合适时用到 Hydrogen。9to5Google 当天把选择器里的 Everyday help 标成 4 Hydrogen。选择器文案会变，以你账号里看到的为准。"
  - q: "生产里还在用 gemini-3.8-flash，要直接换成 gemini-4-hydrogen 吗？"
    a: "不要只改模型字符串。定价页 2026-11-13 的 Standard 单价，Hydrogen 是每百万 token 输入 1.50 美元、输出 7.50 美元；3.8 Flash 到 2026-12-31 是 0.75 和 3.75，现在是两倍。默认思考档是 high，显式缓存也不支持。先用三份真实任务记下计费 token、耗时、返工和能不能用。定价页仍列出 gemini-3.8-flash。Hydrogen 是官方推荐的升级路径。9to5Google 写 Google 推出 Hydrogen 而不是继续用 Flash 这个牌子，那是报道的说法，不是停用通知。"
  - q: "按 token 比 Carbon 便宜，一次任务也会更便宜吗？"
    a: "不一定。Carbon 和 Argon 的 Standard 到 2026-11-30 是输入 2 美元、输出 10 美元，12 月 1 日起是 4 美元和 20 美元，而且都不在免费层。Hydrogen 的单价更低，但 Carbon 每轮会用更多思考 token，任务账单不等于单价之比。难的规划留在前沿模型。引入价截止日见本站 Carbon 全面开放那篇。改预算前再打开定价页。"
  - q: "thinking_level 怎么设，还能传 minimal 吗？"
    a: "Hydrogen 的档位是 low、medium、high 和 xhigh，默认 high。文档建议从 high 开始，xhigh 留给 high 不够的难任务。xhigh 会增加延迟和 token，简单提示上可能想太多。传 minimal 会报错。Carbon 和 Argon 默认 medium，最高到 high。想少花 token，先降低 thinking_level，不要把 max_output_tokens 卡得很低。"
  - q: "免费层的内容会被拿去改进 Google 产品吗？"
    a: "会。定价页写免费层 Used to improve our products 为 Yes，Standard、Batch、Flex、Priority 的付费层为 No。免费层不另收费，但有速率限制，而且 Batch 和 Flex 的免费层是 Not available。公司文档和未公开代码先确认能不能走免费层。另有仅邀请的 Contributor 预览档，付费侧写的是 Yes，不要把它当成普通付费层。"
---

2026 年 11 月 12 日，Google 发布 Gemini 4 Hydrogen。介绍文由 Google DeepMind 高级副总裁、Google 首席 AI 架构师 Koray Kavukcuoglu 署名。官方把它放在日常编码和代理式工作流上，强调执行要快。它可以单独用，也可以和 Carbon 或 Argon 配在一起，由 Hydrogen 做执行。同一家族里，Carbon 和 Argon 仍是做深度、长周期推理的前沿模型。

TechCrunch 在当天 11:27 AM PST 刊出搜索升级的报道。The Verge 在当天 9:55 PM UTC 刊出，作者是 Stevie Bonifield。谁能用、怎么计费，以官方博客、What's new 和定价页为准。本文核对定价页的日期是 2026 年 11 月 13 日。

对还在用 AI 写材料、改代码、跑自动化的人，当天能核对的结论有五条。Google Search 对所有用户全球开放 Hydrogen；Gemini 应用里，免费用户是在自动选模认为合适时才用到它。API 模型 ID 是 `gemini-4-hydrogen`，Google AI Studio 和 Gemini API 的免费层、付费层都能调用，免费层不另收费，但有速率限制。Standard 付费价在整个约 100 万 token 窗口上是同一单价：每百万 token 输入 1.50 美元、输出 7.50 美元，输出含思考 token。这正好是 3.8 Flash 从 2027 年 1 月 1 日起的 Standard 价；在那之前，Flash 的 Standard 是 0.75 和 3.75，Hydrogen 的单价是它的两倍。生产里还写着 `gemini-3.8-flash` 的，不要只改这一串字符。已经在用 Carbon 或 Argon 的，难的规划留在前沿模型，日常改代码、跑测试和子智能体再试 Hydrogen。

Carbon 的引入价用到 2026 年 11 月 30 日，/swarm 为什么更费配额，见 [Gemini 4 Carbon 已开放：引入价用到 11 月 30 日](/posts/gemini-4-carbon-ga-swarm-guide/)。那篇不在这里重讲。任务先按输入、完成标准和谁来补错拆开，沿用 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/)。

## 谁从 11 月 12 日起用得上

介绍文把当天开始的全球推送写成五处：Google AI Studio 和 Gemini API 的全部档位、Gemini for business、Gemini 应用、Google Search，以及在 Google Antigravity 里付费的 Google AI Pro 和 Ultra。正文又把入口拆细了。下表以正文的产品名单和 What's new 为准。

| 入口 | 谁能用 | 当天写明的限制 |
| --- | --- | --- |
| Google AI Studio、Gemini API | 免费层和付费层；开发者名单里还有 Android Studio | 模型 ID `gemini-4-hydrogen`。GenerateContent 和 Interactions API 都能调用。免费层不另收费，但有速率限制 |
| Gemini for business | 企业 | 经 API 或模型下拉。符合条件的商业订阅还可以在 Gemini in Google Sheets 里用 |
| Gemini 应用 | 公告写所有人有模型下拉 | 免费用户在自动选模认为合适时用到 Hydrogen，不是每个免费账号都能点名它 |
| Google Search | 所有用户，全球 | 搜索博客称这是搜索迄今最大的模型升级。AI Mode 的默认地位见下一节 |
| Google Antigravity | 付费的 Google AI Pro 和 Ultra | Orchestrator 的档位不同，见后文 |
| Gemini in Google Sheets | 先给 Google AI Pro 和 Ultra；企业侧是符合条件的商业订阅 | 免费个人账号不在这句名单里 |

9to5Google 当天记录了 Gemini 应用选择器上的英文标签。这是对界面的观察，不是定价页。

| 选择器标签 | 9to5Google 写的模型 |
| --- | --- |
| Quick answers | 3.5 Flash-Lite |
| Everyday help | 4 Hydrogen |
| Detailed research | 3.1 Pro（写明在 AI Pro 上） |
| Code & analysis | 4 Argon |
| Most complex work | 4 Carbon |

本站 Carbon 全面开放那篇转述过，9to5Google 在 11 月 10 日看到应用里去掉了 3.1 Pro。11 月 12 日同一来源的表里，Detailed research 又标成 3.1 Pro（AI Pro）。两篇都是对界面的观察。选择器会变，以你打开应用时的下拉为准。免费用户即使看不到 Everyday help 这一项，仍可能在自动选模时用到 Hydrogen。

## 搜索：全球开放，AI Mode 换了默认模型

搜索博客由 Google Search 产品副总裁 Robby Stein 署名，日期同样是 2026 年 11 月 12 日。文中称这是 “the biggest model upgrade to Search yet”。中文意思是：这是搜索迄今最大的一次模型升级。The Verge 用引号把这句话记在 Stein 名下。Hydrogen 在 Google Search 里对所有用户全球可用。

The Verge 引 Stein 的另一句是：“now the new default model in AI Mode & being used for your hardest questions in AI Overviews.” 中文：它现在是 AI Mode 的新默认模型，并被用于 AI Overviews 里最难的那些问题。这句的出处是 The Verge 对 Stein 的引用，不是本站复测。

搜索博客自己列出的变化，也按官方说法记，不要当成你的查询已经测出的提升：

- 更理解意图。多段问题、难认的错字、非常具体的要求，可以按原来的说法问。
- 查询扇出（query fan-out）更好，链出的链接范围更宽。
- 回答更视觉化：图片、结构化回答、对比表、为这次问题做的小工具。
- 在 AI Mode 已支持的各种语言里，语言理解更细。

这周可以做的对照很具体。从你最近问过搜索的问题里挑一个多段问题，在 AI Mode 里再问一次。只记三件事：每一段有没有被回答到、链接能不能打开、对比表里的数字是不是你能核对的。Stein 的 “最大升级” 代替不了这三行。

## 接口上它长什么样

What's new 写的模型 ID 是 `gemini-4-hydrogen`。默认同步输出上限是 65,536 token。输入、思考和输出共用一个 1,048,576 token 的窗口，也就是大约 100 万。介绍文说的 “输出最多约 100 万”，指的是长输出：用后台执行或客户端续写，可以走到这个窗口的上限。它不是默认同步请求的长度。同步请求每跳最多 65,536 token，流式和非流式都一样。Hydrogen 在 REST 和 SDK 的非流式每跳支持 65,536；Carbon 和 Argon 的非流式 REST 每跳是 32,768。

`max_output_tokens` 同时封顶思考和最终输出。上限写得太低，思考用完额度，看得见的答案会被截断。想少花 token，降低 `thinking_level`，不要先去卡这个上限。

思考档有四档：

| 档位 | 文档怎么用 |
| --- | --- |
| `low` | token 最少、延迟最低。文档把它放在赶时间的对话和高吞吐处理，并写它仍然能做代理式任务 |
| `medium` | token 更少、回复更快。交互式编码、现场改界面、在意延迟的工具调用 |
| `high` | 默认。文档建议大多数任务从这里开始，包括复杂编码、代理式执行、工具调用和多模态材料 |
| `xhigh` | 新档。留给 `high` 不够的难的多步任务。延迟和 token 都会上去，简单提示上可能想太多 |

Carbon 和 Argon 默认是 `medium`，最高到 `high`。Hydrogen 不接受 `minimal`，传了会报错。文档还写：四个档都用足够高的 `max_output_tokens` 跑一遍你自己的评测，再留下质量过线的最低档。9to5Google 写 Antigravity 界面里有一个叫 Extra 的思考档，和 Low、Medium、High 并列。API 文档的第四档叫 `xhigh`。界面文案和请求参数可能不是同一个词，以你账号里的下拉和实际参数为准。

What's new 还写，Gemini Managed Agents 里的 Antigravity agent 默认改用 `gemini-4-hydrogen`。底层模型可以用 `agent_config` 换。换默认模型会改变已经接上这个 agent 的自动化，上线前用同一批任务看一眼输出。

## 价格：现在是 3.8 Flash 引入价的两倍

介绍文写，Hydrogen 在整个 100 万 token 窗口上是同一单价。What's new 和定价页给的 Standard 数字一致：输入 1.50 美元、输出 7.50 美元（含思考 token）、隐式缓存输入 0.075 美元，单位都是每百万 token。0.075 是 1.50 的 5%，对应页面写的缓存命中优惠 95%。优惠 95% 是实付 5%，不是实付 95%。

只支持隐式缓存。`cachedContents` 和 `caches.create` 这种显式缓存不支持。What's new 写，隐式缓存默认对至少 4,096 token 的提示启用。命中才有 0.075 这个单价，页面不保证每次都命中。

下表是 2026 年 11 月 13 日定价页上的付费单价，单位美元 / 每百万 token。页面会改。

| 标价 | 时段 | 输入 | 输出（含思考） | 上下文缓存 |
| --- | --- | --- | --- | --- |
| Hydrogen Standard | 全窗口同一价 | 1.50 | 7.50 | 0.075，仅隐式 |
| Hydrogen Batch、Flex | 同上 | 0.75 | 3.75 | 0.0375，仅隐式 |
| Hydrogen Priority | 同上 | 2.70 | 13.50 | 0.135，仅隐式 |
| 3.8 Flash Standard | 至 2026-12-31 | 0.75 | 3.75 | 本文不把 Flash 的缓存价算进对照 |
| 3.8 Flash Standard | 2027-01-01 起 | 1.50 | 7.50 | 同上 |
| Carbon、Argon Standard | 至 2026-11-30 | 2.00 | 10.00 | 见已有的 Carbon 文，这里不重复 |
| Carbon、Argon Standard | 2026-12-01 起 | 4.00 | 20.00 | 同上 |

3.8 Flash 的模型 ID `gemini-3.8-flash` 仍在这张定价页上。What's new 把 Hydrogen 写成从 3.8 Flash，以及更早的 Gemini 3 和 2.5 升级的推荐路径，并建议高量分类、路由和亚秒延迟继续用 `gemini-3.5-flash-lite`。9to5Google 的说法是，Google 推出 Hydrogen，“instead of keeping the Flash branding”，也就是没有继续用 Flash 这个牌子。那是该报道的概括，不是定价页上的停用通知。

Batch 和 Flex 的免费层写的是 Not available。Standard 和 Priority 的 token 在免费层是 Free of charge。免费不等于没有速率限制，具体限额以定价页链出的速率页为准，本文不补一组页面没写进正文的次数。

用 Google Search 做 grounding 另计，不在 token 单价里。Standard 付费：每月 5,000 次搜索请求免费，和 Gemini 3 及更新的模型共享，之后每 1,000 次 14 美元，并受每天 1,500 次的上限约束。你提交的一次请求可能变成多次搜索，按每一次计。不要把 14 美元 / 千次理解成每次对话 0.014 美元。Maps grounding 是每月 5,000 次免费、同样跨模型共享，之后每 1,000 次 14 美元。Hydrogen 免费层的 Search grounding 和 Maps grounding 都是 Not available。下面的演算不含这两项。

数据使用也在同一页。免费层 “Used to improve our products” 是 Yes。Standard、Batch、Flex、Priority 的付费层是 No。另有一个仅邀请的 Contributor 预览档，付费侧写的是 Yes。一般付费调用按 No 理解。公司文档、客户材料和未公开代码能不能走免费层，先看这一格，再对照 [免费 AI 工具怎么挑](/posts/free-ai-tool-limits/) 里把额度和数据用途分开的做法。

Carbon 和 Argon 都不在免费层。Hydrogen 的每 token 单价低于它们现在的 Standard 引入价，也低于 12 月 1 日之后的 4 美元和 20 美元。What's new 写 Carbon 是最强的前沿模型，每轮会花更多思考 token 去做假设和边界核对。所以单价更低不等于一次任务更便宜。Argon 被写成用比 Carbon 更少的 token 处理多数高级长周期任务。10 月 28 日发布时引入期结束日还是空的，那一格后来怎么补上，见 [Carbon 发布时的定位](/posts/gemini-4-carbon-what-it-means/) 和全面开放那篇。本文只保留和 Hydrogen 比单价时需要的四格。

### 一次调用的演算：token 数是假设，单价是官方的

下面的 token 数不是官方统计，也不是你的账单。只用来把定价页的单价乘完。输出按含思考 token 的计费输出理解。除了单独标出的那一版，不假设缓存命中。Batch、Flex、Priority 的免费层和单价不同，先看控制台里这次走的是哪一档。

用量甲：普通输入 100 万 token，即 1 个百万 token；计费输出 20 万 token，即 0.2 个百万 token。

- Hydrogen Standard：1 × 1.50 + 0.2 × 7.50 = 3.00 美元。
- 3.8 Flash Standard，至 2026-12-31：1 × 0.75 + 0.2 × 3.75 = 1.50 美元。
- 3.8 Flash Standard，2027-01-01 起：1 × 1.50 + 0.2 × 7.50 = 3.00 美元。
- Carbon 或 Argon Standard，至 2026-11-30：1 × 2.00 + 0.2 × 10.00 = 4.00 美元。
- Carbon 或 Argon Standard，2026-12-01 起：1 × 4.00 + 0.2 × 20.00 = 8.00 美元。

在这组假设里，12 月 31 日之前 Hydrogen 的 3.00 美元正好是 Flash 引入价 1.50 美元的 2 倍，因为输入单价和输出单价各自都是 2 倍。2027 年 1 月 1 日起，两边 Standard 单价对齐，同样的 token 结构都是 3.00 美元。和 Carbon、Argon 的 4.00 或 8.00 比，前提是计费 token 一样多。Carbon 会多用思考 token，这个前提经常不成立。

若一个月跑 20 次用量甲、都不走缓存、都走 Standard：Hydrogen 是 20 × 3.00 = 60 美元；同一 token 结构的 Flash 引入价是 20 × 1.50 = 30 美元。多出来的 30 美元只来自单价，还没计入默认 `high` 可能让计费输出变长。20 次也是假设。

Priority 用同一组 token：1 × 2.70 + 0.2 × 13.50 = 5.40 美元。2.70 ÷ 1.50 = 1.8，13.50 ÷ 7.50 = 1.8，缓存 0.135 ÷ 0.075 = 1.8。Priority 的单价是 Standard 的 1.8 倍，这是定价页上的数相除。Batch 和 Flex 是一半：1 × 0.75 + 0.2 × 3.75 = 1.50 美元。一半只在付费层成立，这两档的免费层是 Not available。

缓存只在账单出现 context caching 时改公式。仍用用量甲，假设 1 个百万输入里有 0.8 按缓存价、0.2 仍是普通输入。这是假设的命中。

Hydrogen Standard：0.2 × 1.50 + 0.8 × 0.075 + 0.2 × 7.50 = 0.30 + 0.06 + 1.50 = 1.86 美元。

和不缓存的 3.00 相比，省下的是那 0.8 个百万输入的差价：0.8 × (1.50 − 0.075) = 1.14 美元。输出的 1.50 美元没动。提示不到 4,096 token，不要指望这 1.14 美元出现。

对外按包月报价、AI 成本包在固定服务费里的小团队，12 月 31 日之前不要用 Flash 的 0.75 和 3.75 给 Hydrogen 报价。预算先按 1.50 和 7.50，再给 “默认思考档更高、token 可能变多” 留余量。2027 年 1 月 1 日 Flash 的 Standard 单价和 Hydrogen 对齐之后，省钱的理由会变，质量的对照还在。改预算之前再打开一次定价页。

## 官方速度、榜单和安全数字

下面全部是 Google 官方博客里的厂商自述，或 Google 转述的合作伙伴早期测试。不是本站复测，也不是独立审计。厂商公布的是它选出来的榜和内部口径。

相对 Gemini 3.8 Flash、默认 `high`，介绍文写了四件：完成任务快 2.5 倍；Terminal-Bench 4.1 为 57%，3.8 Flash 是 18.2%，并称之为超过三倍；捏造的说法减少超过 5 倍；工具调用失败或搜索返回空时，能接着调整。57 ÷ 18.2 大约是 3.13，所以 “超过三倍” 是这组分数的说法，不是另一项测试。

Artificial Analysis Intelligence Index：默认 `high` 为 51，Argon 是 50；`xhigh` 为 54。介绍文和 Antigravity 博客都写了这组数字，并称它经常比同级模型更快做完。51 对 50 是这个指数上的 1 分，比较对象是 Argon，不是 Carbon。1 分不是把难规划从 Carbon 挪走的理由。What's new 仍把 Carbon 写成最强的前沿模型。

合作伙伴的早期测试，相对 3.8 Flash，用在复杂图表、SQL 和数据很重的企业流程上：快 2 倍到 2.8 倍，token 少 12% 到 23%。这是 Google 的转述。

Google 还引用了这些榜。名次和 “领先同级” 都是它的口径：

- Agent Arena 在多步任务上排第 5。介绍文点名的任务包括深度调研、数据分析和大范围看代码库，并写这是 arena.ai 的实时榜。
- HLE-Diamond 58.8%，称领先同级。
- Vals Tax Agent Bench 52.3%，称总排第 1。
- Vals Legal Research Bench 55.8%，称并列第 1。
- AutomationBench-AA，称领先同级。博客没有在这句给出百分比，本文也不补。
- MKA 53.4%。介绍文称在这项多模态知识工作榜上优于其他模型。
- Agents' Last Exam v1.1 为 71.6%，介绍文把它放在端到端的专业流程上。

安全数字相对 3.8 Flash，同样是 Google 的内部或厂商口径：代理式任务里越界做事最多减少 81%，该做却没做到最多减少 79%；在工具使用和编码评测里，失配行为和把任务做短，减少 12 倍；面对不可能或被拦住的任务，绕过权限边界的可能性最多降到一半；内部 agent honesty 评测的诚实率 96.7%；超过 20 万次被审计的回合里，思维链可读性 99.9%，欺骗性的推理改写为零；Gray Swan 间接提示注入上的韧性超过 2.3 倍；HealthBench Pro 上的误拒绝低于 0.4%。

The Verge 写，Google 称 Hydrogen “matches or outperforms some of the competing models in its class”，并举了 Claude Sonnet 5.5 和 GPT-6.1 Terra。中文：在同级的一些竞品上打平或更好。这是 Google 的比较，经 The Verge 转述，不是本站把三个模型跑过同一批任务。

这些百分比不能相加，也不能当成你的邮件、表格或仓库的通过率。能直接做的测试是：准备一份故意少一个关键数字的材料，看模型是停下来，还是补一个看起来合理的数。账号里已经能调用 Hydrogen 的，用同一份材料对 3.8 Flash 再跑一次，记下有没有编造、人要改几分钟。还没有调用的，先用现有模型把这张表建起来。

介绍文还写，在 Sheets canvas 里，生成输出比以往的模型快 30% 以上。这句限定在 Sheets canvas，是 Google 的说法，不是你的表格计时。

## Orchestrator：两篇博客的基准版本号不一样

Antigravity 博客在同一天加入模型下拉里的 Orchestrator。它在同一次会话里动态切换模型。博客举的例子是：Carbon 先只读地摸清依赖、把含糊的地方定下来、写出带重新规划条件的计划；Hydrogen 再改代码、更新依赖、跑测试；Hydrogen 遇到卡住，交回 Carbon 看现状、改计划、继续做。

介绍文写的是同一类分工的另一面：需要并行智能体时，Carbon 做协调，Hydrogen 驱动 worker 和 verifier，在各自隔离的工作区里同时改和测。

成功率那一句，两篇官方文字用了同一组 24% 和 19%，基准版本号不一样。本文两句都保留，不合成一个数。

| 出处 | 写的基准 | 官方表述 |
| --- | --- | --- |
| Hydrogen 介绍文，2026-11-12 | Terminal-Bench 4.0 | 接近 Carbon 的任务成功率，平均少用 24% 配额，完成快 19% |
| Antigravity 博客，2026-11-12 | Terminal-Bench 4.1 | 接近 Carbon 的任务成功率，平均少用 24% 配额，完成快 19% |

两句都是厂商自述，都不是你的仓库。引用时要带上版本号。只写 “少 24% 配额、快 19%” 而不写 4.0 还是 4.1，就把这个不一致藏起来了。

谁能用，按 Antigravity 博客的订阅名单：

- Hydrogen 向付费的 Google AI Pro 和 Ultra 推送。
- Orchestrator (Carbon) 和 Orchestrator (Argon) 给 Google AI Ultra。
- 付费的 Google AI Pro 得到的是 Orchestrator (Argon)。
- 更多模型和套餐以后再加。
- 企业可以在 Gemini for business 里使用这两类。博客原句是 access both，紧接在 Hydrogen 和 Orchestrator 的订阅档之后。

Pro 可以在 Antigravity 里试 Hydrogen，但 Orchestrator 只有 Argon 那一档。不要以为 Pro 会自动用 Carbon 做规划。要 Carbon 做计划、Hydrogen 做执行，Ultra 的 Orchestrator (Carbon) 才是博客写的那一档；也可以在自己的请求里把规划轮发给 `gemini-4-carbon`、执行轮发给 `gemini-4-hydrogen`。What's new 写，从 Carbon 或 Argon 换到 Hydrogen 不用改请求的结构，但默认思考档不同，想要 `medium` 或 `xhigh` 就要自己设。

本周早些时候，Carbon 和 `/swarm` 已经上线。Antigravity 博客称，几天之内有数万个 swarm 被启动。这是厂商自述。`/swarm` 怎么分工、为什么并行更费配额，全面开放那篇已经写过，这里不重讲。

## 从 3.8 Flash 迁过来要改的地方

What's new 的迁移清单是给已经在调用 API 的人的。只用搜索和应用、不改模型字符串的人，可以看下一节的第 1 条和第 5 条。

| 要改的地方 | 3.8 Flash 上常见的写法 | Hydrogen 上怎么处理 |
| --- | --- | --- |
| 模型字符串 | `gemini-3.8-flash` | 改成 `gemini-4-hydrogen` |
| 上下文预算 | 输入约 100 万、输出 6.4 万，分开计 | 输入、思考、输出共用 1,048,576。默认同步上限仍是 65,536 |
| `max_output_tokens` | 写死 8,192 这类偏低的数 | 删掉或提到 65,536。它同时封顶思考和答案 |
| `thinking_level` | 按 `medium` 在估 | 默认 `high`。`medium` 和 `high` 都测。不要传 `minimal` |
| 缓存 | `cachedContents`、`caches.create`、请求里的 `cached_content` | 显式缓存不支持。只留隐式缓存，命中才有 95% 的输入折扣 |
| 采样参数 | `temperature`、`top_p`、`top_k` | 删掉。服务器忽略自定义值 |
| 工具 | 系统提示里要一段纯文本 JSON，却没有声明工具 | 声明原生工具，或用结构化输出。否则可能返回 `MALFORMED_FUNCTION_CALL` |
| 多轮状态 | 自己拼接历史，或复制一份 thought signature | Interactions API 用 `previous_interaction_id`。`generateContent` 里把上一轮模型和 thought signatures 原样带回。不要把同一个 signature 抄到并行的 functionCall 上 |
| 超过 6.4 万的输出 | 用 Flash 分开的 6.4 万输出预算 | `background` 设为 true，并且 `max_output_tokens` 高于 65,536；或者用客户端续写 |

只把 `background` 设为 true、却不提高 `max_output_tokens`，What's new 写服务器会在 65,536 token 停住。长输出要两个参数一起改。

账单估算也要重做。模型处理的每个 token 都计数、都计费，包括思考 token，以及使用 grounding 或工具时内部的系统指令和函数声明。对话框里看得见的那一段，可以短于计费输出。

换模型 ID 会连带改掉思考档、缓存和多轮状态。提示词、自动化和验收样本要一起看，做法见 [换 AI 工具怎么迁才不丢东西](/posts/ai-tool-migration-checklist/)。先并行跑同一批任务，再停旧的模型字符串。

## 这周可以做的五件事

1. **搜索和应用先试一条真问题。** Search 对所有用户全球开放。免费的 Gemini 应用用户可能只在自动选模时用到 Hydrogen。挑一个你这周真的问过的多段问题，看每段有没有答到、链接能不能打开、表里的数字能不能核对。搜索变好，不是把生产接口换掉的理由。

2. **还在用 `gemini-3.8-flash` 的，先别改模型字符串。** Standard 单价现在是 Flash 引入价的 2 倍，默认思考档是 `high`，显式缓存必须去掉。从过去两周的工作里抽三份真实任务：一段确实要改的代码或公式，一份缺了数字就应该停下来的说明，一条从高量分类里抽出来的样本。两套模型各跑一遍。记下计费输入、计费输出（含思考）、耗时、人是否采纳、返工几分钟。只留下有差别的那一类。三份一起换，就分不清是模型变了还是任务变了。

3. **已经在用 Carbon 或 Argon 的，前沿模型留在难规划上。** 日常编码、测试和子智能体试 Hydrogen。付费的 Pro 和 Ultra 可以试 Orchestrator，少做手工切换。Pro 只有 Orchestrator (Argon)，没有 Orchestrator (Carbon)。Ultra 才有 Orchestrator (Carbon) 和 Orchestrator (Argon)。自己分轮调用时，规划轮用 Carbon，执行轮用 Hydrogen，并写上各自的 `thinking_level`。

4. **高量、便宜、要亚秒延迟的分类和路由，留在 `gemini-3.5-flash-lite`。** 这是 What's new 的建议。本文不另给 Flash-Lite 报价，单价以定价页为准。这类任务不要因为 Hydrogen 上了榜就升档。

5. **改预算之前再打开定价页和速率页。** 本文的单价截止到 2026 年 11 月 13 日看到的那一版。免费层的内容会被用来改进 Google 产品；Standard、Batch、Flex、Priority 的付费层写明不会。Contributor 预览档是例外。公司材料不要在没看这一格之前走免费层。

记录用一张表就够：日期、任务一句话、模型 ID、思考档、计费输入、计费输出、耗时、采纳还是重做、返工分钟。没有这张表，下周的讨论会变成 “我觉得新的更快”。

## 这些说法不要直接当成你的结果

- “快 2.5 倍”“Terminal-Bench 4.1 的 57% 对 18.2%”“捏造减少超过 5 倍”，以及 51、54、58.8%、52.3%、55.8%、53.4%、71.6%，都是 Google 的榜或内部口径。
- 合作伙伴 “快 2 到 2.8 倍、token 少 12% 到 23%” 是 Google 转述的早期测试，范围是复杂图表、SQL 和数据很重的企业流程。
- 81%、79%、12 倍、96.7%、99.9%、超过 2.3 倍、误拒绝低于 0.4%，是 Google 相对 3.8 Flash 的安全口径，包括内部评测。
- “打平或超过同级的一些竞品”，以及 Claude Sonnet 5.5、GPT-6.1 Terra 这两个名字，是 The Verge 转述的 Google 比较。
- Orchestrator 的 24% 和 19% 在介绍文里对应 Terminal-Bench 4.0，在 Antigravity 博客里对应 Terminal-Bench 4.1。数万个 swarm 是厂商自述。
- Sheets canvas “快 30% 以上” 是介绍文的说法。
- 用量甲的 100 万和 20 万 token、一个月 20 次、缓存命中 0.8 个百万 token，都是示例假设。换成你的日志之后，只有单价来自 2026-11-13 的定价页。
- 9to5Google 的选择器标签和 Extra 这个界面用词，都是当天的观察。界面会变。

## 常见问题

### 免费用户现在能在 Gemini 应用里用上 Hydrogen 吗？

Google Search 从 2026 年 11 月 12 日起对所有用户全球开放。Gemini 应用里，免费用户是在自动选模认为合适时用到 Hydrogen。9to5Google 当天把选择器里的 Everyday help 标成 4 Hydrogen。选择器文案会变，以你账号里看到的为准。

### 生产里还在用 gemini-3.8-flash，要直接换成 gemini-4-hydrogen 吗？

不要只改模型字符串。定价页 2026-11-13 的 Standard 单价，Hydrogen 是每百万 token 输入 1.50 美元、输出 7.50 美元；3.8 Flash 到 2026-12-31 是 0.75 和 3.75，现在是两倍。默认思考档是 high，显式缓存也不支持。先用三份真实任务记下计费 token、耗时、返工和能不能用。定价页仍列出 gemini-3.8-flash。Hydrogen 是官方推荐的升级路径。9to5Google 写 Google 推出 Hydrogen 而不是继续用 Flash 这个牌子，那是报道的说法，不是停用通知。

### 按 token 比 Carbon 便宜，一次任务也会更便宜吗？

不一定。Carbon 和 Argon 的 Standard 到 2026-11-30 是输入 2 美元、输出 10 美元，12 月 1 日起是 4 美元和 20 美元，而且都不在免费层。Hydrogen 的单价更低，但 Carbon 每轮会用更多思考 token，任务账单不等于单价之比。难的规划留在前沿模型。引入价截止日见本站 Carbon 全面开放那篇。改预算前再打开定价页。

### thinking_level 怎么设，还能传 minimal 吗？

Hydrogen 的档位是 low、medium、high 和 xhigh，默认 high。文档建议从 high 开始，xhigh 留给 high 不够的难任务。xhigh 会增加延迟和 token，简单提示上可能想太多。传 minimal 会报错。Carbon 和 Argon 默认 medium，最高到 high。想少花 token，先降低 thinking_level，不要把 max_output_tokens 卡得很低。

### 免费层的内容会被拿去改进 Google 产品吗？

会。定价页写免费层 Used to improve our products 为 Yes，Standard、Batch、Flex、Priority 的付费层为 No。免费层不另收费，但有速率限制，而且 Batch 和 Flex 的免费层是 Not available。公司文档和未公开代码先确认能不能走免费层。另有仅邀请的 Contributor 预览档，付费侧写的是 Yes，不要把它当成普通付费层。

## 信息来源

- Google 官方博客，Koray Kavukcuoglu：[Introducing Gemini 4 Hydrogen](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)（2026-11-12）。定位、当天推送的产品名单、相对 3.8 Flash 的速度和榜单、安全数字、Sheets canvas 的速度说法，以及 Orchestrator 在 Terminal-Bench 4.0 上的 24% 和 19%，以这篇为准。
- Google 开发者博客：[Build with Gemini 4 Hydrogen](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/)（2026-11-12）。同日面向开发者的说明，并指向 What's new 和 Antigravity 博客。本文没有把榜单数字单独记到这一篇。
- Google 搜索博客，Robby Stein：[Google Search gets a major upgrade with Gemini 4 Hydrogen](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/)（2026-11-12）。“搜索迄今最大的模型升级”、全球对所有用户开放，以及意图、扇出、视觉回答和语言理解，以这篇为准。
- Google Antigravity 博客：[Gemini 4 Hydrogen and Orchestrator](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/)（2026-11-12）。Orchestrator 的交接例子、Terminal-Bench 4.1 上的 24% 和 19%、Pro 与 Ultra 的档位、企业入口，以及数万个 swarm，以这篇为准。
- Google DeepMind 模型卡：[Gemini 4 Hydrogen model card](https://deepmind.google/models/model-cards/gemini-4-hydrogen/)。介绍文写更多安全细节见模型卡。本文没有从模型卡另引一组新分数。
- Google AI Studio：[What's new in Gemini 4 Hydrogen](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen)。模型 ID、1,048,576 的共用窗口、65,536 的同步上限、思考档、Managed Agents 的默认模型、从 3.8 Flash 迁移的清单，以及 Carbon 会用更多思考 token，以这篇为准。
- Google AI Studio 定价页：[Gemini API pricing](https://aistudio.google.com/docs/pricing)（本文于 2026-11-13 核对）。Standard、Batch、Flex、Priority 的单价，隐式缓存，免费层的数据使用，grounding 的 5,000 次和 14 美元，以及 3.8 Flash、Carbon、Argon 的 Standard 单价，以该页为准。页面会改。
- TechCrunch：[Google’s latest search upgrade promises better answers to your most complicated questions](https://techcrunch.com/2026/11/12/googles-latest-search-upgrade-promises-better-answers-to-your-most-complicated-questions/)（2026-11-12，11:27 AM PST）。用于核对搜索升级报道的刊出时间。
- The Verge，Stevie Bonifield：[Google’s new Gemini model is better at understanding complicated questions](https://www.theverge.com/ai-artificial-intelligence/1032505/google-search-ai-mode-gemini-4-hydrogen)（2026-11-12，9:55 PM UTC）。用于核对 Stein 关于 AI Mode 默认模型和 AI Overviews 的引语，以及 Google 把 Hydrogen 和 Claude Sonnet 5.5、GPT-6.1 Terra 放在一起的比较。
- 9to5Google，Abner Li：[Google announces Gemini 4 Hydrogen with ‘significant leaps’ in speed, intelligence](https://9to5google.com/2026/11/12/gemini-4-hydrogen-launch/)（2026-11-12）。用于核对应用选择器标签、Flash 牌子那句概括，以及 Antigravity 界面里的 Extra。选择器会变。

成本例子里的 token 数、次数和缓存命中量都是示例假设，只使用上述官方单价做乘法。
