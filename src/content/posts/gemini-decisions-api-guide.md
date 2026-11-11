---
title: "Gemini Decisions API：先打分，再决定调哪个模型"
description: "2026 年 11 月 11 日 Google 发布 Gemini Decisions API 与模型 gemini-decision-1。它不生成文本，只给封闭选项打出概率和置信度。本文讲三种题型、计费和局限，以及工单路由、退货图和先判断再调大模型怎么落地。"
pubDate: 2026-11-12T08:00:00+08:00
topic: ai-tools
tags: ["Gemini", "模型路由", "API 成本", "客服自动化"]
keyword: "Gemini Decisions API"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "Decisions API 会写出客服回复或摘要吗？"
    a: "不会。gemini-decision-1 在一次前向计算里给候选选项打分，返回概率和 0 到 1 的置信度，输出 token 计费为 0。要回复、摘要、解释或自定义 JSON，仍用生成式模型。官方 Cookbook 把这两条路分开：封闭判断走 Decisions API，生成文本、按你的 schema 抽取、调用工具走 Interactions API。"
  - q: "置信度低的时候应该自动执行吗？"
    a: "不应该。官方博客写明可以把含糊结果转到兜底流程或人工复核。Cookbook 说明，noul 的置信度是「是」和「否」里较大的一侧，所以置信度高也可能代表确定为否。0.85、0.15、0.60 都是笔记本里的读数示例，不是你的业务阈值。用自己标过的工单选出阈值。"
  - q: "免费层的数据会被用于改进产品吗？每分钟能调多少次？"
    a: "官方这篇博客只写 AI Studio 有免费层可用于原型，没有写数据用途，也没有写每分钟次数。Flavio Copes 的教程写：免费层每分钟 200 次、每天 1 万次，免费层数据会被 Google 用于改进产品，付费层不会。教程还写了每分钟 token 数和付费 Tier 1 的限额。这些数字以教程为准，上线前再看一次控制台。Cookbook 只说默认走 Gemini API 各 Tier 的标准配额。"
  - q: "先用 Decision 再调 Gemini 4 Carbon，一定更便宜吗？"
    a: "只有一部分请求其实不需要大模型写回复时才更便宜。本文用 1 万张工单、30% 需要写回复、判断输入 2000 token、Carbon 输入 2000 token 和计费输出 400 token 做演算，这些次数和 token 都是假设。若每张工单都要生成，判断层是额外成本。Carbon 的单价用引入期每百万 token 输入 2 美元、输出 10 美元，以及 12 月 1 日起的 4 美元和 20 美元。"
  - q: "OpenRouter 上能用聊天接口调用 gemini-decision-1 吗？"
    a: "不能。OpenRouter 写明 google/gemini-decision-1 走它自己的 Decisions API，不兼容 chat completions。标价是每百万 token 输入 0.10 美元、输出 0 美元，上下文标成 262K。请求体用的字段是 state，不是 Gemini API 的 input。页面还写目前不能走欧盟区内路由。"
---

2026 年 11 月 11 日，Google 发布 Gemini Decisions API，由新模型 Gemini Decision 1 驱动，模型 id 是 `gemini-decision-1`。博客由 Google DeepMind 产品经理 Min Choi 和 Principal Scientist Felix Yu 署名。入口是 Google AI Studio 里的 Gemini API，版本为 v1beta，端点是 `POST https://generativelanguage.googleapis.com/v1beta/decisions`。

它做的是封闭选项上的快速判断：工具该不该调用、这条内容过不过合规、这张工单进哪个队列、这段上下文该打几分。它不生成文本。一次前向计算给候选选项打分，返回概率和置信度。官方博客给出的端到端延迟约 150–250 毫秒，价格是输入每百万 token 0.10 美元，输出 token 不计费。

对还在用大模型做分类、打分和路由的人，这件事的含义很具体。分类不再先等模型把「billing」一个词生成出来，再去解析 JSON。判断层可以很便宜，生成层只留给真正要写字的那一部分。模型怎么按任务分工，可以接着看 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/)。需要模型写出合法 JSON 时，走 [结构化输出](/posts/ai-structured-output-json/)，不要指望 Decisions API 替你写字段。

