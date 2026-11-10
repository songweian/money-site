---
title: "Gemini 4 Carbon 已开放：引入价用到 11 月 30 日"
description: "2026 年 11 月 10 日起，付费开发者、企业和 AI Ultra 可用 Gemini 4 Carbon。本文补上引入期截止日、定价页的缓存与思考 token，以及 /swarm 预览和按官方单价做的试跑演算。"
pubDate: 2026-11-11T08:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "Gemini", "API 成本", "Antigravity"]
keyword: "Gemini 4 Carbon 全面开放"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "付费开发者现在能在 API 里调用 Carbon 吗？"
    a: "能。2026 年 11 月 10 日的 Google 官方博客写明，Gemini API 付费层经由 Google AI Studio 和 Gemini for business，向所有付费开发者和企业开放。开发者名单里还有 Android Studio。AI Studio 定价页的模型 ID 是 gemini-4-carbon，并写明没有免费层。Google AI Ultra 订阅者还可以在 Antigravity 里用。"
  - q: "没有 AI Ultra，能在 Gemini 应用里用 Carbon 吗？"
    a: "官方把 Gemini 应用和搜索 AI Mode 里的 Carbon 写给 Google AI Ultra 订阅者。9to5Google 写 Argon 仍面向 AI Pro 及以上。The Verge 写，尚不清楚 Carbon 何时或是否会给更低档订阅或免费用户。没有 Ultra 的人，这周继续用已经能打开的模型。"
  - q: "11 月 30 日之后单价是多少？缓存和思考 token 怎么算？"
    a: "博客脚注写引入期在 2026 年 11 月 30 日结束，之后公开版为每百万 token 输入 4 美元、输出 20 美元。定价页写 Standard 的 2 美元和 10 美元用到 11 月 30 日，12 月 1 日起为 4 美元和 20 美元。上下文缓存是 0.10 美元，之后 0.20 美元，且只支持隐式缓存。输出价包含思考 token。页面没写截止钟点。"
  - q: "/swarm 会比普通对话更费配额吗？"
    a: "会。Antigravity 博客原话警告：即便有零 token 的空闲等待和动态模型热切换，并行多智能体系统消耗配额仍远快于普通对话。/swarm 当天在 Antigravity App 和 CLI 以预览推送。AI Ultra 可以在 App、CLI 和 IDE 扩展里用 Carbon。"
  - q: "日常写材料和改代码，要换成 Carbon 吗？"
    a: "先不要整站换。官方仍把 Argon 当作多数软件工程和知识工作的首选，Carbon 用于最难的任务，并且会用更多 token。用同一批任务记下计费 token、返工和采纳率，再决定是否只替换这一类。榜单上的名次代替不了这张表。"
---

2026 年 11 月 10 日，Google 把 Gemini 4 Carbon 开放给付费开发者、企业和 Google AI Ultra 订阅者。博客由 Google DeepMind 高级副总裁、Google 首席 AI 架构师 Koray Kavukcuoglu 署名。两周前，Carbon 先经 Fairwind Program 给了一部分网络安全防御者。

10 月 29 日的 [Gemini 4 Carbon 发布：多数人还用不上](/posts/gemini-4-carbon-what-it-means/) 对照的是 10 月 28 日那篇发布文。那篇把几格留空：一般账号何时能调用、引入期哪一天结束、引入期结束后的缓存单价，以及思考过程的 token 算不算进账单。这几格里，前三格现在有了公开答案，思考 token 也在定价页上写明了。10 月 28 日已经列过的榜单百分比，这篇不重复。同一天 Antigravity 预览的 /swarm，是这篇要补上的另一块。

对还在用 AI 写材料、改代码、跑自动化的人，11 月 10 日能核对的结论有四条。付费 API 和 AI Ultra 现在进得去；免费层和更低档订阅没有一份公开的到达日期。引入价用到 2026 年 11 月 30 日，公开版 Standard 从 12 月 1 日起按输入 4 美元、输出 20 美元计。Carbon 会比 Argon 用更多 token，单价相同不等于一次任务的账单相同。/swarm 是预览，并行跑起来比普通对话更费配额。

## 上一篇留空的格子，现在哪些有答案

下表只填 11 月 10 日博客和它所链接的 AI Studio 定价页里写明的内容。定价页本文核对的是当天能打开的那一版，以后会改。

