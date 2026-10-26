---
title: "GPT-6.1 Terra 来了：API 价格减半，哪些活该先换过去"
description: "OpenAI 10 月 26 日发布 GPT-6.1 Terra，API 标准价降到每百万输入 1 美元、输出 5 美元，比 GPT-5.6 Terra 和 GPT-6.1 Sol 便宜一半。本文讲清它能做什么、账怎么算、小团队该先把哪类工作换过去，哪些仍留给更强的模型。"
pubDate: 2026-10-27T06:00:00+08:00
topic: ai-tools
tags: ["AI 模型", "OpenAI", "GPT-6.1 Terra", "API 成本"]
keyword: "GPT-6.1 Terra 价格与选型"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "GPT-6.1 Terra 在 ChatGPT 普通聊天里能用吗？"
    a: "不能。按 OpenAI 的说明，它只在 ChatGPT Work 和 Codex 里提供，面向 Plus、Pro、Business、Enterprise 和 Edu 套餐，普通 Chat 里没有。Enterprise 和 Edu 还要看管理员有没有在工作区里开放。"
  - q: "用了 Terra，ChatGPT 套餐的额度会变多吗？"
    a: "套餐的总额度没变。OpenAI 的意思是同样的额度用 Terra 能做更多任务，因为它按 token 计的单价更低：在 Work 和 Codex 的积分表里，Terra 每百万输入 token 是 25 积分，GPT-6.1 Sol 是 50 积分。"
  - q: "已经在用 GPT-6.1 Sol，要不要全部换成 Terra？"
    a: "不要一刀切。OpenAI 自己也说，最复杂的编程任务仍然是 GPT-6.1 Sol 和 GPT-6 Astra 更合适。先把量大、规则清楚的工作（读发票、填表、改写文案、截图识别）换到 Terra 上试一周，返工没有增加再扩大范围。"
  - q: "文章里的跑分和价格以后还准吗？"
    a: "跑分都是 OpenAI 在发布文里公布的自家测试，不是第三方复现。价格以 2026 年 10 月 26 日的官方定价页为准，厂商随时可能调整，改预算前请再看一次当前定价页。"
---

美国时间 10 月 26 日，OpenAI 发布了 GPT-6.1 Terra。它不是新的最强模型，而是 OpenAI 产品线里的「中间档」：比旗舰 GPT-6 Astra 和 GPT-6.1 Sol 便宜得多，比最省钱的 GPT-6 Luna 更聪明。这次值得单独写一篇，是因为它把两件小团队最在意的事同时往前推了一步：API 标准价比上一代 GPT-5.6 Terra 和同代的 GPT-6.1 Sol 都低一半，而且它主打的正好是读截图、填表、操作电脑这类每天都在重复的办公活。

这篇不复述发布会，只回答四件事：到底发布了什么，账怎么算，哪些活适合先换过去，哪些还不能交给它。如果你还没整理过手上各个模型的分工，可以先看 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/)，这篇是它的续篇。

## 发生了什么：一个主打「性价比 + 操作电脑」的中档模型

按 OpenAI 发布文和开发者文档，GPT-6.1 Terra 的要点如下：

- **定位**：快、省，擅长细致的看图推理和精确的电脑操作，写作也更自然。OpenAI 举的例子是起草方案、看懂技术图纸、填写表单和剪辑视频。
- **在哪用**：即日起在 ChatGPT Work 和 Codex 里提供给 Plus、Pro、Enterprise、Edu 用户（ChatGPT 的定价说明里还列了 Business）；开发者用 API 调用，模型名是 `gpt-6.1-terra`。它不在 ChatGPT 普通聊天里。
- **输入输出**：支持文字和图片输入，只输出文字，不支持音频和视频；上下文窗口 105 万 token，单次最多输入 92.2 万 token、输出 12.8 万 token，知识截止到 2026 年 6 月 1 日。
- **推理档位**：`reasoning.effort` 可选 none、low、medium（默认）、high、xhigh、max。要调用工具，必须走 Responses API。

The Verge、Android Authority 和 The Decoder 当天都做了报道，说法和 OpenAI 一致：Terra 夹在 Sol 和 Luna 之间，卖点是在接近 Sol 的效果下把价格砍半。

## 价格到底降了多少

下面是 OpenAI 官方 API 定价页上的标准价（每百万 token，短上下文）：

| 模型 | 输入 | 缓存输入 | 输出 |
| --- | --- | --- | --- |
| GPT-6 Astra | 10 美元 | 1 美元 | 50 美元 |
| GPT-6.1 Sol | 2 美元 | 0.10 美元 | 10 美元 |
| **GPT-6.1 Terra** | **1 美元** | **0.05 美元** | **5 美元** |
| GPT-5.6 Terra | 2 美元 | 0.20 美元 | 12 美元 |
| GPT-6 Luna | 0.10 美元 | 0.01 美元 | 0.50 美元 |