## 11 月 11 日能核对的范围

下表只写官方博客、官方 Cookbook 快速入门（[cookbook PR 1524](https://github.com/google-gemini/cookbook/pull/1524)，已于当天合并）和另外三篇来源里已经写明的内容。对不上的格子单独标出来。

| 项目 | 现在能写上的内容 | 还没写死的部分 |
| --- | --- | --- |
| 模型与入口 | `gemini-decision-1`，Gemini Developer API 的 v1beta。Python 需要 `google-genai` 3.2 及以上，并显式传 `api_version: v1beta`（3.x 默认是 v1）。JS 可以用 `@google/genai@latest`，Flavio 的教程在构造函数里传了 `apiVersion: 'v1beta'` | Google Cloud 上的 Gemini。官方博客写支持即将到来 |
| 输入 | 一次请求一份多模态输入：文本、图片、音频、视频、PDF。博客写最多约 256K token。Cookbook 写上下文窗口 262,144 token，算在 input 和全部问题上。262,144 = 256×1024。OpenRouter 标 262K | 中文工单、中文评论上的准确率。官方未公布 |
| 问题 | 最多 1,000 道，彼此独立、并行打分，互相看不到。题型是 `noul`、`choice`、`score` | 1,000 道题或超长上下文时的延迟。博客的「几乎持平」只覆盖 1 到 100 题、上下文最多约 16K token |
| 延迟 | 模型计算中位数约 50–100 毫秒，端到端约 150–250 毫秒（同上，16K 与 1–100 题那段） | 你的网络、图片大小和地区。官方未公布 SLA |
| 价格 | 输入 0.10 美元 / 百万 token，输出 0 美元。共享输入每次请求只计一次。每一题另加自己的 instruction 和 criteria token。没有思考 token 浮动账单，也没有单独的转写或 OCR 费 | 一张图在每种分辨率下的精确 token。Cookbook 给的是约数 |
| 免费层 | 官方博客写 AI Studio 有免费层可用于原型 | 次数和数据用途。博客未列。见下文第三方教程 |
| 权重 | 官方材料只给出托管 API | MarkTechPost 写没有开放权重，不能自托管 |

OpenRouter 已上架 `google/gemini-decision-1`，标价同样是 0.10 美元 / 0 美元，由 Google AI Studio 提供。它的页面写明：请求走 OpenRouter 自己的 Decisions API，聊天补全的 SDK 不能用。字段名是 `state`，不是上面的 `input`。把 Gemini 的 JSON 原样贴过去会对不上。

官方博客还点了正在接入的生态：OpenRouter、LangChain、Vercel、LiteLLM、Pydantic AI、Pipecat、LiveKit、OpenCode，以及 `google-genai` SDK。演示应用点名了 Doorstep Parcels、Speed Sketch 和 Find the Zoo Keeper。本文不补这些演示的链接，以 AI Studio 里看得到的入口为准。

厂商自述的内部用法有四条，都不要当成你的延迟或通过率。Gemini Notebook 用它做实时路由，日常查询最多降低 40% 延迟，复杂任务仍留给深度推理模型。Stitch 的快速画布用它在数秒内生成可操作的线框。Google Labs 的 CC 用它从 200 多个表情里选反应。搜索用它在 MCP 工具上做对抗行为检查，博客只写「在延迟范围内效果高」，没有给百分比。

## 一次请求里有三块

Cookbook 把一次 `client.decisions.create` 写成三块：

- `model`：`gemini-decision-1`。
- `input`：共享上下文。可以是字符串、一个内容块，或内容块数组。文本、图片、音频、视频、PDF 都放在这里。问题本身只能是文字，不能在 instructions 里再塞图片。
- `questions`：你自己起键的题目表。键名匹配 `[A-Za-z0-9_-]+`，长度 1 到 64。模型看不到键名，完整问题必须写在 `instructions` 里。

各题独立。加一道题或删一道题，不会改其他题的答案。官方博客写，在上下文最多约 16K token、题目从 1 道加到 100 道时，延迟几乎是平的。Cookbook 另写：因为输入只处理一次，每多一道题增加的延迟和 token 开销可以忽略。两句都留在各自的范围里。超过 100 道或更长上下文时，博客没有给出同样的毫秒数，官方未公布。

Python 要先把版本钉在 v1beta，否则 3.x 会去打 v1，而这个接口只在 v1beta：

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})
result = client.decisions.create(
    model="gemini-decision-1",
    input="左耳罩没有声音。订单 12 天前签收。今天不处理好就取消会员。",
    questions={
        "in_scope": {
            "type": "noul",
            "instructions": "这条消息是在说一笔订单或一件商品吗？",
        }
    },
)
```

直接请求用 `curl -X POST`，地址是 `https://generativelanguage.googleapis.com/v1beta/decisions`，头里放 `x-goog-api-key` 和 `Content-Type: application/json`。密钥放环境变量，不要写进仓库。JS 教程的装法是 `npm install @google/genai@latest`，构造时传入 `apiVersion: 'v1beta'`。

