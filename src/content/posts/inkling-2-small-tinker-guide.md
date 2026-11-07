---
title: "Inkling 2 Small：Tinker 能试，权重还没开放"
description: "2026年11月5日 Thinking Machines 发布 Inkling 2 Small：总参数 594B、激活 17B，图文进、文本出。现可在 Tinker 推理和微调，权重仍关闭，Apache 2.0 计划下周放出。"
pubDate: 2026-11-08T06:30:00+08:00
topic: ai-tools
tags: ["Inkling 2 Small", "Tinker", "开放权重", "API 定价"]
keyword: "Inkling 2 Small"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "现在就能把 Inkling 2 Small 的权重下载下来吗？"
    a: "不能。2026 年 11 月 5 日的新闻稿写，模型先在 Tinker 提供，权重关闭；检查点要等权重发布才能下载。模型卡当前许可证是 Tinker Terms of Use，Apache 2.0 是计划中的权重许可证。Tinker 文档概述里有一句可以把训练后的权重下载走，那是平台的一般说明。这一款这周以新闻稿为准：能采样、能做 LoRA 微调，不能把检查点当成本地文件去排机器。"
  - q: "「下周」是哪一天？可以按这个买机器吗？"
    a: "新闻稿写的是 next week，在外部安全测试和红队完成之后，以 Apache 2.0 放出完整权重。页面没有日历日，也没有钟点。Artificial Analysis 同日文章把这件事写成 date unconfirmed。模型卡和新闻稿都没有写自建需要的显卡或机器。等权重页面真的给出仓库，再看体积。在那之前不要下采购单。"
  - q: "每百万 token 0.30 美元和 1.00 美元能不能直接写进预算？1M 上下文这周用得上吗？"
    a: "这组推理价同时出现在 Artificial Analysis 的文章和本文 2026-11-08（北京时间）打开的 Tinker 价目表上：输入 0.30 美元、缓存输入 0.03 美元、输出 1.00 美元，都是每百万 token。64K 训练档另是 1.50 美元，256K 训练档是 3.00 美元。检查点存储是每 GB 每月 0.10 美元。模型卡写上下文最多 1M，价目表列出的是 64K 和 256K。改预算前再打开价目表。文中的 token 条数是示例假设。"
  - q: "31 分和 30.6 能当成我的任务通过率吗？看到「开放权重第一」要不要信？"
    a: "不能。31 是新闻稿第一段和 Artificial Analysis 正文写的 Intelligence Index 分数，AA 点名的版本是 v5.0.1。30.6 是新闻稿和模型卡对照表里 AA Index (v5.0) 那一格。两数都不是你的采纳率。AA 把「中国以外开放权重最高」写成权重放出之后、按当时排名才会成立。新闻稿写的是权重仍然关闭。"
---

2026 年 11 月 5 日，Thinking Machines Lab 发布第二代模型 Inkling 2 Small。新闻稿写的是混合专家模型：总参数 594B，激活参数 17B，支持图像输入和可变的推理强度（variable effort）。输入是文本和图像，输出是文本。Artificial Analysis Intelligence Index 的分数，新闻稿第一段写成 31。

同一天就能用的入口有两处：Tinker Playground，以及 Tinker 上的采样和微调。权重在发布时是关闭的。新闻稿写，完整权重计划在外部安全测试和红队做完之后，于下周以 Apache 2.0 放出。模型卡上的当前许可证是 Tinker Terms of Use。检查点要等这批权重发布才能下载。

对中小团队，这周值得动手的是四件已经能核对的事。第一，在 Tinker 上用你自己的三份材料试质量，不要把生产路由切过去。第二，账单按 Tinker 价目表上的输入、缓存、输出和训练单价估算，并记下当次用量。第三，模型卡写的 1M 上下文，和价目表上这周能选的 64K、256K，是两套数字，请求按你选的那一行。第四，自建机器先不要买。能调用不等于能下载。模型按任务分工、不要整站换掉，仍然适用 [按任务分工，不要整站换新](/posts/october-ai-model-roles/)。

