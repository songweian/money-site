---
title: "AI 训练偏好信号：robots.txt 现在该改哪几行"
description: "2026-10-30，OpenAI、Google、微软与 Anthropic 宣布自愿支持 robots.txt 共享训练偏好。本文核对 token 原文，分开现在生效的规则和尚未落地的信号，并说明退出训练不等于退出搜索。"
pubDate: 2026-10-30T22:00:00+08:00
topic: devops
tags: ["robots.txt", "SEO", "AI 训练", "网站运营"]
keyword: "robots.txt AI 训练偏好"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "今天写上 __usage_ai-training，明天各家就不拿去训练了吗？"
    a: "不会在明天同时生效。OpenAI 写的是未来几个月内实现，实现细节尚未公布。Google 博客写的是与其他厂商一起在 2027 年支持，爬虫文档的注释写的是 2027 年初，都没有具体日期。微软写明从 2027 年 2 月 1 日起，在爬取页面时开始遵守。Anthropic 的执行日期，本文没有在其帮助中心读到，尚未公布。现在就能按各家现有文档生效的，是 GPTBot、Google-Extended、ClaudeBot 这些专属规则。"
  - q: "禁止 Google-Extended，网站还会出现在 Google 搜索里吗？"
    a: "会，只要你没有另外禁止 Googlebot。Google 爬虫文档写明：Google-Extended 不影响网站被纳入 Google 搜索，也不作为 Google 搜索的排名信号。它管的是两件别的事：未来 Gemini 模型的训练，以及在 Gemini Apps 和 Vertex AI 的 Grounding with Google Search 里，于提问时把搜索索引中的内容提供给模型。"
  - q: "想被 AI 答案引用，又完全不想被拿去训练，Google 能两全吗？"
    a: "截至 2026 年 10 月 30 日 Google 博客和爬虫文档，没有看到把「训练」和「Gemini grounding」拆开的开关。Google-Extended 同时覆盖这两件事。共享 token 若表示退出训练、且文件里没有显式写 Google-Extended，Google 计划将其视为禁止了 Google-Extended，Gemini Apps 的 grounding 点击资格会一起受到影响。显式允许 Google-Extended，博客写明有资格出现在 Gemini Apps 的 grounding 中并获得点击，但爬虫文档写明这同时允许内容用于训练未来的 Gemini。微软把训练和 grounding 分成了两个偏好，可以训练禁止、grounding 仍允许，且不改变必应传统搜索结果的资格。"
  - q: "文件里已经有 User-agent: * 和 Disallow，算不算已经退出训练？"
    a: "不算。草案写明通配组 User-Agent: * 不得被解释为匹配这个政策 token。文件里如果根本没有 __usage_ai-training 这一行，草案的结论是没有表达训练偏好。* 那一组继续只管它原来管的抓取范围。反过来，新加的政策 token 组也不会被不认识它的解析器当成抓取禁令。"
  - q: "token 少写一条下划线，或者写成各家爬虫的名字，效果一样吗？"
    a: "不一样。草案定义的 token 是 __usage_ai-training，usage 前面是两条下划线，ai 和 training 之间是连字符。Google 爬虫文档和微软博客的示例用的都是这串字符。大小写可以不同，草案要求除大小写外精确匹配。GPTBot、Google-Extended、ClaudeBot 是各家现有的专属名字，继续按各家文档生效，不能用来代替这串共享 token。"
---

2026 年 10 月 30 日，网站主多了一种写在 `robots.txt` 里的说法：用一个共享的 policy token，向多家 AI 厂商同时表达「不要把这些页面用于生成式模型的训练」。OpenAI、Google、微软各自发了公告。Search Engine Land 同一天的两篇报道把 Anthropic 也列为宣布自愿采用的一方。写法来自一份个人草案，不是已经通过的 IETF 标准。

对做网站、做内容和做 SEO 的人，当天就能做的决定只有一件：现有的专属规则先盘清，共享那一行可以现在写上，但不要把它当成明天就对四家全部生效的开关。站点原来的收录、站点地图和页面速度，仍按 [网站性能与 SEO 技术优化清单](/posts/web-performance-seo-checklist/) 那一套检查，本文不重复那份清单。