返回里看 `answers` 和 `usage`。`total_output_tokens` 恒为 0。账单认 `total_input_tokens`，不要只数你以为的「工单正文」。题目说明和选项描述也在输入里。

## 三种题型怎么读

官方博客的三种题型，Cookbook 补上了字段范围。读数时把「概率」和「置信度」分开，尤其是是否题。

**`noul`：是否题。** 返回「是」的概率，夹在 0.01 和 0.99 之间，「否」的概率是 `1 - noul`。可选 `criteria.true_description` 和 `criteria.false_description`，用来写清什么算是、什么算否。置信度是两侧里较大的那个，`max(noul, 1 - noul)`，范围 0.50 到 0.99。因此置信度 0.97 可能是「很确定为是」，也可能是「很确定为否」。只看置信度就自动退款，会把明确的「否」执行掉。

Cookbook 给的读数示例是：`noul >= 0.85` 当作强「是」，`noul <= 0.15` 当作强「否」，0.40 到 0.60 当作边界、交给人或做更深的检查。它同时写明，判断式 `noul > 0.99` 或 `noul < 0.01` 永远不会成立。这些是读数示例，不是你的客服阈值。

**`choice`：从 2 到 255 个选项里选一个。** `criteria` 是「选项键 → 说明」。返回胜出项 `choice`，以及每个选项的概率，概率加总为 1。没有任何选项合适时，概率仍会铺到你给的列表上。Cookbook 建议用置信度拦住低把握的输入，或另加一道 `noul` 问「这条输入在不在范围内」，不要靠 `other` 或 `none_of_the_above` 这种兜底项。请求发出前，选项键按 UTF-8 字节做字母序排序，你在 JSON 里的书写顺序不会保留；概率打平时，胜出项是字母序靠前的键。选项键长度 1 到 128 个字符（最多 512 字节），可以含内部空格，不能有首尾空格。说明可以写成空，前提是键名本身看得懂。Cookbook 的示例用的是空值。

**`score`：有序档位，从 0 开始。** `criteria` 是字符串数组，从低到高，2 到 255 档，Cookbook 写大多数量表用 2 到 10 档更合适。你传的是文字描述，不是 `[1, 2, 3, 4, 5]` 这种数字。下标 0、1、2 由数组位置决定。返回值是加权期望 `score = Σ i × p_i`，所以它可能是 1.81 这种小数；另外还有每一档的概率、`legend`，以及置信度。这里的置信度 Cookbook 写成「概率有多集中在领先那一档」，范围是 0 到 1，公式和 `noul` 的置信度不是同一句。需要一个离散档位时，取概率最大的下标。不同长度的量表要比较时，Cookbook 建议用 `score / (档数 - 1)` 归一化到 0 到 1。档位必须大致线性。0、1、2、3 如果实际含义是 1、10、100、1000，加权分数会歪。

下面是一张工单上三种题一起问的结构。这是字段示例，不是某次真实调用的返回。

