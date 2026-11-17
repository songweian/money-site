---
title: "GPT-6.2 Astra 和 Sol 来了：旗舰降价两成，普通聊天里还用不了"
description: "2026 年 11 月 17 日 OpenAI 发布 GPT-6.2 Astra 和 Sol。Astra 输入与输出标价比 GPT-6 Astra 低两成，但两者都不在普通 Chat。本文说明在哪用、账单怎么读、这周先试什么。"
pubDate: 2026-11-18T06:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "OpenAI", "GPT-6.2", "API 成本"]
keyword: "GPT-6.2 Astra Sol"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "普通 ChatGPT 聊天里能用 GPT-6.2 吗？"
    a: "不能。2026 年 11 月 17 日起，GPT-6.2 Astra 和 Sol 在 ChatGPT Work 和 Codex 里提供给 Plus、Pro、Enterprise 和 Edu。社区公告里转述的帮助说明写明，这次上线不把这两个模型加进普通 Chat。2026-11-18 核对的企业按 token 计费价目卡也写明，这两行只用于 Work 和 Codex。Enterprise 和 Edu 还要工作区管理员打开。"
  - q: "我有 Plus 或 Pro，为什么模型列表里还没有？"
    a: "先更新 ChatGPT 桌面版：菜单里选 Check for Updates，然后重启。如果用 Codex CLI，也更新到最新版。发布当天的社区里已经有人更新后仍看不到，也有人网页上有、手机上没有。帮助说明写明，还取决于套餐、工作区权限和放量进度，可能还没到你的账号。Pro 500 可以用两个模型的 Ultrafast；Pro 200 的 Ultrafast 先从 GPT-6.2 Sol 开始。官方点名的套餐是 Plus、Pro、Enterprise 和 Edu，没有把 Business 写进这句。"
  - q: "要把 GPT-6.1 Sol、Terra 或旧版 Astra 全部换成 6.2 吗？"
    a: "不要整站换。日常工作先用同一件真实任务试 GPT-6.2 Sol。最难的专业文档、幻灯片、科研和复杂构建再试 Astra。量大、单价更低的流程继续留在 Terra 或 Luna 上，用同一批样本看返工有没有增加。Sol 的 API 标价和 GPT-6.1 Sol 相同，不是 Terra 那种更低的单价。"
  - q: "Astra 是每个任务便宜 20%，还是每个 token 便宜 20%？"
    a: "官方写的是标价。相对 GPT-6 Astra，输入和输出每百万 token 低 20%，缓存输入有 60% 折扣：标准短上下文是输入 8 美元、缓存输入 0.40 美元、输出 40 美元。每个任务花多少还取决于用了多少 token、推理档位、缓存有没有命中，以及输入有没有超过 27.2 万。官方在部分榜上称任务成本更低，那是他们的测试。你的账单可以不一样。改预算前再打开定价页。"
  - q: "榜单上的分差，代表我的工作也会提高同样多吗？"
    a: "不会。Agents’ Last Exam、Harvey、GDPval 是 OpenAI 自己的测试。Artificial Analysis、Epoch、Vals 的名次和成本是另一套口径，编程和法律并不是一边倒。用你自己的两三件任务记下采纳、返工和花费，不要把某一分差写成你的通过率。"
---

2026 年 11 月 17 日，OpenAI 发布 GPT-6.2 Astra 和 GPT-6.2 Sol。Astra 给最难的项目，Sol 给日常。API 上，Astra 的输入和输出标价比 GPT-6 Astra 低 20%，缓存输入有 60% 折扣。Sol 的标价维持 GPT-6.1 Sol。普通 Chat 里没有这两个模型。

这是 10 月 26 日 GPT-6.1 Terra 之后的下一则产品线更新，不是把那篇重写一遍。任务先按难易拆开，沿用 [按任务分工，不要整站换新](/posts/october-ai-model-roles/)。本文只补当天能核对的四件事：在哪用、哪一格账单会翻倍、官方榜和第三方榜哪一句不能合成、这周先试哪一类。API 单价来自官方博客和模型页。企业 Work 与 Codex 的美元价目，核对日期是 2026 年 11 月 18 日。改生产预算之前，再打开一次定价页和你账号里的用量页。

## 11 月 17 日发布了什么

官方博客的日期是 2026 年 11 月 17 日。同一天，官方 X 账号 @OpenAI 从 2026-11-17T17:54:03Z 起发了线程，社区公告是当天 18:00 UTC。The Verge 的 Emma Roth 在当天 17:45 UTC 确认了发布。The Decoder 也在当天做了报道。

