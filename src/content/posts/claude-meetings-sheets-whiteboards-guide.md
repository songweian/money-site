---
title: "Claude Meetings 上线：会议、表格和白板怎么试"
description: "2026年11月10日，Anthropic 在旧金山发布 Claude Meetings、Whiteboards 和 Sheets，并把 Claude Data 正式开放。本文按套餐写清谁能用、外部客人怎么处理，并给出 30 分钟试跑。"
pubDate: 2026-11-11T08:00:00+08:00
topic: ai-tools
tags: ["Claude", "会议", "表格", "白板"]
keyword: "Claude Meetings 实操"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "个人付费套餐能用 Claude Meetings 吗？"
    a: "按 11 月 10 日的报道，Claude Meetings 是测试版，只面向 Team 和 Enterprise。Whiteboards 和 Sheets 在全部付费套餐上以测试版提供，网页、桌面和手机都能用。Claude Data 对付费套餐正式可用，使用前要先接上数据连接器。个人付费账号这周先试白板和表格。"
  - q: "有外部客户在会上，Claude 会加入吗？"
    a: "默认不留下。Engadget 引 Anthropic：除非管理员允许，它不会加入有外部客人的通话；外部客人中途进来，它会离开。TechCrunch 写的是同一条：未经管理员授权不加入有外部客人的通话，外部客人加入后会自动离开。客户会和供应商会先保持原来的纪要方式。"
  - q: "Claude Sheets 现在能换掉 Excel 吗？"
    a: "这周把它当初稿。官方写目前是简单表格功能，后续还在加。它能生成多工作表、公式、格式和下拉，改单元格时会说明改了什么。需要完整的 Excel 能力时，导出 .xlsx 或 CSV，或改用 Claude for Excel。透视表、宏和已经在跑的财务模型继续留在原来的文件里，汇总交给公式。"
  - q: "企业版要不要把白板、表格和 Data 一起打开？"
    a: "按官方的管理员说明分开看。Team 上 Whiteboards、Sheets、Data 三项默认开启。Enterprise 上 Whiteboards 和 Sheets 默认关闭；Claude Data 在 2026 年 11 月 19 日默认打开。入口是 Organization settings 里的 Artifacts，随时可以改。11 月 19 日前后都看这个开关的当前状态，再决定是否只给一个小组试点。"
  - q: "这些功能要另外加价吗？"
    a: "这次公告没有为 Meetings、Whiteboards、Sheets 或 Data 公布新价格，也没有公布新的用量数字。Meetings 在 Team 和 Enterprise 的测试版里，白板和表格在付费套餐的测试版里，Data 对付费套餐正式开放；Data 里的认证查询和实时共享仍是测试。会不会占用现有对话用量，公告没有写。试跑前后各看一次用量页。"
---

2026 年 11 月 10 日，星期二，Anthropic 在旧金山的活动上推出一组办公工具：Claude Meetings、Claude Whiteboards、Claude Sheets，并把 10 月还在测试的 Claude Dashboards 改名为 Claude Data，对付费套餐正式开放。The Verge 把它写成 Anthropic 自己的 AI 办公套件，和已经有的 Claude Docs、Slides、Design、Motion 放在一起。Engadget 的角度是正面去碰 Google 和 Microsoft，并把 Claude Meetings 拿来对照 Otter.ai 这类会议助手，以及 Google Meet 里已经有的 Gemini。

对还在「聊天窗口里写完，再贴进表格和白板」的人，这次要看的是工作面：会议、白板、表格和数据看板可以留在 Claude 里继续改，不必每次把结果拷走。Axios 采访了知识工作产品负责人 Nicholas Lin。他说内部已经测了大约两个月，Claude 现在几乎参加了公司全部会议；目前它大体上还是等你吩咐，公司预期以后会更主动。第一周适合用一场内部会和一张不含客户数据的表来试，不适合把全公司的会都接进去。