```json
{
  "model": "gemini-decision-1",
  "input": "左耳罩没有声音。订单 12 天前签收，会员是金卡。今天不处理好就取消会员。",
  "questions": {
    "in_scope": {
      "type": "noul",
      "instructions": "这条消息是在说一笔订单或一件商品吗？",
      "criteria": {
        "true_description": "内容涉及已购商品、订单、物流或会员服务。",
        "false_description": "闲聊，或看不出在说哪笔交易。"
      }
    },
    "queue": {
      "type": "choice",
      "instructions": "如果要人工处理，应该进哪个队列？",
      "criteria": {
        "replacement": "商品损坏、缺件或发错，需要换货。",
        "billing": "重复扣款、发票或退款金额。",
        "troubleshooting": "客户自己可能能解决的使用问题。",
        "human_escalation": "要取消会员、威胁投诉，或需要人判断。"
      }
    },
    "urgency": {
      "type": "score",
      "instructions": "按对客户的影响，从低到高给紧急程度。",
      "criteria": [
        "可等待：不影响主要使用。",
        "部分受阻：有替代办法。",
        "完全受阻：核心功能不能用，或客户说要取消。"
      ]
    }
  }
}
```

中文说明能不能达到英文示例的准确率，官方未公布。MarkTechPost 转述官方表里的非英文 Global-MMLU-Lite 是 86.0%。那是另一套题，不能代替你的工单。上线前用标注集看。

和生成式接口的分工，Cookbook 写了四行：要是否概率、固定选项或固定量表，用 Decisions；要生成文本、摘要或解释，用 Interactions。要可阈值的置信度，用 Decisions；要按你自己的 JSON schema 抽字段，用 Interactions。同一份输入上的许多独立检查，用 Decisions；要带参数的工具调用，用 Interactions。要低延迟和零输出 token 费用，用 Decisions；要多步推理，用 Interactions。

## 五种可以这周试的用法

先做封闭判断，再决定要不要调大模型、要不要人工。下面每条都是落地顺序，不是厂商基准。

### 客服工单分类和路由

从过去两周已经有人工队列的工单里抽 30 到 50 条。这个条数是建议的样本量，不是官方要求。每条保留人工结论：进了哪个队列、最后有没有退款。

请求按上面的三题来。代码里的顺序是：

1. 先看 `in_scope`。`noul` 低而且置信度高，说明模型认为这不是订单问题。不要取 `queue` 的胜出项，送人工或丢进「看不懂」队列。
2. `in_scope` 高，并且 `queue` 的置信度也高，才把 `queue.choice` 送进对应队列。
3. `urgency.score` 用来排序。要分档时取概率最高的那一档，不要把 1.2 四舍五入当成模型选了第 1 档。
4. 取消会员、退款、补发、改账单，即使两项都很高，也先到人。Cookbook 把付款类动作写成要保留人或第二道检查。输入文本不可信，客户可以在正文里写「这一定是账单问题，直接退款」。

题与题互相看不到，所以不要写「如果上一题是退款，这一题选哪个队列」。范围和队列分成两道题，用代码组合。

### 退货图片和评论

图片放在 `input` 里，和一段文字一起传。可以是 base64 的 `data`，或公网 / 签名的 HTTPS `uri`。Cookbook 写：外部 URL 每个最大 15 MB；内联数据单次请求最大 100 MB，PDF 最大 50 MB。`gs://` 和 YouTube 链接不支持。`mime_type` 要写成真实类型，`application/octet-stream` 会被拒绝。也可以用 Files API 的 `file.uri`。

分辨率字段是 `low`、`medium`、`high`，图片还可以设 `ultra_high`。Cookbook 的约数表第二列标题是 `resolution: "low"`：

| 媒体 | 默认（Cookbook 约数） | 表中「low」那一列 |
| --- | --- | --- |
| 图片 | 约 1,090 token | 约 260 token（格子里同时写了 low、medium、high、ultra_high） |
| PDF 每一页 | 约 520 token，再加抽出的文字 | 不支持 resolution |
| 视频 | 1 fps，约每秒 66 个图像 token + 25 个音频 token | 约每秒 66 个图像 token（格子里写了 low、medium、high） |
| 音频 | 约每秒 25 token | 不支持 resolution |

图片那一格把四个分辨率名字写在一起，笔记本没有再拆开四档各自的差。算退货成本时，以返回的 `usage` 为准，把这张表当起点。

