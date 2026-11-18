---
title: "Hy4 flash 权重今天能下：开的不是正式版 Hy4"
description: "2026年11月18日腾讯开放 Hy4 flash 三套权重，正式版 Hy4 仍不能下。本文核对 TokenHub 五折到 11 月 30 日 12:00，并说明许可证不是 Apache。"
pubDate: 2026-11-18T17:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "腾讯混元", "Hy4 flash", "开源权重"]
keyword: "Hy4 flash 开源"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "今天能下载的是正式版 Hy4 权重吗？"
    a: "不能。2026 年 11 月 18 日开放的是 Hy4 flash、Hy4 flash-FP8 和预训练基座 Hy4 flash-base。官方帖写的是 stay tuned for Hy4 coming up next，另一条官方帖写 Hy4 weights next。研究文在当天仍写将很快开放 Hy4 权重。能聊天的是前两套指令模型，base 不是指令微调过的对话模型。"
  - q: "总参数是 224B 还是 220B？"
    a: "两套都是官方口径，本文不收成一个数。官方 X 和 11 月 16 日的腾讯博客、研究文写 224B 总参数（含 64B Engram）、激活 12B。Hugging Face 模型卡引言写 220B 总参数（含 64B Engram）、每个 token 激活 12B。模型卡属性表另有一组更细的行：不含 Engram、ViT、DFly2 的总参数 155.5B，Engram 63.5B，ViT 0.43B，DFly2 0.85B，激活是文本 11.3B 加视觉 0.43B。引用时带着出处。"
  - q: "五折和 WorkBuddy 免费是同一个「月底」吗？"
    a: "不是。TokenHub 价目表写明，自该说明发布之日起至 2026 年 11 月 30 日 12:00:00（北京时间），实际产生的 Hy4 flash 用量按目录价的 50% 结算，之后恢复目录价。目录价是每百万 tokens 输入 0.5 元、输出 2 元、缓存命中 0.02 元，五折是按这句话推算的 0.25 元、1 元、0.01 元，表上没有单独再列一行。WorkBuddy 免费来自 11 月 16 日官网博客的 From now till November 30，研究文写 Through November 30，这两处都没有钟点。不要并成一个「月底」。"
  - q: "许可证是 Apache 吗？自评分数能当成我的通过率吗？"
    a: "都不是。权重使用 Tencent Hy License, Version 1.0。它由 Apache 2.0 修改而来，主要多了第 10 条对大型 MaaS 的商业条款，不是 Apache License 2.0，也与 Apache 软件基金会无关。第 10 条的 5000 万美元和 1 亿月活是原文门槛，转售通用接口前要自己读 LICENSE。WorkIndex 的 42.1 分、盲测的 2.79/4 和每任务 0.26 元是腾讯内部测试，不是你的通过率。"
---

2026 年 11 月 18 日，腾讯混元公开了 Hy4 flash 的权重。能下载的是 flash，不是 11 月 4 日那篇里的正式版 Hy4。官方原话是先把 flash 交给你，正式版 Hy4 还要再等。

对小团队，今天值得动手的不是「开源模型又多了一个名字」，而是五件已经能核对的事：下哪三套、哪一套不能当聊天模型、224B 和 220B 为什么都出现、TokenHub 五折停在哪一分钟、许可证第 10 条卡的是谁。任务仍然按难易拆开，沿用 [按任务分工，不要整站换新](/posts/october-ai-model-roles/)。11 月 4 日正式版的目录价、年底五折和当时「权重还没放」的结论，留在 [腾讯 Hy4 正式版说明](/posts/tencent-hy4-workbuddy-guide/)，本文不把那篇重写一遍。

价格和许可证核对日期是 2026 年 11 月 18 日。改预算或把权重接到对外服务之前，再打开一次价目表和仓库里的 LICENSE。

## 今天开放了哪三套

官方账号 @TencentHunyuan 在 2026-11-18T04:39:34Z 发帖，北京时间 12:39。帖文写：Hy4 flash 现已开放权重，包括 Hy4 flash-FP8 和 Hy4 flash-Base；224B（12B 激活），100 万上下文，原生多模态；又写 And stay tuned for Hy4 coming up next。同一帖给了 Hugging Face、GitHub 和研究文链接，并写明使用 Tencent Hy License。该账号随后又补了一条 GGUF 链接，指向 Hugging Face 上的 AngelSlim/Hy4-flash-GGUF。

