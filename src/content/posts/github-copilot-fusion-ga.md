---
title: "Copilot Fusion 正式可用：选档、对账和折扣期测试"
description: "2026年10月28日 GitHub 宣布 Copilot Fusion 正式可用。本文按官方文档说明三种执行模式、各套餐可选的努力档、AI credits 扣费，以及11月30日前如何对比并设预算。"
pubDate: 2026-10-29T20:00:00+08:00
topic: ai-tools
tags: ["GitHub Copilot", "AI 编程", "计费", "模型编排"]
keyword: "Copilot Fusion 计费与选档"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "Copilot Pro 能不能选 Fusion High 和 Fusion Max？"
    a: "不能。概念文档的表格里，Free、Student 和 Pro 包含 Fusion Standard，不包含 High 和 Max。High 和 Max 从 Pro+、名为 Copilot Max 的个人计划、Business 和 Enterprise 起才有。Fast 各计划都标了包含，但用户不能手选，只在 VS Code 内联聊天里使用。"
  - q: "Fusion 会在模型费之外再收一笔吗？七折到哪一天？"
    a: "不另收。按 Fusion 实际调用的每个模型的标准费率计费。付费 Copilot 计划在 2026 年 11 月 30 日之前使用 Fusion，模型费用有 30% 折扣。折扣写的是付费计划，Free 不在这句里。用量以页面上的 AI credits 为准，不要自己用 0.7 去改写账单。"
  - q: "Fusion Max 在榜上的 60 分，能不能当作我仓库的通过率？"
    a: "不能。GitHub 更新日志写的是 Artificial Analysis Coding Agent Index 上 Fusion Max 得 60 分，与 Claude Code 加 Opus 5.5 Max 的分差在两分以内，平均每任务 API 成本约一半、token 约一半、耗时少约 40%。这是那份指数上的结果。要不要换默认档位，用你自己的任务看采纳、返工和 credits。"
  - q: "GitHub Enterprise 要不要马上取消 Copilot 订阅、改成按用量付费？"
    a: "先不要。Universe 文章写明，即日起 Enterprise 客户可以不另买 Copilot 订阅使用全部 Copilot 功能，按使用的 AI credits 付费，目前经销售开通，自助开通即将推出；现有 Business 和 Enterprise 客户可以保留现有计划。账单文档里的 Copilot access 没有包含额度。用上月实际消耗对比许可证发票，并向销售确认产品名和有没有包含额度，再决定迁不迁。"
  - q: "代码补全会把 AI credits 用光吗？"
    a: "付费计划的代码补全和 next edit suggestions 不按 AI credits 计费，次数也不限。聊天、CLI、云代理、Spaces、Spark 和第三方编程代理会消耗 credits。预算用尽并被拦住之后，补全和 next edit suggestions 仍然可用。"
---

2026 年 10 月 28 日（美国时间），GitHub 在 Universe 上把 Copilot Fusion 定为正式可用（generally available）。在模型选择器里选中它，选中的是一套运行时路由和编排：由它决定这次用一个还是多个模型，你选的是努力档，不是某一个模型的名字。

同一天还定了两件会直接出现在账单上的事。GitHub Enterprise 客户可以不再单独购买 Copilot 订阅，按使用的 AI credits 使用全部 Copilot 功能。代码评审新增 Max 档。对中小企业主、还在用 AI 写材料或改代码的人，这周要看的不是榜单上的那一分，而是三件能动手的事：你的套餐到底能选哪一档，11 月 30 日之前的七折怎么用来做小样本对比，以及 credits 用到哪里会被拦住。

模型按任务分工的总原则，上周的 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/) 已经写过。这篇只写 Copilot 这条产品线：Fusion 怎么编排、credits 怎么扣、企业要不要改成按用量。

## 选择器里新增的是路由，档位决定它肯花多少

更新日志写明：Fusion 把研究预览里的 Project HydraFusion（多模型编排）和 Copilot 的自动模型选择合在一起，用来兼顾效果和成本。以前开过 auto、HydraFusion 或 HydraFusion Max 的研究预览，选择会自动过渡到对应的 Fusion 努力档。日志没有逐项写出对应关系，以你客户端里现在显示的档位为准。