这次公告没有发布新模型，也没有为这些功能单独标价。模型仍按任务分工，难的技术活和日常模型怎么选，见 [Claude Fable 5.2：日常仍用 Opus](/posts/claude-fable-5-2-guide/)。下面只写 11 月 10 日已经公开的范围。

## 这次具体上线了什么

四件东西的成熟度不一样。Meetings、Whiteboards、Sheets 标的是 beta。Data 是正式可用，里面有两项仍标着 beta。

### Claude Meetings：进会的是一个看得见的参会者

TechCrunch 和 Engadget 写的是同一件事：Claude 以可见参会者加入视频通话，在会议聊天里发一条提示，说明自己在场。它跟上对话，可以起草正在讨论的计划，在白板上拉出时间线，在会议聊天里回答问题，并从已经连接的工作应用里取信息。TechCrunch 举的例子是去年的数字。会结束后，纪要、待办，以及它在会上做出的材料，可以在 claude.ai 里继续看。Engadget 还写，你可以事后就这些计划和待办继续问它。

Lin 对 Axios 补充了会上能发生的事：参会者手头没有的资料，它可以调出来；大家还在说话时，它能把幻灯片和其他材料做出来，并记下会后要跟的待办。同一篇采访把边界说清楚了：现在它大体上等人开口，再去做。你不点名要时间线、要查数、要一页材料，就不要指望它自己把会主持完。

开放范围有三条硬边界：

- 测试版，只面向 Team 和 Enterprise。个人付费套餐不在这句名单里。
- 上线时只确认了 Google Meet。Engadget 的说法是先在 Google Meet 提供，并指出 Meet 里已经有 Gemini 的会议助手。TechCrunch 紧接着写了一句 “with support for additional plans expected to follow”，没有点名下一家会议软件，也没有说个人套餐会开放。plans 既可以理解成更多会议产品，也可以理解成更多套餐。在官方点名之前，试点只排 Google Meet。
- 外部客人。Engadget 引 Anthropic 的原话方向是：除非管理员允许，它不会加入有外部客人的通话；如果还是有外部客人加入，它会离开。TechCrunch 写的是「未经管理员授权不加入，外部客人加入后自动离开」。

TechCrunch 还写，Whiteboards 可以在 Claude Meetings 里面用，人还在说话时，板就在往上长。

### Claude Whiteboards：把说乱的计划收成一块板

官方页面把白板定义成一块和 Claude 一起头脑风暴的共享板，全部付费套餐可用，网页、桌面、手机都能开，目前是 beta。你可以出声讲一个还很乱的计划，它收成一块带时间线、负责人和日期的板，团队可以同时改。回顾会的例子是：每人把自己的便签贴上去，Claude 按主题归组，再按人起草待办。想追问某一块时，拖一个框把那一块圈起来再问。讨论结束后，它可以把板变成文档或幻灯片，也可以送到 Lucid、Miro，或 Zoho 的 Vani，在那边接着做。

Engadget 复述了同一条用法：大家一起工作时，Claude 按主题把想法归到一起，并为每个人起草待办。它还引了公司的说法：很多人已经在用 Claude 做头脑风暴，要把结果交给同事，以前得复制粘贴到别的地方。

### Claude Sheets：先出一张能改的表

官方写，Claude 可以根据一句提示生成表格，例子就是活动追踪表和招聘预算。表里可以有多个工作表、公式、格式和下拉。它直接改单元格，并且把每一处新改动说明出来，方便你核对。表可以分享给同事，人和 Claude 一起改。

同一页把能力边界写在下一句：目前是简单的表格功能，他们还在加更多。需要完整的 Excel 时，把文件导出成 .xlsx 或 CSV，或者使用 Claude for Excel。也可以把工作继续放到合作方的工具里，页面点名的是 Airtable、Asana、monday.com 和 Smartsheet。Engadget 另外写到，生成的文件可以导出到 Excel，并且支持 Anthropic 的 Google Workspace 插件。导出格式以官方页面的 .xlsx、CSV 和 Claude for Excel 为准；插件在不在你的账号里，打开界面看一眼。