同一张图上可以同时问：照片里有没有破损（`noul`），仓库处置是重新上架、翻新还是报废退款（`choice`），破损程度（`score`）。评论情绪也可以是一道 `score`。处置结果不要直接打款。照片判断和付款是两步。

OpenRouter 的模型页还写了 CSV 和 Office 文件。官方博客和 Cookbook 列举的是文本、图片、音频、视频和 PDF。CSV、Office 以 OpenRouter 页面为准，不要写成 Gemini API 已经公布的类型。

### 内容审核和品牌合规

每条规则单独做成一道 `noul`：有没有竞品名、有没有绝对化承诺、有没有联系方式、图片里有没有指定的违禁物。规则之间互不可见，这正好。组合逻辑放在代码里，例如「任一条高概率且高置信度就拦截」。

不要让它重写文案。改写是生成，不是封闭选项。拦截之后要给人一句话说明的，再调生成模型，并且只把被拦截的那一小段送过去。

边界样本进人工。Cookbook 把 0.40 到 0.60 的 `noul` 标成不确定。你的品牌规则可能更窄，阈值用最近一个月被投诉过的内容来调，而不是用笔记本里的 0.85。

### 销售线索打分

用 `score` 做一列从低到高的档：没有购买信号、只是询问、提到预算或时间、明确要报价。档位用文字写清，保持线性。按 `score` 排序，销售先看分数高的。需要放进 CRM 的枚举时，取概率最大的那一档，把 `score` 和置信度一起存下来。

不同产品线的量表长度不一样时，用 `score / (档数 - 1)` 再比较。Cookbook 还有一种排文档的写法：每篇候选文档一道 `score`，说明文字里写上文档编号，因为模型看不到题号键。然后按分数降序。这适合「这 20 条线索里先打哪 5 个」，不适合生成开发信。

### 先判断，再决定调哪个大模型

路由本身就是官方点名的用途：工具选择、模型路由、上下文打分。可以放一道 `choice`，选项是「小模型直接答」「Gemini 4 Carbon 写回复」「人工」。或者放一道 `noul`：「这条请求需要长回复吗？」只有概率和置信度都过线，才调用贵的模型。

Google 对 Gemini Notebook 的 40% 延迟是内部自述。你的路由省下多少，取决于有多少请求被挡在大模型外面，以及挡错之后的返工。算账见下一节。限额和告警仍按 [AI 自动化越跑越贵怎么办](/posts/ai-automation-cost-control/) 里的分层做法：单次上限、按天预算、账户硬顶。Decisions 没有上下文缓存，也没有 Batch、Flex、Priority 档（Cookbook）。同一份长 PDF 拆成十次请求，就会被计费十次。能放进同一次请求的题，放在同一次里。

## 和 Gemini 4 Carbon 比一笔账

Decisions 的单价来自 2026-11-11 的官方博客：输入 0.10 美元 / 百万 token，输出 0。Gemini 4 Carbon 的 Standard 单价，用本站已经核对过的数字：2026 年 11 月 30 日前输入 2 美元、输出 10 美元，12 月 1 日起输入 4 美元、输出 20 美元，输出价包含思考 token。分档、缓存和截止钟点见 [Gemini 4 Carbon 已开放](/posts/gemini-4-carbon-ga-swarm-guide/)。下面只用 Standard，不假设缓存命中。

下面所有次数和 token 都是假设，用来把公式算完。换成你日志里的 `total_input_tokens` 和 Carbon 的计费输出之后，只有单价来自上述来源。

**假设。** 10,000 张工单。每张先走一次 Decisions，输入合计 2,000 token（工单正文加上题目和选项）。其中 30% 需要 Carbon 写回复。每次 Carbon 输入 2,000 token，计费输出 400 token。

判断费用：

10,000 × 2,000 / 1,000,000 × 0.10 = 2.00 美元。

需要写回复的是 3,000 次。Carbon 输入 6 个百万 token，输出 1.2 个百万 token。

- 至 11 月 30 日：6 × 2 + 1.2 × 10 = 24 美元。加上判断，合计 26 美元。
- 12 月 1 日起：6 × 4 + 1.2 × 20 = 48 美元。加上判断，合计 50 美元。

