---
title: "GPT-6.2 计费错误已修：同样的活会更快撞额度"
description: "2026 年 11 月 26 日，OpenAI 修正了 GPT-6.2 上线时少计用量的错误。相对上周，Astra 会快 40%、Sol 会快 25% 撞上限；Go、Plus、Pro 和 Business 各有一张需手动兑换的 banked reset。"
pubDate: 2026-11-27T07:00:00+08:00
topic: ai-tools
tags: ["OpenAI", "GPT-6.2", "额度", "Codex"]
keyword: "GPT-6.2 计费错误 额度"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "我这周做同样的活，订阅是不是涨价了？"
    a: "不是标价调整。Thibault “Tibo” Sottiaux（@thsottiaux）在 2026-11-26 10:50:10（Asia/Shanghai）说，修的是 GPT-6.2 上线时错误地少计了大多数用户的 Astra 和 Sol 用量，同样的活会占用更多套餐额度。Neowin 的 Paul Hill 在 2026-11-26 02:38（EST）核对定价页，未见因此改价。过去用量的差额不会补扣，其他模型不受影响。"
  - q: "快 40%、快 25%，是不是每件事都少做了四成？"
    a: "不是。官方比较对象是上周，也就是修复前的计数：GPT-6.2 Astra 会快 40% 撞上限，Sol 会快 25%。OpenAI 没有公布单次请求的精确乘数。用你自己的常用任务看用量条。Tibo 另说，相对 GPT-6 Astra 和 GPT-6.1 Sol，6.2 应该仍走得更远，这是他的说法。"
  - q: "看到重置卡，或者看到 Banked reset is online，额度是不是已经回满？"
    a: "没有。领到 banked reset 不等于额度回满，要在过期前自己兑换。帮助中心写明，History 里的 Reset received 只表示卡已发到账户，Reset used 才是已兑换。Tibo 在 2026-11-26 15:26:16（Asia/Shanghai）只写了 Banked reset is online。发放窗口内，符合条件的账户可能分批收到。到期时间以你用量页上的显示为准；BleepingComputer 作者在自己的用量页看到的是大约一个月，不是官方统一截止日期。"
  - q: "手机上没有兑换按钮，这张卡怎么办？"
    a: "移动端没有这个选项。桌面应用走 Settings > Usage & billing，网页打开 Usage settings。Codex CLI 输入 /usage，再选 Redeem reset；CLI 里没有该选项时，改用桌面或网页。从 Usage settings 兑换，要求它覆盖的额度里至少有一项剩余不足 80%。若都在 80% 及以上，会提示暂不需要 reset，卡片留到你使用或过期。"
  - q: "Enterprise、Edu 和 Go 一定有这张卡吗？普通聊天是不是因此能用 GPT-6.2 了？"
    a: "Tibo 点名的发放对象是 Go、Plus、Pro 和 Business，没有点名 Enterprise 或 Edu。帮助中心写明，同套餐不保证人人都有。Go 是否用得上 Astra 或 Sol，这篇帖子没有写，能兑换到什么以用量页为准。他这次没有说入口变化。2026 年 11 月 17 日的发布说明点名的是 Plus、Pro、Enterprise 和 Edu 的 Work 与 Codex，没有把 Business 写进那一句。"
  - q: "为了领这张卡，要不要取消再重新订阅？"
    a: "不要为这张卡取消重订。公开说明没有写取消后重订会再得到一张。兑换可能改变下一次刷新时间，但不改变订阅扣款日，以用量页上的下次刷新时间为准。full banked reset 不会永久提高套餐上限，也不等于增加额度点数。免费的 banked reset 和 automatic reset 是酌情促销，不保证一定有，也不保证时间表。"
---

2026 年 11 月 26 日 10:50:10（Asia/Shanghai），OpenAI 负责 Codex 与 ChatGPT 的 Thibault “Tibo” Sottiaux（@thsottiaux，简介写明 Codex & ChatGPT @OpenAI）发帖：GPT-6.2 上线时有一笔计费错误，错误地少计了大多数用户的 GPT-6.2 Astra 和 Sol 用量。错误已经修好。同样的工作，会占用套餐用量额度里更多的部分。和上周相比，GPT-6.2 Astra 会快 40% 撞上限，Sol 会快 25%。

正在用这两个模型干活的人，这周要看的是用量条，不是一张新的价目表。订阅标价没有在这则说明里上调，过去的差额也不会补扣。Tibo 说会给 Go、Plus、Pro 和 Business 各加一张 banked reset，用来道歉。卡发到账户，不等于额度已经回满，过期前要自己兑换。模型是 11 月 17 日发布的，当时在哪用、点名了哪些套餐，见 [GPT-6.2 Astra 和 Sol 的发布说明](/posts/gpt-6-2-astra-sol-guide/)。本文只写 11 月 26 日这次计数修正。

