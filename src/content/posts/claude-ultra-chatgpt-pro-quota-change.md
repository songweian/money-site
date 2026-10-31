---
title: "Claude Ultra 与 ChatGPT Pro：200 美元档怎么对账"
description: "2026年10月29日至30日，OpenAI 与 Anthropic 调整了 100 到 200 美元档的用量。本文按官方页面说明 Claude Ultra 与 ChatGPT Pro 的额度变化、选档步骤和对账方法。"
pubDate: 2026-10-31T17:00:00+08:00
topic: ai-tools
tags: ["Claude", "ChatGPT", "订阅额度", "对账"]
keyword: "Claude Ultra ChatGPT Pro 额度"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "已验证的 Claude Ultra 可以一直用吗？"
    a: "已验证账户取消的是 5 小时限制。周限额仍然有效，并且覆盖所有模型；Fable 还有单独的周限额。Anthropic 保留以周上限、月上限、模型或功能限制来限流的权利，不保证不间断服务。官方没有公布具体小时数。"
  - q: "结账时验证了手机号，5 小时限制就取消了吗？"
    a: "结账时的手机号验证不等于完成账户验证。Anthropic 按账户和付款历史自动验证，通过后临时限制自动解除，不需要你再操作。打开 Settings > Usage，看不到 Current session 进度条，才说明账户已验证。5 小时限制的取消写在 Ultra 的已验证账户上，Max 仍按每 5 小时 Pro 的 5 倍计算。"
  - q: "ChatGPT Pro 200 要不要取消再订一次？"
    a: "不用。帮助中心写明老用户自动获得，不用等续费，也不需要取消后重新订阅。Pro 200 已重新开放新订阅，仍是每月 200 美元。到 Settings → Usage 核对。各档具体数字额度 OpenAI 没有公布。"
  - q: "Pro 100、Pro 200、Pro 500 是不是全部翻倍？"
    a: "帮助中心的口径是：Pro 100 和 Pro 500 的 Work 与 Codex 额度翻倍；Pro 200 只有原来较低的额度翻倍，用来对齐较高额度，已经较高的保持不变，现在所有 Pro 200 额度相同。Plus 用量不变。Pro 100 和 Pro 500 的每周 GPT-6 Pro 聊天消息上限不变，Pro 200 较低的周上限对齐到较高的。额度翻倍不保证完成任务数翻倍。Tibo 在 X 上说 Pro 100/200/500 和 Business Premium 的用量上限翻倍，预算以帮助中心为准。"
  - q: "每月附带的 API 额度等于无限的 Claude Code 吗？"
    a: "定价页写的是金额：Max 每月 100 美元 Claude API 额度，Ultra 每月 200 美元。网页、桌面、移动端和 Claude Code 共用一个用量池。触顶后可以等重置、升级套餐，或在付费套餐上开启 usage credits，按 API 价继续用。官方没有给出这些美元等于多少小时的换算。"
---

同一周里，两家把每月 100 到 200 美元这一档的用量规则改了，标价仍是原来的数字。Anthropic 在美国时间 2026 年 10 月 30 日把 Claude Max 20x 改名为 Ultra，已验证账户取消 5 小时限制。OpenAI 在 10 月 29 日撤回了降低 ChatGPT Pro 200 包含额度的计划，并按帮助中心的规则给 Pro 档加量。The Verge 记录的报道时间是 2026-10-30 18:47 UTC。

重度用户这周要做的是选档和对账。5 小时窗口一直是长任务、Claude Code 和代理最常撞上的边界。两家在 200 美元档同时放宽连续使用，这一档的竞争落在额度和能不能把一件长工作做完。周限额仍写在规则里。官方没有把任何一档写成无限使用，也没有公布还能多工作多少小时。

下面只采用定价页、帮助中心和已核对报道里写明的句子。模型仍然按任务分工，总原则见 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/)。

## 标价没动，动的是连续使用和包含额度

