---
title: "Claude Ship 上线：先观察审批策略，再决定谁能合并"
description: "Anthropic 于 2026 年 11 月 23 日推出 Claude Ship 测试版：Code Review 已正式可用，PR Steward 和 Claude Approvals 进入公测。本文按官方文档说明它能做什么、怎么计费、什么情况下可能无人值守合并，以及小团队这周该先核对的四件事。"
pubDate: 2026-11-24T18:00:00+08:00
topic: ai-tools
tags: ["Claude", "Claude Ship", "代码评审", "GitHub"]
keyword: "Claude Ship 代码评审与合并审批"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "我用的是 Claude Pro 或 Max，现在能用 Claude Ship 吗？"
    a: "仓库级的 Claude Ship，官方产品页和文档都写明面向 Claude Team 和 Enterprise，而且只支持 GitHub 上的仓库。个人在本地用 Claude Code 的 /ship，官方文档把它写成另一条路径：在本地克隆里打开拉取请求、做评审，并处理反馈和失败检查，用量计入你自己的会话，不是组织那套按仓库计费的代理。文档要求 Claude Code v2.1.330 或更高，命令在云端会话里没有，原生 Windows 上也不会开始持续看守。以你更新后的客户端是否出现该命令为准，不要把某条推文写成套餐承诺。"
  - q: "打开之后，会不会出现没有人看过就合并的情况？"
    a: "会，如果分支规则和策略一起放行。官方文档写明：若使用 GitHub 自动合并或合并队列，而策略又不要求非作者的人批准，改动可以在没有人动手的情况下合并。Claude 的批准评审还可以满足「至少一人批准」这类分支规则。官方建议先把 Claude Approvals 放在观察模式，确认判断和你们评审习惯一致后，再强制执行，并在 GitHub 里把 Claude Approvals 设为必需检查。PR Steward 被设计为不批准、不合并，分支保护仍要你们自己加。"
  - q: "观察模式要不要钱？积分活动怎么领？"
    a: "要。官方文档写明观察模式会计费。Claude Approvals 没有基础费用，但策略里的分类器按 token 计费；策略若使用 Claude 的评审，即使在观察模式也会触发一笔计费的 Code Review。Code Review 和 PR Steward 可以设花费上限，但 PR Steward 在你设定之前没有自己的上限。官方文章写：符合条件的 Claude Enterprise 组织可领取至少 1 万美元的 Claude Ship 积分，须在 2027 年 1 月 15 日前领取，领取后 30 天内使用，条款适用。文档指向促销积分条款：积分只抵 usage credit，不抵订阅费、席位费或税。资格、金额和日期以领取页和条款为准，领之前再打开一次。"
  - q: "我们已经在用 Code Review，或者在用 Copilot 评审，要不要马上换成 Ship？"
    a: "不必整站替换。官方说明是：在你加入新代理之前，现有 Code Review 的行为不变；PR Steward 要管理员打开才会运行，Claude Approvals 只在默认分支上有策略文件的仓库里启动。和 Copilot Fusion 或其他评审机器人也可以并存，官方写它可以处理其他评审工具和团队成员的反馈。先在一个仓库试，看误报、返工和花费，再决定扩不扩大。评审分工仍可参考我们之前写的 AI 代码评审流程。"
  - q: "开了零数据保留、HIPAA 或客户管理密钥的公司能用吗？"
    a: "官方文档和产品页都写：对启用了 Zero Data Retention、应用了 HIPAA 配置，或使用客户管理加密密钥的组织，这些代理不可用。是否属于这类配置，以你们管理员在 Anthropic 控制台里的设置为准。"
---

2026 年 11 月 23 日，Anthropic 发布 Claude Ship 测试版。官方文章的日期是当天。官方 X 账号 @ClaudeDevs 在 2026-11-23T20:13:04Z（上海时间 11 月 24 日 04:13）发了介绍帖：Claude 可以评审拉取请求、处理修复，并批准团队策略允许的那些改动。路透社和 TechCrunch 当天都做了报道。