## 11 月 26 日官方说了什么

这次公开说明是 Tibo 的 X 帖。帖子时间是 2026-11-26T02:50:10Z，换成 Asia/Shanghai 就是 2026-11-26 10:50:10。完整文字在 note_tweet 里。只看被截断的 280 字预览，后半段的道歉和重置会漏掉。全文是：

> We made a billing mistake at launch of GPT-6.2 that incorrectly discounted GPT-6.2 Astra and Sol usage for most users.
> We’ve fixed this now, so the same work will use more of your plan’s usage allowance. Comparing to last week, you will reach your limits 40% faster on GPT-6.2 Astra and 25% faster on Sol. You should still see these go further in usage compared to 6 Astra and 6.1 Sol. Other models weren’t affected, and we won’t charge you for the difference on past usage.
> As a small token to apologize for the mistake, we’ll be adding one banked reset for everyone on Go, Plus, Pro, and Business.

按这几句分开记：

- 上线时，大多数用户的 GPT-6.2 Astra 和 Sol 用量被少计了。「大多数用户」是他的用词，帖子里没有人数。
- 修好之后，同样的工作会多用套餐额度。比较对象是上周：Astra 快 40% 到达上限，Sol 快 25%。
- 他又写，相对 GPT-6 Astra 和 GPT-6.1 Sol，你应该仍会看到 6.2 在用量上走得更远。这句是官方自己的说法。
- 其他模型不受影响。
- 过去用量的差额，不会向你收费。
- 道歉是一张 banked reset，对象写成 Go、Plus、Pro 和 Business 上的每一个人。Enterprise 和 Edu 没有出现在这句里。

当天 15:26:16（Asia/Shanghai），对应 2026-11-26T07:26:16Z，他发了后续帖，全文只有 Banked reset is online。这句说明重置已经上线。帮助中心同时写明：银行式发放窗口内，符合条件的账户可能在不同时间收到。不要把这四个词读成所有人的卡已经立刻到账，更不要读成额度已经回满。