| 上一篇留空的问题 | 现在能写上的答案 | 仍然没有写死的部分 |
| --- | --- | --- |
| 一般开发者和企业何时能调用 | 11 月 10 日起走付费层：AI Studio 的 Gemini API，以及 Gemini for business。开发者名单里还有 Android Studio。定价页模型 ID 是 `gemini-4-carbon`，免费层写明 Not available | 更低档订阅和免费的应用用户何时或是否能用。The Verge 称尚不清楚 |
| Gemini 应用和搜索里的 AI Mode | 向所有 Google AI Ultra 订阅者推送，同时进入 Google Antigravity | 没有 AI Ultra 的账号。9to5Google 写 Argon 仍面向 AI Pro 及以上 |
| 引入期哪一天结束 | 博客脚注：2026 年 11 月 30 日结束。定价页：2 美元和 10 美元用到 11 月 30 日，4 美元和 20 美元从 12 月 1 日起 | 截止的钟点和时区。两页都没写 |
| 引入期结束后的缓存价 | 博客脚注仍只写输入 4 美元、输出 20 美元。定价页写出上下文缓存：11 月 30 日前每百万 0.10 美元，12 月 1 日起 0.20 美元。只支持隐式缓存 | 你的提示会不会命中隐式缓存。页面不保证 |
| 思考 token 是否计费 | 定价页写输出价包含思考 token；模型处理的每个 token 都计数计费，包括思考 token | 某一次回复里思考 token 占多少，仍要看你自己的账单 |

0.10 美元是 2 美元的 5%，0.20 美元是 4 美元的 5%。10 月 28 日博客写的是「缓存输入在输入价上优惠 95%」，上一篇据此把引入期缓存算成 0.10 美元，并把正式价的缓存留空。11 月 10 日这张定价页把两段缓存单价都写成了数字，所以正式价不再靠把 95% 自行外推。算法和页上的数字一致，引用时以 0.10 和 0.20 为准。

显式缓存（explicit caching）定价页写明不支持。上一篇建议把很少改的前缀从任务正文里拆开，仍然可以用来看隐式缓存有没有在账单上出现；不能据此去做一套「自己创建缓存对象」的架构。命中与否，只认用量里的 context caching 那一行。

## 谁从 11 月 10 日起用得上

官方入门名单分五类。导语写开发者、企业、科研人员和消费者现在可以试用；正文把每一类的入口写得更窄。以正文的产品名单为准。

**付费开发者。** 用 Gemini API 的付费层，入口是 AI Studio，名单里还有 Android Studio。Google AI Ultra 订阅者还可以在 Google Antigravity 和 AI Studio 里试。定价页写 Carbon 不在免费层。还没开通付费层的独立开发者，调用不会因为这篇公告自动出现。

**企业。** 在 Gemini for business 里用，经 API 或模型下拉；官方博客同时把 Google Antigravity 和 CodeMender 写进企业可以试的名单。Antigravity 博客把企业入口概括成 Gemini for business。两篇都没有写「每个企业座位自动包含 /swarm」。企业账号要在自己的 Antigravity 里看 /swarm 是否已经出现，再决定要不要排进这周的试跑。

**日常用户，包括运营、市场和不写代码的职场人。** Gemini 应用和搜索里的 AI Mode，条件是 Google AI Ultra 订阅。9to5Google 描述了应用里的选择器：4 Argon 对应 “Code & analysis”，4 Carbon 对应 “Most complex work”，并写 Argon 面向 AI Pro 及以上，这款应用同时去掉了 3.1 Pro。这是对界面的观察，不是定价页。The Verge 写，尚不清楚 Carbon 何时或是否会开放给更低档订阅或免费用户。没有 Ultra 的人，写作、表格和客服草稿继续用这周打得开的模型。

**科研人员。** 可以申请在 Antigravity 的最高用量档免费使用 Argon 和 Carbon 六个月，按资格、容量和遴选滚动接入。官方写，四周前开放了 1 万个科学家名额免费使用 Argon 六个月，并称已经接入了数千人；11 月 10 日起，现有和以后的参与者也可以用 Carbon，之后的新前沿模型会继续提供。博客的申请文字链到一份表单（forms.gle/WvmBbPvRbpKG1BPn9）。提交表单不等于已经入选。

