---
title: "蚂蚁百灵 LingSante-3.1：两套权重能下，但不是医疗器械"
description: "2026年11月23日蚂蚁分阶段开放 LingSante-3.1 权重。本文核对当天可下载的 air-VL 与 flash、官方评测口径、工作站级硬件，以及研究用途限制。"
pubDate: 2026-11-23T18:00:00+08:00
topic: ai-tools
tags: ["蚂蚁百灵", "LingSante", "开源权重", "医疗AI"]
keyword: "LingSante-3.1 开源"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "今天能下载哪两套 LingSante-3.1 权重？"
    a: "蚂蚁长帖点名的两款核心模型是 LingSante-3.1-air-VL 和 LingSante-3.1-flash，Hugging Face 仓库都在 inclusionAI 下，README 的许可证都是 mit。flash 另有官方量化仓 LingSante-3.1-flash-MXFP4，模型卡写 License: MIT。air-VL 是 124B 总参数、每 token 激活 5.5B、上下文 256K。flash 原权重是 560B 总参数、每 token 激活 25B、上下文 1M。MXFP4 配置的上下文是 262,144，不要写成 1M。"
  - q: "Pulse、MedGuard、Live 的权重也一起开源了吗？"
    a: "不要把新闻稿介绍过的三款写成都已能下完整权重。长帖写的是分阶段开放，当天上线的两款核心模型是 air-VL 和 flash。2026-11-23 打开 inclusionAI 的模型列表，另外能看到 LingSante-Pulse-1.0：生理信号编码器，页面标注 16.7M 参数，模型卡写任务专用预测头不包含。这和新闻稿里「评估 150 余种病况风险」的 Pulse 介绍不是同一句话。MedGuard 名下打开的是数据集 MedGuardBench，不是安全模型权重；用 MedGuard 搜索模型列表没有结果。Live 也没有搜到对应模型仓库。"
  - q: "LingSante-3.1 是医疗器械吗？能用来看病或开方吗？"
    a: "不能。flash、air-VL 和 MXFP4 的模型卡都写明：仅供研究与评估，不是医疗器械，不得作为诊断、开方或治疗的独立依据。输出可能不完整、过时，或和引用的证据对不上。高风险用途要由合格人员复核，并遵守隐私和医疗数据规定。下载权重或调用 API，也得不到阿福 App 里的视频问诊、专科复核和设备连接。"
  - q: "官方公布的分数能当选型依据吗？"
    a: "不能当成你的准确率，也不能当成独立临床认证。HealthBench Professional 65.72、HLE（纯文本、带工具）72.22、BrowseComp（带上下文）94.10、PhysicianBench 57、EHR-Complex 74.40，都来自 @AntLingAGI 的官方帖，是官方自测。帖中称前三项超过 GPT-6 Astra、Claude Opus 5.5 和 Gemini 4 Argon。99.62% 是医师标注一致率，不是临床准确率，也不是公开榜。InclusionMed 首期「开源医疗健康模型第一」来自蚂蚁参与发起的平台新闻稿。MXFP4 页上的跑分图写明属于源模型，不代表量化权重。用你自己的脱敏材料记采纳和返工。"
  - q: "本地要什么硬件？笔记本能按官方配方跑起来吗？"
    a: "不能按笔记本来准备。蚂蚁长帖写 air-VL 跑在工作站级硬件上。air-VL 模型卡的示例是 4 张 141GB 级 GPU、TP4、256K 上下文（YaRN），或 8 张 80GB 的 H100/H800、TP8。flash 原权重的示例是 8 张 H200（TP8 加 EP8），或 4 张 GB300（TP4 加 EP4）。MXFP4 推荐 4 张 NVIDIA H20-3e（TP4 / EP4 / DP1），检查点 291.72 GiB。没有这些机器，就走 Computrix，并核对当天条款。"
  - q: "Computrix 上的 API 是完全免费的吗？"
    a: "不要把页面上的 0 美元理解成永久免费、也不需要套餐。2026-11-23 打开 flash 和 air-VL 的 Computrix 页面时，供应商表把输入和输出都显示为每百万 token 0 美元。官方帖另写：免费 API 访问需要每月 20 美元的 Basic Token Plan；若只用免费版，免费期结束后符合条件的积分可能会退还。以 Computrix 当天条款为准。本文没有看到可引用的非零单价，所以不另写一个每百万 token 的正价。"
---