能用的入口，按官方博客、社区公告和 2026-11-18 的企业价目卡：

- Plus、Pro、Enterprise 和 Edu，从当天起可以在 ChatGPT Work 和 Codex 里用。社区公告下的回复转述帮助中心：这次上线不把 GPT-6.2 Astra 或 Sol 加进普通 Chat。价目卡同样把这两行限定在 Work 和 Codex。只在普通聊天里用 AI 的人，这周用不上。
- Pro 500 可以用两个模型的 Ultrafast。Pro 200 第一次有 Ultrafast，先从 GPT-6.2 Sol 开始。API 里两个模型都能开 Ultrafast。模型 ID 是 `gpt-6.2-astra` 和 `gpt-6.2-sol`。
- 符合条件的 Enterprise 和 Edu，要等工作区管理员打开。
- 发布当天的社区里已经有人看不到：有人桌面版更新后仍没有，有人网页上有、手机上没有，也有 Business Premium 座位没有。官方点名的套餐没有写 Business。先在桌面菜单里选 Check for Updates，然后重启；用 Codex CLI 的，把 CLI 也更新。做完仍没有，就是套餐、工作区权限或放量还没到这个账号。

模型页在 2026-11-18 写明的规格：文字和图像进，只出文字，不支持音频和视频。上下文窗口 1,050,000，最大输入 922,000，最大输出 128,000。922,000 + 128,000 = 1,050,000，三格是并列的上限，不要理解成输入和输出还能同时超出窗口。知识截止：Astra 是 2026 年 5 月 18 日，Sol 是 2026 年 6 月 1 日。Chat Completions、Responses 和 Batch 支持；Assistants、Realtime 和微调不支持。API 会拒绝 `reasoning.effort` 为 `none` 的请求。从允许 `none` 的旧调用迁过来，要先改档位。Responses API 的工具包括 `computer_use`、`web_search` 等，完整名单以模型页为准。

官方定位要带上「这是厂商的说法」。Astra 面向最难的项目：幻灯片、表格和文档读起来不那么像 AI，更跟着模板和行业习惯走；只给一张截图，也可以跟到版式、颜色、字体和字号。代码更干净，前端更好，官方点名网站、游戏和三维设计。Sol 面向日常：比 GPT-6.1 Sol 更聪明、更省，同一付费计划里能完成更多任务。OpenAI 称很多员工把它当作技术和非技术工作的默认模型。员工用法不是你的默认配置。The Verge 当天确认的范围，就是这次发布、这几类成品，以及 Sol 相对前代更聪明、更高效。

## 标价怎么读：两成是每个 token