**网络安全防御者。** 经 Fairwind Program 申请 Carbon for cyber，滚动审核。谁优先、哪些用途允许、访问权不能转分发，上一篇核对项目页时已经写过，这里不重复那一页的资格清单。博客脚注写，引入期结束后的 4 美元和 20 美元只适用于面向公开访问的 Carbon。定价页的价目对应模型 ID `gemini-4-carbon`。Fairwind 这条线没有单独的公开单价，本文不给它报价。

## 价格：博客的两档，加上定价页的缓存和分档

博客正文的引入价与 Argon 相同：每百万 token 输入 2 美元、输出 10 美元。脚注写引入期于 2026 年 11 月 30 日结束，之后输入 4 美元、输出 20 美元，且只适用于公开版 Carbon。

「introductory price」在博客里链到 AI Studio 定价页。下表是 2026 年 11 月 10 日该页付费层的数字，单位是美元 / 每百万 token。免费层每一行都是 Not available。

| 档 | 输入，至 11 月 30 日 | 输入，12 月 1 日起 | 输出（含思考），至 11 月 30 日 | 输出，12 月 1 日起 | 上下文缓存，至 11 月 30 日 | 缓存，12 月 1 日起 |
| --- | --- | --- | --- | --- | --- | --- |
| Standard | 2 | 4 | 10 | 20 | 0.10 | 0.20 |
| Batch、Flex | 1 | 2 | 5 | 10 | 0.05 | 0.10 |
| Priority | 3.60 | 7.20 | 18 | 36 | 0.18 | 0.36 |

定价页把 Batch 和 Flex 分成两个标签。当天两个标签的 token 单价相同，所以上表并成一行。缓存一行写的是 Implicit caching only，explicit caching is not supported：只有隐式缓存，不支持显式缓存。

同一页上，Argon 的 Standard 也是 11 月 30 日前 2 美元和 10 美元、12 月 1 日起 4 美元和 20 美元，缓存同样是 0.10 然后 0.20。说明文字写：Argon 响应更快，在复杂编程、代理式任务、数学和科学任务上，每次交互的 token 花费低于 Carbon。单价表对齐之后，账单差来自 token 数。博客也写了同一件事：Carbon 用比 Argon 更多的 token，去做充分探索、深度推理和更长的验证循环。

输出列的表头是 Output price (including thinking tokens)。页上的说明还写：模型处理的每个 token 都计数并计费，包括思考 token；使用 grounding 时，内部工具的系统指令和函数声明也计费。对话框里看得见的那一段，可以短于计费输出。抄账单时抄计费输出。

用 Google Search 做 grounding 是另一只表，不包含在上面的 token 单价里。定价页写，每月 5000 次搜索请求免费，与 Gemini 3 及更新的模型共享，之后每 1000 次 14 美元，并受每天 1500 次的上限约束。你提交的一次请求可能变成多次搜索，按每次搜索计费。Google Maps 的 grounding 同样是每月 5000 次免费（同样跨模型共享），之后每 1000 次搜索查询 14 美元。下面的演算不含这两项。

付费层表格里 “Used to improve our products” 一栏是 No，并链到条款。本文只转述这一格，不展开条款正文。

**和 Fable 5.2 的标价比。** The Verge 写道，引入价大约是 OpenAI GPT-6 Astra 的五分之一、Anthropic Fable 5.2 的四分之一。引入期在 11 月底结束后价格翻倍，按 token 仍显著低于这些前沿型号；同时写明，不同模型完成同一任务用掉的 token 数可以不同，按 token 便宜不等于按任务便宜。本站 [Claude Fable 5.2：日常仍用 Opus，难任务再升级](/posts/claude-fable-5-2-guide/) 核对过的 Fable 5.2 标准价是每百万 token 输入 8 美元、输出 40 美元。Carbon 的 Standard 引入价 2 和 10，分别是 8 和 40 的四分之一；12 月 1 日起的 4 和 20，分别是 8 和 40 的一半。这是两家标价相除，不是同一次任务的账单。那篇已经写过，Fable 把 effort 开高之后，单个任务的花费可以离开这个比例。Carbon 这边先记下它比 Argon 多用 token。比谁便宜之前，两边都要有同一次任务的 token 记录。