2026 年 11 月 23 日，蚂蚁集团宣布分阶段开放百灵（LingSante）医疗健康模型家族的权重。当天能下载的两款核心模型是 LingSante-3.1-air-VL 和 LingSante-3.1-flash。flash 另有官方给出的 MXFP4 量化仓。三份仓库都在 Hugging Face 的 inclusionAI 下，许可证都是 MIT。

对用 AI 干活的人，这件事值得单独记，是因为它同时给出了三件已经能核对的边界。第一，这是医疗向模型，模型卡写明不是医疗器械，不能单独用来诊断、开方或治疗。第二，官方配方是工作站级多卡，不是笔记本。第三，阿福（Afu，也叫 AQ）里的视频问诊和健康管家是产品功能，下载权重不会把这些功能一并给你。

它也不是本站已经写过的那一款。 [蚂蚁 Ling-3.2-flash 说明](/posts/ant-ling-3-2-flash-guide/) 写的是 2026 年 11 月 5 日上线的通用多模态型号，当时没有这一款的权重地址。本稿的 flash 写明基于 Ling-3.1-flash，air-VL 写明基于 Ling-3.0-flash-VL。两篇不要并成「同一模型的更新」。任务仍按难易拆开，沿用 [按任务分工，不要整站换新](/posts/october-ai-model-roles/)。

核对日期是 2026 年 11 月 23 日。改试验计划或把接口接到客户材料之前，再打开一次模型卡和 Computrix 条款。

## 今天仓库里有什么

蚂蚁 @AntGroup 的长帖写：权重在 Hugging Face 分阶段开放，现在能下的是两款核心模型。@AntLingAGI 的发布帖同时给出原始权重和 MXFP4 量化版。2026-11-23 打开 inclusionAI 的模型列表，名字对得上的是下面三套。