它在这些客户端正式可用：Visual Studio Code、GitHub Copilot app、GitHub Copilot CLI、JetBrains IDE。其他客户端即将支持。用法是先把客户端更新，再打开模型选择器，选 Copilot Fusion，然后选努力档。

概念文档给出三种执行模式。同一次会话里的不同提示可以用不同模式。选定模式这一步很轻，额外延迟很小。简单任务不会为了一次不需要的评审多等、多扣 credits。

| 模式 | 文档里的做法 | 对账单的含义 |
| --- | --- | --- |
| Single | 一个模型直接完成任务 | 和向一个模型发一次请求类似 |
| Cascade | 高效模型先起草，裁判检查后决定接受，或升级到更强的模型 | 升级才会多一次模型调用 |
| Critique | 一个模型起草，多个模型并行、独立点评，意见汇总后由原来的模型修改 | 点评和修改都是额外的模型调用，更慢 |

努力档用来标明这次任务要哪一种取舍。Standard 平衡成本、质量和延迟。High 和 Max 允许为更难的任务调用更多模型。概念文档的典型用途和「谁能选」要一起看。下表的有无，来自该页「按 Copilot 计划列出的努力档」表格（列顺序为 Free、Student、Pro、Pro+、Copilot Max、Business、Enterprise）。

| 努力档 | 文档写的优先事项 | 典型任务 | Free / Student / Pro | Pro+、Copilot Max 计划、Business、Enterprise |
| --- | --- | --- | --- | --- |
| Fusion Standard | 平衡成本、质量和延迟 | 日常工作。文档写它为每个任务选一个模型 | 有 | 有 |
| Fusion High | 有节制的编排，并争取适度节省 token | 范围清楚的实质编码，例如修一个复杂缺陷，或改动跨多个文件。额外的模型调用值得多花时间和 credits 时再用 | 无 | 有 |
| Fusion Max | 前沿能力，同时仍考虑 token 效率 | 需要尽可能深的推理和尽可能彻底的分析 | 无 | 有 |
| Fusion Fast | 只在必须用快模型的场景 | 用户不能手选。只在 VS Code 内联聊天里使用 | 各计划都标了包含 | 各计划都标了包含 |

三个名字要分开记。Fusion Max 是努力档。Copilot Max 是个人套餐，文档写每月 100 美元。代码评审里的 Max 是另一个开关，见后文，和努力档分开设置。

运行过程中可以看到每一步用了哪个模型。中间草稿可能被修改或丢弃，给你看的是最终回复。回复下方的努力档名称可以悬停，那里列出这次用过的模型。Fusion 自己没有上下文窗口，每一步受当时那个模型的窗口限制；界面上显示的窗口是所用模型里最小上限的保守值。它不负责启动子代理。执行模式和模型池以后会变。

有一条和提交有关的限制，建议写进团队规范：如果 Fusion 丢弃了一份草稿，这份草稿已经写进工作区的修改（例如改过的文件）不会自动撤销。提交前看 diff。仓库里助手怎么进、密钥和许可证怎么管，继续沿用 [AI 编程助手选型与团队落地规范](/posts/ai-coding-assistant-team-guide/)，不因换了路由就关掉。

管理员可以限制 Fusion 能用哪些模型，也可以把任一努力档设成企业托管设置下的默认模型。Fusion 只从企业和组织策略里已启用的模型中挑选。管理员可以单独查看它的候选列表，单独改每个模型对 Fusion 的有效策略，也可以只对 Fusion 禁用某个模型，而不对所有人禁用。套餐里没有的模型、被策略排除的模型、被数据驻留或 FedRAMP 限制排除的模型、被「仅限评估模型」策略排除的模型，都不会进 Fusion。如果它要用的模型你一个都不可用，选择器里就不会出现 Fusion。

本地模型路由处于公开预览，文档写明会变。只有 Fusion Standard 可能选用本地模型，而且要打开实验功能。Windows 上、机器规格符合要求时，可以在 Copilot CLI、Copilot app 或 VS Code 里下载 MAI Code 1.1 Flash，装好之后 Fusion Standard 可以在合适时选用它。在 CLI 里通过 Ollama 等提供方安装 Qwen3.8 Flash Next，且被识别为 `qwen3.8-flash-next-local` 时，Fusion Standard 也可以用，Windows、macOS、Linux 都支持。实验开关：Copilot app 的设置里，Experimental 一节打开 Local model auto routing；CLI 用 `--experimental` 启动，或在交互会话里执行 `/experimental on`。多数人和小团队这周不必为了这个预览改流程。文档也写了替代做法：自定义一个指定本地模型的代理，在提示里让 Copilot 使用它。