## 四家公告各自承诺了什么

四家说的是同一类信号，日历不是同一张。

OpenAI 在 10 月 30 日的公告里写：将遵守 `robots.txt` 中的一个共同信号，让网站表明内容是否用于基础生成式 AI 训练。这是自愿的。目的是不用再为每一家单独维护规则。OpenAI 的时间表是「未来几个月内实现」，实现之后再另发一篇说明实现细节。同一篇写明：新信号不取代现有的 `robots.txt` 控制，现有爬虫控制继续适用、继续被遵守。实现细节截至该公告，尚未公布。

Google Search Central 博客同一天由 John Mueller 发布。博客说，网站可以用 `robots.txt` 里的一个共享 policy token，对参与的 AI 厂商表达训练偏好。若网站用这个 token 退出训练，并且没有显式写上 Google-Extended，Google 计划把这理解成发布者禁止了 Google-Extended。原有的厂商专属控制继续有效，网站仍可以用 Google-Extended 单独告诉 Google。显式允许 Google-Extended 的网站，有资格出现在 Gemini Apps 的 grounding 回复里，并由此获得点击。博客写的支持时间是与其他 AI 厂商一起在 2027 年，并会更新进展，没有写月份。本文核对 Google 的常见爬虫文档时，页上另有一条注释：Google 打算在 2027 年初支持这个 AIPREF 共享信号，并写出了 `user-agent: __usage_ai-training`。博客的「2027 年」和文档的「2027 年初」都记在这里，具体上线日尚未公布。

微软 Bing 博客同一天由 Krishna Madhavan 发布，题目是让发布者分别选择训练和 grounding。文中写：微软正与业界其他参与者一起，把共享的 AI 训练偏好带到 `robots.txt`，依据是一份 Internet-Draft；IETF AI Preferences 工作组仍在走向最终标准。微软给出的执行日比另外两家具体：从 2027 年 2 月 1 日起，在爬取时遵守新偏好。`robots.txt` 里的 AI Training 作用于站点或路径；页面级的训练设置可以覆盖 `robots.txt`。AI Grounding 是另一项、只在页面上设置的偏好，`robots.txt` 里没有全站 grounding 开关。这些偏好不改变必应传统搜索结果的资格，前提是抓取和索引的常规条件仍然满足。允许 grounding 或允许训练，都不保证被收录、有流量或得到付款。

Anthropic 这一侧，本文没有读到一份写明生效日期的产品公告，执行日期尚未公布。能核对到的两件事是：Search Engine Land 在 10 月 30 日的 Google 报道中写「Google, like Bing, OpenAI and Anthropic」，微软那篇报道也写参与方包括 Google、OpenAI 和 Anthropic；个人草案的作者 Kevin Kelley 单位写的是 Anthropic，日期是 2026 年 10 月 30 日。Anthropic 帮助中心现有的 ClaudeBot、Claude-SearchBot、Claude-User 说明，页面日期是 2026 年 4 月 7 日，那是现在就生效的专属规则，不是这份新信号的实施公告。

## token 以草案原文为准

草案名称是 `draft-kelley-aipref-training-preference-signal-00`，标题 *Machine-Readable Training Preference Signal*。IETF 数据跟踪页写明：这是一份个人 Internet-Draft，IETF 不为其背书，在 IETF 标准流程中没有正式地位。草案自己也写着，Internet-Draft 不适合当作正式参考文献，最多六个月有效，随时可能被更新或取代。这一份的到期日是 2027 年 5 月 3 日。

各家公告说，信号建立在 AI Preferences（AIPREF）工作组的工作之上。工作组另有词汇草案。这一份信号草案引用的定义是：AI Training 指使用一项素材去修改生成式 AI 模型已经学到的参数。专门用来做分类、排序或打分的模型训练，不算这一类，哪怕该模型也能生成内容。所以这行字管的是「会不会拿去改生成式模型的参数」，不管搜索排名，也不管一个只做分类的模型。

草案示例原文是：

```
User-Agent: __usage_ai-training
Disallow: /
Allow: /press-kit/
```