11 月 25 日起，OpenAI 社区已经出现相关讨论，有用户称收到更早的更正邮件。讨论在 [Codex used less of your allowance than intended](https://community.openai.com/t/codex-used-less-of-your-allowance-than-intended/1420514)。公开、能对着原文核对的口径，以 11 月 26 日 Tibo 的帖为准。某个用户对邮件的转述，本文不写成官方原文。

和 11 月 17 日的发布说明要分开看。那次点名的可用范围是 Plus、Pro、Enterprise 和 Edu 的 Work 与 Codex，发布说明没有把 Business 写进那一句。Tibo 这次的道歉名单是 Go、Plus、Pro、Business。两句名单对不上的地方，不要互相补。他这次没有说入口变化，本文不改写普通 Chat 已经能用 6.2。Go 是否用得上 Astra 或 Sol，帖子里没有写。能兑换到什么，以用量页上的项目为准。

## 快 40% 和快 25% 该怎么读

「快 40%」「快 25%」说的是到达上限的速度，比较对象是上周，也就是修复前的计数。40% 对应 GPT-6.2 Astra，25% 对应 GPT-6.2 Sol。官方没有公布单次请求的精确乘数。这两句不能换成「能完成的任务少了 40%」，也不能换成「等价于涨价某一个百分比」。打开用量页，用你自己常跑的任务看进度条。

其他模型不在这次修正里。大量、重复、本来就没有放在 6.2 Astra 或 Sol 上的活，计数方式没有被这则帖子改掉。日常和难任务继续分开，不要整站换模型，做法见 [按任务分工，不要整站换新](/posts/october-ai-model-roles/)。

「相对 GPT-6 Astra 和 GPT-6.1 Sol 仍应走得更远」只作为 Tibo 的原话引用。本文没有做对照测试，也不把它写成测评结论。要不要相信这句，用你这周的三件真实任务看用量条。

帖子没有写清的边界，heise online 的 Malte Kirchner 点了两点，正文需要带着，避免读宽：

1. OpenAI 没有说明具体算错了哪一步、影响了多少用户、是否因地区而异。
2. Tibo 的帖子没有区分 Chat、Work 和 Codex。

因此，快 40% 和快 25% 不要写成只发生在某一个入口，也不要写成三个入口各有一套帖子里没有的比例。「大多数用户」到此为止，不再补一个百分比。

Neowin 的 Paul Hill 在 2026-11-26 02:38（EST）做了报道。这个钟点换算成 Asia/Shanghai，是当天 15:38。他确认这是用量计数方式的修正，不是订阅标价调整，并称核对定价页后没有看到因此改价。月费按定价页和你已经在付的方案读。用量变紧，是因为少计被改了回来。

The Decoder 的 Matthias Bastian 在 2026-11-26 也做了报道。本文只用它交叉核对 Tibo 已经说出的内容，不从那篇另外取数。

BleepingComputer 的 Mayank Parmar 在 2026-11-26 转述了 Tibo 的原话，并在自己的 ChatGPT 用量页上确认：已经新增一张 reset，大约一个月后过期。这是作者自己页面上的到期时间。不要写成所有账户的官方统一截止日期。你的到期时间，以用量页上显示的那一行为准。

## banked reset 怎么查、什么时候兑

banked reset 是一张先放在账户里的重置卡。领到，不等于额度立刻回满。要在卡片过期之前自己兑换。兑换入口、门槛、兑回去的是哪一项，按帮助中心 [How resets work in Codex](https://help.openai.com/en/articles/20001498-how-resets-work-in-codex) 操作。下面每一步都来自该页，不另补一套界面。

先打开用量页的 History：

- Reset received 只表示卡已经发到这个账户，不表示额度已经回满。
- Reset used 才表示这张卡已经兑换。

页面上还没有这两行，就先等。Tibo 在 15:26（Asia/Shanghai）写下 Banked reset is online 之后，发放窗口里符合条件的账户仍可能分批收到。发给谁、覆盖哪些限额、何时送达、何时过期，由 OpenAI 按每一次活动决定。同一个套餐，不保证每个人都有。

兑换时按你手头的客户端选入口：

1. 桌面应用：Settings，然后 Usage & billing。
2. 网页：打开 Usage settings。
3. 移动端没有这个选项。要兑换就改用桌面应用或网页。
4. Codex CLI：输入 `/usage`，再选 Redeem reset。CLI 没有该选项时，改用桌面应用或网页。

从 Usage settings 兑换有一条硬条件：它覆盖的额度里，至少有一项剩余不足 80%。这些额度如果都还在 80% 及以上，页面会提示暂不需要 reset。卡片继续留在账户里，直到你以后使用，或者到期作废。额度还高的这几天，先别兑。

桌面版另外有一个开关，名字是 Allow your assistant to use resets。它让助手在条件满足时使用重置。条件比手动兑换更紧：主 5 小时额度，或周额度，剩余要在 10% 或更少。还没到这个剩余比例，开关不会把卡提前用掉。

名为 full 的 banked reset，恢复的是当前套餐的主要 Codex 额度。帮助中心按套餐写成：

| 帮助中心写明的套餐 | full banked reset 恢复的主要 Codex 额度 |
| --- | --- |
| Go | 月额度 |
| Plus、Business Standard | 5 小时额度，以及周额度 |
| Pro 100、Pro 200、Pro 500 | 周额度 |

已经处于 100% 的那一项，不会被重新起算。Plus 和 Business Standard 同时有 5 小时限额和周限额。同一笔用量会计入两项，两项的周期结束时间却可能不同。一次 reset 可能只把其中已经不足的那一项回满，仍是 100% 的那一项保持不动。兑换前先看两项分别剩多少，不要默认两条进度条会一起回到满格。

这张卡不覆盖单独计算的功能额度，帮助中心点名的有 ChatGPT 的图片生成、文件上传、普通 Chat Voice。其他单独功能额度同样不在这张卡里。它也不会永久提高套餐上限，不等于往账户里增加额度点数。免费的 banked reset 和 automatic reset 是酌情促销：不保证一定发放，也不保证一张固定的时间表。

兑换之后，下一次刷新时间可能改变。订阅扣款日不改变。安排这周剩下的工作，看 Usage 页上写的下次刷新时间。先记下自己这周要跑的任务，再读额度条，这个顺序见 [免费 AI 工具怎么挑](/posts/free-ai-tool-limits/)。另一则订阅额度对账见 [Claude Ultra 与 ChatGPT Pro：200 美元档怎么对账](/posts/claude-ultra-chatgpt-pro-quota-change/)。此前另有说明，见 [已有文章](/posts/chatgpt-codex-shared-usage-pool/)。

Tibo 的发放名单写的是 Business。帮助中心把「5 小时额度加上周额度」写在 Business Standard。工作区档位不同，或者用量页上的项目和上表对不上，以用量页为准。不要用套餐的商业名称，补一行帮助中心没有写的限额。Go 的月额度也一样：页面上有什么，就兑什么。

## 这周可以做的五件事

1. 打开用量页。先看有没有 banked reset，再看这张卡在你页面上的到期时间。History 显示 Reset received，说明卡已到账，额度还没有因此回满。还没有任何记录，就按发放窗口理解：符合条件的账户可能分批收到。Banked reset is online 不是你这个账号的到账回执。BleepingComputer 作者看到的大约一个月，只供对照，不代替你页面上的日期。
2. 看被这张卡覆盖的额度还剩多少。每一项都在 80% 及以上，这周先不要兑换，卡片会留着。至少有一项降到 80% 以下，再从 Usage settings 兑换。如果希望桌面助手代兑，主 5 小时额度或周额度要先降到剩余 10% 或更少，并打开 Allow your assistant to use resets。手机上没有按钮，换桌面或网页。CLI 没有 Redeem reset 时，同样换桌面或网页。
3. 从这周真实会做的活里挑 3 件：一件日常、一件更难、一件会重复很多次。每件只记三列，模型名、做之前的用量条、做之后的用量条。官方没有给单次请求的乘数。40% 和 25% 描述的是相对上周更快撞上限。三件任务的进度条，比把百分比换算成少做几次更接近你的使用。
4. 日常先看 Sol 这一侧的用量。大量重复的活，留在 Tibo 说没有受这次修正影响的其他模型上。Astra 会快 40% 撞上限，只说明这一侧比上周更紧，不是把全部任务改道的理由。相对 GPT-6 Astra 和 GPT-6.1 Sol 是否仍更耐用，用这 3 件任务自己看，并在记录里注明：那句「更耐用」来自 Tibo，不是本站的测评。
5. 不要为了这张卡取消再重新订阅。公开说明没有写，取消后重订会再得到一张。兑换可能改写下一次刷新时间，订阅扣款日保持不变，刷新时间以用量页为准。Enterprise 和 Edu 不在 Tibo 的名单里，不要为了「应该也有一张」去改方案。Go 如果收到卡，能兑回的是用量页上属于该套餐的主要 Codex 额度；帖子没有据此说明 Go 可以用 Astra 或 Sol。

五步做完，留下的是一张自己的用量记录。卡片还没出现，或者出现了但额度仍高，就继续把手头的活做完。兑换不改变订阅扣款日。其他模型不在这次修正里，不必一起换掉。

## 常见问题

### 我这周做同样的活，订阅是不是涨价了？

不是标价调整。Thibault “Tibo” Sottiaux（@thsottiaux）在 2026-11-26 10:50:10（Asia/Shanghai）说，修的是 GPT-6.2 上线时错误地少计了大多数用户的 Astra 和 Sol 用量，同样的活会占用更多套餐额度。Neowin 的 Paul Hill 在 2026-11-26 02:38（EST）核对定价页，未见因此改价。过去用量的差额不会补扣，其他模型不受影响。

### 快 40%、快 25%，是不是每件事都少做了四成？

不是。官方比较对象是上周，也就是修复前的计数：GPT-6.2 Astra 会快 40% 撞上限，Sol 会快 25%。OpenAI 没有公布单次请求的精确乘数。用你自己的常用任务看用量条。Tibo 另说，相对 GPT-6 Astra 和 GPT-6.1 Sol，6.2 应该仍走得更远，这是他的说法。

### 看到重置卡，或者看到 Banked reset is online，额度是不是已经回满？

没有。领到 banked reset 不等于额度回满，要在过期前自己兑换。帮助中心写明，History 里的 Reset received 只表示卡已发到账户，Reset used 才是已兑换。Tibo 在 2026-11-26 15:26:16（Asia/Shanghai）只写了 Banked reset is online。发放窗口内，符合条件的账户可能分批收到。到期时间以你用量页上的显示为准；BleepingComputer 作者在自己的用量页看到的是大约一个月，不是官方统一截止日期。

### 手机上没有兑换按钮，这张卡怎么办？

移动端没有这个选项。桌面应用走 Settings > Usage & billing，网页打开 Usage settings。Codex CLI 输入 /usage，再选 Redeem reset；CLI 里没有该选项时，改用桌面或网页。从 Usage settings 兑换，要求它覆盖的额度里至少有一项剩余不足 80%。若都在 80% 及以上，会提示暂不需要 reset，卡片留到你使用或过期。

### Enterprise、Edu 和 Go 一定有这张卡吗？普通聊天是不是因此能用 GPT-6.2 了？

Tibo 点名的发放对象是 Go、Plus、Pro 和 Business，没有点名 Enterprise 或 Edu。帮助中心写明，同套餐不保证人人都有。Go 是否用得上 Astra 或 Sol，这篇帖子没有写，能兑换到什么以用量页为准。他这次没有说入口变化。2026 年 11 月 17 日的发布说明点名的是 Plus、Pro、Enterprise 和 Edu 的 Work 与 Codex，没有把 Business 写进那一句。

### 为了领这张卡，要不要取消再重新订阅？

不要为这张卡取消重订。公开说明没有写取消后重订会再得到一张。兑换可能改变下一次刷新时间，但不改变订阅扣款日，以用量页上的下次刷新时间为准。full banked reset 不会永久提高套餐上限，也不等于增加额度点数。免费的 banked reset 和 automatic reset 是酌情促销，不保证一定有，也不保证时间表。

## 信息来源

给读者用的钟点都标明 Asia/Shanghai。原始时间戳保留 UTC，或来源页面自己标的时区。每条下面是核对时要看的那一句。

- Thibault “Tibo” Sottiaux（@thsottiaux，简介写明 Codex & ChatGPT @OpenAI），2026-11-26T02:50:10Z（Asia/Shanghai 2026-11-26 10:50:10）：[说明帖](https://x.com/thsottiaux/status/2125784147889393806)。核对点：完整文字在 note_tweet。包含少计大多数用户的 Astra 与 Sol 用量、错误已修复、相对上周 Astra 快 40% 且 Sol 快 25%、相对 GPT-6 Astra 和 GPT-6.1 Sol 仍应走得更远、其他模型不受影响、不就过去差额收费、向 Go、Plus、Pro 和 Business 各发一张 banked reset。同账号后续帖时间是 2026-11-26T07:26:16Z（Asia/Shanghai 15:26:16），全文只有 Banked reset is online。本文不另编一条状态链接。
- OpenAI 帮助中心：[How resets work in Codex](https://help.openai.com/en/articles/20001498-how-resets-work-in-codex)。核对点：桌面、网页、移动端和 CLI 的兑换入口；Usage settings 的 80% 门槛；桌面助手开关的 10% 门槛；full reset 按 Go、Plus、Business Standard、Pro 100 / 200 / 500 恢复哪些主要 Codex 额度；已是 100% 的项目不重新起算；5 小时与周限额可能只回满不足的一项；不覆盖图片生成、文件上传和普通 Chat Voice；History 中 Reset received 与 Reset used 的差别；刷新时间可能变、扣款日不变；发放窗口内可能分批到达；同套餐不保证人人都有；免费 banked / automatic reset 不保证一定有、也不保证时间表。
- BleepingComputer，Mayank Parmar，2026-11-26：[OpenAI warns GPT-6.2 Astra will hit usage limits 40 percent faster because it fixed a bug](https://www.bleepingcomputer.com/news/artificial-intelligence/openai-warns-gpt-62-astra-will-hit-usage-limits-40-percent-faster-because-it-fixed-a-bug/)。核对点：转述 Tibo 的原话；作者在自己的 ChatGPT 用量页确认新增一张 reset，大约一个月后过期。读者的到期时间以自己的用量页为准。
- heise online，Malte Kirchner：[OpenAI corrects billing error: GPT-6.2 limits arrive sooner](https://www.heise.de/en/news/OpenAI-corrects-billing-error-GPT-6-2-limits-arrive-sooner-11539518.html)。核对点：OpenAI 没有说明具体算错了哪一步、影响了多少用户、是否因地区而异；Tibo 的帖子没有区分 Chat、Work 和 Codex。
- Neowin，Paul Hill，2026-11-26 02:38 EST：[Paying ChatGPT users will hit GPT-6.2 limits faster after OpenAI fixes a launch mistake](https://www.neowin.net/news/paying-chatgpt-users-will-hit-gpt-62-limits-faster-after-openai-fixes-a-launch-mistake/)。核对点：这是用量计数方式的修正，不是订阅标价调整；作者核对定价页，未见因此改价。
- The Decoder，Matthias Bastian，2026-11-26：[GPT-6.2 Astra users now hit limits 40% faster after OpenAI patched a pricing error](https://the-decoder.com/gpt-6-2-astra-users-now-hit-limits-40-faster-after-openai-patched-a-pricing-error/)。核对点：只用来交叉核对 Tibo 已经说出的内容。帖子里没有的说法，本文不采用。
- OpenAI 社区，讨论自 2026 年 11 月 25 日起：[Codex used less of your allowance than intended](https://community.openai.com/t/codex-used-less-of-your-allowance-than-intended/1420514)。核对点：11 月 25 日已有相关讨论，有用户称收到更早的更正邮件。可核对的公开口径以 11 月 26 日 Tibo 的帖为准，不把用户对邮件的转述写成官方原文。