| 仓库 | 模型卡上的定位 | 不要把它当成 |
| --- | --- | --- |
| [LingSante-3.1-air-VL](https://huggingface.co/inclusionAI/LingSante-3.1-air-VL) | 轻量原生多模态。124B 总参数，每 token 激活 5.5B，上下文 256K。README 写接受文本和图像 | 笔记本就能按官方配方跑满；也不要把它写成上下文 1M |
| [LingSante-3.1-flash](https://huggingface.co/inclusionAI/LingSante-3.1-flash) | 复杂医疗推理、循证检索和长程医疗任务。560B 总参数，每 token 激活 25B，上下文 1M | Ling-3.2-flash 的权重更新 |
| [LingSante-3.1-flash-MXFP4](https://huggingface.co/inclusionAI/LingSante-3.1-flash-MXFP4) | flash 的训练后量化。主模型约 560B，每 token 约激活 25B，配置上下文 262,144 | 原权重的 1M 上下文；页上的跑分图也不属于这份量化检查点 |

三套 README 或模型卡都写了 MIT：air-VL 和 flash 的 frontmatter 是 `license: mit`，MXFP4 文末写 License: MIT。MIT 这个名字不能冲掉模型卡上的医疗限制。对外做健康相关功能时，先按「不是医疗器械」那一段执行。

新闻稿还介绍了另外三款，长帖没有把它们写成当天已经全部上线的权重：

- LingSante-Pulse：新闻稿写可整合多种健康信号、评估 150 余种病况风险。新闻稿没有写「未来六年」，这里也不补。
- LingSante-MedGuard：新闻稿写它识别医疗安全、合规和生命伦理风险。
- LingSante-Live：新闻稿写它是实时多模态智能体，已集成进阿福，强调视频问诊。

这三款里，2026-11-23 实际打开后对得上名字的，只有两个地址，而且都不是「完整产品权重已经按新闻稿规格开放」。

LingSante-Pulse-1.0 在模型列表里。打开后，卡片把它写成生理信号编码器，仓库里是 `model.safetensors` 等编码器文件，页面标注模型大小 16.7M。卡片写明返回的是信号表示，任务专用预测头不包含。示例输入是按采样率和通道身份组织的数组，不是一份病历，也不是「150 余种病况」的风险报告。新闻稿里的 Pulse 能力介绍留在新闻稿。这个 16.7M 的编码器不要升格成那一款预测模型。

LingSante-MedGuard 打开的是数据集，不是模型仓。数据集说明把它写成 MedGuardBench：用于评估医疗 AI 回答的安全、合规和伦理，本批包含 14,588 条风险检测记录和 578 张配套图像，文件分成安全、合规、伦理三份。用 MedGuard 搜索 inclusionAI 的模型列表，结果是空的。数据集页的示例请求使用了 API 模型名 `lingsante-medguard-4b`，并提到 4B、9B、27B 这几档。那是数据集页上的接口示例和技术报告转述，不是本文在模型列表里看到的可下载权重。安全模型的权重仍按「分阶段、当天未在模型列表里见到」来写。

LingSante-Live 用模型搜索没有结果。它停留在新闻稿和阿福产品介绍里。

## 和 11 月 5 日那款 flash 分开

参数规模接近，最容易抄串。Ling-3.2-flash 在 11 月 5 日的更新日志里也是 560B 总参数、25B 激活、1M 上下文，并且原生接受图像、文本和视频。那一篇核对时，3.2 没有仓库地址。

LingSante-3.1-flash 的模型卡写的是另一条谱系：基于 Ling-3.1-flash，保留其架构，面向医疗推理和长程医疗工作流。上一款医疗发布在卡片里写成 Ling-3.0-flash-Sante，124B 总参数、每 token 激活 5.1B。air-VL 是 124B 和 5.5B，基于 Ling-3.0-flash-VL，模型卡称它是蚂蚁健康团队开源的首个大规模多模态医疗模型。5.1B 和 5.5B 不要并成同一个激活数。3.2、3.1-flash、Sante 和 air-VL 是四条名字，各用各的仓库或各用各的「还没有仓库」。

读开源权重时，把许可证、上下文和机器规模分开核对。做法和 [Hy4 权重说明](/posts/hy4-open-weights-guide/) 一样：官方帖、模型卡和调用页面各管各的数字，不把相邻型号的价格或窗口套过来。

## 北京时间：宣布和仓库创建不是同一个钟点

对外宣布用北京时间。仓库的 `createdAt` 更早，只说明文件先出现在 Hugging Face，不把公开帖往前改。

| 北京时间 | 已经发生的事 | 本文怎么用 |
| --- | --- | --- |
| 11 月 19 日 12:30、12:31 | Hugging Face API 返回的 flash、air-VL `createdAt`（UTC 04:30:30、04:31:06） | 只说明仓库创建时间。不写成这天已经对公众宣布 |
| 11 月 20 日 16:39 | Pulse-1.0 的 `createdAt`（UTC 08:39:35） | 对得上的是 16.7M 编码器，不是新闻稿里的病况预测全文 |
| 11 月 22 日 11:19 | MXFP4 的 `createdAt`（UTC 03:19:38） | 量化仓创建早于当晚的发布线程 |
| 11 月 22 日 23:22 | @AntLingAGI 发布 flash 开源权重线程 | flash 的官方自测分数以这条为准 |
| 11 月 23 日 01:26 | @AntLingAGI 发布 air-VL 线程 | 帖中没有分项分数，本文不补 |
| 11 月 23 日 12:14 | @AQ_AIhealth 宣布阿福升级，并写 LingSante-3.1 于 11 月 23 日开源 | 产品升级和开源是同一天的两件事 |
| 11 月 23 日 13:14 | @AntGroup 长帖：分阶段开放，两款核心模型现已上线，并指向 inclusionAI | 以这条区分「能下的核心模型」和「家族里还介绍了哪些」 |

Computrix 的模型页把两款的 Release date 都写成 2026-11-20。那是页面上的发布日期字段。读者对外引用「哪一天宣布开源」，仍用上面的官方帖时间。

## 三套上下文不要抄成一个数

模型卡引言和配置页各自写死了窗口。引用时带上是哪一套权重。

| 项目 | air-VL | flash 原权重 | flash MXFP4 |
| --- | --- | --- | --- |
| 基座 | Ling-3.0-flash-VL | Ling-3.1-flash | 源模型就是上一列的 flash |
| 总参数 | README 写 124B。页面侧栏标成 125B，对外用 README 的 124B | 560B | 主模型约 560B（不含 MTP 的那一行也写大约 560B） |
| 每 token 激活 | 5.5B | 模型卡表写 25B。长帖和新闻稿写约 25B | 约 25B |
| 上下文 | 256K。启动示例把长度设为 262144，并用 YaRN 从 131072 伸到这一长度 | 1M | 262,144。不要套用原权重的 1M |
| 权重形态 | 模型卡未把这一款写成 MXFP4 | 原权重。SGLang 示例使用 `inclusionAI/LingSante-3.1-flash` | 混合 MXFP4 / FP8 / BF16 / FP32。检查点 291.72 GiB（313.23 GB；313,230,131,991 字节） |
| 输入 | README：文本和图像。长帖和 Computrix 介绍页还写可处理视频 | 卡片定位是文本向的复杂推理、检索和长程流程 | 与源模型同一套任务说明，另加量化会改变输出的限制 |

air-VL 示例里的 262144 就是 256×1024，模型卡小标题写的是「256K context with YaRN」。它和 MXFP4「配置窗口停在 262,144、而原权重是 1M」不是同一件事。看到 262144 先问：这是 air-VL 的 256K 启动参数，还是 MXFP4 的配置上限。

flash 原权重的架构表，2026-11-23 打开仍与卡片一致，本文只转述这张表：Hybrid-linear MoE；63 层 KDA 加 9 层 Gated MLA（7:1）；稠密层 4；路由专家 512；共享专家 1；每 token 激活 8 个路由专家；注意力头 64；隐藏维度 4096；专家中间维度 1280；稠密中间维度 10240；词表 157184。MXFP4 写明保留这套架构，并多写 1 层 MTP。预测头、量化模块的取舍以 MXFP4 卡片为准，不要把原权重的 1M 填进量化服务的 `--context-length`。

MXFP4 的量化说明也只引用卡片原文：对路由专家的 `gate_proj`、`up_proj`、`down_proj` 做训练后的 RTN（round-to-nearest），没有额外训练，也没有校准数据；其余模块保留 FP8、BF16 或 FP32。推荐部署是 4 张 NVIDIA H20-3e，TP4 / EP4 / DP1。卡片写明，页上的源模型跑分图是 LingSante-3.1-flash 的成绩，不代表这份量化检查点。量化还可能改变生成文本、推理、工具选择和停止行为，上线前要用你自己的样本对一下。

## 官方分数只说明官方怎么测

下面的数字全部来自 @AntLingAGI 的发布帖，是官方自测，不是本站复测，也不是独立实验室的临床认证。模型卡同时写明：榜单和模拟环境不能证明临床有效性。

flash 官方帖给出的五项是：

| 官方帖中的项目 | 官方帖中的结果 | 本文怎么读 |
| --- | --- | --- |
| HealthBench Professional | 65.72 | 官方自测。另一帖把同一数字写成 HBP |
| HLE（text-only, with tools） | 72.22 | 官方自测，帖中注明纯文本且带工具 |
| BrowseComp（with context） | 94.10 | 官方自测，帖中注明带上下文 |
| PhysicianBench | 57 | 官方自测 |
| EHR-Complex | 74.40 | 官方自测 |

同一帖称，前三项均超过 GPT-6 Astra、Claude Opus 5.5 和 Gemini 4 Argon，并称 flash 属于 leading open-weight models for healthcare。这是官方帖的比较句。本文没有看到可引用的对照模型分数，所以不补「对方是多少分」。

另一帖写 Professional Behavior Alignment：医师标注一致率 99.62%。这是训练或标注一致性，不是公开榜，更不是临床准确率。该帖称模型在 HBP（65.72）上领先，在该帖图表的三项医疗行为平均分上仅次于 GPT-6 Astra。两句一起读，不要收成「行为评分第一」或「看病准确率 99.62%」。

还有一句官方内部对比：相对只优化准确率的多智能体强化学习，contribution-aware 搜索在提高准确率的同时，把总搜索步数减少 20% 以上。这不是公开榜。

air-VL 的官方帖没有给分项分数，这里也不编。帖中称，在 AFUMED-Derm、AFUMED-Report、MIMIC-CXR 和 medical VQA（跨基准平均）上领先所比较的模型，这四项都超过 GPT-6.1 Sol 和 Gemini 3.8 Flash；BrowseComp-VL 高于 GPT-6.1 Sol，AndroidWorld 高于 Gemini 3.8 Flash，MMSearch 具有竞争力。Computrix 介绍页还写了另一些「排名第一」的基准名字。那些句子没有分项分数，也不是这条官方帖的正文，本文不把它们补进上表。

新闻稿另称，蚂蚁与 29 家全球机构的研究者推出开放评测平台 InclusionMed，点名的机构包括 Stanford、Harvard 和 Peking Union Medical College（北京协和医学院）。新闻稿称，在该平台首期排名中，LingSante-3.1-flash 位列所有开源医疗健康模型第一。这是蚂蚁参与发起的平台的首期排名，不是独立的临床认证，也不能代替你自己的返工记录。

## 机器按模型卡的配方

权重能下，不等于工位上的一台笔记本能按官方配方跑起来。长帖写 air-VL 跑在工作站级硬件上，面向小型诊所和科研团队。模型卡的启动示例是多张数据中心 GPU。按这个配方准备机器。

2026-11-23 模型卡上的配方是：

- air-VL，SGLang 镜像 `lmsysorg/sglang:dev-Ling-3.0-flash-VL`。示例是 4 张 141GB 级 GPU，TP4，256K 上下文（YaRN），`--context-length 262144`。另一档是 8 张 80GB 的 H100 或 H800，把 `--tp` 改成 8。vLLM 示例的张量并行是 4。
- flash 原权重，SGLang 镜像 `lmsysorg/sglang:dev-ling-3.1-flash`。示例是 8 张 H200，TP8 加 EP8。4 张 GB300 则改用 TP4 加 EP4。可选的 Hopper 解码优化，卡片写大约能把 batch-1 解码提高 10%。vLLM 示例的张量并行是 8。
- 卡片把 H200、GB300、H800、H100、B200 的配方指到 [SGLang 的 Ling-3.1-flash cookbook](https://docs.sglang.io/cookbook/autoregressive/InclusionAI/Ling-3.1-flash)。那是基座 cookbook。本文不把该页针对基座的测速，写成 LingSante-3.1-flash 的医疗成绩。
- MXFP4 不沿用上面的 8 卡 H200 示例。卡片推荐 4 张 H20-3e，TP4 / EP4 / DP1，`--context-length 262144`。

两款模型卡都推荐同一组采样：temperature 1.0，top_p 0.95，top_k 20，`enable_thinking` 设为 true。这是官方给研究调用的默认值，不是临床协议。

air-VL 模型卡还写了一组能力自述，只能当作「卡片怎么描述自己」，紧跟着的限制一句也不能省。卡片写：它会写 Findings 和 Impression，可以一起看多张影像，并在单张复杂胸片上识别 8 到 9 类阳性发现，列举了 cardiomegaly、pleural effusion、atelectasis、consolidation、pneumonia、pneumothorax；覆盖 120 种以上皮肤病，并会追问病史。搜索、工具和 GUI 需要外部环境和状态校验。这些句子不能换成「可以代替医生读片或看皮肤」。卡片的限制段写明：输出可能不完整或不准确，不得替代专业医疗建议、诊断或治疗；影像质量、光照、遮挡和缺失的上下文都会改变解读；报告和皮肤、饮食评估要由合格人员复核。

flash 的预期用途，卡片写成研究与评估、需要合格人员复核的问答和病历分析、结构化抽取，以及带工具的研究型 agent。长上下文不保证把相关事实都检索到。个人健康信息要保护，并遵守隐私和医疗数据规定。

## 阿福升级是产品，不是权重的附件

长帖里的用户规模是产品数字：阿福服务 1.5 亿用户，每天处理近 2000 万次健康咨询。同一帖写，今天开放的是支撑阿福的这套模型家族技术，家族覆盖多模态理解、复杂临床推理、疾病风险预测、安全护栏和智能体交互。家族覆盖这些方向，不等于 Pulse、MedGuard、Live 的权重都已能下。上面的仓库核对仍然有效。

同日宣布的阿福功能，按产品来读，不要写进「下载后你将得到」：

- 实时 AI 视频问诊，可观察症状、身体状况、药品和报告，并称可从面部血流变化估计心率和呼吸频率。这是产品表述，不是对开放权重的独立临床验证。
- 用户可以把在线医生拉进通话做专业复核，覆盖 16 个医学专科。
- 健康管家包括减重教练、营养和育儿协助，依据个人健康档案制定计划，并可连接 8 类智能健康设备，包括新推出的 AI 健康手环和戒指。

这些能力放在 App 里。研究用的权重没有附带问诊室、医生网络或手环协议。小团队要做的是：有没有权使用的、去掉身份的材料，拿来做可复核的试验；不要用开放权重给自己或客户看病，也不要承诺一个「下载即上线」的健康功能。

## 没有工作站时，先看 Computrix 的条款

官方帖给出的 API 页面是：

- flash：[Computrix 上的 LingSante-3.1-flash](https://computrix.ai/sg/models/modelservice-1795159585527001414)。页面上的模型名是 `lingsante-3.1-flash`，上下文 1.0M，供应商写蚂蚁数字科技。
- air-VL：[Computrix 上的 LingSante-3.1-air-VL](https://computrix.ai/sg/models/modelservice-1795159585354001768)。页面上的模型名是 `lingsante-3.1-air-vl`，上下文 256K。介绍页写原生支持文本、图像和视频。这和 Hugging Face README「接受文本和图像」不完全是同一句。调用前看你点开的那一页把视频列进输入没有。

2026-11-23 这两页的供应商表，都把输入和输出显示为每百万 token 0 美元。官方帖同时写：免费 API 访问需要每月 20 美元的 Basic Token Plan；若只用免费版，免费期结束后符合条件的积分可能会退还。两句一起生效。0 美元是当天页面上的标价，不是「不需要套餐」的证明，也不是本文推算出来的永久价格。页面没有给出另一档非零单价，这里就不编。延迟、吞吐和缓存命中会随监控窗口变化，不写进预算。

屏幕上若没有写明提示词保存多久、放在哪里、会不会用于训练，客户健康数据不进入这次试跑。额度和训练用途分成两列问，问法见 [挑免费额度](/posts/free-ai-tool-limits/)。个人账号能调通接口，只说明这次调用走得通，不说明你有权上传某份病历。

## 这周可以做的五步

样本只用你有权使用、并且去掉姓名、证件号、联系方式、账号和未公开经营信息的材料。每份要能由人在一天内对照原文判断对错。输出只作研究记录，不发给客户，不写进病历，不作为用药或就医建议。

1. 先读三张模型卡的限制段，把「不是医疗器械，不得作为诊断、开方或治疗的独立依据」抄进试验备忘。这一句对 air-VL、flash 和 MXFP4 都成立。
2. 按材料选仓库。要看图、皮肤照片、饮食图片或报告扫描件的研究，用 air-VL，窗口按 256K 记。要做长病历整理、证据检索或长流程的研究，用 flash 原权重，窗口按 1M 记。手里只有 MXFP4 时，窗口按 262,144 记，并且不要用页上那张源模型分数图代替这份量化权重的表现。
3. 没有模型卡列出的多卡机器，就不要把 TP8 或 4×141GB 改成笔记本再去对官方速度。改走 Computrix，记下套餐条款和当天标价。20 美元的 Basic Token Plan 和页面上的 0 美元要同时写进预算备注。
4. 同一份脱敏材料分给现在的主力模型和你选定的这一套，只记三项：人是否直接采纳、返工几分钟、账单金额。采纳更高并且返工没有变长，才把这一类留在试验名单里。两个入口同一天全换掉，就分不清是模型变了还是题目变了。
5. 工具调用只接只读、而且材料本身已经脱敏的环境。模型卡要求对后果性操作保留人工确认。搜索结果和工具输出都可能有错，也可能夹带恶意指令。预约、购药、付款、对外发送，不放进这周的试验。

最低限度用这张空表，不要填演示数字。

| 日期 | 任务 | 入口 | 直接采纳 | 返工（分钟） | 花费从哪来 |
| --- | --- | --- | --- | --- | --- |
| 填当天 | 一份你有权使用的脱敏材料 | air-VL / flash / MXFP4 / Computrix / 现用模型 | 是或否 | 填分钟 | 账单或「页面标价 0 美元，套餐条款另记」 |

## 这几件事直接避开

不要把 LingSante-3.1 写成 Ling-3.2-flash 的开源更新。不要把 Pulse-1.0 的 16.7M 编码器、MedGuardBench 数据集或 Live 的产品介绍，写成三款完整权重都已能下。不要把 MXFP4 的 262,144 写成 1M，也不要把 air-VL 的 256K 写成 1M。不要把 65.72、72.22、94.10、57、74.40 或 99.62% 写成你的准确率或临床有效性。不要按笔记本准备官方配方。不要把阿福的视频问诊、16 个专科和 8 类设备写成权重的功能清单。不要把可识别的病历、客户健康档案或密钥放进 API。不要用任何输出给自己或客户下诊断、开方或制定治疗。

## 常见问题

### 今天能下载哪两套 LingSante-3.1 权重？

蚂蚁长帖点名的两款核心模型是 LingSante-3.1-air-VL 和 LingSante-3.1-flash，Hugging Face 仓库都在 inclusionAI 下，README 的许可证都是 mit。flash 另有官方量化仓 LingSante-3.1-flash-MXFP4，模型卡写 License: MIT。air-VL 是 124B 总参数、每 token 激活 5.5B、上下文 256K。flash 原权重是 560B 总参数、每 token 激活 25B、上下文 1M。MXFP4 配置的上下文是 262,144，不要写成 1M。

### Pulse、MedGuard、Live 的权重也一起开源了吗？

不要把新闻稿介绍过的三款写成都已能下完整权重。长帖写的是分阶段开放，当天上线的两款核心模型是 air-VL 和 flash。2026-11-23 打开 inclusionAI 的模型列表，另外能看到 LingSante-Pulse-1.0：生理信号编码器，页面标注 16.7M 参数，模型卡写任务专用预测头不包含。这和新闻稿里「评估 150 余种病况风险」的 Pulse 介绍不是同一句话。MedGuard 名下打开的是数据集 MedGuardBench，不是安全模型权重；用 MedGuard 搜索模型列表没有结果。Live 也没有搜到对应模型仓库。

### LingSante-3.1 是医疗器械吗？能用来看病或开方吗？

不能。flash、air-VL 和 MXFP4 的模型卡都写明：仅供研究与评估，不是医疗器械，不得作为诊断、开方或治疗的独立依据。输出可能不完整、过时，或和引用的证据对不上。高风险用途要由合格人员复核，并遵守隐私和医疗数据规定。下载权重或调用 API，也得不到阿福 App 里的视频问诊、专科复核和设备连接。

### 官方公布的分数能当选型依据吗？

不能当成你的准确率，也不能当成独立临床认证。HealthBench Professional 65.72、HLE（纯文本、带工具）72.22、BrowseComp（带上下文）94.10、PhysicianBench 57、EHR-Complex 74.40，都来自 @AntLingAGI 的官方帖，是官方自测。帖中称前三项超过 GPT-6 Astra、Claude Opus 5.5 和 Gemini 4 Argon。99.62% 是医师标注一致率，不是临床准确率，也不是公开榜。InclusionMed 首期「开源医疗健康模型第一」来自蚂蚁参与发起的平台新闻稿。MXFP4 页上的跑分图写明属于源模型，不代表量化权重。用你自己的脱敏材料记采纳和返工。

### 本地要什么硬件？笔记本能按官方配方跑起来吗？

不能按笔记本来准备。蚂蚁长帖写 air-VL 跑在工作站级硬件上。air-VL 模型卡的示例是 4 张 141GB 级 GPU、TP4、256K 上下文（YaRN），或 8 张 80GB 的 H100/H800、TP8。flash 原权重的示例是 8 张 H200（TP8 加 EP8），或 4 张 GB300（TP4 加 EP4）。MXFP4 推荐 4 张 NVIDIA H20-3e（TP4 / EP4 / DP1），检查点 291.72 GiB。没有这些机器，就走 Computrix，并核对当天条款。

### Computrix 上的 API 是完全免费的吗？

不要把页面上的 0 美元理解成永久免费、也不需要套餐。2026-11-23 打开 flash 和 air-VL 的 Computrix 页面时，供应商表把输入和输出都显示为每百万 token 0 美元。官方帖另写：免费 API 访问需要每月 20 美元的 Basic Token Plan；若只用免费版，免费期结束后符合条件的积分可能会退还。以 Computrix 当天条款为准。本文没有看到可引用的非零单价，所以不另写一个每百万 token 的正价。

## 信息来源

- 官方 X：[@AntLingAGI 发布 LingSante-3.1-flash](https://x.com/AntLingAGI/status/2124523916819648945)（2026-11-22 15:22 UTC，北京时间 11 月 22 日 23:22）。五项分数、前三项超过三家闭源模型的表述，以及 leading open-weight models for healthcare，以这条为准。
- 官方 X：[@AntLingAGI 关于行为对齐的后续帖](https://x.com/AntLingAGI/status/2124523937900204362)。99.62% 的医师标注一致率、HBP 65.72，以及三项医疗行为平均分仅次于 GPT-6 Astra，以这条为准。不要把 99.62% 读成临床准确率。
- 官方帖中的内部对比（@AntLingAGI 发布说明里的另一帖）：相对只优化准确率的多智能体强化学习，contribution-aware 搜索在提高准确率的同时把总搜索步数减少 20% 以上。这不是公开榜。
- 官方 X：[@AntLingAGI 发布 LingSante-3.1-air-VL](https://x.com/AntLingAGI/status/2124555085640610194)（2026-11-22 17:26 UTC，北京时间 11 月 23 日 01:26）。AFUMED-Derm、AFUMED-Report、MIMIC-CXR、medical VQA、BrowseComp-VL、AndroidWorld 和 MMSearch 的比较句以这条为准。帖中没有分项分数。
- 官方 X：[@AQ_AIhealth](https://x.com/AQ_AIhealth/status/2124718270683210066)（2026-11-23 04:14 UTC，北京时间 12:14）。阿福升级，以及 LingSante-3.1 于 11 月 23 日开源，以这条为准。
- 官方 X：[@AntGroup 长帖](https://x.com/AntGroup/status/2124733189658669497)（2026-11-23 05:14 UTC，北京时间 13:14）。1.5 亿用户、每天近 2000 万次健康咨询、分阶段开放、两款核心模型、工作站级硬件、560B / 约 25B，以及阿福的视频问诊、16 个专科和 8 类设备，以这条为准。同线程 [指向 inclusionAI](https://x.com/AntGroup/status/2124733194302042592)。
- Hugging Face 模型卡（2026-11-23 打开）：[LingSante-3.1-flash](https://huggingface.co/inclusionAI/LingSante-3.1-flash)。MIT、560B / 25B / 1M、架构表、8×H200 与 4×GB300、采样参数，以及「不是医疗器械」的声明，以这张卡为准。
- Hugging Face 模型卡（2026-11-23 打开）：[LingSante-3.1-air-VL](https://huggingface.co/inclusionAI/LingSante-3.1-air-VL)。MIT、124B / 5.5B / 256K、文本与图像、4×141GB 级与 8×80GB H100/H800、胸片与皮肤病的自述，以及研究模型声明，以这张卡为准。侧栏的 125B 不替代 README 的 124B。
- Hugging Face 模型卡（2026-11-23 打开）：[LingSante-3.1-flash-MXFP4](https://huggingface.co/inclusionAI/LingSante-3.1-flash-MXFP4)。262,144 上下文、291.72 GiB、4×H20-3e、RTN 量化范围，以及「跑分图不属于量化检查点」，以这张卡为准。
- Hugging Face 模型卡（2026-11-23 打开）：[LingSante-Pulse-1.0](https://huggingface.co/inclusionAI/LingSante-Pulse-1.0)。生理信号编码器，页面标注 16.7M，任务预测头不包含。
- Hugging Face 数据集（2026-11-23 打开）：[inclusionAI/LingSante-MedGuard](https://huggingface.co/datasets/inclusionAI/LingSante-MedGuard)。MedGuardBench 的 14,588 条记录和 578 张图像以数据集说明为准。它不是安全模型的权重仓库。
- Hugging Face 模型列表（2026-11-23 查询 inclusionAI，关键词 LingSante）：返回 flash、air-VL、flash-MXFP4 和 Pulse-1.0。MedGuard、Live 没有出现在这次模型搜索结果里。
- Computrix（2026-11-23 打开）：[flash](https://computrix.ai/sg/models/modelservice-1795159585527001414) 与 [air-VL](https://computrix.ai/sg/models/modelservice-1795159585354001768)。当天供应商表显示的每百万 token 0 美元，以这两页为准；每月 20 美元的 Basic Token Plan 以官方帖为准。
- 新闻稿：[BusinessWire，2026-11-23](https://www.businesswire.com/news/home/20261122564652/en/)。InclusionMed、29 家机构、Pulse 的 150 余种病况，以及 flash 在该平台首期开源模型中排第一，按这篇新闻稿。本文抓取该 URL 时返回 403，若稿面有更新，以你重新打开的页面为准。
- SGLang 基座 cookbook：[Ling-3.1-flash](https://docs.sglang.io/cookbook/autoregressive/InclusionAI/Ling-3.1-flash)。LingSante-3.1-flash 模型卡把 H200、GB300、H800、H100、B200 的配方指到这里。该页测速不要直接写成医疗模型的成绩，除非页面明确写了 LingSante。

官方帖没有写出的对照分、模型卡没有写出的显存总量，以及 Computrix 页面没有列出的非零单价，本文没有补。