`usage` 前面是两条下划线，`ai` 与 `training` 之间是连字符。草案要求消费者除大小写外精确匹配；两条下划线是为了减少被旧解析器误匹配。Google 爬虫文档和微软博客使用的都是这同一串字符。少一条下划线，或写成 `GPTBot` 这类名字，都不是这个共享 token。

这一组在草案里的意思要整组读。`Disallow: /` 是对全站表达「不希望用于该 token 描述的用途」。`Allow: /press-kit/` 是对这个路径表达「希望用于该用途」。这是偏好允许训练，不是「只让搜索引擎看一眼新闻资料」。路径用最长匹配，和现有 `robots.txt` 一样。草案没有发明新的指令名。

还有三条，写错一行就会表错态：

- 文件里完全没有 `User-Agent: __usage_ai-training` 时，草案认为没有表达偏好。沉默不是退出。
- `User-Agent: *` 不得被当成匹配了这个 token。全站屏蔽爬虫，并不等于已经发出了训练偏好。
- 这个 token 不是抓取指令。想限制谁来抓，仍要给那个爬虫自己的名字写一组。不认识这个 token 的解析器会忽略整组，所以现在把这一组加进文件，不会让 Googlebot 突然被禁。草案同时允许消费者在「自己只为该用途而抓取」时，对表达了反对偏好的路径减少抓取。那是对方的选择，不是这行字本身的抓取禁令。

专属 token 继续独立生效。草案还写：更具体的表达应当优先；消费者可以规定自己的专属 token 比 `__usage_ai-training` 更具体；私下协议可以覆盖这份机制。已经签了内容授权合同的团队，以合同为准。`robots.txt` 不会自动废掉合同。

微软对「没写」和「写了 Allow」的操作说明是：没有适用的训练偏好时，默认 Allow，不必为了允许训练而写任何行。它也给了一个可选的显式 `Allow: /`。显式 Allow 按草案就是「偏好允许」。想全站退出的人，只写 `Disallow: /`，不要再加一行 Allow。只禁止某一个目录时，草案会把同组里最终被允许的其他路径读成「偏好允许」，这和「全文件都没写这个 token」不是同一种状态。全站退出就用 `Disallow: /`。

## 训练、搜索、出现在答案里，是三项设置

把这三项写成同一句话，是这周最常见的误操作。三项各自有文档。

**搜索收录**看的是真正抓取索引的爬虫。Google 搜索（含 Discover 和搜索里的功能）受 `Googlebot` 影响。必应传统搜索结果的资格，微软写明不受这次训练和 grounding 偏好改变，但仍受正常抓取和索引条件约束。给 `Googlebot` 或 `bingbot` 写上 `Disallow: /`，影响的是搜索，不是这份训练草案要解决的问题。本文的示例不改你原来的 `Googlebot`、`bingbot` 和 `User-agent: *`。一组只写了 `Allow: /` 的专属爬虫规则，会替换该爬虫本来要遵守的 `*` 规则，原来屏蔽的目录可能被重新打开。训练 token 和 Google-Extended 是控制用途的名字，Google 写明 Google-Extended 没有单独的 HTTP 抓取 User-Agent，抓取仍由现有的 Google User-Agent 完成。

**基础模型训练**在 OpenAI 现有文档里对应 `GPTBot`。禁止 GPTBot，表示内容不应用于训练其生成式基础模型。`OAI-SearchBot` 负责 ChatGPT 搜索：禁止它，网站不会出现在 ChatGPT 的搜索答案里，仍可能作为导航链接出现。两条互相独立。OpenAI 写了一条例外：若两个都允许，他们可能只用一次抓取的结果同时服务搜索和训练，以避免重复抓取。因此「允许搜索、禁止训练」的现有写法是禁止 GPTBot、不要禁止 OAI-SearchBot。搜索侧的 `robots.txt` 更新，OpenAI 写大约 24 小时后系统才会调整。这 24 小时是搜索规则的说明，不是新共享信号的生效时间。`ChatGPT-User` 用于用户在 ChatGPT 里发起的访问，OpenAI 写明因由用户发起，`robots.txt` 规则可能不适用，它也不决定内容能否出现在 Search 里。

