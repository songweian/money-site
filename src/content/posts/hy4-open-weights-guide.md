---
title: "Hy4 权重今天能下：旗舰 770B 开了，许可证仍不是 Apache"
description: "2026年11月20日腾讯开放正式版 Hy4 三套权重。本文核对 770B 与约 774B 的口径、TokenHub 五折到 12 月 31 日 23:59:59，并说明许可证不是 Apache。"
pubDate: 2026-11-21T06:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "腾讯混元", "Hy4", "开源权重"]
keyword: "Hy4 开源"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "今天能下载的是正式版 Hy4 权重吗？"
    a: "能。2026 年 11 月 20 日开放的是正式版 Hy4、Hy4-FP8 和预训练基座 Hy4 base。这和 11 月 18 日开放的 Hy4 flash 三套不是同一批仓库。能聊天的是前两套指令模型，base 不是指令微调过的对话模型。"
  - q: "总参数是 770B 还是约 774B？"
    a: "两套都出现在官方或官方推荐材料里，本文不收成一个数。官方 X 写 natively multimodal flagship MoE（770B total / 49B active，1M context）。Hugging Face 模型卡引言写语言骨干总参数 770B、每个 token 激活 49B；属性表写 Total Parameters（excluding ViT, adapter, and DFly2）为 770B，激活是文本 49B 加视觉 1.23B，ViT 1.23B，DFly2 3.3B。vLLM 配方页把语言骨干 770B 加上视觉编码器和 DFly2，写成存储总量约 774B，页眉写作 774B total / 49B active。引用时带着出处。"
  - q: "Hy4 和 Hy4 flash 的五折是同一天结束吗？"
    a: "不是。TokenHub 价目表写明，Hy4 自该说明发布之日起至 2026 年 12 月 31 日 23:59:59（北京时间），实际产生的用量按目录价的 50% 结算，之后恢复目录价。目录价是每百万 tokens 输入 6 元、输出 18 元、缓存命中 0.3 元，五折是按这句话推算的 3 元、9 元、0.15 元，表上没有单独再列一行。Hy4 flash 的五折截止是 2026 年 11 月 30 日 12:00:00（北京时间），目录价是 0.5 元、2 元、0.02 元。不要并成同一个「年底」或「月底」。"
  - q: "许可证是 Apache 吗？自建一台消费级显卡就能跑起来吗？"
    a: "都不是。权重使用 Tencent Hy License, Version 1.0。它由 Apache 2.0 修改而来，主要多了第 10 条对大型 MaaS 的商业条款，不是 Apache License 2.0，也与 Apache 软件基金会无关。第 10 条的 5000 万美元和 1 亿月活是原文门槛，转售通用接口前要自己读 LICENSE。官方推荐的生产配方是 8 路张量并行；vLLM 配方写 FP8 大约需要合计 944 GB 显存，BF16 大约 1,859 GB。GGUF 被模型卡称为端到端测试用压缩版，不能当成一张消费级显卡就能按官方配方跑起来的证明。"
---

2026 年 11 月 20 日，腾讯混元开放了正式版 Hy4 的权重。11 月 18 日那篇里还写「正式版权重仍是 next」，这句话今天不再成立。能下载的是旗舰 Hy4，不是两天前开放的 flash。

对小团队，今天值得动手的不是「又一个 770B 开源了」，而是五件已经能核对的事：下哪三套、770B 和约 774B 为什么都出现、自建到底要多大的机器、TokenHub 五折停在哪一分钟、许可证第 10 条卡的是谁。任务仍然按难易拆开，沿用 [按任务分工，不要整站换新](/posts/october-ai-model-roles/)。flash 的三套仓库、更低的目录价和 11 月 30 日中午的折扣截止，留在 [Hy4 flash 开源说明](/posts/hy4-flash-open-weights-guide/)；11 月 4 日正式版上线时的产品入口和当时「权重还没放」的背景，留在 [腾讯 Hy4 正式版说明](/posts/tencent-hy4-workbuddy-guide/)，本文不把那两篇重写一遍。