Sheets 同样是 beta，全部付费套餐，网页、桌面、手机。TechCrunch 写它和团队一起改同一张表，每次改动都会被标出来。

### Claude Data：10 月的仪表盘换了名字，正式开放

官方说明：Claude Dashboards 10 月以 beta 上线，用来对 Amazon Redshift、BigQuery、ClickHouse 这类工具里的公司数据提问。11 月 10 日起以 Claude Data 的名字对付费套餐正式可用。改名的原因写在页面上：公司用数据的方式比仪表盘更宽。使用前需要数据连接器，例如数仓或 CRM。页面列出的合作方还有 Amplitude、Mixpanel、Omni、PostHog 和 Sigma。

正式版页面里，认证查询（certified queries）和实时共享（live sharing）仍是 beta。其余已经写明的用法包括：

- 数据团队可以把大家该用的查询认证下来，避免几块仪表盘各说各的数。用了这些指标的图表会带一个 “certified” 标记。
- 可以让 Claude 根据指标起草数据故事，或做成有旁白的视频，分享之前由人看过。
- 实时共享打开后，同事即使没有连接器权限，打开分享出去的仪表盘也能看到当时的数字。他们看到的是你已经批准的查询结果，不能借你的权限去跑其他查询。
- 支持设计系统，方便和现有的视觉规范对齐。
- 以前每次打开仪表盘都会重新加载。现在可以缓存，并且按每块仪表盘单独设置刷新节奏。
- 有变更记录，能看到谁改过，也能回滚到某一版。

没有连接器时，Data 没有可问的公司数据。第一周不要为了试这个功能，把生产数仓的写权限接上去。

### 连接器可以打开完整应用

官方写，从这一天起，交互式连接器可以在对话旁边或全屏打开成完整应用。页面举的例子是 Adobe、Atlassian、Box 和 Notion。你可以自己在里面操作，也可以让 Claude 和你一起改。

Axios 的名单是 Adobe、Atlassian、HubSpot，并写明不必离开 Claude。TechCrunch、The Verge、Engadget 也都写了 HubSpot。The Verge 举的具体例子是 Claude 里的 Adobe PDF 编辑器，以及 HubSpot 的营销活动追踪。Engadget 写这次是从小一批合作伙伴开始，点名 Adobe、Atlassian 和 HubSpot。The Verge 和 Engadget 都提到 Marketplace 里已经有 9000 多个插件或连接器。那是市场的存量，不是「9000 个当天都能以完整应用打开」。

| 产品 | 状态 | 谁能用 | 这周先记住的限制 |
| --- | --- | --- | --- |
| Claude Meetings | beta | Team、Enterprise | 上线只确认 Google Meet；聊天里会有参会提示；外部客人默认不加入，中途加入它会离开 |
| Claude Whiteboards | beta | 全部付费套餐；网页、桌面、手机 | 可变成文档或幻灯片，也可送到 Lucid、Miro、Vani；可在 Meetings 里边说边长 |
| Claude Sheets | beta | 全部付费套餐；网页、桌面、手机 | 官方称目前是简单表格功能；完整 Excel 走导出或 Claude for Excel |
| Claude Data | 正式可用 | 全部付费套餐；网页、桌面、手机 | 必须有连接器；认证查询和实时共享仍是 beta |
| 交互式连接器 | 当天扩大 | 以你账号里已经接上的合作方为准 | 官方点名 Adobe、Atlassian、Box、Notion；报道另写 HubSpot |

## 对正在用 AI 办公的人意味着什么

聊天窗口还在，新增的是它能不能待在会议、板、表和数据旁边。小团队最容易做错的，是看见「办公套件」四个字，就把 Excel、Miro 和现有的会议记录一起停掉。11 月 10 日的材料支持的是「先在边界内试一块」，不是「整套换掉」。