**Anthropic 的三个名字**以 2026 年 4 月 7 日的帮助中心为准，现在就生效。限制 ClaudeBot，表示该站以后的材料不进入其模型训练数据集。禁止 Claude-SearchBot，帮助中心写明会使其系统无法为搜索优化而索引你的内容，可能降低在用户搜索结果中的可见度和准确性。禁止 Claude-User，会阻止系统在用户提问时取回你的内容，可能降低用户发起的网页搜索里的可见度。帮助中心要求每个要退出的子域名都改自己的 `robots.txt`，并写明用封 IP 代替文件可能行不通，因为对方需要读到这份文件。`www` 和裸域是两台主机，各有一份。

**Google 的训练和引用绑在同一个专属名字上。** 爬虫文档写：Google-Extended 用来管理，从网站抓到的内容能否用于训练驱动 Gemini Apps 和 Vertex AI API 的未来 Gemini 模型，以及能否在 Gemini Apps 和 Vertex AI 的 Grounding with Google Search 中、于提问时把索引内容提供给模型。它不影响纳入 Google 搜索，也不是排名信号。自 2023 年起这就是 Google 提供的训练控制，博客原文如此。

因此 Google 的权衡是具体的。只加共享 token 的 `Disallow: /`、不写 Google-Extended 时，博客说 Google 会将其视为禁止了 Google-Extended。那一步同时碰到未来 Gemini 训练和 Gemini Apps 的 grounding。想保留「出现在 Gemini Apps 的 grounding 里并获得点击」的资格，博客要求的是显式允许 Google-Extended。显式允许又把「可用于未来 Gemini 训练」一起打开，因为文档没有给这两件事各设一个名字。本文核对到的材料里，没有 Google 版的「只退出训练、仍保留 grounding」。

**微软把这两件事拆开了。** 训练可以 `Disallow`，grounding 保持默认的 Allow：内容仍可以用来帮助生成回答，同时不用于训练生成式模型。grounding 若选 `Disallow` 或 `DisallowExtended`，微软写明 AI 体验中的品牌可见度会下降。`DisallowExtended` 把 grounding 限制在微软自己运营的体验（文中列举 AI Mode、AI Overview、Copilot、Microsoft 365），排除提供给第三方的 grounding 服务（文中列举 Web IQ，以及 Foundry 里通过 API 的 grounding）。grounding 只能写在页面的 meta 或 `X-Robots-Tag` 上，不能写进 `robots.txt` 当作全站规则。页面级训练设置覆盖 `robots.txt`。

正在用 `NoArchive` 或 `NoCache` 表达微软旧偏好的站，多一个时间表。2026 年 12 月 15 日起，Bing Webmaster Tools 为截至该日仍使用这两条旧指令的站点提供临时 grounding 偏好。2027 年 2 月 1 日新偏好开始随爬取生效。2027 年 3 月 1 日之后，这两条旧指令不再被读成训练或 grounding 偏好。临时 grounding 偏好在被重新爬到，或在 2027 年 9 月 30 日，以先到者为准失效。微软还写：一旦在站点上发现新的 AI Training 或 AI Grounding 偏好，该站上残留的 `NoArchive` / `NoCache` 将不再被采用。没用过这两条旧指令的站，不需要做这套过渡。

## 同一周的引荐下降说明什么

10 月 29 日，Reddit 的第三季度财报电话会把搜索引荐和 Google 的 AI 功能放在一起说。The Verge、TechCrunch 和路透社（investing.com 转载）都写到：10 月搜索引荐平均每周减少 100 万次以上。The Verge 引用 Steve Huffman 的话：「The reality is, AI Mode does not drive traffic. Not for us, and not to anybody, as far as I know.」同文还写到，他认为 AI Overviews 和 AI Mode 至少把所有人往搜索结果页的更下方推；Reddit 仍是 Google 上的高频搜索词；Google 抓取 Reddit 的力度依旧，变化出在「不再像以前那样把人送到 Reddit」。