把两则通知放在一张时间表上，方便对上你收到的邮件。

| 时间 | 谁 | 公开动作 |
| --- | --- | --- |
| 2026-09-29 | OpenAI | 曾发邮件，通知 10 月 29 日之后降低现有 Pro 200 订阅者的 Work 和 Codex 包含额度，价格不变 |
| 2026-10-29 | OpenAI | 在用户反馈后撤回上述降额，并宣布 Pro 档用量调整；Pro 200 重新开放新订阅 |
| 2026-10-30（美国时间） | Anthropic | Max 5x 改称 Max，Max 20x 改称 Ultra，价格不变；The Verge 报道时间为 18:47 UTC |

OpenAI 的 Tibo 在 X 上说了两句，BleepingComputer 引用如下：

> We are doubling all usage limits for all Pro 100/200/500 tiers and Business Premium, effective today.

> We heard your kind feedback and won't be reducing usage limits for Pro 200, so your Work and Codex usage will stay the same.

帮助中心对 Pro 200 的写法更细：原来额度较低的用户向上对齐，已经处于较高额度的保持不变。两句都要留着。对外说「翻倍了」之前，先看帮助中心把你这一档写成哪一种。

## Claude：Max 5x 改叫 Max，Max 20x 改叫 Ultra

更名之后的价格：Max 每月 100 美元，Ultra 每月 200 美元。Max 20x 的老用户自动迁到 Ultra，不需要重新下单。

三档个人用量，按定价页和支持文档，可以分成下面几句：

- **Pro**：每月 20 美元，年付折合每月 17 美元。它是 Max 和 Ultra 的比较基准。
- **Max**：每 5 小时是 Pro 的 5 倍，每周也是 Pro 的 5 倍。5 小时窗口还在。
- **Ultra**：每周 10 倍 Pro 用量。已验证账户没有 5 小时限制。周限额还在，而且这条周限额覆盖所有模型。Fable 另有单独的周限额。Ultra 目前只有月付。

未验证的 Ultra 账户先适用临时限制。Anthropic 按账户和付款历史自动验证，通过后临时限制自动解除，不需要你提交额外材料。结账时验证手机号，不等于这项验证已经完成。

自查写在支持文档里：打开 Settings > Usage。看不到 “Current session” 进度条，说明账户已验证。还能看到这条进度条，说明临时限制还在，等自动验证通过。这条自查确认的是验证状态。5 小时限制的取消，对应的是 Ultra 的已验证账户。Max 用户即使已验证，用量仍按每 5 小时 Pro 的 5 倍计算。

Fable 的包含范围也按档分开。Max 和 Ultra 都包含 Fable，最多可用到周限额的一半。Pro 用户使用 Fable，需要另付 usage credits。

定价页另外写了一笔每月 API 额度：Max 为 100 美元，Ultra 为 200 美元。这是金额，不是「还可以再跑多少小时」。官方没有公布换算。

用量池是共用的。网页、桌面、移动端和 Claude Code 记在同一个池子里。在 Claude Code 里跑长任务，占用的是你在网页聊天里的同一份额度。仓库里助手怎么进、密钥和许可证怎么管，继续沿用 [AI 编程助手选型与团队落地规范](/posts/ai-coding-assistant-team-guide/)，不因为 Ultra 取消了 5 小时限制就放开提交。

Anthropic 保留以其他方式限流的权利，包括周上限、月上限、按模型限制和按功能限制，并且不保证不间断服务。触顶之后，支持文档给出三条路：等重置、升级套餐，或在付费套餐上开启 usage credits，按 API 价格继续用。订阅包含额度和 API 单价是两本账。另一家模型的单价不能搬过来当 Claude 的报价，分账方式可以参考 [GPT-6.1 Terra 的价格和换档](/posts/gpt-6-1-terra-cost-guide/)。