### 一次任务的演算：按官方单价，用量是假设

下面的 token 数不是官方统计，也不是你的账单。只使用 Standard 的单价。输出按「含思考 token 的计费输出」理解。除了单独标出的那一版，不假设缓存命中。Batch、Flex、Priority 的单价不同，套进这组数之前先看控制台里这次调用走的是哪一档。

用量甲，当作「不多做额外探索」的对照：普通输入 50 万 token，即 0.5 个百万 token；计费输出 10 万 token，即 0.1 个百万 token。

- 至 11 月 30 日：0.5 × 2 + 0.1 × 10 = 2.00 美元。
- 12 月 1 日起：0.5 × 4 + 0.1 × 20 = 4.00 美元。

同样的 token 结构，费用是 2 倍，因为输入单价和输出单价各自都是 2 倍。

用量乙用来演示「Carbon 会多用 token」。官方没有给出倍数。这里假设输入和计费输出都是甲的 2.5 倍：输入 125 万 token（1.25 个百万），计费输出 25 万 token（0.25 个百万）。2.5 是为了把账算完而设的。你自己的 A/B 测出别的倍数时，换成你的数，单价不要换。

- 至 11 月 30 日：1.25 × 2 + 0.25 × 10 = 5.00 美元。
- 12 月 1 日起：1.25 × 4 + 0.25 × 20 = 10.00 美元。

在引入价下，乙是甲的 2.5 倍（5.00 对 2.00）。单价没变，多出来的 3.00 美元来自假设的额外 token。12 月 1 日之后，乙是 10.00 美元：相对甲的 4.00 美元仍是 2.5 倍，相对乙自己的引入价是 2 倍。

若一个月跑 20 次乙类任务、都不走缓存：引入期内 20 × 5.00 = 100 美元；12 月 1 日之后同样 20 次是 200 美元。这 100 美元的差额来自日历。若其中 10 次用甲的用量就够，引入期是 10 × 2.00 + 10 × 5.00 = 70 美元。少走 10 次乙，引入期少 30 美元。这就是「最难的才上 Carbon」在这组假设里的账单差。

缓存只在账单出现 context caching 用量时改公式。仍用用量乙，假设 1.25 个百万输入里有 1.00 按缓存价计、0.25 仍是普通输入。这是假设的命中。定价页不保证隐式缓存一定命中。

- 至 11 月 30 日：0.25 × 2 + 1.00 × 0.10 + 0.25 × 10 = 3.10 美元。
- 12 月 1 日起：0.25 × 4 + 1.00 × 0.20 + 0.25 × 20 = 6.20 美元。

和不缓存的 5.00 / 10.00 相比，省下的是那 1.00 个百万输入的差价：引入期 1.00 × (2 − 0.10) = 1.90 美元，12 月 1 日起 1.00 × (4 − 0.20) = 3.80 美元。输出的 2.50 或 5.00 美元没动。验证循环拉长时，大头经常在含思考的输出上。

预算采用 12 月 1 日的 Standard。引入期少付的部分当成用到 11 月 30 日为止的差额，不写进长期单价。Batch 和 Flex 的 token 单价是同一时段 Standard 的一半，Priority 是 1.8 倍（3.60 ÷ 2 = 1.8，18 ÷ 10 = 1.8，缓存 0.18 ÷ 0.10 = 1.8）。对外按包月报价的小团队，如果 AI 成本包在固定服务费里，用 4 美元和 20 美元报价，并给「token 比 Argon 更多」留出余量。页面会改，改预算之前再打开一次定价页。

## 哪些任务留在 Argon，哪些升到 Carbon

官方的分工没有改口。Argon 仍是多数软件工程和知识工作的首选。Carbon 用于考验模型上限的任务：复杂的多步编码和调试，开放式的科研和发现。

[本周 AI 模型按任务分工](/posts/october-ai-model-roles/) 写的时候，Argon 放在难任务那一列。11 月 10 日之后，那一列再拆开：多数工程和知识工作继续用 Argon；只有你已经量出「Argon 的返工更长」的那一类，才升到 Carbon。摘要、分类、客服初稿不在 Carbon 的官方用例里。9to5Google 看到的选择器文案，Argon 是 Code & analysis，Carbon 是 Most complex work，和这段分工同方向。