如果 10,000 张全部直接叫 Carbon、不做判断：

- 至 11 月 30 日：20 × 2 + 4 × 10 = 80 美元。
- 12 月 1 日起：20 × 4 + 4 × 20 = 160 美元。

在这组假设下，先判断再生成，引入期少 54 美元（80 − 26），12 月 1 日之后少 110 美元（160 − 50）。省下的是那 7,000 次没有调用的 Carbon，不是 Decisions 的单价突然变低。

把 30% 换成别的比例，判断那 2 美元不动，Carbon 按比例放大。若 80% 都要写回复，Carbon 次数是 8,000，输入 16 个百万 token，输出 3.2 个百万 token。引入期 Carbon 为 16 × 2 + 3.2 × 10 = 64 美元，加上判断是 66 美元，比全量 80 美元少 14 美元。12 月 1 日起 Carbon 为 16 × 4 + 3.2 × 20 = 128 美元，加上判断是 130 美元，比全量 160 美元少 30 美元。

若 100% 都要生成，判断挡不住任何一次 Carbon，只是多付 2 美元。引入期相对 80 美元是 2.5%，12 月 1 日之后相对 160 美元是 1.25%。这种流程不要为了「架构完整」硬加一层，除非你还要用它做队列和紧急度。

纯判断、不再调用大模型时，这 10,000 次就是 2 美元，因为输出不加钱。Flavio 教程里有一次三道题的示例用量是 324 token。按标价，1 美元能覆盖 1 / (324 / 1,000,000 × 0.10) = 30,864 次这种请求。教程写成大约 3 万次。324 是那次示例，不是平均工单长度。Cookbook 快速入门里那句短杯子文案的示例用量是 100 token，单次约 0.00001 美元。同样不能当成你的平均值。

退货图用 Cookbook 的约数做起点。假设题目和说明再加 400 token。按表中约 260 token 的那一格，单次约 660 token，10,000 张是 6.6 个百万 token × 0.10 = 0.66 美元。按默认约 1,090 token，单次约 1,490 token，10,000 张是 1.49 美元。400 token 是假设，260 和 1,090 是笔记本里的约数。真实账单抄 `usage`。

官方博客另有一句费用比较：在共享基准套件上，Decisions API 配合 Decision 1 比 Interactions API 配合 Gemini 3.5 Flash-Lite 便宜近 5 倍。MarkTechPost 转述该表的套件总价是 0.88 美元对 4.14 美元，4.14 / 0.88 ≈ 4.7，和「近 5 倍」是同一量级。同一篇还写 TypeSafe Jev 1.14 的套件总价是 0.68 美元，输入标价每百万 0.042 美元。那是 MarkTechPost 的对照，不是本文打开 Jev 定价页复核的数字。比 Flash-Lite 便宜，不等于比所有专用决策模型便宜，也不等于比你现在的 Carbon 账单便宜 5 倍。

## 局限、评估和数据

能做的是封闭集合里的打分。不能做的，是写出回复、解释理由、调用工具、记住上一轮对话。Cookbook 写明没有上下文缓存、没有 Batch API、没有 Flex / Priority 档。接口停在 v1beta，字段以后会变，调用收进一个函数里，模型 id 和 `api_version` 不要散落在业务代码各处。

准确率要用你自己的标注集。官方博客写，在智能体路由、推理、排序和多模态理解那一组基准上，Decision 1 领先，校准误差最低。具体格子博客正文没有逐行印出。MarkTechPost 称下表来自 Google 博客的基准表，并写明全部是 Google 自述，拒绝和安全拦截算错。本文没有逐格对照那张图。

| 项目（MarkTechPost 转述） | Gemini Decision 1 | 对照 |
| --- | --- | --- |
| Top-1 校准误差，越低越好 | 0.0250 | Jev 1.14 为 0.0494；Flash-Lite 为 0.2104 |
| 七项共享评估总价 | 0.88 美元 | Jev 0.68 美元；GPT-6 Luna 0.93 美元；Flash-Lite 4.14 美元 |
| JevBench 公开切分 | 92.2% | 该文称为它最高的一格 |
| Amazon ESCI，Macro-F1 | 58.7% | 该文称为它最低的一格 |
| When2Call | 79.9% | Jev 为 82.0%，这一格落后 |
| Mind2Web 多模态 | 86.2% | Jev 为 86.8%，这一格落后 |