**套餐先分开。** 白板、表格、Data 写的是付费套餐。会议功能写的是 Team 和 Enterprise 的测试版。个人在付费账号里可以做一张表、一块板；要把 Claude 拉进 Google Meet，先确认公司买的是不是后两种。免费账号不在「全部付费套餐」这句里。

**测试版按测试版用。** Meetings、Whiteboards、Sheets 都标着 beta。Data 虽然正式开放，认证查询和实时共享仍是 beta。beta 期间界面、入口和默认开关都可能改。试点用一份丢了也不影响客户的材料，主预算文件和对外纪要先留副本。

**会议软件先只排 Google Meet。** 内部如果主要用别的视频工具，这周的会议试点就先不做。不要把 TechCrunch 那句 additional plans 排进项目计划，它没有给出名字和日期。

**Sheets 出结构，Excel 留精确和复杂计算。** 官方自己把「简单表格功能」和「完整 Excel」分成两条路。活动追踪、招聘预算这种从零开始的表，适合让它生成工作表、下拉和公式。已经有透视、宏、跨文件引用的模型，继续在 Excel 里算。导出之后，用公式对一下总行数和汇总，这个习惯和 [用 AI 整理表格](/posts/ai-spreadsheet-data-cleaning/) 是同一条：模型负责把表搭整齐，加减乘除交给单元格。

**会后的待办仍然要能对上原话。** 白板和会议功能都会起草负责人、日期和行动项。公告没有承诺「没人说过的日期它也不会补」。沿用 [会议纪要提示词](/posts/meeting-notes-prompt/) 里的规则：只有原话里出现的人和日期能落进日历，其余标成待确认。

**它还不会自己主持会议。** 想要一个会盯着邮箱和日历、先把要紧事推过来的代理，那是 10 月的 Claude Duet，范围和额度是另一套说明，见 [Claude Duet 该交给它哪些活](/posts/claude-duet-proactive-agent-guide/)。11 月这场的会议功能，按 Axios 的采访，当前是等人吩咐。两套权限不要在同一周一起放到最大。

## 管理员在打开之前核对的清单

官方「开始使用」一节只给了 Whiteboards、Sheets、Data 的默认值，入口是 Organization settings > Artifacts。Meetings 没有出现在这句默认开关里。外部客人那条是单独的规则。

**Team 套餐**

1. 打开 Organization settings > Artifacts，确认 Whiteboards、Sheets、Data 是否仍是默认开启。不希望全员当天就能用的，先关掉，再交给一个小组。
2. 确认 Data 有没有可用的连接器。没有数仓或 CRM 连接器时，开关打开也问不出公司数字。
3. 如果要试 Meetings，先写下一句：有外部客人的会，管理员是否允许 Claude 加入。没写下来之前，只排没有外部客人的内部 Google Meet。
4. 指定一个人看试跑前后的用量。公告没有写这些功能是否另计额度，用量页上的数字才算数。已有高价套餐怎么读用量，可以参考 [Claude Ultra 与 ChatGPT Pro 的对账](/posts/claude-ultra-chatgpt-pro-quota-change/)，但那篇对的是 10 月底的额度说明，不能当成 11 月 10 日又改了价。

**Enterprise 套餐**

1. Whiteboards 和 Sheets 默认关闭。要试点时，在 Artifacts 里只给参加试点的组织打开，而不是顺手全开。
2. 官方写 Claude Data 在 2026 年 11 月 19 日默认打开。11 月 11 日这篇发布时还没到那天。19 日当天以及之后，仍回到 Artifacts 看开关的实际状态，页面也写了你可以随时改。
3. 连接器、认证查询和实时共享分开批。认证查询仍是 beta，正式指标以数据团队点过头的查询为准。实时共享的查看者看到的是已批准查询的结果。
4. Meetings 同样先写外部客人规则，再约第一场内部会。客户会不作为第一场。