## 文档里已经写明的规格

下面只收 2026 年 11 月 5 日的新闻稿、同日的模型卡，以及本文 2026-11-08（北京时间）打开的 Tinker 价目表。三处对参数规模的口径一致。上下文和许可证要分行记。

| 项目 | 可以核对的说法 | 出处 |
| --- | --- | --- |
| 发布日 | 2026 年 11 月 5 日 | 新闻稿、模型卡 |
| 提供方 | Thinking Machines Lab, Inc. | 模型卡 |
| 架构与参数 | MoE。总参数 594B，激活 17B。48 层 decoder-only；每个 token 路由到 384 个专家中的 8 个；注意力是局部层和全局层混合 | 新闻稿、模型卡 |
| 模态 | 文本和图像进，文本出。图像可以是任意像素图；模型卡写，为了效果，每一边最好在 40px 到 4096px。新闻稿的限制段写，这一款不支持音频 | 模型卡、新闻稿 |
| 推理强度 | 支持 variable effort。公开评测一律用 effort 0.99（xhigh），temperature 1.0 | 新闻稿开头；评测段 |
| 上下文 | 模型卡写最多 1M token。评测轨迹上限也是 1M。Tinker 价目表列出的是 64K，以及带 `:peft:262144` 的 256K | 模型卡、新闻稿、价目表 |
| 数值格式 | 模型卡写支持 MXFP8 和 NVFP4。这是数值格式，不是已经能下载的权重包 | 模型卡 |
| 这周入口 | Playground 可试；Tinker 上可采样和微调。微调文档指向 Tinker Cookbook 和 tml-renderers | 新闻稿、模型卡 |
| 权重与许可 | 发布时权重关闭。模型卡许可证是 Tinker Terms of Use。计划下周以 Apache 2.0 放出完整权重，前提是外部安全测试和红队完成 | 新闻稿、模型卡 |
| 之后的平台 | 安全测试完成后，未来数周会在更多平台提供。新闻稿没有点名是哪些平台 | 新闻稿结尾 |

17B 是每个 token 激活的参数，不是「这是一个 17B 的稠密模型」。594B 是参数库存。价目表写，MoE 按激活参数定价。账单看价目表上的单价，不要从 594B 或 17B 反推一美元等于多少 token。

上下文这周不要记成一个数。模型卡的产品上限是 1M。新闻稿写，全部评测的轨迹上限是 1M，上一代 Inkling Small 用的是 256K。训练过程那一节又写，强化学习用 256K 上下文，更长轨迹做 compaction。你这周在 Tinker 上创建客户端时，价目表给的是两行：`thinkingmachines/Inkling-2-Small` 对应 64K，`thinkingmachines/Inkling-2-Small:peft:262144` 对应 256K。无服务器推理那一行的上下文也写成 256K，ID 再多一段 `:sampling-nvfp4`。把 1M 写进这周的请求，价目表对不上。

可变推理强度会进账单。新闻稿写，训练时随机抽一个 effort，并用长度惩罚让模型在速度和彻底程度之间取舍。对外公布的分数是 effort 0.99 的结果。价目表把这一行的类型写成 Hybrid + Vision：默认会推理，也可以通过 renderer 或参数关掉思维链。价目表没有在 Inkling 2 Small 这一行写出参数名。快速开始里的 `enable_thinking=False` 写在 Qwen3.5 的例句下面。第一次试跑用页面上真能看见的档位，把用量抄下来，不要靠猜参数来省钱。

语言栏是英语，以及 general multilingual support。模型卡没有给中文的单独分数。中文邮件、中文合同能不能用，用你自己的三份材料看采纳和返工，不要从「支持多语言」推出中文合格。

## 这周的价格按 Tinker 价目表算