## 60 分只说明那份指数，不说明你的仓库

更新日志给出 GitHub 在 Artificial Analysis Coding Agent Index 上的结果：Copilot Fusion Max 得 60 分，与 Claude Code 搭配 Opus 5.5 Max 的分差在两分以内；达到这一结果时，平均每任务 API 成本约为一半，token 约为一半，每任务耗时少约 40%。Universe 当天的文章把同一对比写成「与 Opus 5.5 Max 分差在两分以内，成本一半，每任务时间少 40%」，没有写 60 分，也没有写 token。引用分数和 token 时，以更新日志为准。

这四句话都是 GitHub 对那份指数的报告，限定在「平均每任务」。它没有公布题目列表，也没有说你的私有仓库会得到同样的通过率、同样的账单或同样的耗时。High 和 Max 还可能为一次任务调用多个模型，credits 可以高于 Standard。把 Fusion Max 设成全员默认之前，先有自己的样本。

更新日志另引了 AT&T 首席软件工程师 Hari Pokhrel 的描述：Fusion Standard 通过自动为任务选模型，改善了他们那里的 token 效率；以前开发者常为复杂任务选了更强的模型，做完日常任务却忘了切回去。这是 GitHub 发布的客户引述，用来说明「忘记切换」这个摩擦，不是对所有团队的测量。

## 同一天，评审和订阅方式也改了

Universe 文章把 GitHub Copilot app 写成面向代理式软件交付的应用：把代理和工具接到项目上，从 issue 做到合并，也可以在同一个界面里写规格、做设计讨论或分析遥测。Copilot projects、跨 GitHub app / VS Code / CLI / 网页的云端会话延续，以及会根据运行结果提议改进、供人审核的 Copilot automations，都写在同一篇文章里。本文不展开这三件，避免和 Fusion 的扣费混在一张表里。

代码评审方面，文章宣布了 Copilot code review Max：在 ReviewBench 的高严重度问题上取得最高的 F1。页面没有写出具体 F1。Lite 和 Balanced 继续负责要快的日常评审，Max 用于改动需要更深一看的时候。

定价页把代码评审单列出来：所用模型自动选择，且不向用户公开，所以单次 token 成本会变。一次评审有两笔账：token 消耗记入 AI credits，支撑评审的代理基础设施消耗 GitHub Actions 分钟数。下面是该页的估算，单位是美元/次。它写明这只是估算，一般随 PR 体积和仓库自定义说明上升，实际可以落在区间外面，并且不含 Actions 分钟。

| 评审力度 | 该页写的典型区间 | 该页写的大约平均 |
| --- | --- | --- |
| Lite | 0.05–1 美元 | 0.25 美元 |
| Balanced | 0.25–5 美元 | 1.50 美元 |
| Max | 1.50–25 美元 | 10 美元 |

按定价页的汇率 1 AI credit = 0.01 美元，平均约 10 美元大约等于 1000 credits。这是对估算值的换算，不是你的下一次评审。个人 Pro 整月合计 1500 credits（见下节）。按这个平均值，一次评审 Max 就已经超过 Pro 整月额度的一半，两次就超过合计。在 Business 里，这笔消耗来自共享池，一个人连续开 Max 会占用别人的额度。日常 PR 用 Lite 或 Balanced。只有高严重度风险、或者改动面大到你本来就要花更长时间看的，才开评审 Max。人怎么分工、误报怎么处理，见 [AI 代码评审怎么用才不出事](/posts/ai-code-review-workflow/)。我核对的页面没有按套餐列出谁能打开评审 Max，以仓库里实际出现的档位为准。