## 用 30 分钟做完一次试跑

下面这一段不需要开会，个人付费和团队套餐都能做。材料用虚构活动，或已经可以公开的活动名。不要放客户名单、真实报价、未公开的薪酬。

| 时间 | 做什么 | 做完的标志 |
| --- | --- | --- |
| 0–5 分钟 | 写下套餐名称。管理员打开 Organization settings > Artifacts，记下 Whiteboards、Sheets、Data 三个开关。企业版对照 11 月 19 日那条 Data 默认值 | 三行记录：套餐、三个开关、这场不用客户数据 |
| 5–17 分钟 | 把下一节的活动追踪提示词贴进去，生成一张表 | 有多个工作表、下拉和至少一条汇总公式；每一处改动有一句说明 |
| 17–27 分钟 | 把回顾白板提示词贴进去，用三到五条去掉客户名的便签 | 每个主题都能指回一条便签；没有便签里没写过的人和日期 |
| 27–30 分钟 | 导出 .xlsx 或 CSV，用现有表格软件打开。写三行结论：表留不留、板留不留、会议功能这周排不排 | 三行写进团队文档。写不出结论，就先不要开放给全员 |

三行都是「可以留下」，并且账号是 Team 或 Enterprise 时，另约一场 20 分钟的内部会，不塞进这 30 分钟里。参会人全部是内部同事，会议软件用 Google Meet。公告没有描述邀请按钮的位置，按你账号里实际给出的入口把 Claude 加进去。开场只确认一件事：会议聊天里出现了它的参会提示。会上只交代两句：把正在讨论的计划整理成带负责人和日期的时间线；有人要去年的数字时，从已经接好的工作应用里查。会后到 claude.ai 核对纪要、待办和材料，能对上原话的再进日历。

试跑用一张小表就够，不必上系统：日期、用了哪个功能、人是否采纳、返工大概几分钟、有没有编出不存在的人或日期。没有这张表，下周的讨论会变成「感觉它更懂我们的会」。

## 两个可以直接粘贴的提示词

提示词是给试跑用的。官方演示了「活动追踪表」和「回顾会按主题归组」，没有提供下面这两段原文。方括号里的内容换成你的，名单和数字不要让它发挥。

### 活动追踪表

```text
请做一张活动追踪表。只使用我写明的事实，没有给出的数字留空。

活动：春季邮件课
渠道只允许这三项，做成下拉：邮件、官网、社交
负责人只允许：林可、周宁。名单外写成「待指定」
预算上限：8000 元。花费列全部留空，不要填估计值

请做成两个工作表：
1. 「排期」：活动名、渠道（下拉）、负责人（下拉）、开始日、结束日、状态（下拉：未开始、进行中、完成）
2. 「预算」：项目、金额。用公式汇总金额，并标出是否超过 8000

日期和金额用统一格式。每改一处单元格，用一句话说明改了哪里。不确定的格子保持空白。
```

生成之后做三次检查：汇总是不是公式，而不是它口算后打上去的一个数；下拉里有没有多出来的渠道；花费列是不是空的。导出到 .xlsx 或 CSV 后再看公式还在不在。官方写了需要完整 Excel 时走导出或 Claude for Excel，这一步就是在用它自己划的那条界。

### 回顾白板

```text
下面是回顾会上的便签。请做成一块白板，并遵守这些限制：

1. 按主题归组。每个主题至少对应一条原话，不要新增没有便签支撑的主题。
2. 按人起草待办。负责人只能是便签里出现的名字。
3. 只有原话里写了日期或星期的，才写上日期。没写的标成「待确认」。
4. 最后用五条以内的话说明：哪些待办可以对上原话，哪些还要再问一句。

便签：
- 林可：落地页文案改了三轮还没定稿
- 周宁：报名表有人填了重复手机号，本周五前清完
- 林可：欢迎邮件的主题行点击很低
```