几条容易漏看的计费细节，同样来自官方文档：

- 单次请求输入超过 27.2 万 token，整次请求的输入和缓存价按 2 倍、输出按 1.5 倍计。长文档别一股脑全塞进去。
- 写入缓存另收费：保留 30 分钟每百万 token 1.25 美元，保留 12 小时 2.50 美元。缓存命中后的读取价只有输入价的 5%。
- Batch（批处理）和 Flex 价格比标准价再低 50%；Fast 模式是标准价的 2 倍；指定区域处理加收 10%。

用一个例子把账算清楚。下面的数字是**示例假设**，不是官方数据：假设处理一张发票平均要输入 3000 token（图片加提示词）、输出 500 token，一个月 1 万张。

- GPT-6.1 Terra 标准价：每张约 0.003 + 0.0025 = 0.0055 美元，1 万张约 55 美元。
- GPT-5.6 Terra：每张约 0.006 + 0.006 = 0.012 美元，1 万张约 120 美元。
- GPT-6.1 Sol：每张约 0.006 + 0.005 = 0.011 美元，1 万张约 110 美元。
- 如果这批发票不急，走 Batch，Terra 这一项还能再减一半，约 27.5 美元。

要注意，开了推理之后，模型实际消耗的输出 token 往往比你看到的回复长，档位越高越明显。真实成本请以控制台用量为准，上面的算法只用来做第一轮预算。

## 官方跑分说了什么（以及怎么看）

下面这些数字都来自 OpenAI 发布文，是厂商自己的测试，没有第三方复现，适合用来判断「它想在哪类活上赢」，不能直接当成你的业务也会得到同样结果：

- **电脑操作**：在 Agents' Last Exam（专业任务基准）上，medium 档比 GPT-5.6 Terra 高 15 个百分点，成本约为三分之一；max 档和 Claude Opus 5.5 相比，OpenAI 称每个任务成本约低 9 倍。完成电脑操作任务的速度比 GPT-6 Astra 和 GPT-6.1 Sol 快 3 倍以上。
- **事实错误**：在 OpenAI 内部一组「容易诱发错误」的提示上，low 档错误率从 GPT-5.6 Terra 的 53.6% 降到 16.7%；max 档降到 4.3%。
- **编程**：Terminal-Bench 4.0 上，max 档解决 50.3% 的任务，GPT-5.6 Terra 公布的成绩是 21.5%。但 OpenAI 明确说，最复杂的编程任务仍然是 GPT-6.1 Sol 和 GPT-6 Astra 更合适。
- **安全**：OpenAI 称它在自家 Preparedness Framework 的网络安全项上达到 Critical 阈值，沿用了 GPT-6 Astra 的防护措施；提示注入测试中抵抗力较强。

对用 AI 干活的人来说，最有用的信号是后两条：错误率明显下降，意味着批量任务的人工抽检可以更轻；但复杂编程它自己都不主推，别指望它替代你的主力编程模型。

## 对用 AI 干活的人意味着什么

**第一，批量办公自动化的门槛又降了一截。** 读发票、核对订单截图、把 PDF 表格填进系统，这类活过去要么用便宜但容易出错的小模型，要么用准但贵的大模型。Terra 把「看图 + 操作」的中档价格压到了上一代的一半，很多以前算不过账的流程，现在值得重新算一次。整理表格这类活怎么拆，可以参考 [用 AI 清洗表格数据](/posts/ai-spreadsheet-data-cleaning/)。

**第二，ChatGPT 套餐用户能多做一些事，但总额度没变。** OpenAI 的说法是同样的额度用 Terra 能完成更多任务。按 ChatGPT 官方积分表，Terra 每百万输入 token 25 积分、输出 125 积分，GPT-6.1 Sol 是 50 和 250 积分，GPT-6 Astra 是 250 和 1250 积分。帮助中心也写明 Work 和 Codex 的整体套餐限额不变。换句话说，省下来的是每个任务消耗的额度，不是额度本身变大了。额度到底怎么看，可以再读 [免费 AI 工具怎么挑](/posts/free-ai-tool-limits/)。

**第三，模型选型更要按任务分。** 现在 OpenAI 一家就有 Astra、Sol、Terra、Luna 四档，价格从每百万输出 0.5 美元到 50 美元差了 100 倍。整站只用一个模型的做法会越来越吃亏：难活用贵的，量大的活用 Terra 或 Luna，才是账本上最划算的组合。