可以先升的，是你能在一天内判断对错的难任务。例如一个确实跨了多个文件的缺陷，一份必须引用现成数字、缺了数字就应该停下来的说明。每天跑几十次、错一条就要人工重做的批量活，留在更便宜的模型上。会直接对外发送、付款、改权限的步骤，继续由人确认。

不写代码的人先看订阅。有 AI Ultra，才能在 Gemini 应用和搜索 AI Mode 里选 Carbon。只有 AI Pro、或还在免费额度里的人，Verge 没有给出 Carbon 的到达日期。这周的材料继续用打得开的模型做完，包括仍在的 Argon。

## /swarm 预览：一个提示变成一组智能体

Antigravity 博客在同一天预览 /swarm。一个提示交给一组专门的智能体：协调者拉起 worker，worker 在各自独立的 git worktree 里并行改代码，编辑不会撞在同一棵工作区上；对抗式验证者专门跑测试、质疑 diff。所有智能体把话写到一块共享的、只追加的消息板上。空闲时按零 token 停放，下一次需要输入时再激活。

侧栏里有三块可以看。Board 上看讨论，Members 名册上看每个成员的工具活动，也可以进入某条轨迹去纠正。Graph 回放从最初的任务说明走到验证过的代码。CLI 里用 `/swarm board`，或快捷键 Alt+S，打开全屏的实时终端板。

角色可以钉不同的模型。Carbon 适合协调、架构、安全审计和对抗验证。更轻、更快的模型做并行改文件和常规实现。官方同时写，Argon 仍是多数高级工程和知识工作的合适选择。并行改文件不必默认钉在 Carbon 上。

Google 内部把 /swarm 试用了 5 周（博客用的词是 dogfooding）。工程师用它处理多包迁移、跨子系统的根因调查和复杂的架构重做。那是内部仓库上的任务类型，不是给你的通过率，也不是服务条款里的运行时间。

预览当天在 Antigravity App 和 CLI 推送。AI Ultra 订阅者可以在 Antigravity App、CLI 和 IDE 扩展里用 Carbon。博客把 IDE 扩展写进 Carbon 的入口，没有把 /swarm 写进 IDE 扩展那半句。要找 /swarm，先打开 App 或 CLI。

配额用博客原话。中文对照：即便有零 token 的空闲等待和动态的模型热切换，并行的多智能体系统消耗配额的速度仍远高于普通对话。

> As a fair warning, even with zero-token idle waits and dynamic model hot-swapping, parallel multi-agent systems consume quota much faster than a standard chat.

零 token 停放只覆盖空闲等待。worker 一起改文件、验证者一起跑测试的时候，配额按并行在烧。限额怎么分层，沿用 [AI 自动化越跑越贵怎么办](/posts/ai-automation-cost-control/) 里先给单次任务设上限的做法。博客没有写 Antigravity 里限额按钮的路径，所以上限设在你自己的用量页或团队约定里，再开始试。

试跑收小。选一个当天能回滚的小仓库或低风险分支，任务写成一句能验收的话，例如某一组测试要变绿。Carbon 钉在协调、架构和对抗验证上，改文件的 worker 用更轻的模型。看完 Board、Members 和 Graph 之后，合并仍由人做。多了一个验证者，审查习惯保持不动，对照 [AI 代码评审怎么用才不出事](/posts/ai-code-review-workflow/)。

## 榜单和安全数字，都标成厂商自述

11 月 10 日博客称，Carbon 在 CursorBench 4.0、Perplexity 的 WANDR、Zapier 的 AutomationBench 上排名第一，并且每任务成本比下一名外部模型低 2 倍以上。原文是 more than 2X lower cost per task compared to the next best external model。又称与 Artificial Analysis 合作推出 Multimodal Knowledge Agent（MKA）基准，Carbon 排第 2，平均每任务成本比第一名低 6 倍以上。原文是 more than 6X lower in average cost per task compared to the top performing model。

这些是厂商自述。The Verge 提醒，公司会挑选对自己有利的榜单结果。上一篇列过的 Intelligence Index、SEC-bench Pro、ExploitGym、CWE-bench 百分比，这篇不重复。11 月 10 日博客只说，经 Fairwind 使用时，Carbon 在找漏洞、利用、修补这三项基准上领先，没有再写出那三个百分比。