它不是又一个聊天窗口里的模型名字，而是一套围绕 GitHub 拉取请求的代理。Code Review 已经正式可用；新进入公测的是 PR Steward 和 Claude Approvals。目标写得很直白：代码写得有多快，合并就尽量跟得多快。对已经在用 AI 写代码的小团队和独立开发者，这会碰到两个具体问题：谁还有权点合并，以及打开之后账单会怎么走。

本文只核对官方文章、产品页、文档、路透社和 TechCrunch 已经写明的范围，再列出这周可以动手的步骤。模型怎么按任务分工，仍看 [本周 AI 模型按任务分工](/posts/october-ai-model-roles/)。评审职责怎么划，看 [AI 代码评审怎么用才不出事](/posts/ai-code-review-workflow/)。仓库里要不要接编程助手，看 [团队里的 AI 编程助手](/posts/ai-coding-assistant-team-guide/)。

## 11 月 23 日发布了什么

综合官方文章、产品页和文档，已经能核对的范围如下：

- **产品形态**：Claude Ship 由三个代理组成，在拉取请求打开之后接手评审、修复和审批决定。仓库的设置和 GitHub 分支规则，仍然决定什么能合并。官方也写明：它使用人工智能，可能漏掉缺陷、安全漏洞或其他问题。
- **可用范围**：面向 Claude Team 和 Enterprise，仓库要在 GitHub 上。对启用了 Zero Data Retention、应用了 HIPAA 配置，或使用客户管理加密密钥的组织，不可用。
- **成熟度**：Code Review 正式可用。PR Steward 和 Claude Approvals 处于公开测试。
- **两种用法**：开发者可以在 Claude Code 里对自家改动运行 `/ship`。管理员可以按仓库打开整套代理，不必每次手动调用该命令。文档把本地的 `/ship`、`/steward` 和组织级、按仓库计费的 Claude Ship 分开写。
- **积分活动**：官方文章写，符合条件的 Claude Enterprise 组织可领取至少 1 万美元 Claude Ship 积分，须在 2027 年 1 月 15 日前领取，领取后 30 天内使用，条款适用。文档没有在概览页重复金额，而是指向促销积分条款。

Claude Code 团队的 Boris Cherny 在同一条发布线程里写：他每天都在用，已经无法想象离开它再发代码；并写 Anyone can use /ship，Team 或 Enterprise 的管理员则可以按 GitHub 仓库打开 Claude Ship。后一句是他的推荐用法，不是产品页上的套餐列表。套餐和限制以官网和文档为准。

## 三件套分别做什么，哪一件会改合并权

先把三件事分开看。只有第三件会直接碰到「谁来批准」。

**Code Review** 已经正式可用。它对照仓库上下文看这次改动，查找逻辑错误、安全问题和坏掉的边界情况，并把发现写成拉取请求上的评论。官方文章写，可以按仓库选择 Quick、Standard 或 Deep。产品页写，发现会标成 Important、Nit 或 Pre-existing，也可以用 `REVIEW.md` 调整要标记什么。官方举了自家 Claude Code 团队的例子：在 Claude 的评审只是更宽流程中的一层时，2026 年 6 月到 9 月，已合并的拉取请求增加了一倍以上，被回退的比例下降了 40% 以上。这是他们自己团队、且评审只是其中一层时的口径，不是你仓库会得到的通过率或回退率。

**PR Steward** 负责把红色的拉取请求拉回绿色。它处理失败的持续集成检查、合并冲突，以及来自 Code Review、其他评审工具或团队成员的反馈，并把修复推上去。官方反复强调：它被设计为不批准、不合并。每次推送后，它会评论改了什么、如何撤销。开发者可以评论 `@claude` 加上指令来引导，或用 `@claude stop` 让它停下。文档建议先把启动方式设成 Manual（评论 `@claude steward`），团队信任后再改为默认开启。管理员还可以限制它为哪些作者工作。单个组织最多可在 256 个仓库里打开它。