如果它写出「下周一前定稿」或发明第三个人，这条提示词就留在文档里，正式回顾继续要求每条待办回指原话。圈选白板上一块再追问，是官方写明的用法：例如只框住「报名表」那一组，问清「本周五」指的是哪一天，而不是让它把整块板重新发挥一遍。

板如果要交给已经在用 Miro、Lucid 或 Vani 的同事，用官方写的送达方式把板带过去，在原来的工具里继续改所有权和权限。Claude 里的一块板，不会自动继承你在 Miro 里已经设好的访客规则。

## 和 Excel、Miro、Otter 怎么分工

下表只根据 11 月 10 日公开的能力来选试点，不比较谁的模型分数更高。The Verge 还提到，Gemini 可以进会并做实时笔记，ChatGPT 在部分情况下可以用它的 record 功能做类似的事。你已经跑顺的那一种，不必因为同一周有新产品就停掉。

| 场景 | 这周的做法 | 试完只看一件事 |
| --- | --- | --- |
| 从零开始的活动表、招聘预算 | 用 Claude Sheets 出工作表、公式、格式和下拉，再导出 .xlsx 或 CSV | 导出后公式还在，空着的花费没有被填上猜测 |
| 已有透视表、宏、跨文件引用的模型 | 主文件留在 Excel；需要完整功能时用官方说的导出或 Claude for Excel | 主文件没有被改成只在 Claude Sheets 里维护 |
| 便签还散着的一次新头脑风暴或回顾 | 用 Whiteboards 按主题归组、按人起草待办，框选一块再问 | 人和日期都能指回某一条原话 |
| 正式协作已经在 Miro、Lucid 或 Vani | 原板留在原处；新讨论可以在 Claude 起稿，再送到这三家里 | 送过去之后，负责人还在，权限按原工具重设 |
| 只需要转写和纪要，Otter 或 Meet 里的 Gemini 已经在用 | 内部小会可以对照一场；对外的会维持原工具 | 会后待办的返工时间有没有变短 |
| Team 或 Enterprise 的内部 Google Meet | 让 Claude 作为可见参会者加入，看聊天提示、当场的计划和白板，会后到 claude.ai 收材料 | 聊天里有参会提示，待办没有写进外部客人 |
| 有客户、供应商或其他外部客人的会 | 维持现有纪要。管理员未允许时它不应加入，中途有外部客人它会离开 | 管理员有没有书面写下是否允许 |
| 要问公司数仓或 CRM | 先确认连接器。官方举例包括 Redshift、BigQuery、ClickHouse，也可以是 CRM。再用 Data 做提问、数据故事或有旁白的视频 | 故事和视频在分享前有人看过 |
| 把数字分享给没有数仓账号的同事 | 评估仍在 beta 的实时共享 | 对方看到的是已批准查询的结果，权限说明里写明不能另跑查询 |

数据故事和带旁白的视频，官方的顺序是起草、人先看、再分享。认证标记也一样：图表上的 certified，来自数据团队认证过的查询。没有人认证过的数，不要因为看板上有一块图，就放进给管理层的周报。

## 同一天 OpenAI 在做什么

11 月 10 日，OpenAI 开放了 Businesses in ChatGPT 的测试版。企业可以通过 Business Hub 认领自己的资料、维护信息，并查看汇总后的互动情况，例如提及次数、网站点击，以及网站被引用时的常见主题。符合条件的美国电商和在线服务企业，还可以做 Business Agent，在单独标出的对话里回答顾客关于自家产品的问题。OpenAI 在文中写，这是为了连接每周使用 ChatGPT 的 12 亿人。那是顾客发现商家、向商家提问的入口。Claude 这次做的是会议、白板、表格和公司数据。两条新闻同一天出现，试点仍然按你自己的套餐和数据边界来排，不必两边一起换。