团队若在看座位：Team 计划的 Premium 座位，月付每座 125 美元，年付每座 100 美元。团队每月合用的 API 额度，定价页原文是 “Up to $500/month”，也就是最多 500 美元。这是上限，采购单上写成「每月保证 500 美元」会把页面上的 Up to 去掉。

## ChatGPT Pro：降额撤回，加量按档读

Pro 目前三档，都只有月付：Pro 100 每月 100 美元，Pro 200 每月 200 美元，Pro 500 每月 500 美元。Pro 200 在这次调整后重新开放新订阅，价格仍是 200 美元。

帮助中心把用量写成下面几条。预算和内部通知采用这一版：

- Pro 100 和 Pro 500 的 Work 和 Codex 额度翻倍。
- Pro 200 里，原来处于较低额度的用户翻倍，与较高额度对齐；已经拥有较高额度的保持不变。调整之后，所有 Pro 200 的额度相同。
- 老用户自动获得，不用等下一次续费，也不需要取消后再订阅。
- Plus 的用量不变。
- Pro 100 和 Pro 500 的每周 GPT-6 Pro 聊天消息上限不变。Pro 200 较低的周上限对齐到较高的那一档。
- 额度翻倍不保证完成的任务数翻倍。

Tibo 的第一句把 Pro 100、Pro 200、Pro 500 和 Business Premium 都放进「用量上限翻倍」。帮助中心同时写明：Pro 200 里已经处于较高额度的用户保持不变，变的是较低额度向较高额度对齐，以及原定的降额不再执行。一个人的 Work 和 Codex 会不会变成「原来的两倍」，取决于他原先在较低档还是较高档。这个区分帮助中心写了，推文的两句没有展开。对账时打开 Settings → Usage，看自己账号上的数字，不要用推文代替账单。

Fast 和 Ultrafast 会改变一次任务扣多少。Fast 按 2.5 倍消耗。只有 Pro 500 包含 Ultrafast。GPT-6 Astra 和 GPT-6.1 Sol 走 Ultrafast 时，按标准速率的 8 倍消耗包含额度；改用 credits 时，按 6 倍 credit 费率计。倍数越高，同样一份额度能覆盖的次数越少。

包含额度用完之后可以购买 credits。credits 支持 Codex、ChatGPT Work，以及 Word、Excel、PowerPoint 插件等。入口同样在 Settings → Usage。

OpenAI 继续为 Dots（常驻 AI 助手）提供扩展额度，而且 Dots 的用量与默认用量分开计算。各档的具体数字额度，OpenAI 没有公布。帮助中心没有写每周多少条消息、多少 token。文章里也不补一个估计数。

Business Premium 出现在 Tibo 的翻倍范围里。本文采用的已核实细则是 Pro 各档、Plus、Fast / Ultrafast、credits 和 Dots。Business 工作区的逐项数字，以该工作区的 Usage 页面为准。

## 对照表只放页面上有的数字

下表的价格和倍数都能回到上一节的出处。官方没有写成可比较数字的项目，表里写「未公布」，不填估计。

| 档位 | 月费 | 用量（官方口径） | 页面上同时写明的限制 |
| --- | --- | --- | --- |
| Claude Pro | 20 美元；年付折合 17 美元/月 | Max、Ultra 的比较基准 | 使用 Fable 需另付 usage credits |
| Claude Max | 100 美元 | 每 5 小时、每周都是 Pro 的 5 倍 | 每月 100 美元 API 额度；含 Fable，最多到周限额的一半；5 小时窗口仍在 |
| Claude Ultra | 200 美元，目前仅月付 | 每周 10 倍 Pro；已验证账户无 5 小时限制 | 周限额仍在且覆盖所有模型；Fable 另有周限额；每月 200 美元 API 额度；含 Fable，最多到周限额的一半；Max 20x 自动迁入 |
| ChatGPT Pro 100 | 100 美元，仅月付 | Work 与 Codex 额度翻倍 | 每周 GPT-6 Pro 聊天消息上限不变；不含 Ultrafast；具体条数未公布 |
| ChatGPT Pro 200 | 200 美元，仅月付，已重新开放 | 较低额度翻倍并对齐较高额度，全体现已相同；原定降额不执行 | 较低的周上限对齐到较高的；不含 Ultrafast；老用户自动生效；具体条数未公布 |
| ChatGPT Pro 500 | 500 美元，仅月付 | Work 与 Codex 额度翻倍 | 每周 GPT-6 Pro 聊天消息上限不变；含 Ultrafast；具体条数未公布 |