**Claude Approvals** 才是会改合并权的那一层。团队把策略写成仓库默认分支上的 `.claude/approvals.yml`。文件就位后，它开始作为 GitHub 上的检查运行，报告还需要谁批准。策略可以规定某条路径要几个人批准、Claude 是否可以自己批准，也可以加入你们自己用自然语言写的分类器。官方把它比作更聪明的 CODEOWNERS。对大多数客户，官方建议先开观察模式：检查会显示策略将会如何决定，但 Claude 不会批准，检查通常视为通过；等你们信任了，再把它设为强制，并在分支保护里要求这项检查。

这里有几条必须单独看的限制，都来自官方文档，不是推断：

- 观察模式会计费。策略里如果用 Claude 的评审作条件，即使在观察模式，也会在打开和每次推送时触发计费的 Code Review。
- 策略文件一旦出现在默认分支上，自动 Code Review 的范围会变：如果匹配的规则没有写上 `claude/code_review`，自动评审通常会停。要保留，就在规则里写上它。
- 若使用 GitHub 自动合并或合并队列，而策略又不要求一个非作者的人批准，改动可以在没有人动手的情况下合并。Claude 的批准评审，也可以满足 GitHub「需要一次批准」的分支规则。
- 直接推到默认分支不会经过这项检查，文档要求在 GitHub 里对默认分支强制走拉取请求。
- 拉取请求的文本可以影响分类器的判断；如果策略的条件读的是分类器结果，被带偏的答案可能降低审批要求。
- 默认的 `mode` 是强制执行。文件里如果没有 `mode: observe` 这一行，策略会被强制执行。

官方给了两份入门策略，都从观察模式开始：一份是在 Code Review 通过时允许 Claude 批准、通常不再需要另一个人；另一份是每次改动都要求两个人，Claude 不批准。涉及 `.claude/` 目录的改动，两份入门策略都要求两个人。具体字段以文档里的示例为准，不要只按记忆抄一份旧文件。

## 计费和额度：打开之前先设上限

Claude Ship 按 token / 用量积分计费，和套餐内含的用量是分开的。打开它，就可能增加组织的费用。费用取决于覆盖多少拉取请求、请求有多大、评审级别、评审多久运行一次，以及 PR Steward 做了多少工作。管理员可以为 Code Review 和 PR Steward 设置花费上限。

按文档可以先记住这几句：

- 各代理通过组织的 usage credits 计费。即便在「Usage」里关掉 usage credits，已经打开的代理仍会继续运行并计费；要停掉费用，需要按文档的顺序关闭 Claude Ship。
- Claude Approvals 没有基础费用。分类器按 token 计费。策略若使用 Claude 的评审，会触发计费的 Code Review，观察模式也一样。
- PR Steward 在你设定之前，没有自己的花费上限。文档的推荐顺序是：先按仓库打开，先用 Manual，再到 Usage 页设置月度上限，再给该仓库设花费帽。达到月度上限或组织用量上限时，它会暂停，等可以继续付费后再在下一次推送或评论时恢复；达到仓库花费帽时，它会在这条拉取请求上停下来，花费可能在停下前超过该帽。
- 本地 `/ship` 计入普通的 Claude Code 用量，不是组织那套按仓库计费的代理。
- 符合条件的 Enterprise 积分活动，官方文章写了「至少 1 万美元」、领取截止日 2027 年 1 月 15 日、领取后 30 天内使用。促销积分条款还写：积分只抵 usage credit，不抵订阅费、席位费或税；无现金价值、不可转让；若无另行说明，取消订阅或席位、降到免费计划，或账户被暂停、终止，积分会被没收。资格和金额以领取页与条款为准，本文不把「至少 1 万美元」写成每个 Enterprise 账户都会到账。

账单以控制台当天的数字为准。改预算前，再打开 Organization settings > Usage 看一次。

## 为什么这跟用 AI 写代码的人有关

