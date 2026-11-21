---
title: "Claude 协助证明黎曼猜想：机器核过了，别当成日常聊天也能做到"
description: "2026年11月20日，Alpöge 在个人网站称与 Claude 证明了黎曼猜想；11月21日 Lean 与 Mathlib 社区核过这条陈述。这不是产品发布，也不改价格或配额。"
pubDate: 2026-11-22T06:00:00+08:00
topic: ai-tools
tags: ["Claude", "Anthropic", "形式化验证", "AI 科研"]
keyword: "Claude 黎曼猜想 Lean 证明"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "这是不是 Anthropic 官方发布的新产品？"
    a: "不是产品发布。2026 年 11 月 20 日的笔记在 Levent Alpöge 的个人网站和 remark.pdf。他的网站抬头写着 Anthropic, PBC，以及 Harvard Society of Fellows 的 junior fellow。11 月 21 日 Lean 与 Mathlib 社区的联合声明，由 Lean FRO 和 Mathlib Initiative 背书，核的是黎曼猜想的 Lean 证明。Nature 写 Anthropic 没有立刻回复置评请求。本文打开的 Anthropic 新闻列表里，没有把这件事写成新产品、新价格或新配额。"
  - q: "是不是已经 100% 证明了黎曼猜想，奖金也发了？"
    a: "联合声明写：他们对 Alpöge 的黎曼猜想证明有 full confidence，并核证陈述和证明都正确，且他们列出的四条标准都满足。这和「人已经读懂这份库里的新想法」不是同一句，声明写明期待数学界把新想法解释出来。Sutherland 的页面页首仍是 2026-11-21 12:55 UTC，对导出文件的 Lean 默认内核、paranoid 内核，以及 lake comparator 的内核阶段，当时还没有结论。机器核过的广义部分只覆盖 Dirichlet L 函数，不包括 Dedekind zeta、Hecke L 函数和一般的自守 L 函数。克雷数学研究所把黎曼猜想列为七个千禧年大奖难题之一，每个问题配置 100 万美元。2018 年 9 月 26 日修订的规则写明，考虑一项解答之前要同时满足三条：发表在 Qualifying Outlet、发表后至少两年、并得到全球数学界的普遍接受。本文没有看到奖金已经发出的宣布。Lean 编译通过不等于奖金自动到账。"
  - q: "我用的 Claude 现在也能证明这种问题吗？"
    a: "不能从这条新闻推出你聊天窗口里的那一次回复，已经具备同样的核对。来源没有公开是哪一个 Claude 模型，也没有公开开了多少实例。Alpöge 写他引导了一个玩具情形，Claude 在后段明显快过他；他又写自己是在还没有掌握论证周围一大片数学的时候交出完整论证，并决定只公开 Lean。高风险的输出仍要有可以复核的产物：测试、格式校验、另一个人或另一套检查；专门的数学工作才用证明助手。普通读者不需要下载那份证明。"
  - q: "要不要因为这条新闻换掉正在用的模型？"
    a: "不要为这条标题改模型 ID、价格或配额。公开材料没有宣布这三样发生了变化。先把你控制台里正在用的 ID、单价或套餐、配额抄下来，生产配置维持抄下来的那一版。难任务和批量任务仍按你已经测过的分工走。哪一档模型适合日常哪一类活，看你手头已有的说明，不要从这份证明倒推模型名字。"
---