Enterprise 的订阅变化写在 Universe 文章里：即日起，GitHub Enterprise 客户不必再单独购买 Copilot 订阅，即可使用全部 Copilot 功能，包括 Copilot app、代码评审、自动化等，按使用的 AI credits 付费。目前经 GitHub 销售开通，自助开通即将推出。现有 Copilot Business 和 Copilot Enterprise 客户可以保留现有计划，或在准备好时迁移。

账单文档用的产品名是 Copilot access（通过 GitHub Enterprise Cloud，或作为 Copilot Standalone）。它写明：这个计划没有包含额度，从第一次使用就开始按量计费；消耗 credits 的功能要保持「允许按量付费」的策略，否则会因为没有包含额度而被挡住。Universe 文章没有使用 Copilot access 这个名字。准备按「不另买订阅」开通时，向销售确认你拿到的是不是这个计划、有没有包含额度。两页不要在确认前合成一个报价。

## 为什么计费逻辑变了

Octoverse 2026 的官方博文（2026-10-28）把使用规模写清楚了。到 2026 年 9 月，GitHub 上超过 40% 的 pull request 以编程代理的首稿开始，3 月这一比例是 17%。9 月单月约 1.1 亿个，大约是 3 月的 6 倍。文中的定义是：能检测到的、首稿来自编程代理的 PR。检测是下限，没被识别到的代理使用不在这个百分比里。这类 PR 改动多个文件的比例约 87%，没有检测到代理参与的 PR 约 79%。评审因此变成日常工作量，而不是偶发的抽查。

同一篇还写了模型切换有多频繁。2026 年 9 月，自己选择模型的 GitHub Copilot 用户里，61% 在不同会话中用了不止一个模型，四个月前是 50%。付费用户里，63% 在 9 月至少使用过一次自动模型选择。研究预览中的 HydraFusion 在 CLI 和 Copilot app 里路由了将近 6 万个会话；Octoverse 写明，这项工作现已作为 GitHub Copilot Fusion 正式可用。

把两段放在一起，产品要解决的摩擦就具体了：人已经在来回换模型，也已经让系统代选；代理首稿变多之后，贵的是「每次都叫最强模型」和「每个 PR 都做最深的评审」。Fusion 把模型选择收进努力档，代码评审把深度收进 Lite / Balanced / Max。两边都按实际调用的模型计 AI credits，Fusion 本身不加价。

credits 的规则在定价页和个人、组织的用量页上是同一句：交互消耗输入 token、输出 token 和缓存 token；每个 token 按所用模型计价；合计换成 AI credits，1 credit = 0.01 美元。一次交互贵不贵，取决于模型是谁、token 有多少。Fusion 的账单是它这次叫到的每一个模型各算各的标准费率。概念文档写：High 和 Max 可能为一个任务使用多个模型，因此一次任务消耗的 credits 可能多于 Standard。主对话会尽量留在同一个模型上，以便继续享受缓存 token；担任评审的模型只拿到它需要的上下文。缓存能不能真的命中，取决于你的前缀是否逐字重复，做法可以接着用 [AI 自动化越跑越贵怎么办](/posts/ai-automation-cost-control/) 里「先统计重复输入」那一步，不必为了 Fusion 重做一套成本体系。

各家模型在 Copilot 里的单价以定价页为准，和你在其他云上看到的 API 价不是同一张账单。例如 [GPT-6.1 Terra 的价格和换档](/posts/gpt-6-1-terra-cost-guide/) 写的是另一条产品线的单价，不能搬过来当作某一次 Fusion 调用的 credits。

付费 Copilot 计划在 2026 年 11 月 30 日之前使用 Fusion，模型费用享 30% 折扣。概念文档、更新日志和个人用量页都写了这一点。更新日志说的是「限时」，截止日期以概念文档和个人用量页的 11 月 30 日为准。个人用量页还有另一句：付费计划在 Copilot Chat 或 Copilot cloud agent 里使用自动模型选择时，模型费用有 10% 折扣；这一句没有写截止日期。页面没有写明 30% 和 10% 可以相加。对账时不要自行加成 40%。折扣体现在 credits 数字里，还是另减一笔，页面也没有给出例题。用量页上的 credits 是记录，不要用 0.7 去回写它。想知道折扣结束后的长期消耗，用同一条任务在 12 月再跑一次。

## 套餐里到底有多少 credits