这是一个已经有上亿日活的平台公布的数字，不是中小网站的行业基准。TechCrunch 写全球日活环比持平，为 1.303 亿；美国日活从第二季度的 5320 万降到第三季度的 5070 万，同比下降 2%。非广告收入同比增长 35%，到 4800 万美元，其中包含 AI 数据授权。路透社写，若引荐继续下降，第四季度日活可能从约 1.3 亿下降一个低两位数的百分比。Reddit 的应对是转向以登录为主的体验：TechCrunch 写第四季度先在美国以外的部分市场测试，全球时间表尚未公布，也不会在一夜之间完成。

小团队不能把「强制登录」当成这次 `robots.txt` 的配套动作。登录墙会把搜索和引用一起挡住，而 Reddit 另有数据授权收入可以支撑这个取舍。公司站、文档站和独立产品站通常没有这笔收入。Huffman 描述的现象，对内容站有用的部分是另一句：抓取还在，点击变少。训练偏好解决的是「抓去之后能不能用于改模型参数」。它不负责把 AI Mode 重新变成 2023 年那样的引荐机器。内容是否值得被引用，仍取决于页面本身是否清楚、是否对得上读者的问题。批量生产的页面若站不住，引用也不会来，质检流程见 [AI 批量生成内容怎么保证质量](/posts/ai-bulk-content-quality-control/)。

## 这周按这个顺序改

### 先把现有文件抄下来

打开网站根上的 `/robots.txt`，连同每个子域名各存一份，标上日期。部署在 Cloudflare Pages 上的站，确认这个地址返回的是文件本身而不是一张 HTML，步骤可以对照 [静态站点部署 Cloudflare Pages](/posts/cloudflare-pages-static-site-deploy/)。然后在副本上找出这些名字：`GPTBot`、`OAI-SearchBot`、`ChatGPT-User`、`Googlebot`、`Google-Extended`、`ClaudeBot`、`Claude-SearchBot`、`Claude-User`、`bingbot`，以及页面源代码里的 `NoArchive`、`NoCache`。没有某个名字，就记「未设置」，不要脑补成已经禁止。

同时导出改动前连续四周的三列数：Google 搜索点击、必应搜索点击、统计工具里各引荐域名的会话数。训练开关不会在这张表上显示成一个状态。四周之后用同样的列再导出一次，才能把「搜索点击变了」和「某家聊天产品的引荐变了」分开。AI Overviews 上的点击通常仍算在 Google 搜索里，不能从「Google 流量掉了」读出 token 是否被执行。

### 选定一种策略

三种策略对应三种文件，不要混成第四种。

**维持现状。** 不加 `__usage_ai-training`。草案把这读成没有表达共享偏好。OpenAI、Google、Anthropic 的现有专属规则保持原样。微软在没有适用偏好时默认允许训练和 grounding。适合还没决定、或已经通过合同授权训练的站。

**全站不用于生成式模型训练，并接受 Google 侧的连带效果。** 共享 token 写 `Disallow: /`。同时按现有文档禁止 `GPTBot` 和 `ClaudeBot`，并禁止 `Google-Extended`。不要禁止 `OAI-SearchBot`、`Claude-SearchBot`、`Googlebot`、`bingbot`。这样写的含义是：OpenAI 与 Anthropic 的训练爬虫按今天的文档退出；共享信号等各家到点再执行；Google 会把未另写的退出，或你显式写上的 Google-Extended 禁止，理解成同时退出未来 Gemini 训练和 Gemini Apps grounding。Google 搜索收录按爬虫文档不受 Google-Extended 影响。微软从 2027 年 2 月 1 日的爬取开始遵守训练退出，grounding 保持默认允许，必应传统搜索资格不变。

**希望保留 Gemini Apps grounding 的点击资格。** 共享 token、`GPTBot`、`ClaudeBot` 仍是 `Disallow: /`，但 `Google-Extended` 写成显式 `Allow: /`。Google 博客把「显式允许」和 grounding 点击资格写在一起。爬虫文档把「允许」同时写成可以用于未来 Gemini 训练。这是保留引用资格的条件，不是只退出 Google 训练的办法。若这个代价不能接受，回到上一种策略。

### 两份可直接追加的示例