过去一年，阻碍发版的常常不是「写不出来」，而是写完之后的评审、修检查和等人点批准。官方文章把这个循环写得很清楚：你开始做下一件事，评审回来了，你停下来改旧代码，再等一轮，然后再去找人批准。团队里的人用代理写的代码越多，这个等待就越容易变成瓶颈。

Claude Ship 的新意，不在于「AI 可以看 diff」——这类能力已经有了，本站也写过 [AI 代码评审的流程](/posts/ai-code-review-workflow/)，GitHub 自己的评审能力则写在 [Copilot Fusion 正式可用](/posts/github-copilot-fusion-ga/) 里。新的是第三步：团队可以用仓库里的策略，把一部分常规改动的批准交给模型。TechCrunch 当天的报道也把自动批准视为这次更值得注意的部分。

这意味着两件具体的事。第一，独立开发者和还没有 Team 或 Enterprise 的人，不要指望这周就能在整个仓库上自动跑这套代理；先看客户端里的 `/ship` 是否出现，以及你对这条分支有没有合并权。第二，已经有 Team 或 Enterprise、并且代码在 GitHub 上的小团队，真正要做的不是「全公司打开」，而是先选定一个仓库，先观察，先设花费上限，并检查自动合并和分支保护会不会在没有人过目时放行。

官方自己的例子也值得用这个标准看。文章提到，Claude Code 团队的产品经理可以在阅读反馈后，让 Claude 打开拉取请求，然后由 Ship 走完评审、修复和审批；其中一个文档修正在当天晚上合并。这是他们内部、且还有文档评审人员签字的流程，不是你把策略文件一贴就会得到的速度。

## 这周可以做的四件事

下面四步都可以在这周做完。前两步不要求改组织设置；后两步是给管理员的。

### 1. 先确认套餐、托管位置和限制

打开 Anthropic 的组织设置，核对三件事：是不是 Team 或 Enterprise；仓库是不是在 GitHub 上；有没有 Zero Data Retention、HIPAA 配置或客户管理密钥。后三项只要占一项，官方就写这些代理不可用。没有 GitHub、或代码在其他托管平台上，仓库级 Ship 按官网不在范围内。本地 `/ship` 在非 GitHub 仓库里不会打开拉取请求，但文档写它仍可以评审你的改动。

把核对结果写成三行，发给会改分支规则的人，避免有人只看到宣传句就在生产仓库上打开强制批准。

### 2. 个人先更新 Claude Code，在一条自己的拉取请求上试 `/ship`

文档要求 Claude Code v2.1.330 或更高、GitHub CLI 2.63 或更高、git 2.38 或更高。在仓库的本地克隆里运行，不要在云端会话里找这两个命令。文档写：`/ship` 没有确认提示，按回车后可以提交、推送并打开拉取请求；提交前和推送前会短暂出现可以按 Esc 取消的提示，若你不做任何事，几秒后会继续。公共仓库、已有拉取请求、文件名像密钥的未提交文件，它可能不提交未提交的改动。草稿、其他目标分支、拉取请求模板，以及 GitHub Enterprise 或来自 fork 的拉取请求，文档建议你自己先打开拉取请求，再运行该命令。

还有一条安全警告必须单独看：持续看守会在你的电脑上、用你的凭据运行程序。只在你信任所有能向目标分支合并、或能向你的分支推送的人时再留下看守。不要把含密钥的文件交给它提交；文档写它会按文件名查找，例如 `.env`，但你仍要自己检查文件内容。一条拉取请求试下来，记下它改了什么、检查是否被修、你还要不要再看一眼，再决定要不要让管理员在仓库里打开代理。

### 3. 管理员只选一个仓库，审批先放在观察模式

官方推荐的顺序是：先打开 Code Review，再打开 PR Steward（先 Manual），再添加审批策略并先观察。不要三个开关一起按。先设花费上限，再扩大范围。策略文件要用单独的拉取请求加到默认分支；文档写，等 Claude 评论该文件有效后再合并，然后另开一条拉取请求，看 Claude Approvals 检查是否出现。