## 这周做完就可以停的三句

- 导出的表在现有表格软件里对不上公式，Sheets 就只留在「起稿」，主文件回到 Excel。
- 白板或会议待办里出现原话没有的人或日期，正式纪要继续由人收口，试点范围不扩大。
- Team 或 Enterprise 还没有写下外部客人规则，就不把 Claude 加进任何有外部参会者的 Google Meet。

新功能下周还会加。这三句可以重复用：先看开关，再用一份丢得起的材料，最后只留返工时间确实变短的那一块。

## 常见问题

### 个人付费套餐能用 Claude Meetings 吗？

按 11 月 10 日的报道，Claude Meetings 的测试版只面向 Team 和 Enterprise。Whiteboards 和 Sheets 在全部付费套餐上以测试版提供，网页、桌面和手机都能用。Claude Data 对付费套餐正式可用，要先有数据连接器。个人付费账号这周先试白板和表格。

### 有外部客户在会上，Claude 会加入吗？

Engadget 引 Anthropic：除非管理员允许，它不会加入有外部客人的通话；外部客人中途加入，它会离开。TechCrunch 写的是未经管理员授权不加入，外部客人加入后自动离开。客户会和供应商会先维持原来的纪要方式。

### Claude Sheets 现在能换掉 Excel 吗？

官方写目前是简单表格功能，后续还在加。它适合生成多工作表、公式、格式和下拉，并说明每一处改动。需要完整 Excel 时，导出 .xlsx 或 CSV，或使用 Claude for Excel。透视表、宏和正在使用的财务模型留在原来的文件里，汇总用公式。

### 企业版要不要把白板、表格和 Data 一起打开？

Team 上这三项默认开启。Enterprise 上 Whiteboards 和 Sheets 默认关闭，Claude Data 在 2026 年 11 月 19 日默认打开。入口是 Organization settings > Artifacts，随时可以改。先看开关的当前状态，再决定是否只给一个小组打开。

### 这些功能要另外加价吗？

公告没有为这几项公布新价格或新的用量数字。Meetings 在 Team 和 Enterprise 的测试版中，白板和表格在付费套餐的测试版中，Data 对付费套餐正式开放；认证查询和实时共享仍是测试。会不会占用现有用量，页面没有写。试跑前后各看一次用量页。

## 信息来源

- Anthropic：[Introducing Claude Whiteboards, Claude Sheets, and Claude Data](https://claude.com/resources/articles/sheets-whiteboards-data)（白板、表格、Data、管理员默认开关、交互式连接器）
- TechCrunch：[Anthropic launches Claude Meetings to turn workplace discussions into plans and tasks](https://techcrunch.com/2026/11/10/anthropic-launches-claude-meetings-to-turn-workplace-discussions-into-plans-and-tasks/)（2026-11-10；Meetings 的参会方式、Google Meet、外部客人、会后材料）
- Axios：[Anthropic wants Claude to join your meetings](https://www.axios.com/2026/11/10/anthropic-claude-meetings-knowledge-work)（2026-11-10；Nicholas Lin 的内部试用和「等人吩咐」、HubSpot 等连接器）
- The Verge：[Anthropic has its own AI-powered office suite now](https://www.theverge.com/ai-artificial-intelligence/1030709/anthropic-has-its-own-ai-powered-office-suite-now)（2026-11-10；旧金山活动、与 Docs / Slides / Design / Motion 并列、9000 多个插件）
- Engadget：[Anthropic takes on Google and Microsoft with Claude Sheets](https://www.engadget.com/2312177/anthropic-takes-on-google-and-microsoft-with-claude-sheets/)（2026-11-10；Otter.ai 与 Gemini、外部客人原意、Google Workspace 插件）
- OpenAI：[Introducing Businesses in ChatGPT](https://openai.com/index/introducing-businesses-chatgpt)（2026-11-10；仅作同一天的竞争背景）