个人计划的包含额度，以下表来自个人用量页。Base credits 先扣，用完后 flex 自动加上，IDE、GitHub.com 和 CLI 同一费率，不用额外设置。没用完的不结转。重置时间是每个日历月 1 日 00:00:00 UTC（北京时间 08:00），不随你的订阅扣款日改变。面值一列是按 1 credit = 0.01 美元做的换算，官方表格本身没有这一列。Flex 使合计面值可以高于月费。

| 计划 | 月费 | Base | Flex | 每月合计 credits | 合计面值（换算） |
| --- | --- | --- | --- | --- | --- |
| Copilot Pro | 10 美元 | 1,000 | 500 | 1,500 | 15 美元 |
| Copilot Pro+ | 39 美元 | 3,900 | 3,100 | 7,000 | 70 美元 |
| Copilot Max | 100 美元 | 10,000 | 10,000 | 20,000 | 200 美元 |

Free 和 Student 也有 AI credits 额度，个人用量页没有写出具体 credits 数。这两档只能通过自动模型选择使用模型。Free 每月包含 2000 次代码补全，Student 的代码补全不限次数。付费计划的代码补全和 next edit suggestions 都不计入 credits，次数不限。

消耗 credits 的功能，个人用量页列出的包括：Copilot Chat、Copilot CLI、Copilot cloud agent、Copilot Spaces、Spark、第三方编程代理。额度用完之后可以升级（只付与更高一档的差价，本周期已用量计入新档的更大额度），或为额外用量设置美元预算，或等到下个日历月重置。额外用量也可能有上限，达到之后要先付清已产生的额外用量才能继续。通过 GitHub Mobile（iOS 或 Android）订阅或曾经这样订阅的，定价页写明不能购买额外 AI credits。

组织侧以组织用量页为准。Copilot Business 每个许可证每月 1,900 credits，Copilot Enterprise 每个 3,900。额度在计费实体层面汇总，不是每人一个互不相通的桶。该页的例子：100 个 Business 用户的共享池是 190,000 credits，而不是 100 个独立小桶。按 0.01 美元换算，这个池的面值是 1,900 美元。月中增加许可证，池子马上变大；月中减少许可证，池子要到下个账期才缩小。不结转，同样在每月 1 日 00:00:00 UTC 重置。

超出共享池之后，默认允许继续按公开费率计费，记在组织或企业账上；管理员若要在额度用尽后直接停用，需要在企业或组织的 AI Controls 里明确关闭 AI credits 的按量付费策略。Copilot access 没有这个池，按量策略必须开着，否则消耗 credits 的功能从第一次就不可用。

## 现在可以做的四件事

### 1. 按套餐选档，而不是按榜单选档

日常改一个函数、解释一段报错、写一段当天就要用的脚本，用 Fusion Standard。范围已经写清楚的复杂缺陷、跨多文件修改，并且套餐里有 High，再用 High。只有任务确实需要文档写的「最深推理、最彻底分析」，并且套餐里有 Max，才单次使用 Fusion Max。

Pro、Free、Student 的选择器里不会有 High 和 Max。这三档把样本全部留在 Standard。不要为了指数上的 60 分先升级套餐。升级与否，等下面的表显示出 Standard 的返工时间不够用。

客户端版本会影响你看到的价格和用量是否正确。个人用量页建议至少更新到：VS Code 1.120，Visual Studio 2022 为 17.14.33，Visual Studio 2026 为 18.6.0，SQL Server Management Studio 22.6，JetBrains 插件 1.9.1，Eclipse 插件 0.18.0，Xcode 扩展 0.50.0，Copilot CLI 1.0.48。旧版仍能用，但可能显示错误的模型价格、不准确的用量或过时的计费用语。能自动更新的，用最新稳定版。

### 2. 在 11 月 30 日前做一次小规模对比

折扣只覆盖付费 Copilot 计划上的 Fusion 模型费用，截止 2026-11-30。对比用你上周的真实任务，不用厂商演示。一张表就够，列：日期、任务一句话、固定模型或 Fusion 档位、人是否采纳、返工分钟、用量页上的 credits、墙钟时间。悬停努力档名称，把用到的模型名抄进备注。

建议 8 条，一天内能由人判断对错：