另外两条放不下个人档位的格子，单独记：

- Claude Team Premium 座位：月付 125 美元/座，年付 100 美元/座。团队合用 API 额度最多 500 美元/月。
- ChatGPT 的 Fast 按 2.5 倍消耗。Ultrafast 只在 Pro 500：GPT-6 Astra 与 GPT-6.1 Sol 按 8 倍消耗包含额度，用 credits 时按 6 倍 credit 费率。

Claude 的网页、桌面、移动端和 Claude Code 共用一个池。ChatGPT 的 Dots 用量与默认用量分开。两句都按各家自己的页面理解，不要互相套。

## 谁会在用量页上看到差别

**每天长时间开着 Claude Code 或 Codex 的人。** 先分清你上次停下来的原因。停在 Claude 的 5 小时窗口、而周限额还剩，已验证 Ultra 对得上这件事：5 小时这道窗口去掉了，每周 10 倍 Pro 的周限额还在。停在周限额上，取消 5 小时限制不会把周限额一起去掉。Codex 和 Work 的包含额度，Pro 200 按「较低对齐较高、全体相同」理解。帮助中心写明，额度翻倍不保证完成的任务数翻倍，所以不要用「翻倍」去估算这周能多合入多少次。

**用 AI 写长报告、清洗表格、做演示文稿的人。** ChatGPT 的 credits 支持 Word、Excel、PowerPoint 插件，也支持 ChatGPT Work。长文档和多轮改稿会更快用掉包含额度。Fast 按 2.5 倍消耗，Ultrafast 按 8 倍消耗包含额度，同样的额度能覆盖的次数更少。只有 Pro 500 含 Ultrafast。Pro 100 和 Pro 200 的已核实说明里没有 Ultrafast。先在标准速率下把额度用完，再决定要不要打开按倍数消耗的模式。

**小团队负责人。** 给一个人升到 Ultra 或 Pro 200，和给团队加 Claude Premium 座位，是两张账单。Premium 座位按人计价，API 额度是团队合用，并且写成最多 500 美元。一个人的长任务从这份额度里扣。ChatGPT 这边，Tibo 把 Business Premium 放进翻倍范围；座位要不要加，用下面两周的记录决定。公告当天不改合同。

## 用一到两周做完的七步

每一步只记你在用量页上能看到的项目。官方没写的小时数，不要填进记录。