安全一节同样是官方口径。该节署名 Anca Dragan 与 Raluca Ada Popa。

- 在以 ExploitBench 和 CyScenarioBench 为种子的模拟网攻环境里，面对会在每次被拦截后修改攻击计划的自适应红队智能体，Carbon 拦截了 99% 的攻击轨迹。单次尝试的突破率是 0.8%，Argon 是 3.1%。
- Gray Swan 的测试里，自动化网攻查询成功率是 2.17%，Argon 是 9.86%。
- Google 转述 Trajectory Labs 的外部测试：132 小时、超过 13000 次请求，没有发现新的通用越狱。
- 375 项 agentic honesty 基准通过 92%，Argon 是 70%。缺失实验数据时，98% 的时候拒绝填补；68% 的时候会标出方法上的缺陷。
- Gray Swan 的 IPI 基准上，博客重申两周前公布的提示注入攻击成功率为 0%，并在同一节写明：提示注入的鲁棒性仍需继续改进。

92%、98%、0.8% 都是上述测试的结果，不是你的仓库或你的文稿的通过率。能直接用的做法是：准备一份故意少一个关键数字的材料，看模型是停下来，还是补一个看起来合理的数。账号里已经有 Carbon 的，用同一份材料再跑一次，记下拒绝、填补和返工分钟。还没有付费 API、也没有 Ultra 的，用现有模型先把这张表建起来。

## 11 月 30 日之前可以做的五件事

1. **用引入价做一轮 A/B，只比一类任务。** 从过去两周挑 10 到 20 条已经有人做完的难任务。同一条分别交给 Argon 和 Carbon。记下计费输入、计费输出（含思考）、人是否采纳、返工几分钟。比较窗口用到 11 月 30 日仍标着引入价的 Standard。一次只比这一类。十几种任务同时换，就分不清是任务变了还是模型变了。

2. **按两档单价各算一列，预算取 12 月 1 日。** 把日志里的输入和计费输出换成百万 token，代入用量甲的公式。再算一列「token 比对照更高」，倍数用你 A/B 里测到的数；还没测到之前，可以先用本文假设的 2.5 倍感受量级，并在表上标明假设。对外报价用 4 美元和 20 美元。缓存只在账单出现 context caching 时改用 0.10 或 0.20。显式缓存定价页写了不支持。

3. **把任务分成三行。** 多数工程和知识工作写 Argon。复杂的多步调试、开放式调研、缺数字就必须停的说明，写「可试 Carbon」。批量摘要和会直接对外的发送，留在更便宜的模型或人手里。不写代码的同事先看订阅：AI Ultra 才能在 Gemini 应用里选 Carbon。

4. **/swarm 先在小仓库试，并先设配额上限。** 低风险分支，一句验收标准。Carbon 只钉在协调、架构、安全审计和对抗验证，改文件用更轻的模型。试跑之前在用量上设一个你能接受的上限。空闲零 token 不等于整次 swarm 便宜。合并的人还在。

5. **符合条件再申请科研名额或 Fairwind。** 科研申请用博客指向的表单，六个月、最高用量档、按资格和容量滚动遴选。防御方走 Fairwind 项目页申请 Carbon for cyber。一般的写作、表格和客服草稿不经过这两条申请。这周的工作不排在「等入选」后面。

## 这些说法不要直接当成你的结果

- 「每任务成本低 2 倍以上」和「MKA 上平均每任务成本低 6 倍以上」是厂商自述的榜，不是你这 10 条任务的账单。
- 用量乙里的 2.5 倍、一个月 20 次、缓存命中 1.00 个百万 token，都是示例假设。换成你的日志之后，只有单价来自官方。
- 0.8%、2.17%、92%、98%、68%、99% 是官方安全测试的口径。Trajectory Labs 的「没有新的通用越狱」是 Google 转述的 132 小时、超过 13000 次请求。
- 提示注入成功率 0% 和「鲁棒性仍需改进」写在同一节。输入检查继续留在你自己的流程里。
- 引入期截止的钟点和时区，定价页没有写。Fairwind 的 Carbon for cyber 没有出现在 `gemini-4-carbon` 这张公开价目上。
- The Verge 没有回答更低档订阅和免费用户何时能用。9to5Google 的选择器文案是对 Gemini 应用界面的描述。