推理单价有两个出处，数字对齐。Artificial Analysis 2026 年 11 月 5 日的文章写：每百万 token 输入 0.30 美元、输出 1.00 美元，缓存输入 0.03 美元。本文打开的 [Tinker 价目表](https://tinker-docs.thinkingmachines.ai/tinker/models/models_and_pricing/) 把同一组推理价写成 Prefill 0.30 美元、缓存 Prefill 0.03 美元、Sample 1.00 美元。价目表多出来的，是训练价、两档上下文、检查点存储，以及一行无服务器推理。新闻稿正文没有印这张价。

价目表开头写，价格都是每百万 token。检查点存储按每 GB 每月 0.10 美元。下表只收 Inkling 2 Small 的行。页面上还有别的模型，不搬进这篇。

| 行 | Tinker ID | 上下文 | 输入 | 缓存输入 | 输出 | 训练 |
| --- | --- | --- | --- | --- | --- | --- |
| 训练表，标准 | `thinkingmachines/Inkling-2-Small` | 64K | 0.30 美元 | 0.03 美元 | 1.00 美元 | 1.50 美元 |
| 训练表，加长 | `thinkingmachines/Inkling-2-Small:peft:262144` | 256K | 0.30 美元 | 0.03 美元 | 1.00 美元 | 3.00 美元 |
| 无服务器推理（beta） | `thinkingmachines/Inkling-2-Small:peft:262144:sampling-nvfp4` | 256K | 0.30 美元 | 0.03 美元 | 1.00 美元 | 该表没有训练价 |

价目表对这几列的定义是：Prefill 是采样时处理输入；缓存价是命中提示缓存的输入；Sample 是生成的输出；Train 是为了算梯度做的前向和反向，训练客户端发起的只做前向也按训练价计。加长上下文那一行写明，加长只让训练更贵，输入和采样单价与标准行相同。

无服务器推理目前是 beta，页面写只覆盖 Inkling、Inkling-Small 和 Inkling 2 Small。要上生产，页面让你写信到 tinker@thinkingmachines.ai 进等待名单，并写上机构、模型、用量、延迟和要求的用途。这周用 Playground 或文档里的采样客户端做对照即可。不要把 beta 读成已经签好的生产协议。

同一张无服务器表上，上一代 Inkling-Small 的输出是 1.20 美元，缓存输入是 0.06 美元，输入也是 0.30 美元。Inkling 2 Small 的输出单价比这一行低，缓存输入也更低。训练表里的 Inkling-Small 是另一组价（输入 0.58 美元、输出 1.44 美元），不要和上面这组混着比。

Artificial Analysis 还写了一个任务成本：Intelligence Index 上每个任务 1.18 美元，上一代 Inkling Small 是 0.20 美元，文章称之为将近 6 倍。同一篇写，Inkling 2 Small 每个指数任务平均大约 15 万输出 token，上一代大约 3.7 万，大约是 4 倍。1.18 美元是他们测指数任务时的花费，不是 Tinker 向你收取的「每次请求 1.18 美元」。输出单价并没有变成 6 倍。更长的输出会把账单抬上去。

下面的乘法只用价目表上的单价。token 条数是**示例假设**，用来演示小数点，不是 Thinking Machines 的统计，也不是你的账单。

未命中缓存时：费用 = 输入百万数 × 0.30 + 输出百万数 × 1.00。

取一笔和办公试跑差不多的用量：20 万未命中输入（0.2）加 5 万输出（0.05）。

| 算法 | 算式 | 金额 |
| --- | --- | --- |
| 上面这笔，不走缓存 | 0.2×0.30 + 0.05×1.00 | 0.11 美元 |
| 同一笔改成 18 万缓存、2 万未命中、5 万输出 | 0.18×0.03 + 0.02×0.30 + 0.05×1.00 | 0.0614 美元 |
| 只看输出，按 AA 写的约 15 万输出 token | 0.15×1.00 | 0.15 美元，尚未加上输入 |
| 100 万训练 token，64K 那一行 | 1×1.50 | 1.50 美元，尚未加上采样 |
| 100 万训练 token，256K 那一行 | 1×3.00 | 3.00 美元，尚未加上采样 |

0.15 美元对不上 AA 的 1.18 美元。1.18 美元包含他们那次任务的输入和输出。0.11 美元也不是「问一句邮件」的官方报价。屏幕上很短的回答，在 effort 0.99 时仍可能对应很长的输出。第一次把 `max_tokens` 设在你愿意付的上限里，再看控制台。

微调账单至少有训练和采样两边。新闻稿在可定制那一节写，他们用当时的 Tinker 单价去乘采样 token 和训练 token 来估计成本，采样还假设同一组 rollout 里会命中前缀缓存。本文不补一个「微调一次通常多少 token」。新闻稿里另有一笔 426 美元：模型在内部演示中自己去训练 Qwen3.5-4B，预算上限 500 美元，花了 426 美元。正文写 4.5 小时，演示记录写 4 小时 17 分。那是实验室的演示花费，不是 Inkling 2 Small 的单价，也不要写成你的微调报价。

价目表会改。本文只对 2026-11-08（北京时间）打开的那一版负责。改预算或写进合同之前再打开一次。

## 31 分、30.6，以及「权重已经开放」

分数有两个印出来的写法，不要并成一个「官方精确到小数」的数。

新闻稿第一段写，Artificial Analysis Intelligence Index 得分 31。Artificial Analysis 2026 年 11 月 5 日的文章正文也写 31，并写明指数版本是 v5.0.1。同一篇文章说，这个分数比 Inkling Small 高 18 分。正文没有写出上一代的绝对分。本文不把 31 减 18 写成官方复述。

新闻稿后部和模型卡的大表把这一列印成 AA Index (v5.0)，Inkling 2 Small 的格子是 30.6。同一行里，表上标成最高的是 Claude Haiku 5.5 的 36.5，DeepSeek-V4.1-Flash-1017 是 32.6。本文在 Artificial Analysis 那篇文章的正文里没有读到 30.6 这几个字符，文末的完整结果是图片，没有从图片里再抄一个小数。30.6 只引用实验室自己的 v5.0 表。31 和 30.6 不要相减，当成你已经测出的差距。

两数的用法相同：决定要不要拿自己的材料试一次。它们不是你的代码合并率，也不是客服草稿的采纳率。新闻稿写，这些评测跑在 effort 0.99、temperature 1.0。你在 Playground 里用另一个档，对不上表上的分数。

「开放权重第一」要看句子的时态。Artificial Analysis 的标题把「中国以外得分最高的开放权重模型」放在 pending weights release 下面，也就是权重还没放出。正文写，它现在以专有模型发布，权重以后再放；若按计划放出权重，按当前排名，它会成为中国以外研发的、得分最高的开放权重模型。新闻稿的句子是 Pending the release of its weights：权重放出之后，它才准备成为 DesignArena 上的开放权重第一。权重今天仍然关闭。Techmeme 2026 年 11 月 5 日的条目标题与新闻稿一致，写的是安全测试之后于下周放出权重。同一页也聚合了已经把它称作开放权重模型的帖子。那些帖子不是模型卡。帖子里的倍数和名次，本文不写进预算。

「中国以外」是 Artificial Analysis 的排名口径，不是中国大陆能不能注册、能不能付款的说明。本文不补可用性。

实验室的表很长。给要干活的人，只留四格，全部是他们自己的表，不是本文复测。评测设置仍是 effort 0.99、temperature 1.0。

| 项目 | 表上的 Inkling 2 Small | 读的时候怎么用 |
| --- | --- | --- |
| SWE-Bench Pro v2 (Hard) | 86.3%，该行第二；Kimi K3 为 88.2% | 适合拿一小段你确实要改的代码来试。不是你的合并率 |
| Terminal-Bench v4.0 | 13.1%。模型卡该行最高是 GLM 5.3 的 41.9% | 终端里的长任务不要只凭「代理式编程很强」就换 |
| JobBench | 70.5%，该行标成最高 | 适合拿一份你能核对的办公材料来试 |
| AA-Briefcase v1.1 | 1527。新闻稿的小表里，DeepSeek-V4.1-Flash-1017 为 1570 | 知识工作的演示分。终稿仍由人发出 |

Artificial Analysis 的正文另有一组他们自己的对照，和上表不要加在一起：FrontierCode 2.0 从来自 Inkling Small 的 5% 到 25%，同文写 Claude Sonnet 5.5（medium）是 11%；Terminal-Bench 4.0 是 13%，同文写 Claude Sonnet 5.5（medium）是 30%。实验室大表里的 FrontierCode v2.0 印的是 25.4%，Terminal-Bench v4.0 印的是 13.1%。差在小数和版本写法上。不要把 25 和 25.4 相减。编程能力在这两列上方向相反：一列高于他们点名的 Sonnet 档，一列低于。先看你的任务更像改仓库，还是更像在终端里做完一件长事。

新闻稿还写，相对上一代，它更听指令、改动更慎重、不经要求也会核对。这是厂商对可用性的描述。验收仍是人是否采纳、返工几分钟、账单上的 token。

## 和站里已经写过的模型放在一起

比的是这周你碰得到的入口，不是榜单名次。参数和价格的完整表留在原来的文章里。这里只摘对得上的格子，单价以那篇文章当时打开的页面为准。

| 对照 | Inkling 2 Small | Kimi K3.1 Pro | Ling-3.2-flash | Mistral Large 4 |
| --- | --- | --- | --- | --- |
| 这周的用途 | 在 Tinker 上试代理式编程、看图、知识工作草稿 | 权重已公开，小团队先用 API 看质量 | 看图、短视频、长文档，处在免费窗口 | 权重已公开，先算 API 账再谈自托管 |
| 规模 | 594B 总参数，17B 激活 | 模型卡 2.8T / 每 token 104B | 560B / 25B | 模型卡约 1 万亿总参数、每 token 约 49B |
| 长度 | 模型卡 1M；Tinker 价目表 64K 与 256K | 1,048,576 token | 1M | 模型卡 100 万 token |
| 模态 | 文本和图像进，文本出 | 文本和图像 | 图像、文本、视频输入 | 文本和图像进，文本出 |
| 权重 | 关闭。计划下周 Apache 2.0 | 已公开，没有申请门槛 | 这一款未宣布仓库 | 已可下载 |
| 费用口径 | 输入 0.30、缓存 0.03、输出 1.00 美元；64K 训练 1.50 | 输入 2 美元、输出 10 美元 | 上线后前两周免费，恢复原价未公布 | 输入 0.70、缓存 0.07、输出 2.10 美元 |

[Kimi K3.1 Pro](/posts/kimi-k3-1-pro-open-weights-guide/) 已经能下载，仓库大约 1.56 TB，那篇文章的结论是先用 API 试质量。Inkling 2 Small 连仓库地址都还没有。两款不要互相代替。这周如果目标是「把权重放在自己的机器上」，对得上的是 Kimi 那一篇，不是 Tinker 的调用权限。

[蚂蚁 Ling-3.2-flash](/posts/ant-ling-3-2-flash-guide/) 也是 11 月 5 日上线，能看图，并且多了视频输入，上线后前两周免费，恢复原价还没印在定价表上，3.2 这一款也没有权重仓库。免费窗口和 Tinker 的按量单价是两种账单。不要把 0.30 美元写成蚂蚁的恢复原价，也不要把「前两周免费」写成 Inkling 的促销。

[Mistral Large 4](/posts/mistral-large-4-open-weight-guide/) 在 10 月 29 日已经开放权重，API 单价是另一张表。那篇的结论同样是：没有合适的机器，就先走 API。Inkling 2 Small 还没到「算完 API 再谈自托管」的第二步，因为权重和机器要求都还没公布。本站那篇核对模型卡时写下的 Intelligence Index v5 是 26 分。那是当时卡片上的数字，和这里的 31、30.6 不是同一次复测，不要相减。

## 这周怎么试

样本从你有权使用、一天内能由人判断对错的工作里抽。每份同时交给现在的主力模型和 Inkling 2 Small。输入保持同一份，去掉客户姓名、未公开报价、账号和密钥。记录表固定七列：日期、任务、Tinker ID、页面上实际选的推理档、人是否采纳、返工分钟、账单金额。一周结束只留一个变化。看图、改代码、写草稿，哪一类采纳更高而且返工没有变长，就把那一类留在试跑名单里。两个一起换，就分不清差别来自哪里。

三份就够：

1. 一段你确实想改的说明或小模块。成功标准是改动能不能直接用，人要返工几分钟。
2. 一张你能回原图核对的图表或截图。成功标准是图里的数字和结构有没有进回答，有没有多出图里不存在的数。模型卡把医疗、法律和安全关键决策留在「要额外验证和人工复核」的范围。病历、合同原件和未公开经营数字不进这次试跑。
3. 一封会对外发送的邮件或一段纪要。模型只出草稿。发送按钮留在人手里。

### 先用 Playground，再决定要不要接 SDK

新闻稿给的试玩入口是 [Tinker Playground](https://tinker.thinkingmachines.ai/playground)。产品页上的注册按钮指向 [Sign up](https://auth.thinkingmachines.ai/sign-up)。Playground 适合把上面三份材料各跑一遍，和现有模型并排看。不要在同一天改生产环境变量。

需要接到自己的脚本时，按 [Tinker 快速开始](https://tinker-docs.thinkingmachines.ai/tinker/quickstart/) 的安装和登录来，不要换一套没在文档里出现的命令。文档推荐 `uv`，也写了可以用别的包管理器安装 `tinker`。

```bash
uv init tinker-quickstart
cd tinker-quickstart
uv add tinker tinker-cookbook
uv run tinker auth login
```

也可以在 Tinker Console 创建 API key，设成环境变量 `TINKER_API_KEY`。快速开始把绑定付款写在采样和训练之前，单价以 Models & Pricing 那一页为准。

快速开始里的 `base_model` 示例是 `Qwen/Qwen3.5-4B`。抽 Inkling 2 Small 时，换成价目表训练表里的 ID。64K 用 `thinkingmachines/Inkling-2-Small`。256K 用 `thinkingmachines/Inkling-2-Small:peft:262144`。价目表写，这个字符串传给 `create_sampling_client(base_model=...)` 或 `create_lora_training_client(base_model=...)`。

```python
sampling_client = await service_client.create_sampling_client(
    base_model="thinkingmachines/Inkling-2-Small"
)
```

上面只替换了模型 ID。快速开始里其余字段，包括 `temperature=0.7` 和玩具例子的 `max_tokens=50`，是 Qwen 例句，不是实验室评测用的 effort 0.99 和 temperature 1.0。`enable_thinking=False` 也写在 Qwen3.5 那一节。对话模板以你选中的模型在文档里的写法为准。第一次用一句不含客户信息的短问题打通，输出长度设在你愿意付的上限，然后打开账单。打通之后再换上三份脱敏材料。

无服务器那一行的 ID 是 `thinkingmachines/Inkling-2-Small:peft:262144:sampling-nvfp4`。它比训练表的 256K ID 多一段。快速开始演示的是采样客户端和训练客户端，没有把这个 beta ID 放进示例。生产用量走页面上的等待名单，不在这周的脚本里假设它已经是稳定接口。

### 微调先确认三件事

模型卡写，微调从 Tinker Cookbook 和 [tml-renderers](https://pypi.org/project/tml-renderers/) 开始。Tinker 概述写，平台做的是 LoRA，不是全量微调。概述认为很多场景里 LoRA 和全量微调效果相当，尤其是强化学习。这是平台说明，不是你的任务已经测过。

概述还有一句：训练出来的权重可以下载，拿到别的推理服务上用。Inkling 2 Small 的新闻稿把这一款写成另一句：检查点随权重发布才可下载。两句同时存在。这周排期以新闻稿为准。可以在 Tinker 里保存检查点、在 Playground 里打开，不要写一个把文件拉回自己磁盘的脚本，也不要按「下周一定能下」去买盘。

保存检查点之前看两笔钱。训练按你选的行：64K 是每百万 token 1.50 美元，256K 是 3.00 美元。采样另算。检查点存储是每 GB 每月 0.10 美元。只在 Playground 里问一句、没有保存检查点时，存储这一行会不会出现，价目表没有写。保存了再按 0.10 美元估算，并在控制台核对。

微调数据用你有权使用的材料。客户个人信息和密钥不进训练集。模型卡写，知识限于训练截止日期当时能得到的信息，页面没有给出那个日期。涉及截止日期之后的事实，回答要回原文核对。

## 写进备忘的界限

权重还没有仓库。Apache 2.0 是计划，不是这周 API 调用的许可证。调用目前对得上的是 Tinker Terms of Use。看到标题里有 open weights，先对一下是不是「放出之后才会成立」的那一句。

「下周」不是日历。新闻稿用 next week，Artificial Analysis 用 date unconfirmed，两边都没有钟点。安全测试若未完成，日期会往后。内部通知写成「等新闻稿把句子改成已经发布，再评估自建」。不要写成某一天的 23:59。

自建机器没有清单。模型卡、新闻稿和本文打开的价目表都没有写显存、卡数或磁盘。MarkTechPost 11 月 5 日的报道也写了自建硬件未披露。没有这些数字，就没有采购依据。

更多平台是「未来数周」，而且排在安全测试之后。新闻稿没有点名平台。不要提前改写成只认某一个云。

音频不在输入里。视频理解也不是这一款的文档范围。要看短视频，沿用站里已经分开写过的那些入口，不要把一段录音或一条片子塞进 Inkling 2 Small 再记成多模态成功。

高风险输出要人看。模型卡建议，医疗、法律和安全关键决策不要在没有额外微调、领域验证和人工复核的情况下直接部署。模型也会幻觉，也会在很长的多轮对话里变差。对外发送、付款、改权限，继续由人确认。

数据使用要单独问。本文核对过的新闻稿、模型卡和快速开始，没有写明提示词保存多久、存放在哪里、会不会用于训练。额度和训练用途分成两列问，问法和 [挑免费额度](/posts/free-ai-tool-limits/) 相同。屏幕上没有数据使用说明时，客户材料不进入试跑，也不进入微调。

榜单分数留在「实验室的表」或「Artificial Analysis 的文章」两栏。两栏的 31 和 30.6 已经写在上面。转述若把权重说成已经开放，以新闻稿和模型卡为准。

## 常见问题

### 现在就能把 Inkling 2 Small 的权重下载下来吗？

不能。2026 年 11 月 5 日的新闻稿写，模型先在 Tinker 提供，权重关闭；检查点要等权重发布才能下载。模型卡当前许可证是 Tinker Terms of Use。Tinker 文档概述里下载训练权重的那一句，是平台的一般说明。这周做 Playground 和 API 试跑。

### 「下周」是哪一天？可以按这个买机器吗？

新闻稿写 next week，前提是外部安全测试和红队完成，许可证是 Apache 2.0。页面没有日历日。Artificial Analysis 写成 date unconfirmed。模型卡和新闻稿都没有写自建机器。等仓库地址出现再评估。

### 每百万 token 0.30 美元和 1.00 美元能不能直接写进预算？1M 上下文这周用得上吗？

推理价在 Artificial Analysis 的文章里，也在本文打开的 Tinker 价目表上：输入 0.30 美元、缓存 0.03 美元、输出 1.00 美元。64K 训练是 1.50 美元，256K 训练是 3.00 美元，都是每百万 token。检查点存储每 GB 每月 0.10 美元。模型卡的上下文上限是 1M，价目表这周是 64K 和 256K。改预算前再看价目表。例子里的条数是假设。

### 31 分和 30.6 能当成我的任务通过率吗？看到「开放权重第一」要不要信？

不能。31 来自新闻稿第一段和 Artificial Analysis 正文，AA 写的版本是 v5.0.1。30.6 来自实验室对照表的 AA Index (v5.0)。都不是你的采纳率。AA 的「中国以外开放权重最高」以权重放出之后为准。新闻稿写权重仍然关闭。

## 信息来源

- Thinking Machines 新闻稿：[Introducing Inkling 2 Small](https://thinkingmachines.ai/news/inkling-2-small/)（2026-11-05。594B / 17B、图像输入、variable effort、Index 得分 31、Tinker 与 Playground、权重关闭、下周 Apache 2.0、检查点随权重发布才可下载、评测设置 effort 0.99 与 temperature 1.0、大表中的 AA Index (v5.0) 30.6）
- 模型卡：[Inkling 2 Small Model Card](https://thinkingmachines.ai/model-card/inkling-2-small/)（提供方名称、Tinker Terms of Use、48 层与 8/384 专家、1M 上下文、图像边长、MXFP8 / NVFP4、Cookbook 与 tml-renderers、同一张 AA Index 表、不支持音频、医疗与法律的使用建议）
- Artificial Analysis：[Inkling 2 Small 文章](https://artificialanalysis.ai/articles/thinking-machines-releases-inkling-2-small-highest-scoring-open-weights-model-outside-of-chinia-upon-weights-release-it)（2026-11-05。正文分数 31、指数 v5.0.1、比上一代高 18 分、约 15 万输出 token、每任务 1.18 美元、推理价 0.30 / 1.00 / 0.03、专有发布、Apache 2.0 的日期未确认、开放权重排名以权重放出为前提）
- Tinker 价目表：[Models & Pricing](https://tinker-docs.thinkingmachines.ai/tinker/models/models_and_pricing/)（本文打开于 2026-11-08，北京时间。64K 与 256K 的 ID 和单价、无服务器 beta、检查点存储 0.10 美元、Hybrid 的说明）
- Tinker 快速开始：[Get Started](https://tinker-docs.thinkingmachines.ai/tinker/quickstart/)（`uv` 安装、`tinker auth login`、`TINKER_API_KEY`、示例模型 ID 为 Qwen/Qwen3.5-4B、`enable_thinking` 写在 Qwen3.5 一节）
- Tinker 概述：[Tinker](https://tinker-docs.thinkingmachines.ai/tinker/)（LoRA 而非全量微调；概述中关于下载训练权重的一般说明）
- 模型卡指向的微调材料：[tinker-cookbook](https://github.com/thinking-machines-lab/tinker-cookbook)、[tml-renderers](https://pypi.org/project/tml-renderers/)
- 新闻稿指向的开放权重政策：[A Safe Path to Open Weights](https://thinkingmachines.ai/blog/a-safe-path-to-open-weights/)（新闻稿说关闭权重的做法沿用此文。本文不另摘该文中的数字）
- Techmeme：[2026-11-05 条目](https://techmeme.com/261105/p61)（标题与「安全测试后下周放出权重」一致。同页聚合了已称其为开放权重的帖子。本文不引用那些帖子里的倍数或名次）
- MarkTechPost：[2026-11-05 报道](https://www.marktechpost.com/2026/11/05/thinking-machines-inkling-2-small-release/)（复述 594B / 17B、Tinker 上的推理和微调、权重关闭、Apache 2.0 计划下周、自建硬件未披露。报道里的 1M 上下文与模型卡一致；这周能选的上下文以 Tinker 价目表为准）

价目表没有写出的中国大陆可用性、权重仓库地址、自建机器配置，以及「下周」的日历日，本文没有补。