1. **先记撞上的是哪一种限额。** 连续 7 到 14 天，每天结束写一行：日期、Claude 是否撞上 5 小时窗口、是否撞上周限额、ChatGPT 的 Work 或 Codex 包含额度是否在周中用完、当天开过 Fast 还是 Ultrafast。次数比「感觉不够用」有用。
2. **Claude 用户确认验证状态。** 打开 Settings > Usage。看不到 “Current session” 进度条，账户已验证。还能看到，临时限制还在；验证由 Anthropic 按账户和付款历史自动完成，通过后自动解除。结账时填过的手机号，不作为已验证的证据。
3. **用这两周的记录在 Max 和 Ultra 之间选。** 5 小时窗口经常先满、周限额很少满：看 Ultra，每月 200 美元，目前仅月付，已验证后没有 5 小时限制，每周 10 倍 Pro。很少撞 5 小时窗口：看 Max，每月 100 美元，每 5 小时和每周都是 Pro 的 5 倍。两种窗口都不常满：留在 Pro，每月 20 美元，年付折合 17 美元。Pro 使用 Fable 要另付 usage credits；Max 和 Ultra 包含 Fable，最多到周限额的一半。
4. **把 API 额度算进月成本，不换成小时。** Max 每月含 100 美元 Claude API 额度，Ultra 含 200 美元。触顶后的第三条路，是在付费套餐上打开 usage credits，按 API 价继续。月成本写成三笔：订阅费、计划内会用到的 API 额度、预期的 usage credits。重复任务怎么设上限，见 [AI 自动化越跑越贵怎么办](/posts/ai-automation-cost-control/)。
5. **ChatGPT Pro 200 核对自动更新，不为这件事取消重订。** 帮助中心写明老用户自动获得。打开 Settings → Usage，核对自己的 Work、Codex 和每周 GPT-6 Pro 聊天额度。帮助中心写的是全体 Pro 200 现在额度相同，具体条数没有公布。9 月 29 日那封通知降额的邮件，对应的计划已经撤回。取消后再订，公开说明里没有写出另一套 Pro 200 额度。需要 Ultrafast 时，对应的是 Pro 500，每月 500 美元；Pro 100 和 Pro 200 的已核实说明里没有 Ultrafast。
6. **把速度倍数写进使用习惯。** 日常改稿用标准速率。Fast 按 2.5 倍消耗。Ultrafast 只在 Pro 500 里；GPT-6 Astra 和 GPT-6.1 Sol 走这条时，包含额度按 8 倍计，credits 按 6 倍 credit 费率计。倍数越高，同样一份额度能覆盖的次数越少。把「默认不用按倍数消耗的模式」写进自己的检查单，比事后从账单里倒推更省事。
7. **团队最后再决定座位。** 先数有多少人会在同一周打满个人额度，再决定是给重度使用者升个人档，还是加 Team Premium 座位（月付 125 美元/座，年付 100 美元/座，合用 API 额度最多 500 美元/月）。合用上限会被一个人的长任务占掉。先量自己这一周的真实用量，再比较档位，这件事和 [免费 AI 工具怎么挑](/posts/free-ai-tool-limits/) 是同一顺序。

## 页面没写的数字，就不要补

- Claude 各档「每周多少条、多少小时」，ChatGPT 各 Pro 档的具体数字额度，官方都没有公布。Claude 的「5 倍」「10 倍」基准是 Pro。ChatGPT 的「翻倍」在帮助中心里指 Work 和 Codex 的包含额度：Pro 100 与 Pro 500 相对原额度翻倍，Pro 200 是较低额度向较高额度对齐。这些都不是可以换算成工时的绝对数。
- 帮助中心写明，额度翻倍不保证完成任务数翻倍。Fast 和 Ultrafast 的倍数还会让单次任务消耗更多。
- Tibo 的「Pro 100/200/500 与 Business Premium 翻倍」，和帮助中心对 Pro 200「较低额度对齐、较高额度不变」，两句同时保留。内部预算采用帮助中心，并用 Settings → Usage 核对。
- 已验证 Ultra 取消的是 5 小时限制。周限额、Fable 的单独周限额，以及 Anthropic 保留的其他限流方式，都还写在支持文档里。不保证不间断服务。
- Max 的 100 美元和 Ultra 的 200 美元是每月 API 额度。定价页没有把它们写成「在此金额内 Claude Code 可以无限使用」。网页、桌面、移动端和 Claude Code 仍共用一个用量池。
- Team 的 API 额度是 “Up to $500/month”。合同里写成固定的每月 500 美元，和定价页的用词不一致。

下单或改预算之前，再打开一次文末的定价页和帮助中心。厂商会改这些句子。

## 常见问题

### 已验证的 Claude Ultra 可以一直用吗？