## 常见问题

### 付费开发者现在能在 API 里调用 Carbon 吗？

能。11 月 10 日的官方博客写明，Gemini API 付费层经由 AI Studio 和 Gemini for business，向付费开发者和企业开放。定价页的模型 ID 是 `gemini-4-carbon`，免费层不可用。Android Studio 也在开发者名单里。

### 没有 AI Ultra，能在 Gemini 应用里用 Carbon 吗？

官方把 Gemini 应用和搜索 AI Mode 的 Carbon 写给 Google AI Ultra。9to5Google 写 Argon 仍面向 AI Pro 及以上。The Verge 写，尚不清楚更低档订阅或免费用户何时或是否能用上 Carbon。

### 11 月 30 日之后单价是多少？缓存和思考 token 怎么算？

博客脚注写引入期在 2026 年 11 月 30 日结束，之后公开版为输入 4 美元、输出 20 美元（每百万 token）。定价页写 Standard 的 2 美元和 10 美元用到 11 月 30 日，12 月 1 日起为 4 美元和 20 美元。上下文缓存是 0.10 美元，之后 0.20 美元，只支持隐式缓存。输出价包含思考 token。钟点没有写。

### /swarm 会比普通对话更费配额吗？

会。Antigravity 博客警告：即便有零 token 的空闲等待和动态模型热切换，并行多智能体系统消耗配额仍远快于普通对话。/swarm 当天在 App 和 CLI 以预览推送。

### 日常写材料和改代码，要换成 Carbon 吗？

先不要整站换。Argon 仍是多数软件工程和知识工作的首选。Carbon 留给最难的任务，并且会用更多 token。用同一批任务记下计费 token、返工和采纳率，再决定是否只替换这一类。

## 信息来源

- Google 官方博客，Koray Kavukcuoglu：[Gemini 4 Carbon is now available](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)（2026-11-10）。开放范围、引入期结束日、公开版 4 美元 / 20 美元、榜单表述、安全数字和五类入口，以这篇为准。科研申请表单是该文 “Apply” 所链的 [forms.gle/WvmBbPvRbpKG1BPn9](https://forms.gle/WvmBbPvRbpKG1BPn9)。Fairwind 项目页：[deepmind.google/fairwind-program](https://deepmind.google/fairwind-program/)。
- Google AI Studio 定价页：[Gemini API pricing](https://aistudio.google.com/docs/pricing)（本文于 2026-11-10 核对）。Standard、Batch、Flex、Priority 的单价，上下文缓存，隐式缓存，思考 token 计入输出，免费层不可用，以及 Argon 的对照说明，以该页为准。页面会改。
- 10 月 28 日的发布文：[Introducing Gemini 4 Carbon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/)。本文只用来说明上一篇为何把缓存写成「输入价优惠 95%」、以及哪些格子当时是空的。榜单百分比不在这里重复。
- Google Antigravity 博客：[Gemini 4 Carbon and /swarm](https://antigravity.google/blog/gemini-4-carbon-in-google-antigravity/)（2026-11-10）。/swarm 的结构、界面、角色分工、5 周内部试用、配额警告，以及 Ultra 的 App、CLI、IDE 扩展入口，以这篇为准。
- The Verge，Robert Hart：[Google releases Gemini 4 Carbon with agent ‘swarm’ feature](https://www.theverge.com/ai-artificial-intelligence/1030787/google-gemini-4-carbon-public-rollout)（2026-11-10）。用于核对更低档订阅和免费用户的不确定性、引入价相对 GPT-6 Astra 与 Fable 5.2 的比例，以及「按 token 便宜不等于按任务便宜」。
- 9to5Google，Abner Li：[Gemini 4 Carbon rolling out to Gemini app for AI Ultra, Argon remains](https://9to5google.com/2026/11/10/gemini-app-4-carbon/)（2026-11-10）。用于核对 Argon 面向 AI Pro 及以上、选择器文案，以及应用里去掉 3.1 Pro。该文对 MKA 的转述与官方博客不一致，MKA 的名次和成本以官方博客为准。

成本例子里的 token 倍数、次数和缓存命中量都是示例假设，只使用上述官方单价做乘法。