92.2% 不是你的退货照片通过率。58.7% 说明并不是每一套公开题都高。上线标准写成：在你的 30 到 50 条标注上，自动执行的那些错了几条。错一条会退错款的流程，自动执行的门槛要比「感觉还行」更严。

安全过滤会直接 400，而不是返回一个低置信度。Cookbook 列出的错误码有 `safety`、`prohibited_content`、`blocklist`、`image_safety`、`content_blocked`。Flavio 的教程写，超出限制时同样是 400，消息里会点名规则。业务代码要把 400 当成「没有答案」，走人工，不要当成「否」。

数据政策要分开看。官方这篇博客没有写免费层会不会被用来改进产品。Flavio Copes 的教程写：免费层会被 Google 用于改进产品，付费层不会；免费层每分钟 200 次、每天 1 万次，并写每分钟 5 万 token；教程中的 Tier 1 是每分钟 1,500 次、每分钟 100 万 token、每天 5 万次。Cookbook 没有印这些次数，只说默认适用 Gemini API 各 Tier 的标准配额，并指向费率限制文档。含客户对话、退货照片、合同 PDF 的请求，不要先丢进免费层试。额度和数据用途要一起问，这件事和 [免费 AI 工具怎么挑](/posts/free-ai-tool-limits/) 是同一类检查。

OpenRouter 页面写，该模型目前不能走欧盟区内路由。有区域要求的团队先看自己的合规，再决定走 Gemini API 还是 OpenRouter。

## 这周可以做的五件事

1. **先做一条评估，再谈自动路由。** 抽 30 到 50 条已有人工结论的工单或退货。记录胜出项是否一致、`noul` 把「否」认成「是」的有几条、置信度分布。阈值从这张表里选。不要照抄 0.60、0.70 或 0.85。
2. **调用收口。** 一个函数里固定 `gemini-decision-1` 和 v1beta。Python 使用 `google-genai` 3.2 及以上。题号用英文键，问题全文写在 `instructions`。同一份材料上的独立检查放进同一次请求。
3. **按两列单价记账。** 判断列只用 0.10 美元 / 百万输入 token，输出记 0。生成列用 Carbon 的 2/10，预算列用 12 月 1 日的 4/20。token 用接口返回值，不用本文的 2,000 和 400。图片先用 `resolution: low` 记 20 张的中位数，再决定要不要提高分辨率。
4. **低置信度和范围外进人工。付款留人。** `noul` 必须和置信度一起看。`choice` 在没有任何选项合适时仍会选出一个胜出项。退款、补发、改价不直接执行。
5. **真实数据先确认层级。** 原型用脱敏样本。教程所说的「免费层用于改进产品、付费层不会」在你打开的控制台里再确认一次。官方博客没有写这一句。Google Cloud 支持仍是即将到来，企业项目里先不要假设模型已经出现。

## 这些说法不要直接当成你的结果

- 150–250 毫秒是官方博客对「上下文最多约 16K token、题目 1 到 100 道」的端到端描述，另有 50–100 毫秒的模型计算中位数。1,000 道题和 256K 上下文的延迟，官方未公布。
- 「最多降低 40% 延迟」「表情从 200 多个里选」「线框数秒生成」是 Google 对内部产品的自述。
- 基准表里的 92.2%、58.7%、0.0250、0.88 美元和 4.14 美元，是 MarkTechPost 对官方表的转述，并标明为 Google 自述。Jev 的 0.042 美元 / 百万 token 也来自该文，不是本文复核的 Jev 官价。
- 1 万张工单、30%、2,000 token、400 token、图片侧额外 400 token，都是演算假设。30,864 次 / 美元只对 324 token 的那次教程示例成立。
- Cookbook 图片约 1,090 与约 260 token、PDF 每页约 520 token、视频和音频的每秒约数，都是笔记本里的约数。四档图片分辨率没有分开标价。
- 免费层每分钟 200 次、每天 1 万次，以及免费层数据用于改进产品、付费层不会，来源是 Flavio 的教程。官方博客未写。
- 中文业务文本的准确率，官方未公布。