价格和许可证核对日期是 2026 年 11 月 21 日。改预算或把权重接到对外服务之前，再打开一次价目表和仓库里的 LICENSE。

## 今天开放了哪三套

官方账号 @TencentHunyuan 在 2026-11-20T03:52:40Z 发帖，北京时间 11:52。完整帖文写：Today, we're releasing the open weights for Hy4；natively multimodal flagship MoE（770B total / 49B active，1M context）；并同时发布 Hy4 System Card。同一帖给出 GitHub、Hugging Face 权重、AngelSlim/Hy4-GGUF、LICENSE 和系统卡片链接，并预告当天 8–10 AM PT 在 r/LocalLLaMA 做 AMA。

@TencentAI_News 在 2026-11-20T04:49:45Z 发了另一条，北京时间 12:49。帖文写：Hy4 is yours to run；natively multimodal flagship（770B total, 49B active）已开放权重；列出 Hy4、Hy4-FP8 和 Hy4-base，并写部署由 vLLM 和 SGLang 支持，同时发布 System Card。链接同样指向 GitHub、Hugging Face、GGUF、LICENSE 和系统卡片。

IT 之家在当天 11:47:35 做了报道，写权重已在 GitHub、Hugging Face、ModelScope 和 GitCode 同步上线，并写混元 LLM 系列已覆盖 Hy3 preview、Hy3、Hy4 preview、Hy4 及 Hy4 flash。报道时钟和上面两条官方帖差在分钟量级。本文各用各的时钟，不把先后收成「谁第一个宣布」。需要特别改正的是：该报道写「Hy4 及 Hy4 preview 采用 Apache 2.0 许可证」。下面会看到，仓库里的许可证全文不是 Apache 2.0。

模型卡的 News 和 Model Links 把三套写清楚了。名字在不同页面大小写不完全一样，仓库 ID 以模型卡表格为准：

| 包 | 它是什么 | 不要把它当成 |
| --- | --- | --- |
| Hy4 | 指令模型。Hugging Face：`tencent/Hy4` | Hy4 flash |
| Hy4-FP8 | FP8 量化后的指令模型。`tencent/Hy4-FP8` | 一张消费级显卡就能按官方配方跑起来的证明 |
| Hy4 base | 预训练基座。`tencent/Hy4-base` | 指令微调过的对话模型 |

模型卡写明：Hy4 base is a pre-trained base model, not an instruction-tuned chat model。下面的对话和推理示例只适用于 Hy4 和 Hy4-FP8。把 base 填进聊天接口，答非所问时先检查模型名，不要先改提示词。