1. 四条日常任务，固定模型跑一遍，Fusion Standard 再跑一遍。
2. 三条跨文件或一个真实缺陷。套餐有 High 的，固定模型、Standard、High 各一次。套餐没有 High 的，只跑固定模型和 Standard，备注写「套餐无 High」。
3. 一条你认为最难的。只有 Pro+、Copilot Max 计划、Business、Enterprise 才加一次 Fusion Max，只跑一次。

一周结束只留一个变化：要么日常默认改成 Fusion Standard，要么那类复杂任务改成 High。两个一起改，就分不清是档位带来的差别。11 月 30 日之后，把表上「采纳了、返工没有变长」的两条再跑一次，看 credits。折扣期的数字不当作长期单价。

### 3. 先设预算，再放开 Max

个人：用量仪表板可以看到本月额度和已用量。额外用量预算按美元设置。文档的换算是 10 美元预算对应 1,000 credits。开始 High、Fusion Max 或评审 Max 之前，先写下你愿意在套餐之外支付的金额。用 GitHub Mobile 订阅、买不了额外 credits 的，把测试停在包含额度之内。

组织在第一次集中试用之前设置预算。文档把控制分成两类，行为不一样：

- 用户级预算按人封顶，包含额度里的消耗也算，并且始终是硬停止。0 美元会立刻挡住消耗 credits 的功能。可以设全员默认、按成本中心的每人默认，或某一个人的覆盖；越具体的越优先。个人覆盖可以设到期日（本账期结束或指定日期），到期后回到更宽的那一档。
- 成本中心、组织、企业的花费上限限制的是按量费用。Business 和 Enterprise 要等共享池用完才开始计这一段；Copilot access 从第一次按量使用就开始。这些上限只有打开 “Stop usage when budget limit is reached” 才会停用，该开关默认关闭。不打开，则到了上限仍会继续计费，只起提醒作用。

文档写的优先顺序是：先看用户级预算，超了立刻停；再看包含额度和按量策略；最后看成本中心、组织或企业的花费上限。哪一个剩余空间更小，哪一个先把人拦住。提高企业总预算，不会解开已经打满个人预算的人。反过来，个人预算放得比共享池更松，多出来的部分会变成按量费用。调高个人预算时，确认花费上限盖得住这个缺口。

被拦住的人要等下一账期、管理员提高对应预算，或本人申请追加并获批。预算不会自动摘掉席位。代码补全和 next edit suggestions 在拦住之后仍然可用，因为它们不消耗 credits。企业花费上限不包含许可证费。预算页的例子：400 个 Copilot Business 许可证每月 7,600 美元；一个强制执行的 5,000 美元企业预算，允许的许可证加按量合计可以到 12,600 美元，而不是把总支出卡在 5,000 美元，除非某个成本中心被排除在企业预算之外。

### 4. 企业用上月用量决定留还是迁

保留 Business 时，每个许可证每月往池子里放 1,900 credits，面值 19 美元。保留 Copilot Enterprise 许可证时，是 3,900 credits，面值 39 美元。预算文档的例子里，400 个 Business 许可证每月 7,600 美元，折合每个 19 美元，和 1,900 credits 的面值对齐。这是该例子的算术。你的发票若不是这个单价，以发票为准。Copilot Enterprise 许可证的标价，我核对的页面没有写成单独一句，用发票上的数字。

比较时抄上月实际消耗的 credits，不要用「套餐发给你的额度」代替消耗。

- 实际消耗的美元（credits × 0.01）明显低于许可证发票，并且销售确认新方案没有包含额度：按用量、不另买 Copilot 订阅，有可能更低，因为你不再为没用掉的预付额度付许可证。
- 实际消耗已经超过共享池：超出的部分本来就在按量付。若许可证单价和每席包含额度的面值接近，迁移省下的不是超出的那一段，而是没被用掉的预付部分。池子是共享的，空闲席位在补贴重度用户；拆掉空闲席位之前，先看重度用户会不会立刻进入按量。
- 数字还没从用量页导出：保持现有 Business 或 Enterprise。先做第 2 步的 8 条样本和第 3 步的用户级预算。Universe 写明现有客户可以择时迁移。