## 常见问题

### Decisions API 会写出客服回复或摘要吗？

不会。它返回概率、胜出项或加权分数，以及置信度，输出 token 为 0。回复、摘要、解释和自定义 JSON 仍用生成式模型。Cookbook 把封闭判断和 Interactions API 的生成、抽取、工具调用分成两条路。

### 置信度低的时候应该自动执行吗？

不应该。官方建议把含糊结果转到兜底或人工。`noul` 的置信度高，也可能是确定为否。阈值用标注集来定，笔记本里的 0.85、0.15 和示例代码里的 0.60 都只是例子。

### 免费层的数据会被用于改进产品吗？每分钟能调多少次？

官方博客只确认有免费层可用于原型。次数和数据用途见 Flavio 的教程：每分钟 200 次、每天 1 万次，免费层数据会被用于改进产品，付费层不会。Cookbook 没有印出这些数字。

### 先用 Decision 再调 Gemini 4 Carbon，一定更便宜吗？

不一定。本文在 10,000 张工单、30% 需要写回复的假设下，引入期合计 26 美元，对照全量 Carbon 的 80 美元。若每张都要生成，判断层只多 2 美元。token 数换成你的日志后再做预算。

### OpenRouter 上能用聊天接口调用 gemini-decision-1 吗？

不能。它走 OpenRouter 的 Decisions API，不兼容 chat completions，请求字段是 `state`。标价 0.10 美元 / 0 美元，上下文 262K。页面写目前不能走欧盟区内路由。

## 信息来源

- Google 官方博客，Min Choi、Felix Yu：[Gemini Decisions API: Fast, calibrated multimodal decisions](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/)（2026-11-11）。模型 id、v1beta、三种题型、最多 1,000 题、约 256K token、150–250 毫秒、0.10 美元 / 0 美元、共享输入只计一次、无思考 token 和转写 / OCR 附加费、免费层可用于原型、内部四则用法、40% 延迟自述、相对 Gemini 3.5 Flash-Lite 近 5 倍、以及 Cloud 支持即将到来，以这篇为准。
- MarkTechPost，Michal Sutter：[Google Launches Gemini Decisions API With Gemini Decision 1 at $0.10/M Tokens](https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/)（2026-11-11）。基准表数字、套件总价 0.88 / 0.68 / 0.93 / 4.14 美元、校准误差，以及「无开放权重、不能自托管」，按该文对 Google 材料的转述引用。该文写明成绩为 Google 自述。
- Flavio Copes：[How to use the Gemini Decisions API](https://flaviocopes.com/gemini-decisions-api/)（2026-11-11）。免费层每分钟 200 次、每天 1 万次、每分钟 5 万 token，付费 Tier 1 限额，以及免费层数据会被用于改进产品、付费层不会，以这篇教程为准。文中 324 token 的示例也来自这里。教程写明示例请求来自 Google 文档，作者当时尚未自己跑通。
- OpenRouter 模型页：[google/gemini-decision-1](https://openrouter.ai/google/gemini-decision-1)。标价 0.10 美元 / 0 美元、上下文 262K（页面问答写 262,144）、不兼容 chat completions、字段用 `state`、由 Google AI Studio 提供、目前不能走欧盟区内路由，以及页面提到的 CSV 与 Office 文件，以该页为准。页面上的实时延迟和成交均价会变，本文不引用。
- Gemini Cookbook 快速入门 PR：[google-gemini/cookbook#1524](https://github.com/google-gemini/cookbook/pull/1524)（2026-11-11 合并）。`noul` 的 0.01–0.99 与置信度公式、`choice` / `score` 的上下限、262,144 token、媒体大小与约数表、无缓存 / 无 Batch / 无 Flex 与 Priority、v1beta 与 SDK 3.2、安全过滤的 400，以合并进 `quickstarts/Get_started_decisions.ipynb` 的笔记本为准。笔记本指向的文档站本文没有另摘数字。

演算里的工单数量、调用比例和 token 长度都是假设，只使用上述来源里的单价做乘法。