观察期间只做对照，不改合并权：策略的判断和你们评审人员是否一致，误报多不多，每次推送多出来的 Code Review 花了多少。对得上了，再去掉 `mode: observe`，在 GitHub 里把这项检查设为必需，并用一条改 `.claude/` 的拉取请求确认它真的会拦住合并。文档写，从观察切到强制后，要对仍开放的拉取请求重新运行检查，再把它们放进合并队列。

### 4. 核对分支保护，避免无人值守合并

在打开强制批准或自动合并之前，按文档核对下面几项：

- 默认分支要求走拉取请求，禁止直接推送。
- 至少要求一次批准，并在有新推送时作废旧批准，或要求批准最新一次推送。
- Claude GitHub 应用不要放进规则集的旁路名单。
- 如果策略允许 Claude 批准，同时不要再让 GitHub 额外要求过多人工批准，否则检查通过后仍可能被拦住；需要更多人时，把人数写在策略的 seats 里。
- 使用自动合并或合并队列时，在策略里要求一个非作者的人批准，并把 Claude Approvals 设为必需检查。
- 谁能改 `.claude/approvals.yml`，就等于谁能放宽审批。把这个目录当成敏感路径。

这四步做完，你们仍然可以继续用现有的评审机器人。官方写，不必一次启用全部代理；依赖关系只有一条：用到 Claude 评审的审批策略，也会在该仓库运行 Code Review。

## 官方数字不要直接当成你的结果

可以引用、但不能直接写进你的考核表的，是这些：

- Claude Code 团队 6 月到 9 月「已合并拉取请求增加一倍以上、回退比例下降 40% 以上」，前提是 Claude 的评审只是更宽流程中的一层。
- 官方文章里产品经理当天晚上合并文档修正的例子，是他们内部流程，还包含文档评审人员签字。
- 「至少 1 万美元」是符合条件的 Enterprise 组织可领取的促销积分下限，不是你的账户余额，也不是 Team 计划的承诺。

要不要扩大到第二个仓库，用你们自己的三条记录决定：合并前还要不要人看、返工有没有增加、Usage 页上的花费有没有超出你们设的上限。看不出差别，就停在观察模式，不要为了新功能改生产分支规则。

## 常见问题

### 我用的是 Claude Pro 或 Max，现在能用 Claude Ship 吗？

仓库级的 Claude Ship，官方产品页和文档都写明面向 Claude Team 和 Enterprise，而且只支持 GitHub 上的仓库。个人在本地用 Claude Code 的 `/ship`，官方文档把它写成另一条路径：在本地克隆里打开拉取请求、做评审，并处理反馈和失败检查，用量计入你自己的会话，不是组织那套按仓库计费的代理。文档要求 Claude Code v2.1.330 或更高，命令在云端会话里没有，原生 Windows 上也不会开始持续看守。以你更新后的客户端是否出现该命令为准，不要把某条推文写成套餐承诺。

### 打开之后，会不会出现没有人看过就合并的情况？

会，如果分支规则和策略一起放行。官方文档写明：若使用 GitHub 自动合并或合并队列，而策略又不要求非作者的人批准，改动可以在没有人动手的情况下合并。Claude 的批准评审还可以满足「至少一人批准」这类分支规则。官方建议先把 Claude Approvals 放在观察模式，确认判断和你们评审习惯一致后，再强制执行，并在 GitHub 里把 Claude Approvals 设为必需检查。PR Steward 被设计为不批准、不合并，分支保护仍要你们自己加。

### 观察模式要不要钱？积分活动怎么领？

要。官方文档写明观察模式会计费。Claude Approvals 没有基础费用，但策略里的分类器按 token 计费；策略若使用 Claude 的评审，即使在观察模式也会触发一笔计费的 Code Review。Code Review 和 PR Steward 可以设花费上限，但 PR Steward 在你设定之前没有自己的上限。官方文章写：符合条件的 Claude Enterprise 组织可领取至少 1 万美元的 Claude Ship 积分，须在 2027 年 1 月 15 日前领取，领取后 30 天内使用，条款适用。文档指向促销积分条款：积分只抵 usage credit，不抵订阅费、席位费或税。资格、金额和日期以领取页和条款为准，领之前再打开一次。