月中减少许可证不会马上缩小池子。人还在用的时候就减席，下个月池子变小，这个月的消耗习惯却已经按大池子养成了。减席和改默认档位不要放在同一周。

## 这些数字不要直接当成你的结果

- Fusion Max 的 60 分、约一半成本、约一半 token、少约 40% 时间，是更新日志对 Artificial Analysis Coding Agent Index 的描述，对比对象是 Claude Code 加 Opus 5.5 Max。
- 评审 Max 的大约 10 美元、1,000 credits，是定价页平均值的换算。该页写明可以落在 1.50–25 美元之外，且不含 Actions 分钟。
- 30% 折扣截止 2026-11-30，对象是付费 Copilot 计划上的 Fusion 模型费用。折扣结束后的单价，页面没有预告。
- 个人用量页没有给出 Free 和 Student 的 credits 数量。本文不补一个猜出来的数。
- Universe 的「不另买订阅」和账单页的 Copilot access 是否为同一开通项，两页没有互相点名。开通前向销售确认。
- 本地模型路由是公开预览，只影响 Fusion Standard，且要开实验功能。

## 常见问题

### Copilot Pro 能不能选 Fusion High 和 Fusion Max？

不能。Free、Student 和 Pro 在概念文档的表格里只有 Fusion Standard。High 和 Max 从 Pro+、Copilot Max 个人计划、Business 和 Enterprise 起才有。Fast 不能手选，只在 VS Code 内联聊天使用。

### Fusion 会在模型费之外再收一笔吗？七折到哪一天？

不另收。按实际调用的每个模型的标准费率计。付费计划使用 Fusion，模型费用 30% 折扣到 2026 年 11 月 30 日。记录用量页上的 credits，不要自行乘 0.7。

### Fusion Max 的 60 分能不能当作我仓库的通过率？

不能。那是 GitHub 报告的编码代理指数结果。用自己的 8 条任务比较采纳、返工分钟和 credits，再决定默认档位。

### GitHub Enterprise 要不要马上改成按用量付费？

先导出上月实际 credits，再和许可证发票比较。现有 Business 和 Enterprise 可以保留。Copilot access 没有包含额度。向销售确认产品名之后再迁。

### 代码补全会把 credits 用光吗？

付费计划的补全和 next edit suggestions 不计入 credits。聊天、CLI 和云代理会计入。预算被拦住之后，补全仍然可用。

## 信息来源

核对日期：2026-10-29。价格、额度和折扣以当天打开的页面为准，厂商会改。

- [GitHub Universe 2026: Evolving every layer of the stack](https://github.blog/news-insights/company-news/github-universe-2026-evolving-every-layer-of-the-stack/)（2026-10-28，Jay Parikh）：Copilot app、Fusion 的简要对比、code review Max、Enterprise 不再单独购买 Copilot 订阅。
- [Route and orchestrate models with GitHub Copilot Fusion](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/)（更新日志，2026-10-28）：正式可用、指数 60 分、约一半成本 / token、少约 40% 时间、努力档、30% 折扣、客户端、研究预览的自动过渡、AT&T 引述。
- [About GitHub Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion)：三种执行模式、努力档的典型用途、各计划可用表、计费、限制、本地模型公开预览、管理员策略。
- [Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)：1 credit = 0.01 美元，个人与企业额度的汇总方式，代码补全不计 credits，代码评审的美元估算，Mobile 订阅不能购买额外 credits。
- [Octoverse: Commits, pushes, reach new highs in 2026 as developers build with agents](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)（2026-10-28）：9 月代理首稿 PR 超过 40%（3 月 17%）、约 1.1 亿与大约 6 倍、61% 与 63%、HydraFusion 会话数。
- [Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing)：个人套餐 credits、重置日、30% 与 10% 折扣、客户端最低版本。
- [Usage-based billing for organizations and enterprises](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing)：Business 1,900、Enterprise 3,900、共享池、Copilot access 无包含额度。
- [Budgets for usage-based billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets)：用户级预算与花费上限、400 个 Business 许可证每月 7,600 美元的例子。
- [The Neuron，2026-10-29 日报](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-thursday-october-29-2026/)：提示核对 code review Max 与 Octoverse。文中数字采用上面的 GitHub 页面，不采用日报的转述。