下面是标准档、短上下文、每百万 token 的美元标价。6.2 的数字来自官方博客和模型页。GPT-6 Astra 的 10 / 1 / 50，是本站 2026-10-26 的 Terra 文记录过的；2026-11-18 的企业 Work/Codex 价目卡上仍是这三格。API 定价页会改，下预算前再打开 [API Pricing](https://developers.openai.com/api/docs/pricing)。

| 模型 | 输入 | 缓存输入 | 输出 |
| --- | --- | --- | --- |
| GPT-6.2 Astra | 8 美元 | 0.40 美元 | 40 美元 |
| GPT-6 Astra | 10 美元 | 1 美元 | 50 美元 |
| GPT-6.2 Sol 与 GPT-6.1 Sol | 2 美元 | 0.10 美元 | 10 美元 |

(10 − 8) / 10 = 20%，(50 − 40) / 50 = 20%，和博客的「输入和输出低 20%」一致。缓存输入 (1 − 0.40) / 1 = 60%。这是单价。一次任务便不便宜，还要看 token。Sol 这一行没有降价。官方说它更高效，所以同一计划能做更多，那是效率，不是单价。价目卡上另有一列 GPT-6 Sol，缓存输入是 0.20 美元。那不是 6.2 Sol。看错行，会把缓存估高一倍。

模型页的缓存写入，针对短上下文标准价，每百万 token：Astra 保留 30 分钟是 10 美元、12 小时是 20 美元；Sol 是 2.50 美元和 5 美元。写入价高于普通输入。只写入、后面不再读，比不缓存更贵。

另外几条倍数要分开记：

- API 上，输入超过 27.2 万 token 时，整次请求的输入和缓存单价翻倍，输出按短上下文价的 1.5 倍。加在整单上，不是只加超出的那一段。
- 2026-11-18 的企业价目卡另写：用 ChatGPT 账号登录的 Codex，长上下文不加这个倍数；用自己的 API 密钥走 Codex，按 API 计。同一张卡写明，Codex 不对缓存写入收费。那是 ChatGPT 登录的路径，不是 API 模型页上的写入价。区域处理按标准价的 1.1 倍，以合同为准。
- Batch 是标准价的 50%。Fast 是同一上下文长度下标准价的 2 倍。Ultrafast 到 2027 年 2 月 28 日是 3 倍，2027 年 3 月 1 日（太平洋时间）起是 6 倍。企业价目卡上 6.2 的 Ultrafast 倍数与此一致。不要把这几个倍数再互相乘成文档没写的价。

套餐限额没有被写成变大。官方博客说，更难的任务上输出 token 更少，所以限额里能做更多。2026-11-18 核对到的是企业按 token 计费的美元价，和 API 标准价相同，页上没有 Plus 或 Pro 的积分点数。本站 Terra 文里的积分表不能套到 6.2。信用点数去帮助中心的 Credit based Pricing，本文不编点数。额度页面怎么读，见 [免费 AI 工具怎么挑](/posts/free-ai-tool-limits/)。

## 示例假设：单价乘一组假设 token

下面的 token 数都是**示例假设**，不是官方统计，也不是你的账单。默认短上下文、标准档、不假设缓存命中，除非这一小节单独写出。

假设输入 10 万 token（0.1 个百万），输出 5 千 token（0.005 个百万）。

- GPT-6.2 Astra：0.1 × 8 + 0.005 × 40 = 0.80 + 0.20 = 1.00 美元。
- GPT-6 Astra：0.1 × 10 + 0.005 × 50 = 1.00 + 0.25 = 1.25 美元。

差额 0.25 美元，0.25 / 1.25 = 20%。token 结构相同、输入和输出都少两成时，这一单也少两成。输出变长，这两成就没了。若计费输出变成 1.25 万（0.0125 个百万），6.2 Astra 是 0.1 × 8 + 0.0125 × 40 = 1.30 美元，高于旧 Astra 在 5 千输出时的 1.25 美元。盈亏点 (1.25 − 0.80) / 40 × 1,000,000 = 11,250。在这组假设里，输出从 5,000 增到 11,250 个 token 就持平。11,250 不是官方阈值。

同一组输入若拆成 2 万新输入、8 万缓存读取，输出仍是 5 千：

- GPT-6.2 Astra：0.02 × 8 + 0.08 × 0.40 + 0.005 × 40 = 0.392 美元。
- GPT-6 Astra：0.02 × 10 + 0.08 × 1 + 0.005 × 50 = 0.53 美元。

差价大于 20%，因为缓存读取从 1 美元降到 0.40 美元。能不能命中，看控制台。

只算每百万 token 的前缀。30 分钟写入再读一次：Astra 是 10 + 0.40 = 10.40，低于两次不缓存的 16；Sol 是 2.50 + 0.10 = 2.60，低于 4。12 小时只再读一次：Astra 是 20.40，高于 16；Sol 是 5.10，高于 4。12 小时再读第二次，才低于三次全程不缓存。间隔超过保留时间，命中消失，写入费照付。

长上下文再算一单。输入 30 万 token（超过 27.2 万），输出 1 万。API 整单按输入 16 美元、输出 60 美元（40 × 1.5）：0.3 × 16 + 0.01 × 60 = 5.40 美元。误用短上下文价是 0.3 × 8 + 0.01 × 40 = 2.80 美元。多出来的 2.60 美元是整单倍数。用 ChatGPT 登录的 Codex，按价目卡不加这个倍数。上面那 1.00 美元若走 Ultrafast，到 2027 年 2 月 28 日是 3.00 美元，之后是 6.00 美元。

## 官方分数和第三方分数要分开

下面要么是 OpenAI 自己的测试，要么是 The Decoder 在 2026 年 11 月 17 日对第三方榜的转述。都不是你的报告、表格或仓库的通过率。

官方博客这几条，引用时保留「他们的榜、他们的成本」：

- Agents’ Last Exam：GPT-6.2 Astra 比 GPT-6 Astra 高 5.2 分，成本不到三分之一；比 Claude Fable 5.2 高 5.5 分，成本只有对方的 5%。脚注写明，Fable 5.2 的排行榜结果排除了九个使用过回退模型的任务。
- 社区公告另有一句，不要并进上一句：6.2 Astra 在 xhigh，比 GPT-6 Astra 的 max 高 5.2 分，任务成本不到一半。档位和「一半 / 三分之一」都不同。
- Terminal-Bench-Science 0.1：比 GPT-6 Astra 高 9 个百分点，成本不到三分之一。官方还称 Vals Science Index 上创下新高。
- FrontierCode 2.0，两边都在 max：Sol 和 6.2 Astra 相差在 0.5 分以内，成本大约是五分之一。LifeVal 上，Sol 超过 GPT-6 Astra，成本大约是七分之一。
- Harvey LAB-AA v1.1：官方称 Astra 把 Claude Fable 5.2 的通过率提高了一倍以上，成本大约是六分之一。「Astra for Law」是面向律师的配置，官方称分数更高。标题分数要求每条标准都达到，并且没有实质性幻觉。
- 内部 GDPval v2：Astra 比 GPT-6 Astra 高 6.2 个百分点，输出 token 少 22%；Sol 比 GPT-6.1 Sol 高 5.3 分。
- 博客引用 Artificial Analysis 的 AA-AnalystAgent：在加州 Medicaid 交通支出那道例题上，五次独立尝试全部答对的比例是 62.5%。同一篇博客写的 AA-3D 盲评：Astra 1,318 Elo，Fable 5.2 是 1,271，Sol 是 1,259。

2026-11-18 的价目卡上，GPT-6.2 Astra for Law 的标准 token 价和 Astra 相同，需要 Trusted Access，上线时没有 Fast 和 Ultrafast，促销价至少维持到 2026 年 12 月 31 日。Fable 的日常留在哪一档，见 [Claude Fable 5.2 的选型](/posts/claude-fable-5-2-guide/)。OpenAI 写的「成本只有 5%」不能拿去改那篇里的单价。

The Decoder 当天转述的第三方结果，和上面并排放：

- Artificial Analysis 的 Intelligence Index：Astra 为 62，排第二，Fable 5.2 为 65；比 GPT-6 Astra 高 5，超过 Gemini 4 Carbon 的 60 和 Claude Opus 5.5 的 59。Sol 升到 57，和 GPT-6 Astra 同一水平，每个任务的成本大约只要 15%。这家称，成本与性能的帕累托前沿上，大部分位置在 OpenAI。
- Coding Agent Index，用 Codex 工具链、最大算力：Astra 相对 GPT-6 Astra 持平；Sol 比 GPT-6.1 Sol 低 3 分，主要来自 SWE-Atlas-QnA-AA 上降了 14 分。官方「代码更好」不是每一张编程榜都上升。
- AA-Omniscience 幻觉率，最大推理档：Astra 59%，Sol 55%。The Decoder 注明，题目异常难，不是日常聊天里的比例。
- Epoch AI：能力指数 174，与 Fable 5.2 持平。在 Epoch 自己的真实研究任务上，Astra 落后 Fable 5.2，相对 GPT-6 Astra 几乎没有提高。FrontierMath Erdős：68 题里做出 7 题，并在 Lean 里通过形式化验证；此前纪录是 GPT-6.1 Sol 的 3/68。
- Vals AI：Astra 第 7，Sol 第 9，相差 1.6 分。Sol 每任务 3.18 美元，Astra 每任务 10.68 美元，Vals 称 Sol 是前十里最便宜的。Astra 比 GPT-6 Astra 高 2.6 分，任务成本大约是 GPT-6 Astra 每任务 21.28 美元的一半。Vals 支持科学榜上的领先。法律榜弱得多：HLAB 上 Astra 第 11、Sol 第 21；Legal Research 上 Astra 第 30、Sol 第 52。Harvey 的领先要和这两张榜一起看。

网络安全只记使用限制，不写利用步骤。官方 X 称，GPT-6.2 Astra 是他们迄今网络安全能力最强的模型，在 ExploitBench Internal Port 上比 GPT-6 Astra 高 22 分。因为能力提高，两个模型对高风险网络安全协助收得更紧。官方说正在把模型接到 Daybreak，让通过审核的防御方以更少的拒绝来使用。The Decoder 报道，两者在 Preparedness Framework 的网络安全项达到 Critical，GPT-6 Astra 也曾达到；公开的网络安全数字来自关掉防护的内部测试。正当的安全测试也可能被拒绝。官方博客还写，两者在生物与化学能力上达到 High，并加了防护，相关请求同样可能被拦。

自我改进只作一句背景。官方博客称，GPT-6.2 Astra 是第一个对外发布、在 AI 自我改进上达到 High 的模型，并把它写成风险：能加快研究的模型，也可能让进展快过防护和人工监督。The Decoder 当天如此报道。这不是换模型的理由。

## 这周意味着什么，以及怎么试

日常先试 Sol。说明、邮件、规则清楚的修改，用 `gpt-6.2-sol`，不要一上来开 Astra 或 Ultrafast。最难的模板幻灯片、行业文档和表格、终端里的科研步骤、网站、游戏和三维，再单独拿 `gpt-6.2-astra` 和你现在的模型比。科学类的第三方榜大体同向，法律和一部分编程榜不是，所以不要用「旗舰」覆盖全部专业活。

已经在 Terra 或 Luna 上算过账、每天要跑很多次的活，不要因为 Astra 标价降了两成就停掉。6.2 Sol 的单价和 6.1 Sol 相同，仍然高于 Terra。中档和旗舰怎么分开，见 [GPT-6.1 Terra 的价格与选型](/posts/gpt-6-1-terra-cost-guide/)。同一批样本的返工没有增加，再考虑挪过去。套餐能多做多少，取决于输出 token 是不是真的变少，不取决于模型名字。从旧 API 迁过来，先去掉 `none` 档；API 上还要看输入会不会超过 27.2 万。

一周只做这六步：

1. 从上周挑 2 到 3 件真实任务。一件日常，一件难的文档、幻灯片或复杂修改，一件已经在 Terra 或 Luna 上的大量活。每件都要人能在一天内判断对错。
2. 现在的模型、Sol、必要时 Astra 并排跑。只记三项：人是否直接采纳、返工几分钟、这次花了多少。API 用控制台的输入、缓存和输出 token 乘上面的单价。套餐看用量页，没有点数表就不要自己填一个整数。
3. 日常的试运行默认先改成 Sol。Astra 只留给返工明显更少的那一类。两个同时换成默认，就分不清是模型变了还是题目变了。
4. API 上单独盯长上下文。输入超过 27.2 万 token，整单变贵，合同和长日志能拆就先拆。ChatGPT 登录的 Codex 按 2026-11-18 的价目卡不加倍数，拆开仍然通常更准。
5. 不急的批量走 Batch，API 上是标准价的一半。Ultrafast 先关着。只有等待的损失已经大于三倍花费，再考虑打开，并写上 2027 年 3 月 1 日（太平洋时间）之后会变成六倍。
6. 发送、付款、改权限留在人手里。模型可以操作电脑，这三步仍然由人确认。

一周结束只留一个变化：要么日常切到 Sol，要么某一类难任务切到 Astra。返工变多的那一类退回原模型。记录照 [AI 提效怎么量化](/posts/ai-productivity-measurement/) 来记。最低限度用这张空表，不要填演示数字。

| 日期 | 任务 | 模型 | 直接采纳 | 返工（分钟） | 花费从哪来 |
| --- | --- | --- | --- | --- | --- |
| 填当天 | 一件真实任务 | 现用模型 / Sol / Astra | 是或否 | 填分钟 | 控制台 token 或用量页 |

这几件事直接避开：不要在普通 Chat 里找 GPT-6.2；不要把暂时看不到当成账号坏了；不要把 Business 写成官方已经点名，也不要写成永久排除；不要用 Harvey 一笔盖过 Vals 的法律名次，Astra for Law 还要单独审批；不要把编程说法当成每一张榜都上升；不要把 Ultrafast 当成折扣；不要跳过 Enterprise 和 Edu 的管理员开关；不要把某一条榜的分差写成你的通过率；不要为了网络安全分数去试高风险请求。

## 常见问题

### 普通 ChatGPT 聊天里能用 GPT-6.2 吗？

不能。2026 年 11 月 17 日起，GPT-6.2 Astra 和 Sol 在 ChatGPT Work 和 Codex 里提供给 Plus、Pro、Enterprise 和 Edu。社区公告里转述的帮助说明写明，这次上线不把这两个模型加进普通 Chat。2026-11-18 核对的企业按 token 计费价目卡也写明，这两行只用于 Work 和 Codex。Enterprise 和 Edu 还要工作区管理员打开。

### 我有 Plus 或 Pro，为什么模型列表里还没有？

先更新 ChatGPT 桌面版：菜单里选 Check for Updates，然后重启。如果用 Codex CLI，也更新到最新版。发布当天的社区里已经有人更新后仍看不到，也有人网页上有、手机上没有。帮助说明写明，还取决于套餐、工作区权限和放量进度，可能还没到你的账号。Pro 500 可以用两个模型的 Ultrafast；Pro 200 的 Ultrafast 先从 GPT-6.2 Sol 开始。官方点名的套餐是 Plus、Pro、Enterprise 和 Edu，没有把 Business 写进这句。

### 要把 GPT-6.1 Sol、Terra 或旧版 Astra 全部换成 6.2 吗？

不要整站换。日常工作先用同一件真实任务试 GPT-6.2 Sol。最难的专业文档、幻灯片、科研和复杂构建再试 Astra。量大、单价更低的流程继续留在 Terra 或 Luna 上，用同一批样本看返工有没有增加。Sol 的 API 标价和 GPT-6.1 Sol 相同，不是 Terra 那种更低的单价。

### Astra 是每个任务便宜 20%，还是每个 token 便宜 20%？

官方写的是标价。相对 GPT-6 Astra，输入和输出每百万 token 低 20%，缓存输入有 60% 折扣：标准短上下文是输入 8 美元、缓存输入 0.40 美元、输出 40 美元。每个任务花多少还取决于用了多少 token、推理档位、缓存有没有命中，以及输入有没有超过 27.2 万。官方在部分榜上称任务成本更低，那是他们的测试。你的账单可以不一样。改预算前再打开定价页。

### 榜单上的分差，代表我的工作也会提高同样多吗？

不会。Agents’ Last Exam、Harvey、GDPval 是 OpenAI 自己的测试。Artificial Analysis、Epoch、Vals 的名次和成本是另一套口径，编程和法律并不是一边倒。用你自己的两三件任务记下采纳、返工和花费，不要把某一分差写成你的通过率。

## 信息来源

- OpenAI 官方博客（2026-11-17）：[Introducing GPT-6.2 Astra and Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol/)。可用范围、Ultrafast、降价比例、官方榜单和脚注，以这篇为准。
- OpenAI 研究发布索引：[Release](https://openai.com/research/index/release/)。这篇发布也列在该索引上。
- 官方 X 线程：[@OpenAI](https://x.com/OpenAI/status/2122750124543926515)（2026-11-17T17:54:03Z 起）。ExploitBench Internal Port 高 22 分、防护收紧和 Daybreak，以该线程为准。
- OpenAI 社区公告（2026-11-17，18:00 UTC）：[GPT-6.2 Astra and Sol are now available](https://community.openai.com/t/gpt-6-2-astra-and-sol-are-now-available/1417531)。xhigh 对 max 的那句、不加进普通 Chat、更新桌面版和 Codex CLI，以及发布当天有人看不到，以这篇及其回复为准。
- 模型页（2026-11-18 核对）：[GPT-6.2 Astra](https://developers.openai.com/api/docs/models/gpt-6.2-astra.md)、[GPT-6.2 Sol](https://developers.openai.com/api/docs/models/gpt-6.2-sol)。规格、缓存写入、长上下文加价、Batch / Fast / Ultrafast、拒绝 `none` 和接口支持，以这两页为准。
- API 定价页：[API Pricing](https://developers.openai.com/api/docs/pricing)。改预算前再看当前页。本文的乘法只用上面写出的单价。
- OpenAI 帮助中心（2026-11-18 核对）：[ChatGPT Rate Card (Enterprise token-based pricing)](https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing)。Work 与 Codex 的美元标准价、普通 Chat 不含 6.2、Codex 登录不加长上下文倍数、不收缓存写入、Astra for Law 的审批和促销截止日期，以该页当天文字为准。这页没有 Plus / Pro 的积分点数。
- The Verge，Emma Roth（2026-11-17，17:45 UTC）：[OpenAI releases its updated GPT-6.2 Astra model](https://www.theverge.com/tech/1035483/openai-releases-its-updated-gpt-6-2-astra-model)。
- The Decoder（2026-11-17）：[OpenAI launches GPT-6.2 Astra and Sol](https://the-decoder.com/openai-launches-gpt-6-2-astra-and-sol-with-lower-api-prices-and-some-benchmark-gains/)。Artificial Analysis、Epoch、Vals 的名次和任务成本，幻觉率，Critical 阈值，以及公开网络安全数字来自关掉防护的内部测试，以这篇转述为准。

成本例子里的 token 数都是示例假设，只使用上述官方单价做乘法。