同一张表还给出 ModelScope 和 GitCode 的对应仓库。2026-11-21 这九个地址都能打开：`Tencent-Hunyuan/Hy4`、`Hy4-FP8`、`Hy4-base` 在 ModelScope；`tencent_hunyuan` 下同名三仓在 GitCode。GitHub 仓库是 [Tencent-Hunyuan/Hy4](https://github.com/Tencent-Hunyuan/Hy4)。

GGUF 是模型卡量化一节里的一句：provided a GGUF compressed version for end-to-end testing purposes。地址是 [AngelSlim/Hy4-GGUF](https://huggingface.co/AngelSlim/Hy4-GGUF)。那一页若有文件体积和速度表，那些数字不是模型卡给出的最低显存，也不是本文采用的硬件要求。官方写给生产环境看的配方在后面，用的是 8 路张量并行。

## 11 月 4 日、11 月 18 日和今天各是一件事

四天不要捏成一条新闻。

| 日期 | 已经发生的事 | 2026-11-21 还成立的部分 |
| --- | --- | --- |
| 11 月 4 日 | 正式版 Hy4 发布，可在 TokenHub、WorkBuddy 等入口调用。研究文和官网写计划开源，权重当时没放 | 目录价和 12 月 31 日 23:59:59 的五折说明仍以 TokenHub 价目表为准。11 月 4 日至 15 日的产品免费额度已经结束 |
| 11 月 16 日 | 官网博客宣布 flash 上线托管，并写计划稍后开源 flash | flash 的托管价和 11 月 30 日 12:00:00 五折，以 flash 那一篇和价目表为准 |
| 11 月 18 日 | 开放 flash 的三套权重。官方帖当时写 stay tuned for Hy4 coming up next、Hy4 weights next | flash 三套仓库仍然可下，但不再代表「正式版还没开」 |
| 11 月 20 日 | 开放正式版 Hy4、Hy4-FP8 和 Hy4 base，并发布 System Card | 这是今天的新事实 |

调用名不要抄串。TokenHub 价目表的 model 是 `hy4`。Hugging Face 仓库是 `tencent/Hy4` 和 `tencent/Hy4-FP8`。Together AI 的 endpoint 是 `tencent/Hy4`。模型卡 vLLM 示例里的 served-model-name 是 `hy4`，配方页默认加载的检查点则是 `tencent/Hy4-FP8`。四套字符串各管各的入口。不要把 `hy4-flash` 填进今天的旗舰仓库。

## 770B 和约 774B 不要收成一个数

官方材料同时使用 770B，以及把视觉编码器和草稿模块加进去后的约 774B。本文并列写上，不挑选其中一个把另一个藏起来，也不另造一个「核对后的真实总参数」。

- 官方 X：natively multimodal flagship MoE（770B total / 49B active），1M context。
- Hugging Face 模型卡引言：语言骨干总参数 770B，每个 token 激活 49B；78 层，第一层是稠密 FFN，其余 77 层是 MoE；每层 256 个路由专家和 1 个共享专家，每个 token 激活 top-8 路由专家加上共享专家。另外内置 5 层、3.3B 参数的 DFly2 草稿模块，用于推测解码。
- 模型卡属性表是另一组行。下面引用的是这张表，不是本站自己量出来的：

| 模型卡属性表的行 | 表上的值 |
| --- | --- |
| Total Parameters（excluding ViT, adapter, and DFly2） | 770B |
| Activated Parameters per Token | 文本 49B + 视觉 1.23B |
| ViT Parameters | 1.23B |
| DFly2 Parameters | 3.3B |
| Context Length | 1M（1,048,576 tokens） |
| Backbone Layers | 78 — 1 层稠密 + 77 层 MoE |

- vLLM 配方页页眉写作 774B total / 49B active。正文解释：语言骨干 770B、每 token 激活 49B；40 层视觉编码器 1.23B 和五层 DFly2 3.3B，把存储总量带到约 774B。配方页还写：HY4 is not HY4 Flash or the text-only Hy4-preview。

激活参数不要只抄「49B」。官方帖和模型卡引言说 49B，属性表把视觉 1.23B 另写一行。和 flash 那篇一样，引用时带着出处。

模型卡也写了能力边界：虽然它把自己写成当前最强开源权重模型之一，但在研究级数学、长程编程、模型自我改进和较难的视觉问答等内部评测上，与顶级闭源模型仍有明显差距。这是官方自己的限制说明，不是本站评测。

财务和办公相关的自评数字，11 月 4 日那篇已经核对过出处：例如 213 位金融专家、579 个真实任务里 Hy4 平均 3.04（满分 4），以及 WorkBuddy 产品经理评测的 83.18 分和 96.15% 通过率。那些是腾讯内部或合作评测，不是你的通过率。模型卡与 11 月 4 日官网对「幻觉率」还给出过两组不完全相同的前后数字，本文不把它们收成一个结果，也不用它们替代你自己的返工记录。

## 自建不是换一张消费级显卡

权重能下，不等于笔记本或单卡服务器就能按官方配方跑旗舰。把「开源」理解成「我这周就能在工位上私有化部署」，会直接撞上机器规模。

模型卡推荐生产服务用官方预构建镜像，示例都是 8 路张量并行，加载的都是 `tencent/Hy4-FP8`：

- vLLM：镜像 `vllm/vllm-openai:hy4`。示例还打开 DFly2 推测解码、`hy_v4` 工具与推理解析器，对外服务名 `hy4`。
- SGLang：镜像 `lmsysorg/sglang:hy4`，注明 x86 和 Arm。示例同样是 `tencent/Hy4-FP8` 和 `--tp 8`。

vLLM 配方页（标题区写 vLLM 0.35.0+）把硬件写得更具体，本文只转述该页，不另估一张卡的显存：

- 硬件：一块 8 GPU 的 NVIDIA 节点。FP8 大约需要合计 944 GB 显存，BF16 大约 1,859 GB（示例写 8x B300）。该页写 AMD Instinct 不受支持：vLLM 的 ROCm 移植既没有视觉编码器，也没有 DFly2。
- 宿主机内存：要够加载检查点。该页写 FP8 磁盘约 786 GB，BF16 约 1,549 GB，各 245 个 safetensors 分片。
- 上下文：检查点宣称 1,048,576 个位置。配方默认从已评估过的 131,072 token 窗口起跑，并写 A full 1M-token request has not been validated for this recipe。
- 检查点格式：配方默认 Block-FP8（`tencent/Hy4-FP8`），BF16 计算。它写明这不是 Hy4-preview-FP8 的 MXFP8 格式。Together AI 模型页则写其托管量化是 NVFP4。不要把三个检查点当成同一份文件。

完整命令以模型卡和配方页当天文字为准。这里只保留和规模有关的参数，避免把 8 路写成笔记本或单卡。GGUF 是测试用途的压缩包，不是上面这两条生产配方。

指令模型的 `reasoning_effort` 有两档：`high`（默认，打开思考）和 `no_think`。推荐采样是 temperature=0.9、top_p=1.0。默认是 `high`，简单问答如果又慢又贵，先检查是不是没关掉思考，再怪模型本身。

## 这周先试托管，再决定要不要自建

大多数读者更合理的第一步，不是去备 8 路机器，而是先用已经在线的入口，判断旗舰是不是比现在的模型、比 flash 更值得留在难任务上。

TokenHub 价目表（页面显示最近更新 2026-11-16 12:15:30；2026-11-21 查阅）在「在线推理 / 语言模型 / 广州」里，把正式版 Hy4 的 model 写成 `hy4`，目录价是每百万 tokens 输入 6 元、输出 18 元、缓存命中 0.3 元。同一页的限时折扣说明写：自本说明发布之日起至 2026 年 12 月 31 日 23:59:59（北京时间），Hy4 模型调用费用按目录价格的 50% 结算；折扣只适用于上述期间内实际产生的用量，届满后恢复目录价。按这句话推算，五折是 3 元、9 元、0.15 元，表上没有单独再列一行。

同一个目录价可以先做一道乘法，方便和 flash 对比。假设一次调用是 20 万未命中输入加 5 万输出：目录价是 1.20 + 0.90 = 2.10 元，五折期是 1.05 元。同样规模若走 flash 的目录价 0.5 / 2，是 0.10 + 0.10 = 0.20 元；flash 五折期内更低。思考 token 没有单独标价，以账单上的推理输出为准。12 月 31 日 23:59:59 之后按目录价重算，再决定要不要留在常驻预算里。上面的 token 数是示例假设，只使用价目表做乘法。

@TencentHunyuan 在 2026-11-20T04:45:02Z（北京时间 12:45）发帖感谢 Together AI，并写 Now you can start running Hy4 directly on Together AI，给出模型页和博客链接。Together 模型页（2026-11-21 查阅）把 endpoint 写成 `tencent/Hy4`，上下文 1,048,576，输入支持文本和图像，并写每百万 tokens 输入 0.83 美元、输出 2.50 美元、缓存命中 0.042 美元。该页同时还能看到 Launching soon 一类提示，是否已经对你的账号开放，以控制台能否实际调用为准，不要只凭营销页下预算。Together 写的是美元价和 NVFP4 检查点，不要和 TokenHub 的人民币目录价直接加减。

11 月 4 日已经上线的 WorkBuddy、CodeBuddy、元宝、ima 等产品入口，仍以当时说明为准。那篇里写到的 11 月 4 日至 15 日免费额度已经过期，不要再当成这周的免费窗口。flash 在 WorkBuddy 的免费说明是另一条时间线，见 flash 那一篇，也不要和旗舰的 TokenHub 五折并在一起。

官方的分工可以先当成假设，再用你自己的样本决定留不留。日常文档、摘要、简单演示，先看你是不是已经在用更便宜的 flash 或其他小模型。长程、要改很多步、要看图或要操作软件的任务，才值得拿旗舰 Hy4 对比。两个默认都换成新名字，就分不清是模型变了还是题目变了。

一周只做这六步：

1. 从上周挑 2 到 3 件真实任务。一件日常文档或整理，一件带图表或需要多步修改的材料，一件不能直接发出的邮件或报价。每件都要人能在一天内判断对错。去掉客户姓名、未公开报价、账号和密钥。
2. 需要 API 数字时，用 TokenHub 的 `hy4` 打一小笔你愿意试错的金额。折扣只覆盖 2026 年 12 月 31 日 23:59:59（北京时间）之前实际产生的用量。可能拖过这个钟点的流程，按目录价 6 / 18 / 0.3 做预算。若你已开通 Together 且控制台能调 `tencent/Hy4`，同一份样本也可以再跑一笔，记账时分开写币种。
3. 和现在的主力模型、以及（若你已在用）flash 并排，只记三项：人是否直接采纳、返工几分钟、账单金额。难任务采纳更高并且返工没有变长，才把这一类留在旗舰 Hy4。日常任务没有明显变好，就留在更便宜的模型。记录方式见 [AI 提效怎么量化](/posts/ai-productivity-measurement/)。
4. 自建排在样本之后。样本没有说明托管不够用，就不要为了「权重能下了」去备 8 路机器。真要自建，跟模型卡当前的 FP8 示例和 vLLM 配方，不要把 tp 8 改成单卡再来对官方速度。打算把通用 API 卖给别人的，上线前先读第 10 条。
5. 电脑操作单独放。官方材料写 Hy4 支持命令行和图形界面上的 computer use，并对 Blender、CAD 等做过专项训练。试的机器不要同时开着唯一的客户会话或网银。外部网页和邮件进上下文之后，按 [提示词注入防护](/posts/prompt-injection-defense-checklist/) 处理：模型可以起草，发送、付款和改权限仍由人确认。
6. 打开思考开关时先看账单。默认 `reasoning_effort=high` 适合数学、编程和复杂推理；只要直接答案的任务，显式改成 `no_think`，再比较质量和费用。

最低限度用这张空表，不要填演示数字。

| 日期 | 任务 | 入口 | 直接采纳 | 返工（分钟） | 花费从哪来 |
| --- | --- | --- | --- | --- | --- |
| 填当天 | 一件真实任务 | TokenHub `hy4` / Together `tencent/Hy4` / flash 或现用模型 | 是或否 | 填分钟 | 账单金额和币种 |

## 许可证不是 Apache，第 10 条卡的是大型 MaaS

模型卡写：Hy4 is released under the Tencent Hy License。Hugging Face 仓库元数据是 `license: other`，`license_name: tencent-hy-license`。LICENSE 全文标题是 Tencent Hy License, Version 1.0。开头就写：本许可证由 Apache License, Version 2.0 修改而来，主要多了第 10 条对大型 Model-as-a-Service（MaaS）业务的商业条款；This License is not the Apache License, Version 2.0, and is not endorsed by or affiliated with the Apache Software Foundation.

所以，即便有二次报道写成 Apache 2.0，也不要以那句为准。转载、微调、量化和对外提供服务之前，打开仓库里的 LICENSE 自己读。

第 10 条的要点按原文转述，不是法律意见：

- 10.1 把 MaaS 写成：让第三方远程使用模型推理或微调（例如通过 API），允许他们提交输入，或指定参数、训练数据。不包括两类：能力被限制在特定功能或流程里、并不提供通用模型访问的终端产品；以及仅仅把请求转给独立运营的第三方模型服务。
- 10.2 写明，经营 MaaS 业务时，出现下面任一情形，须另行取得书面许可（包括电子邮件）：在任意连续 12 个月内，全球累计总收入超过 5000 万美元或等值，不论收入是否来自本作品或其派生作品；或者，你提供的任何产品或服务在任一公历月的月活用户超过 1 亿，并在其中使用本作品或其派生作品。
- 10.3 写明，仅用于内部、且不把作品、派生作品或其输出提供给第三方时，10.2 不适用。
- 10.4 的联系邮箱是 hy_partners@tencent.com。

许可证还写明，派生作品包括对权重的微调、量化、蒸馏、合并、剪枝或其他修改。小团队把模型接到自己的内部工具，通常先看 10.3 是否符合自己的用法；想对外卖通用接口，先对照 10.2 的两项门槛，不要只看「开源」两个字。具体是否需要单独授权，以 LICENSE 原文和你的律师为准，本文只把门槛原文摆出来。

官方还同时发布了 [Hy4 System Card](https://hy.tencent.ai/Hy4_system_card.pdf)。@TencentHunyuan 在 2026-11-20T09:31:00Z（北京时间 17:31）的帖文写：卡片包含安全、安保与对齐评估，并更仔细地看网络与生物方面的前沿风险；还包括腾讯玄武、朱雀、科恩实验室的进一步审阅，以及 @FangcunLeap 与 @alice_dot_io 的独立安全测试。本文不把系统卡片里未在此核对过的数字写成结论。若你要把模型用于可能触及安全边界的场景，直接打开这张 PDF。

## 这几件事直接避开

不要把今天开放的仓库写成 flash，也不要把 flash 的价格和折扣截止套到旗舰上；不要把 base 当成聊天模型；不要把 770B 和约 774B 收成一个数；不要把 3.04 分、83.18 分或 96.15% 写成你的质量；不要把 TokenHub 的 12 月 31 日 23:59:59 和 flash 的 11 月 30 日 12:00:00 并成同一个优惠窗；不要把许可证叫成 Apache；不要用 GGUF 测试包或未写进配方页的显存数字去报机器；不要默认思考开着却只拿延迟和费用跟别的模型比。

## 常见问题

### 今天能下载的是正式版 Hy4 权重吗？

能。2026 年 11 月 20 日开放的是正式版 Hy4、Hy4-FP8 和预训练基座 Hy4 base。这和 11 月 18 日开放的 Hy4 flash 三套不是同一批仓库。能聊天的是前两套指令模型，base 不是指令微调过的对话模型。

### 总参数是 770B 还是约 774B？

两套都出现在官方或官方推荐材料里，本文不收成一个数。官方 X 写 natively multimodal flagship MoE（770B total / 49B active，1M context）。Hugging Face 模型卡引言写语言骨干总参数 770B、每个 token 激活 49B；属性表写 Total Parameters（excluding ViT, adapter, and DFly2）为 770B，激活是文本 49B 加视觉 1.23B，ViT 1.23B，DFly2 3.3B。vLLM 配方页把语言骨干 770B 加上视觉编码器和 DFly2，写成存储总量约 774B，页眉写作 774B total / 49B active。引用时带着出处。

### Hy4 和 Hy4 flash 的五折是同一天结束吗？

不是。TokenHub 价目表写明，Hy4 自该说明发布之日起至 2026 年 12 月 31 日 23:59:59（北京时间），实际产生的用量按目录价的 50% 结算，之后恢复目录价。目录价是每百万 tokens 输入 6 元、输出 18 元、缓存命中 0.3 元，五折是按这句话推算的 3 元、9 元、0.15 元，表上没有单独再列一行。Hy4 flash 的五折截止是 2026 年 11 月 30 日 12:00:00（北京时间），目录价是 0.5 元、2 元、0.02 元。不要并成同一个「年底」或「月底」。

### 许可证是 Apache 吗？自建一台消费级显卡就能跑起来吗？

都不是。权重使用 Tencent Hy License, Version 1.0。它由 Apache 2.0 修改而来，主要多了第 10 条对大型 MaaS 的商业条款，不是 Apache License 2.0，也与 Apache 软件基金会无关。第 10 条的 5000 万美元和 1 亿月活是原文门槛，转售通用接口前要自己读 LICENSE。官方推荐的生产配方是 8 路张量并行；vLLM 配方写 FP8 大约需要合计 944 GB 显存，BF16 大约 1,859 GB。GGUF 被模型卡称为端到端测试用压缩版，不能当成一张消费级显卡就能按官方配方跑起来的证明。

## 信息来源

- 官方 X：[@TencentHunyuan](https://x.com/TencentHunyuan/status/2123625549147070538)（2026-11-20T03:52:40Z）。开放正式版权重、770B total / 49B active、1M context，以及 System Card、GitHub、Hugging Face、GGUF 和 LICENSE 链接，以这条为准。
- 官方 X：[@TencentAI_News](https://x.com/TencentAI_News/status/2123639913174417711)（2026-11-20T04:49:45Z）。Hy4、Hy4-FP8、Hy4-base，以及 vLLM / SGLang 支持，以这条为准。
- 官方 X：[@TencentHunyuan](https://x.com/TencentHunyuan/status/2123638726601621727)（2026-11-20T04:45:02Z）。宣布可在 Together AI 上直接运行 Hy4。
- 官方 X：[@TencentHunyuan](https://x.com/TencentHunyuan/status/2123710690968191111)（2026-11-20T09:31:00Z）。System Card 的审阅单位与独立测试说明，以这条为准。
- Hugging Face 模型卡（2026-11-21 核对）：[tencent/Hy4](https://huggingface.co/tencent/Hy4)。770B 引言、属性表、三套权重链接、已知限制、采样参数和 vLLM / SGLang 示例，以这张卡为准。FP8 与 base 的仓库是 [Hy4-FP8](https://huggingface.co/tencent/Hy4-FP8)、[Hy4-base](https://huggingface.co/tencent/Hy4-base)。
- 许可证全文：[Tencent Hy License, Version 1.0](https://huggingface.co/tencent/Hy4/blob/main/LICENSE)。
- 系统卡片：[Hy4 System Card](https://hy.tencent.ai/Hy4_system_card.pdf)。
- GGUF（模型卡称为端到端测试用压缩版）：[AngelSlim/Hy4-GGUF](https://huggingface.co/AngelSlim/Hy4-GGUF)。本文不引用该页的体积和速度作为硬件要求。
- GitHub：[Tencent-Hunyuan/Hy4](https://github.com/Tencent-Hunyuan/Hy4)。ModelScope 与 GitCode 的三套地址以模型卡表格为准，2026-11-21 均可打开。
- vLLM 配方（2026-11-21 核对）：[tencent/Hy4](https://recipes.vllm.ai/tencent/Hy4)。约 774B 的存储口径、8 卡节点、FP8 / BF16 合计显存、未验证完整 1M 请求，以该页为准。SGLang 说明见 [Hy4 Cookbook](https://docs.sglang.io/cookbook/autoregressive/Tencent/Hy4)。
- 腾讯云：[TokenHub 模型价格](https://cloud.tencent.com/document/product/1823/130055)（页面显示最近更新 2026-11-16 12:15:30；2026-11-21 核对）。广州按量目录价和 Hy4、Hy4 flash 两条五折说明，以该页为准。
- Together AI 模型页（2026-11-21 核对）：[Tencent Hy4](https://www.together.ai/models/tencent-hy4)。endpoint `tencent/Hy4` 及该页标出的美元单价，以该页当天文字为准，调用前以控制台为准。配套博客：[Tencent Hy4 is live on Together AI](https://www.together.ai/blog/tencent-hy4)。
- IT 之家（2026-11-20 11:47:35）：[腾讯 Hy4 正式开源，混元 LLM 系列实现全量开放](https://www.ithome.com/1/029/841.htm)。下载平台名单可作对照；许可证请以仓库 LICENSE 为准，不要采用该报道中的 Apache 2.0 写法。

成本例子里的 token 数都是示例假设，只使用上述 TokenHub 目录价和折扣说明做乘法。