已验证账户取消的是 5 小时限制。周限额仍然有效，并且覆盖所有模型；Fable 还有单独的周限额。Anthropic 保留以周上限、月上限、模型或功能限制来限流的权利，不保证不间断服务。官方没有公布具体小时数。

### 结账时验证了手机号，5 小时限制就取消了吗？

结账时的手机号验证不等于完成账户验证。Anthropic 按账户和付款历史自动验证，通过后临时限制自动解除，不需要你再操作。打开 Settings > Usage，看不到 Current session 进度条，才说明账户已验证。5 小时限制的取消写在 Ultra 的已验证账户上，Max 仍按每 5 小时 Pro 的 5 倍计算。

### ChatGPT Pro 200 要不要取消再订一次？

不用。帮助中心写明老用户自动获得，不用等续费，也不需要取消后重新订阅。Pro 200 已重新开放新订阅，仍是每月 200 美元。到 Settings → Usage 核对。各档具体数字额度 OpenAI 没有公布。

### Pro 100、Pro 200、Pro 500 是不是全部翻倍？

帮助中心的口径是：Pro 100 和 Pro 500 的 Work 与 Codex 额度翻倍；Pro 200 只有原来较低的额度翻倍，用来对齐较高额度，已经较高的保持不变，现在所有 Pro 200 额度相同。Plus 用量不变。Pro 100 和 Pro 500 的每周 GPT-6 Pro 聊天消息上限不变，Pro 200 较低的周上限对齐到较高的。额度翻倍不保证完成任务数翻倍。Tibo 在 X 上说 Pro 100/200/500 和 Business Premium 的用量上限翻倍，预算以帮助中心为准。

### 每月附带的 API 额度等于无限的 Claude Code 吗？

定价页写的是金额：Max 每月 100 美元 Claude API 额度，Ultra 每月 200 美元。网页、桌面、移动端和 Claude Code 共用一个用量池。触顶后可以等重置、升级套餐，或在付费套餐上开启 usage credits，按 API 价继续用。官方没有给出这些美元等于多少小时的换算。

## 信息来源

核对日期：2026-10-31。价格和额度以当天仍公开的页面为准，厂商会改。

- Anthropic 定价页：[claude.com/pricing](https://claude.com/pricing)：Max / Ultra 更名与价格、Pro 年付折合每月 17 美元、Ultra 仅月付、每月 API 额度、Fable 的包含范围、Team Premium 座位与 “Up to $500/month”。
- Claude 支持中心：[What is the Ultra plan?](https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan)：每周 10 倍 Pro、已验证账户无 5 小时限制、周限额与 Fable 单独周限额、按账户和付款历史自动验证、Settings > Usage 中的 Current session。
- Claude 支持中心：[How do usage and length limits work?](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)：用量在网页、桌面、移动端和 Claude Code 之间共用；周/月上限与模型或功能限制；触顶后等待重置、升级或开启 usage credits。
- The Verge：[max-ultra-claude](https://www.theverge.com/ai-artificial-intelligence/1023576/max-ultra-claude)（2026-10-30 18:47 UTC）：更名与宣布时间的报道。
- OpenAI 帮助中心：[About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)：Pro 100/200/500 的额度规则、Pro 200 重新开放与自动生效、每周 GPT-6 Pro 聊天消息上限、Ultrafast 与 Fast 的倍数、credits、Dots，以及不公布每档具体数字额度。
- BleepingComputer：[降额撤回与额度调整的报道](https://www.bleepingcomputer.com/news/artificial-intelligence/openai-doubles-chatgpt-pro-usage-limits-after-backlash-over-planned-50-percent-cut/)：Tibo 的两句原文，以及降额计划被撤回。正文的分档规则采用帮助中心。该网址里出现的削减比例，不作为官方数字写入正文。
- Android Authority：[同一事件的报道](https://www.androidauthority.com/openai-doubles-chatgpt-usage-limits-3730213/)：与 2026-10-29 的宣布核对。额度句子以帮助中心为准。