下面只追加组，不替换文件里已有的 `User-agent: *`、`Sitemap` 和 `Googlebot`。指令名大小写不敏感。token 除大小写外按草案精确书写。组与组之间留空行。

全站退出训练，并显式禁止 Google-Extended：

```
# 共享训练偏好。不是抓取禁令。
# OpenAI：未来几个月内实现，细节尚未公布。
# Google：目标 2027；未另写 Google-Extended 时，计划视为禁止 Google-Extended。
# 微软：2027-02-01 起随爬取遵守。Anthropic 执行日期尚未公布。
User-agent: __usage_ai-training
Disallow: /

# 以下三组按各家现有文档，现在就生效。
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

保留 Gemini Apps grounding 资格时，只把最后一组换成显式允许，前三组不变：

```
User-agent: Google-Extended
Allow: /
```

不要把草案图里的 `Allow: /press-kit/` 一起抄进全站退出。那一行是在表达该路径可以用于训练。只有某个目录确实愿意被用于训练时，才在同一组里为它写 `Allow`，并靠最长匹配盖过 `Disallow: /`。

微软页面级训练禁止（2027 年 2 月 1 日起随爬取生效，且覆盖该页的 `robots.txt` 训练偏好）是：

```html
<meta name="Bingbot" content="ai-training:disallow">
```

或响应头 `X-Robots-Tag: Bingbot: ai-training:disallow`。grounding 使用 `ai-grounding:disallow` 或 `ai-grounding:disallowextended`，同样只在页面上。大多数没有 `NoArchive` / `NoCache` 的站，不必为了这次共享信号去改 HTML。

### 发布后核对，并记下回访日期

用无痕窗口打开线上的 `/robots.txt`，确认能看到 `__usage_ai-training` 的两条下划线，且原来的 `Sitemap` 还在。OpenAI 对搜索规则写了大约 24 小时的生效缓冲，共享信号不适用这句。日志里可以检索的抓取名字是 `GPTBot`、`OAI-SearchBot`、`ClaudeBot`、`Claude-SearchBot`、`Claude-User`、`Googlebot`、`bingbot`。Google-Extended 没有单独的请求 User-Agent，日志里搜不到这个词，不能用「没看到 Google-Extended」判断开关是否生效。

必应侧可以用 Bing Webmaster Tools 的 AI Performance。该报告于 2026 年 2 月 10 日进入公开预览，给出的是 Copilot、必应中的 AI 摘要和部分合作方场景里的引用次数、被引用页面和 grounding 查询词。引用次数不是排名。微软在 10 月 30 日的公告里写，grounding 选禁止会明显降低在 AI 生成体验中的可见度。Google 这篇博客没有宣布一个用来确认共享 token 已被执行的 Search Console 新报告，怎么在 Search Console 里核对执行状态，尚未公布。

在日历上留下四个回访点，到点打开原文而不是只看本文：OpenAI 承诺的实现细节更新（日期尚未公布）；Google 写的 2027 年支持进度；微软的 2027 年 2 月 1 日；若站点使用 `NoArchive` 或 `NoCache`，还有 2027 年 3 月 1 日。草案若被替换，以新版本里的 token 为准。本文的 token 只对 `draft-kelley-aipref-training-preference-signal-00` 负责。

## 结论

10 月 30 日被确认的事实是：三家公司博客宣布自愿支持同一类 `robots.txt` 训练偏好，Search Engine Land 将 Anthropic 列为同一天的第四方；token 原文是 `__usage_ai-training`；这份文件是个人草案，不是标准。OpenAI 的执行在未来几个月，细节尚未公布。Google 的目标是 2027 年，爬虫文档写 2027 年初。微软从 2027 年 2 月 1 日的爬取开始。Anthropic 的执行日期尚未公布。

当天已经生效、并且和「能否被搜索或被检索引用」分开的，是各家专属规则。GPTBot 管 OpenAI 的基础模型训练，OAI-SearchBot 管 ChatGPT 搜索。Google-Extended 同时管未来 Gemini 训练和 Gemini grounding，不管 Google 搜索收录和排名。ClaudeBot 管 Anthropic 的训练数据集，Claude-SearchBot 管其搜索索引。共享 token 的 `Disallow` 不是抓取禁令。全站退出训练的站，追加上面「全站退出训练」那一组示例，并保留原有的搜索爬虫规则。需要 Gemini Apps grounding 点击资格的站，把 Google-Extended 写成显式允许，并接受它同时允许未来 Gemini 训练。四周后用改前导出的搜索点击和引荐域名对照，不用 Reddit 的每周 100 万次作为自己的指标。

## 常见问题

### 今天写上 __usage_ai-training，明天各家就不拿去训练了吗？

不会在明天同时生效。OpenAI 写未来几个月，细节尚未公布。Google 博客写 2027 年，爬虫文档写 2027 年初。微软写 2027 年 2 月 1 日起随爬取遵守。Anthropic 的执行日期尚未公布。现在生效的是 GPTBot、Google-Extended、ClaudeBot 等专属规则。

### 禁止 Google-Extended，网站还会出现在 Google 搜索里吗？

会，只要没有另外禁止 Googlebot。Google 写明 Google-Extended 不影响纳入 Google 搜索，也不是排名信号。它管未来 Gemini 训练，以及 Gemini Apps 和 Vertex AI 里基于搜索的 grounding。

### 想被 AI 答案引用，又完全不想被拿去训练，Google 能两全吗？

截至本文核对的 Google 材料，不能。Google-Extended 把训练和 grounding 放在一起。未显式书写时，退出训练的共享 token 会被 Google 视为禁止 Google-Extended。微软可以训练禁止、grounding 仍允许，且不改变必应传统搜索资格。

### 文件里已经有 User-agent: * 和 Disallow，算不算已经退出训练？

不算。草案规定 `*` 不匹配 `__usage_ai-training`。没有这一行，就是没有表达该偏好。`*` 继续只管原来的抓取范围。

### token 少写一条下划线，或者写成各家爬虫的名字，效果一样吗？

不一样。草案、Google 爬虫文档和微软示例用的都是 `__usage_ai-training`。除大小写外需要精确匹配。GPTBot、Google-Extended、ClaudeBot 是现有专属规则，代替不了这串 token。

## 信息来源

- OpenAI，2026-10-30，[Making it easier for websites to express AI training preferences](https://openai.com/index/helping-websites-express-ai-training-preferences/)
- OpenAI 爬虫说明，[Overview of OpenAI Crawlers](https://platform.openai.com/docs/bots)
- Google Search Central 博客，John Mueller，2026-10-30，[Supporting a shared AI training control for websites](https://developers.google.com/search/blog/2026/10/ai-training-control)
- Google 常见爬虫文档中的 Google-Extended 及 2027 年初注释，[Google's common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- 微软 Bing 博客，Krishna Madhavan，2026-10-30，[Your content, your choice](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/)
- Bing Webmaster Tools，2026-02-10，[AI Performance 公开预览](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
- IETF 数据跟踪页，[draft-kelley-aipref-training-preference-signal-00](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)
- Anthropic 帮助中心，2026-04-07，[站点如何限制 Anthropic 的爬虫](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- Search Engine Land，Barry Schwartz，2026-10-30，[Google 的报道](https://searchengineland.com/google-also-gives-publishers-more-control-over-how-ai-uses-their-content-499971) 与 [微软的报道](https://searchengineland.com/microsoft-bing-gives-publishers-more-control-over-how-ai-uses-their-content-499967)
- The Verge，Jay Peters，2026-10-29，[Reddit CEO on AI Mode](https://www.theverge.com/tech/1022848/reddit-ceo-google-ai-mode-traffic)
- TechCrunch，Sarah Perez，2026-10-29，[Reddit 转向登录体验](https://techcrunch.com/2026/10/29/as-search-traffic-dries-up-reddit-announces-its-shifting-to-a-logged-in-experience/)
- 路透社，Jaspreet Singh，2026-10-29，经 investing.com 转载，[Reddit puts logged-in experience first](https://www.investing.com/news/stock-market-news/reddit-puts-logged-in-experience-first-as-google-ai-hits-traffic-4985602)