2026 年 11 月 20 日，数学家 Levent Alpöge 在个人网站贴出一份笔记，PDF 在 [remark.pdf](https://alpo.ge/remark.pdf)。他写道，自己相信已经和 Claude 一起发现了黎曼猜想（Riemann Hypothesis）的证明。2026 年 11 月 21 日，Lean 与 Mathlib 社区发表联合声明，由 Lean FRO 和 Mathlib Initiative 背书，写明他们对这份黎曼猜想证明有充分信心。声明页把时间印成「2026-11-21 13:55」，页面上没有时区。

这件事是一次形式化验证：证明被写成证明助手 Lean 可以检查的代码，再由人和多套检查程序核对「代码里的定理是不是那条猜想、检查程序接不接受这份证明」。它不是 Claude 的产品发布，不是价格调整，也不是配额调整。你聊天窗口里的下一次回复，不会因为这份库编译通过，就自动变成已经核过的终稿。

读者如果在用 Claude 或 Claude API 干活，这篇只回答四件事：20 日宣布了什么，21 日核过了哪一条，哪一些说法现在还不能写成已经发生，以及这周可以在自己的工作流里做哪几件具体的事。股价和上市过程见 [Anthropic 上市首日：用 Claude 的人该盯的四件事](/posts/anthropic-ipo-nasdaq-debut/)，本文不重写那些数字。

## 11 月 20 日宣布了什么，11 月 21 日核过了什么

Alpöge 的个人网站抬头写着 Anthropic, PBC，以及 Harvard Society of Fellows 的 junior fellow。卫报称他是土耳其裔美国数学家，并写这项工作大约用了六周。笔记不是 Anthropic 的公司博客，也不是产品公告。本文打开 [Anthropic 新闻列表](https://www.anthropic.com/news) 时，列表顶部标着 2026 年 11 月 21 日，往下是更早的产品稿，里面没有黎曼猜想这项。Nature 写，Anthropic 没有立刻回复置评请求。就本文所依据的核对而言，2026-11-21 00:00 UTC 之后，@AnthropicAI 和其他主要实验室的官方 X 账号没有就这件事发出的发布帖。本文没有另找到后来的公司博客或官方声明。若官网或官方账号之后发出声明，以那则声明为准。

笔记里和范围直接相关的原句是：I believe I have, working with Claude, discovered a proof of the Riemann Hypothesis. 紧接着他写，这个方法很容易进一步扩展，解决所谓的广义黎曼猜想（Generalized Riemann Hypothesis），并且他预期再有时间，扩展黎曼猜想（Extended Riemann Hypothesis）也会被解决。他又写：Claude and I have also formalized the arguments without assumptions. 中文是：Claude 和我还把这些论证形式化了，而且不带假设。脚注给出 14 个压缩包，从 [lean.tar.gz.part01](https://alpo.ge/lean.tar.gz.part01) 到 [lean.tar.gz.part14](https://alpo.ge/lean.tar.gz.part14)。

他怎样描述人和模型的分工，对用 AI 干活的人比形容词更要紧。英文原文是：Claude and I have had a great time together with such breadth in recent months, but this time Claude far outpaced me near the finish line. No, Claude flew, and danced, and sparkled near that finish line. 中文是：近几个月 Claude 和我在这么广的范围里合作得很愉快，但这一次临近终点时 Claude 远远跑在我前面。不，Claude 是在终点线附近飞、跳舞、闪光。同一页他写，自己把两条很不一样的想法放在一个玩具情形里，其中一条已经又新又惊人；他再把两人引导到和那个玩具情形类似的正确情形，然后 Claude 开始让他吃惊。

他同时写明自己还没有把周围的数学吃透。英文原文里的关键部分是：presenting a complete argument before having mastered a massive neighbourhood around its mathematics. 中文是：在还没有掌握论证周围一大片数学的时候，就把一个完整论证交给世界。他又认为，贴出一份巨大、无法阅读的 “slop” 文档并不合适，所以决定只公开 Lean。他打算自己把它弄懂，讲出来，并好好地写下来。脚注里他写自己曾经弄到 25 万页以上。来源没有写用的是哪一个 Claude 模型，也没有写开了多少个实例。本文不补这两个空。

关于时间，他写：The precise timing is horrible. If I could have, I'd have finished this all much earlier. 事情发生在他的周日深夜。他给 Dario 发消息，开头是 Hypothetically, if I were to have . . .，最后问到自己能不能宣布。他们把这件事理清楚了，其中有一条约束需要遵守。他又写：There is an obvious cynical view, to do with the timing, but it is false. 中文是：关于这个时间点，有一个显而易见的犬儒看法，但那个看法是错的。PDF 里的日期清单包括 10/6/26、10/8/26、10/9/26、10/14/26、10/19/26、10/20/26、11/15/26，以及标成 GRH 的 11/16/26。卫报的「大约六周」和这份清单并列，本文不另算一个工期。

11 月 21 日的联合声明第一段是：On November 20, 2026, Levent Alpöge released a proof of the Riemann Hypothesis as a Lean library comprising 17 million lines of code. 这里写的是 17 million，不是 17.4 million。下一句是：We have full confidence that Alpöge's proof of the Riemann Hypothesis is correct, and we congratulate him on this achievement. 他们写，代码库直接依赖的只有 Mathlib；他们核证黎曼猜想的陈述和证明都正确；[2026 年 11 月 12 日那篇四条标准的说明](https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/) 全部满足。四条按声明的原意是：

1. 黎曼猜想的陈述是对的。这条陈述是 Mathlib 里的 RiemannHypothesis，经过 Lean 和数论方面的专家仔细核对。
2. Alpöge 的库能正确编译。已经有几十人报告编译成功，并再现了同一份原始证明导出。库在编译时没有错误，也没有构建失败。
3. 代码证明的是那条正确的陈述。社区加了一个文件，把黎曼猜想的陈述单独放出来，并且只导入 Mathlib。这个陈述用两套工具和 Alpöge 证明的定理做过比较：`comparator` 和 `con-leche --compare`。两者都确认，库里证明的定理正好就是 Mathlib 的黎曼猜想陈述。
4. 这份 Lean 证明是有效的。导出的原始证明由多套检查程序检查过，包括 Lean 的官方内核、`con-leche`、`con-ron`，以及第三方用不同编程语言写的独立检查程序。声明写，`con-leche` 和 `con-ron` 带有一份相对于集合论的形式证明，说明它们不能接受一份假证明。检查跑在一份惰性导出上，碰不到 Lean 源码里假设存在的恶意代码。概述指向 [Andrew Sutherland 的页面](https://math.mit.edu/~drew/grh/)。

声明最后写，他们期待数学界的后续工作把这份证明里的新想法解释出来。形式化核对通过，和人已经能读懂，在这句里是两件事。

卫报的稿子是 2026 年 11 月 21 日星期六，首次发表于美国东部时间 11:39，更新于 15:15。卫报写，周六下午 Lean FRO 和 Mathlib Initiative 宣布核验了 Alpöge 的解答，并引用了上面那句 full confidence。

同一天还有另一份手稿，不要和这份 Lean 库算成同一件事。Nature 写，Alpöge 的笔记发出后，斯坦福大学的 Ravi Vakil 匆忙贴出 Alessandro Maria Masullo 的预印本。Masullo 于 2020 年在斯坦福拿博士学位，导师是 Brian Conrad。Nature 把这称为另一项声称，并写 Vakil 原本希望 Conrad 和 Masullo 再打磨一年。卫报转述《纽约时报》的则是另一套说法：周五有一位在意大利的独立数学家放出一份不完整的证明，说自己做了将近 12 年，而且不用 AI。两篇报道没有给出可以合成的同一结论。Lean 与 Mathlib 的联合声明没有核证 Masullo 的手稿。本文没有看到和联合声明同等级的、针对那份手稿的原始核验证词。

## 机器核过的是哪一条，不是哪一条

联合声明核证的对象是黎曼猜想。Sutherland 的页面另外列出五条已经检查的定理，范围要一条一条读。本文重新打开该页时，页首仍是：Page last updated 2026-11-21 12:55 UTC. Results below are as of that time and this page will be updated as the remaining checks finish. 中文是：页面最后更新于 2026-11-21 12:55 UTC，下面的结果截至该时刻，剩下的检查做完后这页还会更新。下表按这个时刻抄，不把「还在跑」写成已经通过。

| 该页列出的检查 | 截至 2026-11-21 12:55 UTC |
| --- | --- |
| 175,187 个模块，Lean v4.33.1，Mathlib v4.33.1 | 编译通过，零错误 |
| `Main.lean` 里五条标题定理的公理 | 只有 propext、Classical.choice、Quot.sound |
| leanchecker 对每个模块的内核重放 | 通过，175,187 / 175,187 |
| nanoda（独立的 Rust 内核）对完整导出 | 接受 |
| con-leche master 对完整导出 | 接受；`--verified` 模式下 1,468,418 条声明 |
| con-leche `--compare` 对五条定理 | 接受 |
| lean4lean 对已编译模块 | 175,187 个都通过；其中五个先碰到默认步数上限，提高上限后通过 |
| 对导出文件的 Lean 默认内核和 paranoid 内核 | 仍在进行，单线程，还没有结论 |
| `lake comparator`（Lean v4.36.0）从头到尾 | 仍在进行；有一次运行里陈述比对和公理检查已经通过，内核还在跑 |
| 随 Lean v4.36.0 附带的较旧 con-leche 和 con-ron | 退出码 2。页面写这不是拒绝：那些旧程序不支持证明里的一个自反归纳类型；上面的 con-leche master 支持 |

这五条定理都在提交的 `Main.lean` 里，陈述和只导入 Mathlib 的挑战文件一致。页面写，里面的数学概念用的是 Mathlib 的定义。用白话分开是：

1. Mathlib 自己的 RiemannHypothesis：除了平凡零点 −2、−4、−6……之外，ζ 的每个零点实部都是 1/2。条件里的 `s ≠ 1`，是因为 Mathlib 在极点处给了 ζ 一个约定值。
2. 同一句话的另一种写法。Lean 把两者当成定义上相等。
3. 每一条 Dirichlet L 函数，在临界线右边都没有零点。对每个模 `N ≥ 1` 和每个模 N 的 Dirichlet 特征都成立；排除的是平凡特征在 `s = 1` 的极点。
4. 临界带里的零点落在临界线上，对每一条 Dirichlet L 函数。
5. 本原特征下的同一陈述。页面写，这是 Dirichlet L 函数的广义黎曼猜想通常写成的样子。

页面有一句范围说明，这里照它的限定抄：这里的 “GRH” 指 Dirichlet L 函数，所有的模、所有的特征。Dedekind zeta 函数、Hecke L 函数，以及一般的自守 L 函数，不在已检查的陈述之中。所以 Alpöge 笔记里「方法很容易扩展到所谓的广义黎曼猜想」是他的判断；机器这份页面核过的，是上面五条，其中广义的部分停在 Dirichlet L 函数。不要写成「广义黎曼猜想的全部一般形式已经由机器核证」，也不要写成 Hecke、Dedekind 或自守 L 函数的广义黎曼猜想已经核证。扩展黎曼猜想同样只出现在他的预期里，不在这张已检查清单上。

他写的 without assumptions，和这张公理表是两处文字。能对上的检查结果是：这五条标题定理只依赖 Lean 的三条标准公理，propext、Classical.choice、Quot.sound。同一页还写，环境里有 15 条公理，全部在 Init 中，没有在 Lean 核心之外再声明公理。

行数不要合成一个数。联合声明写 17 million lines of code。Science Monitor 写，GitHub 镜像统计为 17,374,215 行，并写有 175,187 个 Lean 源文件，14 个分卷的压缩包大约 239MB。MIT 页面写的是 175,187 个模块，以及拼起来的源码包 239,275,554 字节；我打开的这一版没有印 17,374,215。用 17.4 million 或 17,374,215 时，要带上 Science Monitor 或你自己重新数到的出处，不要拿它替换声明里的 17 million。

Science Monitor 另写 Sutherland 的页面后来更新到 22:05 UTC，并标在 11 月 20 日。那篇报道的表和上面这张大体相同，官方 Comparator 和 Lean 默认内核、paranoid 内核仍是进行中。我重新打开 MIT 页面时，页首时间仍是 2026-11-21 12:55 UTC。两个时间都留在各自的出处里。本文的检查结果以这次打开的 MIT 页面为准。

页面还把这份证明和 [kimihiro64/Robin1984](https://github.com/kimihiro64/Robin1984) 的提交 `acab1a3` 合在一起，得到 `robin_inequality` 和 `lagarias_inequality`。这是两条关于除数和的形式定理，陈述里不出现 zeta，用来做不依赖 Mathlib 中 zeta 定义的推论检查。合并之后，con-leche master、con-leche `--compare` 和 nanoda 接受了导出；`lake comparator` 在该页仍是进行中，陈述比对和公理检查已通过，内核阶段还在跑。这是给形式化核对看的推论，不是一项可以在聊天产品里打开的功能。

页面自己的限制也要留下。构建跑在没有沙箱的云机器上，编译是直接调用 `lean`，不是通过 `lake build`。页面写，一次通过的检查表明：这些形式陈述，按 Lean 里对照 Mathlib 定义写下的样子，依照所用的内核，可以从那三条标准公理推出。它依赖这些内核，也依赖 Mathlib 的定义就是它们打算成为的那样。页面还写，检查是用 Claude Code 跑的。这句说的是核验时用的工具，不是证明用了哪一个模型。Anthropic 在本文用到的来源里没有公开模型名字。

## 这不是 Claude 改价，也不是聊天窗口里的一键证明

11 月 20 日和 21 日公开下来的，是一份个人笔记、一个 Lean 库，以及社区对其中黎曼猜想陈述的核验。定价页、速率限制和模型 ID 都不在这三样里面。正在生产里用的模型 ID、你今天看到的单价、你今天看到的配额，维持你抄下来的现状。不要因为标题里出现了 Claude，把已经跑通的工具链拆掉。日常工作里哪一档负责难任务、哪一档负责批量任务，仍按任务看，方法见 [本周 AI 模型按任务分工，不要整站换新](/posts/october-ai-model-roles/)。各档现在公开的差价和适用面，见 [Claude Fable 5.2：日常仍用 Opus，难任务再升级](/posts/claude-fable-5-2-guide/)。那篇是日常选型，不是这份证明的模型说明。本文不把证明算到任何一个具体模型名上。

聊天回复和这次核验也不是同一种「过了」。这次被接受的，是一份可以导出、可以换内核重放、可以把陈述和 Mathlib 的原句对齐的库。联合声明强调检查跑在惰性导出上。你在对话框里复制出来的一段话，没有经过 leanchecker、nanoda 或 con-leche，也没有人和 Mathlib 里的原陈述对过。把它叫做「已经验证」，用的是另一个词。

《科学美国人》2026 年 11 月 20 日的稿子写在社区声明之前，立场是「有人声称」。它引了 Alpöge 那句 I believe I have, working with Claude。Andrew Sutherland 在独立编译之后对《科学美国人》说：This is indeed an historic moment. The world has changed.... There is much work to be done to understand the mathematical details of the proof. 中文是：这确实是一个历史性时刻。世界已经变了。……要理解这份证明的数学细节，还有大量工作要做。同一篇写，这个结果没有会颠覆全球银行业、或让互联网跑得更快的即时现实用途。这句用来校准预期：办公室里的账单、网站速度和支付系统，不会因为这份库编译通过就在这周发生变化。

Nature 的报道标成突发新闻，并写 2026 年 11 月 21 日有更新。本文用的是该页上仍能读到的反应，不把它们改写成核验完成之后的新访问。菲尔兹奖得主 James Maynard 说：If this fully checks out, it is clearly a historic milestone in mathematics. 他又说：I suspect that the proof will turn out to be correct. 在「假定我们确实得到相应的理解」这个前提下，他补充这会被看成数学成果里绝对的高峰之一。Tristan Buckmaster 的说法是，这份证明眼下复杂得离谱，数学家要消化很长时间；Maynard 同意这一点。这些句子把「可能是对的」和「人还要很久才读得懂」放在一起。

Andrew Granville 在 Nature 里批评的是写法和对时间的选择。他说 Alpöge 放出的东西是混乱的（What he released is garbled），并把发布时间和他看到的股价回落联系在一起。这是他的看法。Alpöge 在自己的笔记里已经写，那种犬儒看法是错的。本文不裁判谁说服了谁。股价当天怎么走，用上市首日那篇的出处核对，这里不重述。

## 用 AI 干活的人现在可以做的几件事

四件事都落在你自己的账号和你这周真正会发出去的活上。标题留在外面。

1. **把模型 ID、价格和配额抄下来，然后维持原样。** 打开你正在用的每一个入口：claude.ai 的哪一档订阅、直接的 API、云市场上的调用、包在别的产品里的调用。模型 ID 从控制台或生产代码里抄，不凭记忆写成「我们用的是 Claude」。日期写你实际抄录的那一天。下面的空格留给你的账号，本文不填任何现价。抄完如果和上周的底稿一致，生产配置就不要动。以后的变化看 Anthropic 的定价页、产品说明、状态页和你的控制台。上市之后还要继续盯的事项，沿用上市首日那篇，不在这里重开一张市值表。

| 抄录日期 | 入口 | 模型 ID | 按量还是套餐 | 单价或月费 | 配额或速率限制 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

2. **高风险输出先要有一件可以复核的产物。** 从这周的工作里只挑一件会离开你电脑的：一次代码合并、一封对客户的邮件、一段财务或法律表述、一篇要发表的分析。在发出之前写下三格：检查物是什么、谁有权说「过了」、不过关停在哪。代码合并的检查物可以是已经在跑的测试或类型检查。对客户、财务或法律文字，检查物是另一个人的签字，或你已经用真实样本跑过的第二套校验。专门做形式化数学或证明的人，检查物才是证明助手的结果。聊天里的段落本身不算这三格里的任何一格。这周做完这一件，比把所有流程都接上新模型有用。

3. **难问题拆成你还能核对的一步。** Alpöge 的笔记写的是：人先选定玩具情形里的两条想法，再引导到类似的情形；模型在后段明显更快；交出完整论证时，人还没有掌握周围一大片数学；公开的是 Lean，不是一份他已经写顺的讲解。你这边用得上的做法是：一次只交给模型一个你当天能判断对错的小步。对了再走下一步。对不了就停，不把整件事收成一次对话的终稿。需要来回改口的材料，终稿仍留在更强的检查或人手里。批量的摘要和分类不要因为这条科研新闻改道。

4. **要读原文的人读这三页，不必默认把库跑起来。** 三页是 [联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)、[MIT 验证页](https://math.mit.edu/~drew/grh/) 和 [remark.pdf](https://alpo.ge/remark.pdf)。MIT 页面写，在装好 Lean v4.36.0 的前提下，用 `lake comparator` 检查导出的那条路径大约需要 100 GB 内存和 70 GB 磁盘；从源码构建的 con-leche 大约需要 50 GB 内存。没有这些资源，就不要下载 14 个分卷，也不要开始编译。办公室里写材料、做表格、回复客户的人，不需要跑这份证明。

一周结束时留下三样书面东西：一张当天的模型 ID、价格和配额；一件高风险输出的检查物和签字人；如果有人想读证明，一份「只读三页、不在这台机器上编译」的决定。ANT 的股价不在这三样里面。

## 这些说法不要直接写成已经发生的事

下面每行的右栏是目前能写进自己笔记的范围。左栏是标题和转述里容易滑过去的句子。

| 容易滑过去的说法 | 目前能写下来的范围 |
| --- | --- |
| Anthropic 发布了新产品或新模型 | 笔记在个人网站和 PDF。本文打开的公司新闻列表里没有对应稿件。Nature 写公司没有立刻回复置评 |
| 某个具体的 Claude 模型、若干个实例完成了证明 | 本文用到的来源没有模型名，也没有实例数。Sutherland 页面里的 Claude Code 指的是他跑检查的工具 |
| 广义黎曼猜想的全部一般形式已经核证 | 已检查的广义部分是 Dirichlet L 函数。Dedekind zeta、Hecke L 函数和一般自守 L 函数不在其中 |
| 所有机器检查都已经跑完 | 联合声明写 full confidence，并写官方内核等已经检查过导出。MIT 页面在 12:55 UTC 仍有默认内核、paranoid 内核和 `lake comparator` 的内核阶段没有结论。两页并列，不合成「全部结束」 |
| 数学家已经理解了新想法 | 联合声明把解释留在后面。Sutherland 对《科学美国人》说，理解数学细节还有大量工作。形式正确和人能讲解是两件事 |
| 千禧年奖金已经发出或会自动发出 | 克雷所的规则要求发表在 Qualifying Outlet、至少两年，并得到数学界普遍接受，之后才会考虑。没有来源写已经颁奖。本文不改写 §6 里 Qualifying Outlet 的定义 |
| 银行、密码或日常应用这周会变快 | 《科学美国人》写没有这类即时用途。本文不另造影响 |
| Masullo 的手稿也被同样核证 | 联合声明没有覆盖那份手稿。Nature 和卫报对它的描述也不一致 |
| 对话框里的回答已经像这份库一样被核过 | 这次核的是可导出、可换内核、可和 Mathlib 原陈述比对的库。聊天文本没有走过这些检查 |

克雷数学研究所的页面写，七个千禧年大奖难题于 2000 年 5 月 24 日在巴黎公布，每个问题配置 100 万美元。黎曼猜想是其中之一，1859 年由黎曼提出，也出现在希尔伯特 1900 年的问题里。规则修订本于 2018 年 9 月 26 日由董事会通过。规则页写，研究所不接受直接投稿；考虑一项解答之前，三条要同时满足：发表在 Qualifying Outlet（见该文件 §6）、发表后至少两年、并在全球数学界得到普遍接受。Lean 库编译通过，本身不是这三条的完成记录。本文不把 Qualifying Outlet 换成一种未经该节定义的期刊名称。

## 常见问题

### 这是不是 Anthropic 官方发布的新产品？

不是产品发布。笔记在 Alpöge 的个人网站和 remark.pdf。11 月 21 日的联合声明核的是黎曼猜想的 Lean 证明，由 Lean FRO 和 Mathlib Initiative 背书。Nature 写 Anthropic 没有立刻回复置评。本文打开的公司新闻列表里，没有新产品、新价格或新配额。

### 是不是已经 100% 证明了黎曼猜想，奖金也发了？

联合声明写他们对这份黎曼猜想证明有 full confidence，并核证陈述和证明，且四条标准都满足。人把新想法讲清楚，是声明自己留在后面的事。MIT 页面在 2026-11-21 12:55 UTC 仍有几项内核检查没有结论。已检查的广义部分只到 Dirichlet L 函数。千禧年奖金有 100 万美元的配置，规则要求发表、至少两年和数学界普遍接受这三条同时满足之后才会考虑。本文没有看到已经颁奖的宣布。

### 我用的 Claude 现在也能证明这种问题吗？

不能从这条新闻推出你的下一次聊天已经具备同样的核对。来源没有模型名和实例数。笔记写的是人引导、后段模型更快、人尚未掌握周围一大片数学，并且只公开 Lean。高风险输出仍要测试、校验、另一个人或证明助手。普通读者不必下载证明。

### 要不要因为这条新闻换掉正在用的模型？

不要改模型 ID、价格或配额。先抄下控制台里的这三样，生产配置维持这一版。日常分档仍按你已经测过的任务走，不要从这份证明倒推模型名字。

## 信息来源

- Levent Alpöge 个人网站：[alpo.ge](https://alpo.ge/)（本文打开时核对）。抬头中的 Anthropic, PBC 与 Harvard Society of Fellows junior fellow，以该页为准。
- Levent Alpöge：[remark.pdf](https://alpo.ge/remark.pdf)（笔记，2026-11-20 随个人网站放出；Sutherland 页面写 announced at alpo.ge/remark.pdf on 20 November 2026）。「I believe I have, working with Claude, discovered a proof of the Riemann Hypothesis.」、广义与扩展黎曼猜想的预期、without assumptions、终点线那两句、玩具情形与人的引导、尚未掌握周围一大片数学、只公开 Lean、25 万页以上、周日深夜给 Dario 的消息、有约束要遵守、犬儒看法为假，以及日期清单和 part01 到 part14，以这份 PDF 为准。
- Lean 与 Mathlib 社区：[Lean verification of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)（页面日期 2026-11-21 13:55，无时区；由 Lean FRO 与 Mathlib Initiative 背书）。17 million lines、full confidence、陈述和证明都正确、四条标准、惰性导出，以及期待数学界解释新想法，以这篇为准。四条标准的说明页是 xenaproject：[And the proof is checked in Lean](https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/)（2026-11-12，署名 xenaproject）。本文四条的措辞以联合声明自己的列举为准。
- Andrew Sutherland（MIT）：[Verification files for the Lean proof of the Riemann Hypothesis](https://math.mit.edu/~drew/grh/)（本文重新打开时，页首仍为 Page last updated 2026-11-21 12:55 UTC）。175,187 个模块、三条标准公理、leanchecker、nanoda、con-leche master 的 1,468,418 条声明、`--compare`、lean4lean、仍在进行的默认内核与 paranoid 内核、仍在进行的 `lake comparator`、较旧 con-leche 与 con-ron 的退出码 2、Dirichlet L 函数这一范围限定、Robin1984 的推论检查、无沙箱且直接调用 `lean`、约 100 GB 内存与 70 GB 磁盘、con-leche 约 50 GB 内存、源码包 239,275,554 字节、检查用 Claude Code，以这次打开的页面为准。
- Science Monitor：[Riemann Hypothesis Lean Proof Clears Independent Checkers](https://scimonitors.com/en/riemann-lean-proof-clears-independent-checkers/)（2026-11-21）。17,374,215 行、175,187 个 Lean 源文件、大约 239MB 的 14 个分卷，以及它自己写下的 22:05 UTC，以这篇为准。它不替换联合声明的 17 million，也不替换 MIT 页首的 12:55 UTC。
- 卫报：[Two groups verify mathematician’s claim that Claude helped prove mathematics problem](https://www.theguardian.com/technology/2026/nov/21/anthropic-riemann-hypothesis-solved-claude-ai)（2026-11-21，首次发表美国东部时间 11:39，更新 15:15）。土耳其裔美国数学家、大约六周、周六下午 Lean FRO 与 Mathlib Initiative 宣布核验，以这篇为准。篇中转述的意大利独立数学家与 Nature 的 Masullo 叙述不一致，本文两说并列。
- 《科学美国人》：[Anthropic mathematician claims to prove Riemann hypothesis](https://www.scientificamerican.com/article/anthropic-mathematician-claims-to-prove-riemann-hypothesis-most-famous-problem-in-all-of-math/)（2026-11-20，写在 11 月 21 日社区声明之前）。Sutherland 的 historic moment、The world has changed....、理解数学细节仍有大量工作，以及没有颠覆全球银行业或让互联网更快的即时用途，以这篇为准。本文不增补该页上的其他引语。
- Nature：[Mathematicians astounded by AI and human-written proofs of iconic Riemann hypothesis](https://www.nature.com/articles/d41586-026-03812-7)（突发新闻；页面写 2026-11-21 有更新。本文引用的是打开时仍能读到的文字）。Maynard 与 Buckmaster 的反应、Granville 对写法和时间的批评、Vakil 贴出 Masullo 预印本（斯坦福 2020 年博士，导师 Brian Conrad），以及 Anthropic 没有立刻回复置评，以这篇为准。
- 克雷数学研究所：[The Millennium Prize Problems](https://www.claymath.org/millennium-problems/)（七个问题、2000 年 5 月 24 日公布、每个问题 100 万美元、黎曼猜想亦见于希尔伯特 1900 年的问题）。[Rules for the Millennium Prize Problems](https://www.claymath.org/millennium-problems/rules/)（修订规则于 2018 年 9 月 26 日通过；不接受直接投稿；考虑解答前须同时满足 Qualifying Outlet、至少两年、全球数学界普遍接受）。本文不转写 §6 对 Qualifying Outlet 的定义，也不把奖金写成已经颁发。
- Anthropic 新闻列表：[Newsroom](https://www.anthropic.com/news)（本文打开时核对）。该列表没有把这件事写成产品、价格或配额公告。

17 million 与 17,374,215 保持各自的出处。联合声明的 full confidence 与 MIT 页面上仍在进行的检查保持各自的出处。广义黎曼猜想的笔记判断与 Dirichlet L 函数的已检查范围保持各自的出处。