## 现在可以怎么做：一周换档计划

1. **列出候选任务。** 从上周的工作里挑出量最大、规则最清楚的 2 到 3 类，例如发票录入、商品图和目录匹配、客服回复初稿。每类准备 30 份真实样本。
2. **并排跑一遍。** 同一批样本，分别交给你现在用的模型和 `gpt-6.1-terra`（medium 档起步）。记录三项：人是否直接采纳、返工几分钟、这批花了多少钱。需要模型输出固定格式的，按 [让 AI 输出结构化 JSON](/posts/ai-structured-output-json/) 的做法先定好字段，比较起来才公平。
3. **调档位，不要先调模型。** 如果 Terra 在 medium 档错得多，先试 high，再考虑换回更贵的模型。档位越高 token 越多，记得把成本一起记下。
4. **长文档先切块。** 输入超过 27.2 万 token 会整单涨价，把合同、报表先拆开再送进去，通常比一次塞进去更便宜也更准。
5. **不急的任务走 Batch。** 夜间对账、批量改写这类第二天才要的活，用 Batch 再省一半。
6. **对外动作留给人。** 付款、对外发邮件、改权限，不管模型多准，最后一步都由人确认。电脑操作能力越强，越要守住这条线。

一周后用一句话做决定：返工时间没增加、成本降下来了，就把这类任务正式切到 Terra；返工变多了，就退回原来的模型，省下的钱不值得。想把这一周的对比数据做得更扎实，可以照 [AI 提效怎么量化](/posts/ai-productivity-measurement/) 里的表格来记。

## 哪些活还别交给它

- **最复杂的编程和大规模重构**：OpenAI 自己推荐 GPT-6.1 Sol 或 GPT-6 Astra。
- **需要音频或视频输入的任务**：Terra 只接受文字和图片输入。发布文提到剪辑视频，指的是通过操作电脑软件来完成，不是直接读视频文件。
- **只在 ChatGPT 普通聊天里用 AI 的人**：Terra 不在 Chat 里，你得进 Work 或 Codex 才用得上。
- **对数据驻留有硬要求的团队**：ChatGPT 定价说明写明 Terra 不支持阿联酋的推理驻留。有合规要求的，先查清你所在地区和合同条款。

## 常见问题

### GPT-6.1 Terra 在 ChatGPT 普通聊天里能用吗？

不能。它只在 ChatGPT Work 和 Codex 里提供，面向 Plus、Pro、Business、Enterprise 和 Edu 套餐。Enterprise 和 Edu 还要看管理员有没有开放。

### 用了 Terra，ChatGPT 套餐的额度会变多吗？

总额度没变。同样的额度用 Terra 能做更多任务，因为它每百万 token 消耗的积分只有 GPT-6.1 Sol 的一半。

### 已经在用 GPT-6.1 Sol，要不要全部换成 Terra？

不要一刀切。最复杂的编程仍然留给 Sol 或 Astra。先把量大、规则清楚的工作换到 Terra 上试一周，返工没增加再扩大范围。

### 文章里的跑分和价格以后还准吗？

跑分是 OpenAI 自家测试，不是第三方复现。价格以 2026 年 10 月 26 日的官方定价页为准，改预算前请再看一次。

## 信息来源

- OpenAI：[Introducing GPT-6.1 Terra](https://openai.com/index/introducing-gpt-6-1-terra/)（2026-10-26）
- OpenAI 开发者文档：[GPT-6.1 Terra 模型页](https://developers.openai.com/api/docs/models/gpt-6.1-terra)
- OpenAI 开发者文档：[API Pricing](https://developers.openai.com/api/docs/pricing)
- ChatGPT Learn：[Pricing](https://learn.chatgpt.com/docs/pricing)
- OpenAI 帮助中心：[ChatGPT Rate Card (Enterprise token-based pricing)](https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing)
- The Verge：[GPT-6.1 Terra is very good at computer use, OpenAI says](https://www.theverge.com/ai-artificial-intelligence/1018854/gpt-6-1-terra-is-very-good-at-computer-use-openai-says)（2026-10-26）
- Android Authority：[GPT-6.1 Terra makes a strong case for being OpenAI's best bang for your AI buck](https://www.androidauthority.com/gpt-6-1-terra-3728234/)（2026-10-26）
- The Decoder：[GPT-6.1 Terra halves OpenAI's API prices and still gains ground on its larger models](https://the-decoder.com/gpt-6-1-terra-halves-openais-api-prices-and-still-gains-ground-on-its-larger-models/)（2026-10-26）