@TencentAI_News 在 2026-11-18T04:40:02Z 发了另一条：Hy4 flash 权重已开放，列出 Hy4 flash、Hy4 flash-FP8 和 Hy4 flash Base，并给了 GitHub、Hugging Face 和 GGUF，末尾是 Hy4 weights next。

IT 之家在当天 12:36:17 做了报道，同样写这三套可以在 GitHub、Hugging Face、ModelScope 和 GitCode 下载，并转述官方预告正在加速开源 Hy4。报道时间比上面两条帖略早一分钟量级。本文各用各的时钟，不把先后收成「谁第一个宣布」。

模型卡的 News 和 Model Links 把三套写清楚了。名字在不同页面大小写不完全一样，仓库 ID 以模型卡表格为准：

| 包 | 它是什么 | 不要把它当成 |
| --- | --- | --- |
| Hy4 flash | 指令模型。Hugging Face：`tencent/Hy4-flash` | 正式版 Hy4 |
| Hy4 flash-FP8 | FP8 量化后的指令模型。`tencent/Hy4-flash-FP8` | 一张消费级显卡就能按官方配方跑起来的证明 |
| Hy4 flash-base | 预训练基座。`tencent/Hy4-flash-base` | 指令微调过的对话模型 |

模型卡写明：base 不是 instruction-tuned chat model。下面的对话和推理示例只适用于 Hy4 flash 和 Hy4 flash-FP8。把 base 填进聊天接口，答非所问时先检查模型名，不要先改提示词。