### 我们已经在用 Code Review，或者在用 Copilot 评审，要不要马上换成 Ship？

不必整站替换。官方说明是：在你加入新代理之前，现有 Code Review 的行为不变；PR Steward 要管理员打开才会运行，Claude Approvals 只在默认分支上有策略文件的仓库里启动。和 Copilot Fusion 或其他评审机器人也可以并存，官方写它可以处理其他评审工具和团队成员的反馈。先在一个仓库试，看误报、返工和花费，再决定扩不扩大。评审分工仍可参考 [AI 代码评审怎么用才不出事](/posts/ai-code-review-workflow/)。

### 开了零数据保留、HIPAA 或客户管理密钥的公司能用吗？

官方文档和产品页都写：对启用了 Zero Data Retention、应用了 HIPAA 配置，或使用客户管理加密密钥的组织，这些代理不可用。是否属于这类配置，以你们管理员在 Anthropic 控制台里的设置为准。

## 信息来源

- Anthropic 官方文章（2026-11-23）：[Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship)。发布日、三个代理的分工、Team 和 Enterprise 与 GitHub 范围、积分活动的金额与日期、Claude Code 团队 6 月至 9 月的内部口径，以及 `/ship` 当天起在 Claude Code 和桌面应用放量，以这篇为准。
- 产品页：[Claude Ship](https://claude.com/product/claude-ship)。能力说明、按代理逐步启用的建议、计费口径、与 Claude Code 的区别，以及 Zero Data Retention、HIPAA、客户管理密钥不可用，以该页为准。
- 官方文档：[Claude Ship](https://code.claude.com/docs/en/claude-ship)、[Set up PR Steward](https://code.claude.com/docs/en/pr-steward-setup)、[Set up Claude Approvals](https://code.claude.com/docs/en/approvals-setup)、[Claude Approvals and your GitHub rules](https://code.claude.com/docs/en/approvals-github-rules)、[Get a pull request ready with /ship and /steward](https://code.claude.com/docs/en/ship-command)。观察模式计费、花费上限、自动合并与合并队列、分类器可能被拉取请求文本影响、本地命令的版本要求和安全警告，以这些页面为准。
- 促销积分条款：[Claude Promotional Credit Offer Terms](https://assets.claude.com/8d3039873a8e1adae8b98e487f696b3a524c437b.pdf)（Effective—May 19, 2026）。积分只抵 usage credit、不抵订阅费和席位费、取消或降级可能被没收，以这份条款为准。具体金额和领取截止日期以官方文章与领取页为准。
- 官方 X：[@ClaudeDevs 介绍帖](https://x.com/ClaudeDevs/status/2124959436640858475)（2026-11-23T20:13:04Z）及随后两条；[Boris Cherny 的跟帖](https://x.com/bcherny/status/2124961485801836573)（2026-11-23T20:21:12Z 起）。
- 路透社（2026-11-23）：[Anthropic launches Claude Ship to help developers ship code faster](https://www.investing.com/news/stock-market-news/anthropic-launches-claude-ship-to-help-developers-ship-code-faster-5046300)。用于第二家独立通讯社确认当天发布。
- TechCrunch，Sarah Perez（2026-11-23，2:05 PM PST）：[Anthropic launches Claude Ship, letting AI agents review, fix, and approve code changes](https://techcrunch.com/2026/11/23/anthropic-launches-claude-ship-letting-ai-agents-review-fix-and-approve-code-changes/)。

三个代理的能力、可用范围、计费和安全限制以官方文章、产品页和文档为准。路透社和 TechCrunch 只用来确认 11 月 23 日的发布，不用来补充官方没有写的数字或功能。Boris Cherny 的句子是他在官方发布线程里的说明，不是套餐承诺。