同一张表还给出 ModelScope 和 GitCode 的对应仓库。2026-11-18 这九个地址都能打开：`Tencent-Hunyuan/Hy4-flash`、`Hy4-flash-FP8`、`Hy4-flash-base` 在 ModelScope；`tencent_hunyuan` 下同名三仓在 GitCode。GitHub 仓库是 [Tencent-Hunyuan/Hy4-flash](https://github.com/Tencent-Hunyuan/Hy4-flash)。研究文正文还点了 AtomGit。2026-11-18 从这篇研究文里没有提取到可核对的 AtomGit 仓库地址，本文不补链接。

GGUF 是模型卡量化一节里的一句：提供了一个压缩版本，for end-to-end testing purposes。地址是 [AngelSlim/Hy4-flash-GGUF](https://huggingface.co/AngelSlim/Hy4-flash-GGUF)。那一页有文件体积和他们自己的速度表。那些数字不是模型卡给出的最低显存，也不是本文采用的硬件要求。官方写给生产环境看的配方在后面，用的是 8 路张量并行。

正式版 Hy4 的权重今天仍然不能下。三条独立出处指向同一件事：官方帖的 coming up next 和 Hy4 weights next，研究文里的 We will also release open weights for Hy4 soon，以及 IT 之家转述的「正在加速开源 Hy4，敬请期待」。11 月 4 日那篇写过「这周没有正式版权重可下」。那句对正式版仍然成立。今天变了的是 flash。

## 11 月 4 日、11 月 16 日和今天各是一件事

三天不要捏成一条新闻。

| 日期 | 已经发生的事 | 2026-11-18 还成立的部分 |
| --- | --- | --- |
| 11 月 4 日 | 正式版 Hy4 发布。研究文写的是计划开源，权重当时没放。flash 被写成「近期发布」，那天没有单价 | 正式版权重仍未放。flash 的「近期」已经落地：既有托管价，也有权重 |
| 11 月 16 日 | 腾讯官网博客宣布 flash 上线托管产品，并写计划稍后开源。WorkBuddy 免费写到 November 30，TokenHub 五折也写在同一段 | 托管名单和两个优惠窗口仍以当天页面为准。开源从「计划」变成 18 日已经放出的 flash |
| 11 月 18 日 | 开放 flash 的三套权重。正式版 Hy4 权重仍是 next | 这是今天的新事实 |

11 月 16 日博客列出的托管入口是 Tencent Cloud TokenHub、WorkBuddy、元宝（Yuanbao）、企业微信（WeCom）、QQ、ima 和 Marvis，并写 OpenRouter integration coming soon。研究文的页眉日期仍是 November 16, 2026。2026-11-18 再打开时，正文已经加上权重开放，OpenRouter 那句仍是 will launch on OpenRouter soon。

2026-11-18 查询 OpenRouter 的公开模型页，`tencent/hy4-flash` 已经在列表里，页面写 Released Nov 16, 2026，供应商是 Tencent Cloud，并标明 In / out price 50% off。模型列表接口里的 created 时间是 2026-11-16T14:18:26Z。所以「即将上线」和「列表里已经有」同时存在。能在公开列表里看到，不等于你的账号、区域路由已经开通。页面写明目前不能走欧盟区内路由。简介里「大约是旗舰参数量的四分之一」不是腾讯模型卡或官方帖的口径，选型时不要用这句代替下面的参数表。

调用名也不要抄串。TokenHub 价目表的 model 是 `hy4-flash`。Hugging Face 仓库是 `tencent/Hy4-flash`。OpenRouter 的 ID 是 `tencent/hy4-flash`。vLLM 示例里的 served-model-name 又是 `hy4-flash`。四套字符串各管各的入口。

## 224 和 220 不要收成一个数

官方材料同时使用 224B 和 220B。本文并列写上，不挑选其中一个把另一个藏起来，也不另造一个「核对后的真实总参数」。

- 官方 X、11 月 16 日腾讯博客，以及研究文引言：总参数 224B（含 64B Engram），激活 12B。博客和 X 还写了多模态与 1M 上下文。研究文写：和 Hy4 一样，原生多模态，上下文 1M。
- Hugging Face 模型卡引言：220B total parameters（含 64B Engram），每个 token 只有 12B 激活。原生接受文本和图像，生成文本，上下文最多 1M（1,048,576）。
- IT 之家当天稿用的是 224B、64B Engram、激活 12B、100 万上下文。这是二次报道，和官方帖一致，不是第三套测量。

模型卡属性表是另一组行。下面引用的是这张表，不是本站自己量出来的：

| 模型卡属性表的行 | 表上的值 |
| --- | --- |
| Total Parameters（不含 Engram、ViT、DFly2） | 155.5B |
| Engram Parameters | 63.5B |
| ViT Parameters | 0.43B |
| DFly2 Parameters | 0.85B |
| Activated Parameters per Token | 文本 11.3B + 视觉 0.43B |
| 语言骨干 | 42 层：1 层稠密 FFN + 41 层 MoE |
| 上下文 | 1M（1,048,576） |

表里还有一行 Embedding Table Parameters：63.4B。于是 Engram 在不同位置出现过 64B、63.5B 和 63.4B。64B 是引言和官方帖的取整，63.5B 是属性表的 Engram 行，63.4B 是嵌入表那一行。三个数都留着。激活参数同样不要捏合：引言和官方帖写 12B，属性表写文本 11.3B 加视觉 0.43B。

把表内四行相加成一个新的「总参数」，是读者自己的算术，不是官方给出的第五个总数。本文不做这个加法。采购和对外介绍时，一句话里只引用一个出处，并带上是帖文、博客还是模型卡。

结构上，模型卡相对 Hy4 写了三处变化，这里只复述名称和官方给出的比例，不补充未写出的层配置：

1. 混合注意力。IndexPool 稀疏注意力和滑动窗口注意力（SWA）按 1:3 交错。
2. LatentMoE。每个 token 激活 512 个路由专家里的 16 个，另加 1 个共享专家。
3. N-gram 嵌入，也就是 Engram。

视觉编码器写的是由 SigLIP2-So400m-Patch16-Res512 改造，经 MLP 投影接到骨干。DFly2 是内置的 5 层草稿模型，0.85B，模型卡说它复用目标模型的 KV 缓存和稀疏索引。输入输出以模型卡为准：文本和图像进，文本出。研究文和官方帖的「多模态」不要扩写成能生成音频或视频。WorkIndex 里有一项音视频处理，那是他们的评测集合，不是权重会输出视频。

## 腾讯自评的分数，不是你的通过率

下面全部是腾讯自己的研究文、模型卡或 11 月 16 日博客。引用时保留「腾讯自评」或「官方研究文数字」。它们不是独立实验室的复测，也不是你的文档、幻灯片或仓库的通过率。

模型卡和 11 月 16 日材料里，这几条说的是他们的训练和推理，不是你的机器：

- 预训练：混合注意力、LatentMoE 和 Engram 把 KV 缓存降到 Hy3 的 1/24、Hy4 的 1/6。
- 后训练：从 Hy4 做自蒸馏。模型卡写强化学习把平均的端到端输出 token 砍掉 50%。研究文用了同一句。11 月 16 日博客写成端到端任务输出 token 减少 50%。「输出 token」和「任务输出 token」差两个字，引用时跟着你打开的那一页。
- 推理：megakernels、4-bit 量化和 DFly2。模型卡写解码速度超过 150 tokens/s，博客写 exceeding 150 tokens per second。这是他们的服务口径。官方展示的生产配方用的是 8 路并行，不要理解成笔记本也会到这个速度。

WorkIndex 是内部基准，模型卡写了 8 组：幻灯片创建、幻灯片编辑、人机合写幻灯片、Markdown 人机合写、文档编辑、表格修复、音视频处理、视觉理解。Figure 2 的任务分是 Hy4 flash 42.1、Hy4 preview 39.7、Hy4 51.4。平均每任务成本是 Hy4 preview 的 1/13、Hy4 的 1/20、DeepSeek-V4.1-Flash-1017 的 1/8，最后这一比较标明是 Max 档、高峰价。42.1 高于 preview 的 39.7，低于正式版 Hy4 的 51.4。模型卡的建议与此相符：日常生产力用 flash，包括深度搜索、文档处理、做幻灯片、简单前端演示和电脑操作；复杂的长程软件工程用 Hy4，因为它的智能上限更高。

盲测同样是内部的。模型卡 Figure 3：85 名内部 WorkBuddy 用户，259 个任务，27 个类别。满意度 2.79/4，Claude Haiku 5.5 是 2.81/4。端到端完成时间的中位数 6.7 分钟，每任务成本人民币 0.26 元。模型卡写，在受测模型里它的成本和中位耗时都是最低。测试者是腾讯内部用户，不是公开的第三方研究。2.79 和 2.81 差 0.02，只说明他们把两者写成接近，不说明换到你的工单里会持平。

研究文还有另一句，不要和 1/20 并成同一个比例。它写 WorkBuddy 的评测里，Hy4 flash 把平均任务时间砍掉 70%，成本大约是 Hy4 的 1/15，并称日常任务质量与 Hy4 相当，长程编程只略低。1/15 和 WorkIndex 的 1/20 是两句话。70% 也不是上面的 6.7 分钟。对外介绍时分开引用。研究文里元宝产品负责人还写了相对 Hy3 的智能体提升 13.6%、人侧并排（GSB）提升 7.56%，以及通用对话上超过 GLM-5.3-Flash 2.52%。这三句是产品侧自评，同样不能写成你的转化率。

OpenRouter 模型页在 2026-11-18 还展示了大约 64 tok/s 的吞吐（P50）和一批 Design Arena、Vals 分数。64 不是官方的 150。那些榜的分数本文不收录进选型，避免和 WorkIndex 混成一张表。

## 目录价、五折钟点和另一套美元标价

国内按量账单看腾讯云 TokenHub。价目表最近更新时间是 2026-11-16 12:15:30，2026-11-18 打开时仍是这个时间戳。下面只引用页面上标明「广州」的按量后付费表，单位是元/百万 tokens：

| 模型 | model | 推理输入 | 推理输出 | 缓存命中 |
| --- | --- | --- | --- | --- |
| Hy4 flash | hy4-flash | 0.5 | 2 | 0.02 |
| Hy4 | hy4 | 6 | 18 | 0.3 |
| Hy4 preview | hy4-preview | 6 | 18 | 0.3 |

折扣说明的原文要点是：自本说明发布之日起至 2026 年 11 月 30 日 12:00:00（北京时间），Hy4 flash 在此期间实际产生的用量按目录价格的 50% 结算；期满恢复目录价。按这句把目录价除以二，是输入 0.25 元、输出 1 元、缓存命中 0.01 元。价目表没有再单独列一行折扣价。说明写的是调用费用按目录价 50% 结算，没有把缓存单独排除。账单若和这个理解不一致，以账单为准。

Hy4 自己的五折是另一条：到 2026 年 12 月 31 日 23:59:59（北京时间），同样按目录价 50%，也就是输入 3 元、输出 9 元、缓存命中 0.15 元。这笔账在 11 月 4 日的文章里已经按当时的价目表算过。2026-11-18 这张表上的目录价和截止日期仍是那一组，这里只用来对照，不把正式版的试用步骤再写一遍。批量推理表里有 Hy4 和 Hy4 preview 的 3 / 9 / 0.15，没有 hy4-flash 这一行。不要把批量价套到 flash 上。

WorkBuddy 的免费窗口来自 11 月 16 日官网博客：From now till November 30。研究文写 Through November 30。两处都没有写到几点。TokenHub 的 12:00:00 只约束价目表点名的那次 API 折扣。一个停在中午，一个没有钟点，不要并成「月底前都免费又都五折」。免费额度还剩多少、内容会不会用于训练，到产品里看，问法和 [挑免费额度](/posts/free-ai-tool-limits/) 相同。屏幕上没有数据说明时，客户材料不进入试跑。

美元是另一张表，不要乘汇率当成人民币账单。研究文（页眉 November 16, 2026，2026-11-18 核对）的 API 标价，每百万 token：Hy4 flash 缓存输入 0.003 美元、输入 0.070 美元、输出 0.281 美元；Hy4 是 0.042、0.834、2.501 美元。11 月 16 日腾讯官网博客对 flash 这三格用了 approximately。两套货币各记各的。

OpenRouter 模型页在 2026-11-18 把同一组美元标价划掉，标成 50% off：输入 0.035 美元、输出 0.1405 美元、缓存读取 0.0015 美元，每百万 token。页面写了五折，没有写这个五折到哪一分钟结束。不要把 TokenHub 的 11 月 30 日 12:00:00 自动套到 OpenRouter。该页还有一列加权平均，输入大约 0.006 美元/百万 token，旁边的缓存命中率大约 95%。那是他们统计的实付，不是标价。做预算用标价，用控制台核对命中。

## 示例假设：同一组 token 乘目录价

下面的 token 数都是**示例假设**，不是官方统计，也不是你的账单。默认不命中缓存，除非这一行单独写出。思考过程如果被算进输出，要已经包含在你假设的输出 token 里。可见回答很短，不代表输出 token 很少。模型卡默认的 `reasoning_effort` 是 `high`，也就是打开思考。

假设输入 20 万 token（0.2 个百万），输出 5 万 token（0.05 个百万），全部未命中缓存。

- Hy4 flash 目录价：0.2 × 0.5 + 0.05 × 2 = 0.10 + 0.10 = 0.20 元。
- 按五折说明推算：0.2 × 0.25 + 0.05 × 1 = 0.05 + 0.05 = 0.10 元。
- 同一组 token 的 Hy4 目录价：0.2 × 6 + 0.05 × 18 = 1.20 + 0.90 = 2.10 元。
- Hy4 在它自己的五折期内：0.2 × 3 + 0.05 × 9 = 0.60 + 0.45 = 1.05 元。

0.20 / 2.10 = 2/21，大约 0.095。五折对五折仍是 0.10 / 1.05 = 2/21。在这组假设里，flash 的单价账单大约是 Hy4 的一成略低。这不是 WorkIndex 的「每任务成本是 Hy4 的 1/20」。1/20 混有他们测到的 token 用量和任务构成。输出如果比假设更长，2/21 就不成立。官方说强化学习平均砍掉 50% 输出 token，那是他们的平均，不能乘进这一单里当成已经发生的折扣。

再假设 2 万未命中、18 万缓存命中、输出仍是 5 万。

- 目录价：0.02 × 0.5 + 0.18 × 0.02 + 0.05 × 2 = 0.01 + 0.0036 + 0.10 = 0.1136 元。
- 五折推算：0.02 × 0.25 + 0.18 × 0.01 + 0.05 × 1 = 0.005 + 0.0018 + 0.05 = 0.0568 元。

把第一单重复 20 次，目录价是 4.00 元，五折推算是 2.00 元。20 次也是假设，不是一周的官方用量。试跑周可以拿 2.00 元当折扣期内的帽，拿 4.00 元当 11 月 30 日 12:00:00 之后的帽。超过就停，回来看采纳率。常驻预算按目录价报，五折只覆盖说明里的那段用量。

## 许可证第 10 条卡的是谁

这节是阅读说明，不是法律意见。签约、对客转售或把权重放进公司产品之前，把 LICENSE 交给自己的律师或法务。

仓库使用的是 Tencent Hy License, Version 1.0，全文在 [Hy4 flash 的 LICENSE](https://huggingface.co/tencent/Hy4-flash/blob/main/LICENSE)。开篇写明：本许可证由 Apache License 2.0 修改而来，修改主要是第 10 条对大型 MaaS 业务增加的商业条款。它不是 Apache License 2.0，也未得到 Apache 软件基金会的背书或关联。不要写成「Apache」或「商业使用完全免费」。

Derivative Works 明确包括微调、量化、蒸馏、合并、裁剪或以其他方式改过的权重。FP8、GGUF 和你自己的微调，都在这句里面。第 4 条还写，你附加的许可条款不得取消、限制或抵触第 10 条，第 10 条继续适用于每一个收到作品或衍生作品的人。

第 10 条用原文的门槛说明，不把数字说软：

- 10.1：MaaS 指让第三方远程使用模型推理或微调（例如通过 API），并允许他们提交输入，或指定参数或训练数据。排除两类：（i）终端用户产品，模型能力被限制在特定功能或工作流里，没有通用的模型访问；（ii）只是把请求转发到独立运营的第三方模型服务。
- 10.2：如果你经营 MaaS，在下面任一情况，必须事先从许可方取得单独的书面许可（包括电子邮件）。（a）任意连续 12 个月的全球合计总收入超过 5000 万美元（或其他货币的等值），不论这笔收入是否来自本作品或衍生作品，在使用或继续使用之前；（b）在任何一个日历月月活超过 1 亿的产品或服务中使用之前。
- 10.3：仅用于内部目的时，10.2 不适用，前提是作品、衍生作品和它们的输出都不提供给第三方。
- 10.4：许可问询写到 hy_partners@tencent.com。模型卡上的开源联系邮箱是另一条：hunyuan_opensource@tencent.com。

对这份站点的读者，常见的起点是：自己用 WorkBuddy 或 TokenHub，那是在用腾讯已经运营的服务，不是你在把权重开放成通用 API。公司内部办公、权重和输出都不给第三方，10.3 写的是 10.2 不适用。独立开发者做的小工具，如果模型只包在某一个功能里、对方不能把它当成通用模型来调用，原文把它放在 10.1 的排除项（i）。对得上哪一档，要自己对着英文原文看，本文不替你做法律认定。

一旦计划把通用推理或微调接口卖给别人，就先读第 10 条，而不是先上线。全球收入已经超过 5000 万美元的主体，即使这笔收入和 Hy 无关，只要经营的是 MaaS，10.2（a）要求在使用前另行取得书面许可。月活超过 1 亿是 10.2（b），看的是产品，不是你这周的试跑量。

## 官方配方写的是 8 路并行

模型卡没有给出最低 GPU 型号或张数。本文也不补。社区里的显存整数和「几张 3090」不采用。2026-11-18 能核对到的生产示例，两套都是 8 路张量并行，加载的都是 `tencent/Hy4-flash-FP8`。

Transformers 支持还没进主分支。模型卡写即将合并，在此之前从下面这条安装：

`pip install "transformers[torch,vision] @ git+https://github.com/huggingface/transformers.git@refs/pull/50903/head"`

指令模型的 `reasoning_effort` 有两档：`high`（默认，打开思考）和 `no_think`。推荐采样是 temperature=0.9、top_p=1.0。模型卡的示例使用 `device_map="auto"`。自动放置不等于一张 GPU 够用。

生产服务，模型卡推荐官方预构建镜像：

- vLLM：镜像 `vllm/vllm-openai:hy4-flash`。示例运行 `tencent/Hy4-flash-FP8`，`--tensor-parallel-size 8`，推测解码方法 `dfly`，对外服务名 `hy4-flash`。
- SGLang：镜像 `lmsysorg/sglang:hy4-flash`，注明 x86 和 Arm。示例同样是 `tencent/Hy4-flash-FP8` 和 `--tp 8`。

完整命令以模型卡当天文字为准，这里只保留和规模有关的参数，避免把 8 路写成笔记本或单卡。GGUF 那一页还写 llama.cpp 的支持在一个尚未合并的拉取请求里。那是测试用途的压缩包，不是上面这两条生产配方。

## 这周先试托管，再决定要不要自建

官方的分工可以先当成假设，再用你自己的样本决定留不留。flash 先试日常：搜索整理、文档、幻灯片、简单的前端演示。长程、要改很多步的软件工程，继续用你已经验收过的更强模型；若你已经在用正式版 Hy4，这类任务先留在那边。两个一起换成默认，就分不清是模型变了还是题目变了。

一周只做这六步：

1. 从上周挑 2 到 3 件真实任务。一件日常文档或幻灯片，一件你确实想看的简单页面，一件不能直接发出的邮件或报价。每件都要人能在一天内判断对错。去掉客户姓名、未公开报价、账号和密钥。
2. 先用 WorkBuddy 的免费窗口做质量判断。博客写到 November 30，没有写钟点，打开产品时看剩余额度和数据说明。这一步的账单如果是 0，记录里写 0，并注明「产品额度」。
3. 需要 API 数字时，再用 TokenHub 的 `hy4-flash` 打一小笔你愿意试错的金额。折扣只覆盖 2026 年 11 月 30 日 12:00:00（北京时间）之前实际产生的用量。可能拖过这个钟点的流程，按目录价 0.5 / 2 / 0.02 做预算。
4. 和现在的模型并排，只记三项：人是否直接采纳、返工几分钟、账单金额。日常采纳更高并且返工没有变长，才把这一类留在 flash。长程任务返工变多，就留在原来的模型。记录方式见 [AI 提效怎么量化](/posts/ai-productivity-measurement/)。
5. 自建排在样本之后。样本没有说明托管不够用，就不要为了「权重能下了」去备 8 路机器。真要自建，跟模型卡当前的 FP8 示例，不要把 tp 8 改成单卡再来对官方速度。打算把通用 API 卖给别人的，上线前先读第 10 条。
6. 电脑操作单独放。官方建议 flash 可以做 computer use。试的机器不要同时开着唯一的客户会话或网银。外部网页和邮件进上下文之后，按 [提示词注入防护](/posts/prompt-injection-defense-checklist/) 处理：模型可以起草，发送、付款和改权限仍由人确认。

最低限度用这张空表，不要填演示数字。

| 日期 | 任务 | 入口 | 直接采纳 | 返工（分钟） | 花费从哪来 |
| --- | --- | --- | --- | --- | --- |
| 填当天 | 一件真实任务 | WorkBuddy / TokenHub `hy4-flash` / 现用模型 | 是或否 | 填分钟 | 产品额度或账单 |

这几件事直接避开：不要去下正式版 Hy4 的权重，地址还没有；不要把 base 当成聊天模型；不要把 224B 和 220B 收成一个数；不要把 42.1 分、2.79/4 或每任务 0.26 元写成你的质量；不要把 1/20、1/15 和上面示例里的 2/21 当成同一个折扣；不要把 WorkBuddy 的 November 30 和 TokenHub 的 12:00:00 并成「月底」；不要把许可证叫成 Apache；不要用未写进模型卡的显存数字去报机器。

## 常见问题

### 今天能下载的是正式版 Hy4 权重吗？

不能。2026 年 11 月 18 日开放的是 Hy4 flash、Hy4 flash-FP8 和预训练基座 Hy4 flash-base。官方帖写的是 stay tuned for Hy4 coming up next，另一条官方帖写 Hy4 weights next。研究文在当天仍写将很快开放 Hy4 权重。能聊天的是前两套指令模型，base 不是指令微调过的对话模型。

### 总参数是 224B 还是 220B？

两套都是官方口径，本文不收成一个数。官方 X 和 11 月 16 日的腾讯博客、研究文写 224B 总参数（含 64B Engram）、激活 12B。Hugging Face 模型卡引言写 220B 总参数（含 64B Engram）、每个 token 激活 12B。模型卡属性表另有一组更细的行：不含 Engram、ViT、DFly2 的总参数 155.5B，Engram 63.5B，ViT 0.43B，DFly2 0.85B，激活是文本 11.3B 加视觉 0.43B。引用时带着出处。

### 五折和 WorkBuddy 免费是同一个「月底」吗？

不是。TokenHub 价目表写明，自该说明发布之日起至 2026 年 11 月 30 日 12:00:00（北京时间），实际产生的 Hy4 flash 用量按目录价的 50% 结算，之后恢复目录价。目录价是每百万 tokens 输入 0.5 元、输出 2 元、缓存命中 0.02 元，五折是按这句话推算的 0.25 元、1 元、0.01 元，表上没有单独再列一行。WorkBuddy 免费来自 11 月 16 日官网博客的 From now till November 30，研究文写 Through November 30，这两处都没有钟点。不要并成一个「月底」。

### 许可证是 Apache 吗？自评分数能当成我的通过率吗？

都不是。权重使用 Tencent Hy License, Version 1.0。它由 Apache 2.0 修改而来，主要多了第 10 条对大型 MaaS 的商业条款，不是 Apache License 2.0，也与 Apache 软件基金会无关。第 10 条的 5000 万美元和 1 亿月活是原文门槛，转售通用接口前要自己读 LICENSE。WorkIndex 的 42.1 分、盲测的 2.79/4 和每任务 0.26 元是腾讯内部测试，不是你的通过率。

## 信息来源

- 官方 X：[@TencentHunyuan](https://x.com/TencentHunyuan/status/2122912575302119554)（2026-11-18T04:39:34Z）。开放 flash、FP8 和 Base，224B（12B 激活），以及 stay tuned for Hy4 coming up next，以这条为准。同线程稍后的 GGUF 链接指向 AngelSlim/Hy4-flash-GGUF。
- 官方 X：[@TencentAI_News](https://x.com/TencentAI_News/status/2122912692822528031)（2026-11-18T04:40:02Z）。GitHub、Hugging Face、GGUF，以及 Hy4 weights next，以这条为准。
- Hugging Face 模型卡（2026-11-18 核对）：[tencent/Hy4-flash](https://huggingface.co/tencent/Hy4-flash)。220B 引言、属性表、WorkIndex、盲测、三套权重链接、采样参数和 vLLM / SGLang 示例，以这张卡为准。FP8 与 base 的仓库是 [Hy4-flash-FP8](https://huggingface.co/tencent/Hy4-flash-FP8)、[Hy4-flash-base](https://huggingface.co/tencent/Hy4-flash-base)。
- 许可证全文：[Tencent Hy License, Version 1.0](https://huggingface.co/tencent/Hy4-flash/blob/main/LICENSE)。
- GGUF（模型卡称为端到端测试用压缩版）：[AngelSlim/Hy4-flash-GGUF](https://huggingface.co/AngelSlim/Hy4-flash-GGUF)。本文不引用该页的体积和速度作为硬件要求。
- GitHub：[Tencent-Hunyuan/Hy4-flash](https://github.com/Tencent-Hunyuan/Hy4-flash)。ModelScope 与 GitCode 的三套地址以模型卡表格为准，2026-11-18 均可打开。
- 腾讯研究文：[Introducing Hy4 flash](https://hy.tencent.ai/research/hy4-flash)（页眉 November 16, 2026；2026-11-18 核对时正文已写权重开放，并仍写 Hy4 权重将很快放出）。美元标价、1/15 与 70%、元宝自评，以这篇为准。
- 腾讯官网博客（November 16, 2026）：[Tencent Launches Hy4 flash](https://www.tencent.com/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/)。224B、托管产品名单、WorkBuddy 免费到 November 30、OpenRouter coming soon，以这篇为准。
- 腾讯云：[TokenHub 模型价格](https://cloud.tencent.com/document/product/1823/130055)（页面显示最近更新 2026-11-16 12:15:30；2026-11-18 核对）。广州按量目录价和两条五折说明，以该页为准。
- OpenRouter 模型页（2026-11-18 核对）：[tencent/hy4-flash](https://openrouter.ai/tencent/hy4-flash)。列表中的五折美元价、65,536 的完成 token 上限，以及「不能走欧盟区内路由」，以该页当天文字为准。参数规模不要采用该页简介。
- IT 之家（2026-11-18 12:36:17）：[腾讯混元 Hy4 flash 模型官宣开源](https://www.ithome.com/1/028/701.htm)。

成本例子里的 token 数都是示例假设，只使用上述 TokenHub 目录价和折扣说明做乘法。
