---
title: "ChatGPT Wallet 上线：美国 Pro 可付款，批准不等于下单"
description: "OpenAI 于 2026 年 11 月 13 日推出 ChatGPT Wallet。现阶段只向住在美国、持美国发行信用卡的 ChatGPT Pro 成年人开放，每笔付款仍须本人确认。"
pubDate: 2026-11-14T06:00:00+08:00
topic: ai-tools
tags: ["ChatGPT", "Wallet", "代理付款", "商家"]
keyword: "ChatGPT Wallet"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "人在中国、用国内发行的卡，现在能用 ChatGPT Wallet 吗？"
    a: "按 2026-11-14 核对的帮助中心，不能。使用者要是 ChatGPT Pro、年满 18 岁、住在美国，卡要是美国发行的美国运通、Chase、Mastercard 或 Visa 信用卡，并且账单地址在美国。人在中国、卡是国内银行发的，不在这组条件里。对话里看不到 Wallet，帮助中心写的是这个账号可能还没被放进来，不要把卡号发到聊天里试。"
  - q: "普通 Chat、Work 或 Codex 对话里能直接付款吗？"
    a: "不能。帮助中心写明 Wallet 只在和 dot 的对话里使用，要先建好 dot。Chat、Work 和独立的 Codex 对话里没有 Wallet。当前设备做不了 Face ID 或 Touch ID 时，用链接或二维码到登录同一账号的支持设备上继续，笔记本合盖时先打开盖子，或改在支持的手机上批准。"
  - q: "借记卡、虚拟卡，或者已经用来付 ChatGPT 订阅的那张卡，能加进 Wallet 吗？"
    a: "借记卡不支持。用户自己办的虚拟卡在上线时不支持，这和结账时支付网络给出的替代卡号是两回事。Wallet 里保存的卡，也和 ChatGPT 订阅的付款方式、礼品卡或预付余额分开。Chase 卡还必须是主卡持卡人，授权用户不行，设置时可能要在 Chase App 里批准连接。"
  - q: "我已经点了批准，或看到 Ready to check out，订单算商家接下了吗？"
    a: "不算。帮助中心写明 Ready to check out 只表示你的批准已经完成，不表示商家已经下单。结果不清楚时，先查商家的订单确认，再决定要不要重试。取消已经完成的订单、退货和退款，联系商家。同意了循环或持续扣款方案之后，商家可以按约定再次扣款，也是找商家管理或取消。"
  - q: "网站想收下 Wallet 付款，这周最少要查什么？"
    a: "先定政策：允许代理结账，还是像 CNBC 所报道的联合航空、亚马逊那样拒绝。允许的话，检查 CDN 或防火墙有没有误拦已验证的 ChatGPT 云浏览器；浏览器访问不要求先做插件或商品 feed。卖实物的，在 Business Hub 认领并验证后，再上传当前价格和库存。支付和风控如果把云浏览器当成机器人拒绝，要和你的服务商谈，官方点名的防欺诈伙伴包括 Forter、Riskified、Sardine、Signifyd，支付服务商包括 Adyen、Checkout.com、Stripe。"
  - q: "扣错、被拒，或者和我批准的内容不一样，该找谁？"
    a: "订单状态、取消、退货、退款找商家。被拒、待处理、争议、认不出的扣款，以及银行验证问题，找发卡行。Wallet 报错、怀疑有人未经授权进入 ChatGPT 账号，或者买到的和你批准的不一样，找 OpenAI Support。完整卡号、安全码、密码和银行验证码只填在安全表单里，不要发进聊天或支持消息。"
---

2026 年 11 月 13 日，OpenAI 推出 ChatGPT Wallet。官方博客的原句是：每周有 1.2B 人使用 ChatGPT，也就是 12 亿人；其中不少人用它查商品、比选项、决定买什么。Wallet 要做的是把这一步接到付款。它和 American Express、Mastercard、Visa 一起做，先通过 dot，给美国的 ChatGPT Pro 订阅用户用。

官方对它的定位有三句，都写在同一篇博客里。代理付款时碰不到用户的真实卡信息。每一笔购买都要做一次安全检查。用户原有的卡奖励还在，符合条件的争议保护也还在。博客把这三句合在一起，称为第一个这样的钱包。这是 OpenAI 在博客里的自我表述，本站没有另做行业普查。

对这篇的读者，当天就能核对的结论也有三句。人在中国、卡是国内发行的，现在用不上。就算账号符合美国 Pro 的条件，每一笔仍然要本人看过商品、总额和卡，再用 Face ID、Touch ID 或指纹批准，代理不能自己把钱付掉。网站如果卖东西给美国客户，或者代理可能会打开你的结账页，这周要查的是防火墙和风控会不会把这笔合法付款拦掉。

帮助中心、Commerce Partner Playbook、收款说明和代理访问文档，本文于 2026-11-14 打开核对。帮助中心比博客写得更细，限额以帮助中心为准。页面后来如果改了，以你打开时的原文为准。

## 11 月 13 日宣布了什么

博客把购买过程写成：用户先添加一次卡，之后每笔不用重填卡信息，但要再批准一次。批准前要看商品、总额和选中的卡，再用 Face ID 或指纹扫描完成安全检查。每一次批准都会留下这份授权记录。

批准之后，支付网络提供一个 payment token，也就是替代真实卡信息的卡号、安全码和有效期。款项记到用户选中的那张卡上。Wallet 不会把真实卡信息交给商家，也不会交给代理。用户和商家直接交易。定价、履约、退货和客服仍由商家掌握。卡组织原有的奖励保留。商品有缺陷这类符合条件的争议，仍走原有的保护。银行和卡组织继续负责评估交易。

下面这张表把「现在就能用的」和「博客写的以后」分开。右边那一列不是现功能。

| 博客里的话 | 现在对应什么 |
| --- | --- |
| 通过 dot，向美国 ChatGPT Pro 陆续开放 | 帮助中心：要在和 dot 的对话里，账号上看不到就可能还没轮到 |
| 每笔都要安全检查，并留下授权记录 | 帮助中心：Face ID 或 Touch ID；批准前核对商家、商品、总额、卡、运费或循环条款 |
| 支付网络给替代卡号，真实卡信息不交给商家或代理 | 商家侧收到的是网络令牌，不是完整卡号 |
| 以后用户可以设定消费上限、购买类别或时间段，把购买整个交给代理 | 博客用的是 over time, we expect。增强保护建立在今天的生物识别和授权记录之上。帮助中心现在仍是每笔由人批准 |

三家合作方的话在官方博客上，这里只保留和「现在要人批准」直接相关的意思。American Express 的 Luke Gebb（EVP and Head of Global Innovation）说，这是美国运通第一项 Agentic Commerce Experiences 集成，符合条件的持卡人在核对并批准每一笔之后使用美国运通卡，他们要从这个早期阶段学习，再逐步给更多持卡人。Mastercard 的 Sherri Haymond（EVP, Global Head of Digital Commercialization）说，代理付款应当加强支付里已经有的信任，而不是绕过它，并把用户批准过的购买接到商家和银行已经在用的系统上。Visa 的 Rubail Birwadker（Head of Global Growth）说，消费者、商家和银行都要信任这个过程，Visa 把现有基础设施接进来。

CNBC 记者 Ashley Capoot 的报道于 2026 年 11 月 13 日 10:00 AM EST 刊出。里面有几句博客没有写，只记成报道。负责 OpenAI 变现和支付产品的 Chaya Nayak 对 CNBC 说，当前目标是先聚焦商家和网络合作伙伴，搭一个安全、好用的基础；她也说，生态要把基础设施做到所有网站都顺滑，需要时间。美国运通的 Luke Gebb 对 CNBC 说，有限开放是把事情跑通的合适做法，之后可以再 “turn up the volume”，也就是再把量开大，先放在一个可控范围里看。CNBC 还写道，公司表示起步阶段不从交易里抽成。Wallet 博客没有这一句，不要把它写成已经公开的费率条款。

同一篇 CNBC 把更早的购物尝试写成背景：上一个秋天的 Instant Checkout 很快被转走，到 3 月换成了一版重做的购物体验。年份按该报道的行文理解。官方 Wallet 博客没有复述这段历史。它只说明，这次是在原有的商品发现之上，把人已经想买的东西接到付款。

CNBC 另写，ChatGPT 每周活跃用户超过 12 亿，截至第三季度末付费用户接近 1 亿。每周 12 亿人这个量级和官方博客的 1.2B 一致；「超过」和「接近 1 亿付费用户」只出现在 CNBC，Wallet 博客没有后一个数字。

## 现在谁能用，谁用不上

帮助中心写，Wallet 正在向美国的 ChatGPT Pro 用户推送。和自己的 dot 对话时如果看不到 Wallet，可能这个账号还没有。博客的年龄和地区门槛是：美国、18 岁及以上的 ChatGPT Pro，并持有符合条件的美国发行卡片。帮助中心把卡片和居住条件写得更具体。

| 条件 | 2026-11-14 帮助中心的写法 |
| --- | --- |
| 订阅和入口 | Pro。先建好 dot。只在和 dot 的对话里。Chat、Work、独立 Codex 对话里没有 |
| 人 | 年满 18 岁，住在美国 |
| 卡 | 美国发行的 American Express、Chase、Mastercard、Visa 信用卡，账单地址在美国 |
| Chase | 必须是主卡持卡人，授权用户不可以。银行可能在设置时要求验证。Chase 要在手机 App 里批准连接，电脑上则用手机扫二维码 |
| 明确不支持 | 借记卡不支持。用户自己的虚拟卡上线时不支持 |
| 和别的余额分开 | Wallet 里的卡，不同于 ChatGPT 订阅付款方式，也不同于礼品卡或预付余额 |
| 批准 | 支持的设备上做生物识别，帮助中心写 Face ID 或 Touch ID。当前设备不能批，用链接或二维码到同一账号的支持设备上继续 |

人在中国、卡是国内银行发的、账单地址不在美国，这三条里任何一条对不上，就不在现在的开放范围里。没有美国 Pro、人也不住在美国的读者，这周不要注册一张卡去试，也不要把卡号贴进 ChatGPT。符合条件但对话里还没有 Wallet 的，同样不要反复把卡号打进聊天，帮助中心把这种情况写成「可能还没轮到这个账号」。

已经在对 ChatGPT Pro 用量做账的，额度够不够是另一项检查，见 [Claude Ultra 与 ChatGPT Pro：200 美元档怎么对账](/posts/claude-ultra-chatgpt-pro-quota-change/)。Wallet 出不出现，只看 dot 对话里有没有，两件事不要合成一次。

借记卡和虚拟卡要分开记。帮助中心对借记卡的回答是 No。对虚拟卡的回答是：上线时不支持，请改加另一张支持的美国发行信用卡。紧接着的那句是，这和 Wallet 在批准后用来结账的虚拟卡号不是一回事。后一个号码由支付网络在批准之后生成，用来代替真实卡信息；收据或结账页上的号码可以和实体卡不同。

Chase 还有单独的一步。帮助中心要求先在手机上安装 Chase App，并用生物识别登录。符合条件的 Chase 卡，要按设置链接在 Chase App 里批准连接；人在电脑前，就用手机扫二维码，批准完再回到 Wallet 把设置做完。银行如果在验证时锁了卡或账户，停下来，用银行官方 App 或卡面上的电话联系银行，说明你正在 Wallet 里添加或验证卡片，并给出时间和报错原文。卡或账户的限制由银行处理。

添加卡片只有一条入口规则：卡号、有效期和安全码只填在安全表单里。可以在 dot 对话里说 “Help me add a card to Wallet”，然后打开对话里的安全设置请求或链接；也可以在手机左侧导航打开 Settings，进入 Wallet，选择 Add Card。美国运通用的是卡正面的 4 位安全码。填完后阅读 ChatGPT Wallet terms 和 ChatGPT Wallet Privacy Notice，再选择 Add card。银行要求验证时，验证码同样只填在安全验证表单里。看到 Card added 之后再开始购买。拿不准有没有加上，先让 dot 列出已保存的卡，不要马上再加一次。

帮助中心还写，使用 Wallet 做信用卡交易必须遵守 OpenAI 的 Usage Policies。本文不转述那份政策和两份 Wallet 法律文件的条款，添加之前打开原文看。

## 一笔付款实际怎么走

帮助中心给的例子是，让 dot “Help me find a new sweater”，或者 “Book me a hotel for my trip to Chicago next weekend.” 到结账时，dot 会请你设置并使用 Wallet。这是帮助中心的示例说法。同一页的 FAQ 写明，Wallet 未必能在每一家店完成结账。

选好要买的东西之后，让 dot 完成购买。付款请求出现时按这四步：

1. 核对商家、商品、总额、选中的卡，以及页面上写出的运费或循环付款条款。商家如果还要姓名、电话、邮箱或账单、收货地址，这些可以在对话里提供。卡号、有效期和安全码仍然只进安全表单。
2. 选择 Approve，完成 Face ID 或 Touch ID。改变主意，就在批准前拒绝。
3. 当前设备不能做生物识别时，跟着链接或二维码，到登录同一 ChatGPT 账号的支持设备上继续。笔记本合着盖，先打开盖子，或改到支持的手机上批准。
4. 批准之后，dot 继续结账并回报结果。帮助中心写，此时 dot 使用一个挂在你所选卡片上的虚拟卡号完成结账，结账页填入的号码可以和实体卡不同。

Ready to check out 的意思要单独记。帮助中心写：它表示你的批准已经完成，不表示商家已经下单。结果不清楚时，先找商家的订单确认，再考虑重试。对话里的一句报错，既不能证明订单状态，也不能证明银行卡上的预授权何时释放。结账失败但卡上已经有一笔待处理扣款时，先问商家订单有没有成立，再问发卡行这笔预授权何时会去掉。

循环扣款和「再买一笔别的」不是同一条规则，两边都要看：

- 帮助中心：你如果同意了循环或持续付款方案，商家可以保存支付凭证，并按你同意的条款再次扣款。管理和取消都联系商家。
- 商家收款文档：客户只同意这一笔具体交易。不要把这次的支付凭证拿去另一笔单独的购买里复用或保存。
- 同一份商家文档：网站现有结账如果支持循环账单，可以用于订阅。要取得客户对循环扣款的同意，并遵守支付处理商对商户发起交易的做法。

保存卡片和批准购买也是两步。卡加上了，不等于后面每一笔自动通过。Wallet 里设的默认卡，和商家网站上曾经保存的付款方式，也是两套。批准前再看一次这次选中的是哪一张。

从 Wallet 里删掉一张卡，只影响以后的新付款。帮助中心写明，删除不会取消已经发生的购买，不会在银行销卡，也不会删除 Wallet 数据或 OpenAI 账号。已有订单、退款和循环扣款，仍然找商家。

出了问题，按帮助中心的分工联系，不要三边同时丢同一张卡的完整信息：

| 发生了什么 | 找谁 | 你要准备的 |
| --- | --- | --- |
| 订单状态、取消、退货、退款 | 商家，用收据或网站上的联系方式 | 商家按它自己的政策处理 |
| 被拒、待处理、争议、认不出的扣款，银行验证失败 | 发卡行，用官方 App 或卡面上的电话 | 认不出的扣款要尽快报 |
| Wallet 报错、怀疑 ChatGPT 账号被未经授权使用、买到的和批准的不一样 | OpenAI Support | 应用或浏览器及版本、时间和时区、报错原文、失败的那一步。结账问题再加上商家、金额、币种和订单号。截图里涂掉敏感信息 |

完整卡号、安全码、密码和银行验证码，不要发进聊天，也不要发进支持消息。批准前先确认你认识这笔购买、也信任这个商家。不认识就拒绝。

代理会去读网页。网页上的文字有可能把商品、数量或链接带偏，所以第 1 步必须是人眼核对，不能只看对话里的一句「可以付了」。如果你自己也在做能下单、能发信或能改权限的工具，付款这一类动作要有人工确认，做法见 [提示词注入怎么防](/posts/prompt-injection-defense-checklist/)。

## 卖家和站长这周该查什么

博客写，要收下 Wallet 的付款，网站得避免无意中把代理拦住，支付和风控系统也得认出代理做出的合法购买。OpenAI 同时发了 Commerce Partner Playbook。它说自己先从有限的 Pro 用户学真实使用，再和商家、银行、卡组织一起提高兼容性。

有的商家会选择拒绝。CNBC 报道，联合航空在该文刊出前的周三表示，将阻止代理接入其系统订票；亚马逊不允许代理在其平台上购买。官网没有把这两家写成 Wallet 的合作名单或例外名单。卖家要自己写下一句政策：允许代理代客结账，还是明确拒绝。两种都成立。别把所有代理流量当成欺诈，也别假设每家网站都会收下。

允许的话，按官方材料从这四件做起。

**先看网站会不会把云浏览器误拦。** 代理访问文档写，ChatGPT 的云浏览器本来就可以访问你的网站，不必先把它加进白名单。真正要查的是现有安全规则会不会无意中拦住已验证的访问。拦住了，再给已验证的访问做例外，其他安全控制留着。浏览器访问不要求插件，也不要求商品 feed。这件事和训练爬虫是分开的：文档写明，这类浏览器访问替用户办事，和 OpenAI 的网页爬虫（包括用于搜索的 OAI-SearchBot）不是同一类。robots.txt 里的训练偏好怎么写，见 [AI 训练偏好信号：robots.txt 现在该改哪几行](/posts/robots-txt-ai-training-preference/)。改训练偏好，代替不了下面的签名检查。

文档写，Akamai、Cloudflare、HUMAN 和 Vercel 会自动验证 ChatGPT 请求签名。其他 CDN 或防火墙要自己验 Web Bot Auth。签名请求带 `Signature`、`Signature-Input`，以及值恰好为 `"https://chatgpt.com"` 的 `Signature-Agent`，引号也要一致。公钥在 `https://chatgpt.com/.well-known/http-message-signatures-directory`，校验按 RFC 9421。先验证签名，再对签过名的浏览器请求做放行例外。

各家控制台里的名字不一样，按文档去搜：

- Cloudflare 有两条路。一条是 Security、Settings，筛 Bot traffic，打开 AI Crawler and Agent access policies，在 Personal Agents 里把 dots, OpenAI 设为 Allow。另一条是 WAF 自定义规则，Bot Detection ID 等于 `129220581`（目录里的名字是 ChatGPT Operator，bot tag 是 `chatgpt-agent`），对这个 ID 允许或跳过。
- Akamai 在 AI Fetchers and Agents 里用现有的 bot 名 ChatGPT Agent，类型选 Verified Bots，再在对应安全策略里把这个自定义类别设为 Allow。
- HUMAN 在 Known Bots & Crawlers 里搜 ChatGPT Agent。Vercel 用现有的 ChatGPT Agent 条目，标识是 `chatgpt-operator`；安全规则本身没有拦云浏览器的话，文档写不需要再加配置。

文档还写了两条边界。站点级例外可以覆盖全站，页面级的访问控制仍要留着。OpenAI 说，它目前还没有让单个站长规定「哪些动作必须再由人确认」的功能；对所有用户，重要动作在它自己的产品里仍要求人工复核。客服按顾客自己操作时的同一套流程处理。

**卖实物的，再认领商家并上传商品 feed。** 博客的顺序是：在 ChatGPT 里认领商家，验证通过后更新商家资料，并上传带当前价格和库存的商品 feed。Playbook 把商品 feed 标成适用于卖实物。Feed 指南写，可以在 Business Hub 开始；上传前要在商品区验证身份；选择销售的国家和币种；`item_id` 保持稳定；交付方式是手动上传、托管的 HTTPS 地址，或 SFTP。同一页写明，feed 不更新购物车，也不确认购买。顾客真的要下单时，仍由你的网站或插件核对当前报价。

**和支付、风控服务商谈代理结账。** 收款文档写，Wallet 可以沿用现有结账页和支付表单，不需要为 Wallet 单独做一套集成。业务方自己处理订单、履约、客服和欺诈决定。顾客在 ChatGPT 里核对并批准，你的结账页处理付款。你收到的是网络令牌，不是完整卡号；用 Payment Account Reference（PAR）把令牌和底层支付账户关联起来。顾客以前在你这里保存的卡可以继续用，Wallet 是另外一个付款选项。

风控系统如果主要靠 IP 和浏览器特征抓机器人，云浏览器可能被误伤，导致购买失败。OpenAI 正在通过 `Forwarded` HTTP 头传递用户侧信号，并写明信号会随逐步覆盖而变化。用第三方风控的，去问对方有没有吃进这些字段；自己做风控的，开始观察这个头。文档列出的字段是：

| 字段 | 文档里的含义 |
| --- | --- |
| `for` | 为这个 ChatGPT 用户观察到的 IP |
| `asn` | 该 IP 路由所属的自治系统号 |
| `ip-country` | 由该 IP 估计的两位国家代码 |
| `ip-prefix` | 该 IP 打码后的网段，CIDR 格式 |
| `locale` | 用户配置的语言标签 |
| `tz` | 用户配置的 IANA 时区 |
| `user-agent` | 用户浏览器或 App 的名称，可带版本和系统 |

表里的示例值是文档示例，不是你的访客日志。博客点名正在一起做识别的防欺诈伙伴有 Forter、Riskified、Sardine、Signifyd，支付服务商有 Adyen、Checkout.com、Stripe。你的服务商不在这份名单里，仍然要问它：合法的代理结账会不会被自动拒绝或自动取消。

**插件、WebMCP 和登录是可选的。** 博客写，可以做插件，让代理查库存、管理购物车或做其他动作；网站也可以加 WebMCP 工具。插件指南写，这是 MCP 服务器加上 skills，用结构化工具代替在浏览器里点页面。Dots 不支持基于 iframe 的 MCP UI。插件如果做不完某一步，返回 `continue_url`，让顾客回到网站继续。指南同时写明，第三方插件和 ChatGPT Wallet 之间的交互方式，他们还在做。结账需要账号时，Playbook 列出了 Sign in with ChatGPT。没有插件、没有 feed，已验证的云浏览器仍然可以按上面的访问说明打开网站。

## 这周可以做的事

按你属于哪一类，只做对应的那一组。

**符合条件的美国 Pro 用户**

1. 先对表：18 岁及以上、住在美国、ChatGPT Pro、美国发行的信用卡、美国账单地址。借记卡和自己的虚拟卡先排除。Chase 卡确认自己是主卡持卡人，手机上装好 Chase App。
2. 建好 dot，只在和 dot 的对话里找 Wallet。看不到，就停在这里，不要把卡号打进 Chat、Work 或 Codex。
3. 用 “Help me add a card to Wallet”，或手机 Settings、Wallet、Add Card，在安全表单里加卡。美国运通填正面 4 位码。等 Card added。银行要验证码，只填在验证表单里。
4. 第一笔购买前，读完商家、商品、总额、选中的卡、运费和任何循环条款，再做生物识别。看到 Ready to check out 之后，打开商家的订单确认，再决定要不要换一种方式重付。
5. 扣款对不上时，按上一节的表找商家、发卡行或 OpenAI。支持消息里不附完整卡号、安全码、密码和验证码。

**卖给美国客户的商家，或站可能被代理打开的独立开发者**

1. 写下允许还是拒绝。参考 CNBC 报道的联合航空和亚马逊：拒绝是一种明确政策，不是系统故障。
2. 允许的话，查 CDN 和防火墙有没有误拦已验证的云浏览器。Cloudflare 按上一节的两条路核对 dots, OpenAI 或检测 ID `129220581`。其他厂商先验 Web Bot Auth，再谈放行。训练爬虫的 robots.txt 另案处理。
3. 卖实物的，到 Business Hub 认领，验证身份后上传当前价格和库存，`item_id` 不要来回换。记住 feed 不确认订单。
4. 问支付和风控服务商两句：云浏览器结账会不会被自动拒绝；他们看不看 `Forwarded` 头。你拿到的是网络令牌，用 PAR 关联账户，不要指望收到完整卡号。
5. 有工程余量再做插件。插件和 Wallet 的衔接，官方写明还在做。结账必须登录时，再看 Sign in with ChatGPT。这周不必为了「可能有代理来」先把结账页重写一遍。

**其他人，包括现在用不上 Wallet 的中文读者**

1. 继续用 ChatGPT 查和比较。付款留在你已经信任的商家页面上，由人自己完成。
2. 不要为了试 Wallet 去办一张对不上账单地址的卡，也不要把卡号、安全码或银行验证码贴进任何对话。
3. 如果你的网站有美国顾客，做上面商家那一组，哪怕你自己的 ChatGPT 账号看不到 Wallet。
4. 团队留一句书面规则：查资料可以交给对话；付款、循环扣款和卡信息仍由人处理。官方博客里的消费上限、购买类别和时间段，是以后才期望开放的委托方式，这周不要写进流程。
5. 过一段时间再打开帮助中心看开放范围有没有变。本文的限额截止到 2026-11-14 看到的那一版。

## 不要默认成立的事

- 有限推送是官方的原话。美国 Pro 也不等于每个账号今天都能看见 Wallet。
- 帮助中心写，不是每一家店都能结账。失败时先查商家订单确认，再考虑换一种付款方式直接找商店。
- 借记卡不支持。用户自己的虚拟卡上线时不支持。替代卡号是批准之后才出现的结账凭证。
- Chat、Work、独立 Codex 对话里没有 Wallet。没有生物识别的设备，要换到同一账号的支持设备上批准。
- Ready to check out、对话里的成功语气、卡上的一笔待处理扣款，都不能单独证明商家已经接单。
- 删卡、换默认卡，都不取消已有订单。循环扣款按你同意过的方案，由商家再次收取。
- 完全交给代理、只靠消费上限自动买，是博客对以后的预期。现在每一笔仍要人做安全检查。
- 商家会不会放行，由商家决定。CNBC 报道的联合航空和亚马逊是拒绝的例子。风控误拦则是另一件事，要对着服务商查。
- 起步阶段不抽成，是 CNBC 的报道，不是 Wallet 博客上的条款。
- 卡奖励和符合条件的争议保护，按官方博客保留。能不能争议成功，由银行、卡组织和商家的规则决定。本文不补成功率。
- 1.2B 每周用户是官方博客的数字。接近 1 亿付费用户只记 CNBC。

## 常见问题

### 人在中国、用国内发行的卡，现在能用 ChatGPT Wallet 吗？

按 2026-11-14 核对的帮助中心，不能。使用者要是 ChatGPT Pro、年满 18 岁、住在美国，卡要是美国发行的美国运通、Chase、Mastercard 或 Visa 信用卡，并且账单地址在美国。人在中国、卡是国内银行发的，不在这组条件里。对话里看不到 Wallet，帮助中心写的是这个账号可能还没被放进来，不要把卡号发到聊天里试。

### 普通 Chat、Work 或 Codex 对话里能直接付款吗？

不能。帮助中心写明 Wallet 只在和 dot 的对话里使用，要先建好 dot。Chat、Work 和独立的 Codex 对话里没有 Wallet。当前设备做不了 Face ID 或 Touch ID 时，用链接或二维码到登录同一账号的支持设备上继续，笔记本合盖时先打开盖子，或改在支持的手机上批准。

### 借记卡、虚拟卡，或者已经用来付 ChatGPT 订阅的那张卡，能加进 Wallet 吗？

借记卡不支持。用户自己办的虚拟卡在上线时不支持，这和结账时支付网络给出的替代卡号是两回事。Wallet 里保存的卡，也和 ChatGPT 订阅的付款方式、礼品卡或预付余额分开。Chase 卡还必须是主卡持卡人，授权用户不行，设置时可能要在 Chase App 里批准连接。

### 我已经点了批准，或看到 Ready to check out，订单算商家接下了吗？

不算。帮助中心写明 Ready to check out 只表示你的批准已经完成，不表示商家已经下单。结果不清楚时，先查商家的订单确认，再决定要不要重试。取消已经完成的订单、退货和退款，联系商家。同意了循环或持续扣款方案之后，商家可以按约定再次扣款，也是找商家管理或取消。

### 网站想收下 Wallet 付款，这周最少要查什么？

先定政策：允许代理结账，还是像 CNBC 所报道的联合航空、亚马逊那样拒绝。允许的话，检查 CDN 或防火墙有没有误拦已验证的 ChatGPT 云浏览器；浏览器访问不要求先做插件或商品 feed。卖实物的，在 Business Hub 认领并验证后，再上传当前价格和库存。支付和风控如果把云浏览器当成机器人拒绝，要和你的服务商谈，官方点名的防欺诈伙伴包括 Forter、Riskified、Sardine、Signifyd，支付服务商包括 Adyen、Checkout.com、Stripe。

### 扣错、被拒，或者和我批准的内容不一样，该找谁？

订单状态、取消、退货、退款找商家。被拒、待处理、争议、认不出的扣款，以及银行验证问题，找发卡行。Wallet 报错、怀疑有人未经授权进入 ChatGPT 账号，或者买到的和你批准的不一样，找 OpenAI Support。完整卡号、安全码、密码和银行验证码只填在安全表单里，不要发进聊天或支持消息。

## 信息来源

- OpenAI 官方博客：[Introducing ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet)（2026-11-13）。每周 1.2B 用户、与 American Express、Mastercard、Visa 合作、每笔安全检查、支付令牌、奖励和符合条件的争议保护、商家仍掌握定价与履约、以后的消费上限和类别、认领商家与商品 feed、Web Bot Auth、Forter、Riskified、Sardine、Signifyd、Adyen、Checkout.com、Stripe、插件与 WebMCP，以及美国 18 岁及以上 Pro 的起步范围，以这篇为准。
- OpenAI 帮助中心：[Making purchases with ChatGPT Wallet](https://help.openai.com/en/articles/20001654-making-purchases-with-chatgpt-wallet)（本文于 2026-11-14 核对）。Pro 推送、看不到则可能尚未开放、仅 dot 对话、Chat / Work / 独立 Codex 不可用、美国居住与美国账单地址、美国运通 / Chase / Mastercard / Visa 信用卡、借记卡和虚拟卡、生物识别与换设备、安全表单、Chase App、Ready to check out、循环扣款、删除卡片，以及商家 / 发卡行 / OpenAI 的分工，以这篇为准。
- OpenAI 商家手册总览：[Partner Playbook Overview](https://developers.openai.com/commerce/guides/overview)（2026-11-14 核对）。商品 feed 适用于卖实物、浏览器访问、收款、插件、Sign in with ChatGPT 和认领商家的分工，以这篇为准。
- OpenAI 收款说明：[Accept payments](https://developers.openai.com/commerce/guides/accept-payments)（2026-11-14 核对）。现有结账页可用、不强制单独集成、`Forwarded` 头、网络令牌与 PAR、循环账单要另获同意、支付凭证不得用于另一笔单独购买，以这篇为准。
- OpenAI 插件说明：[Build a plugin](https://developers.openai.com/commerce/guides/build-a-plugin)（2026-11-14 核对）。MCP 与 skills、Dots 不支持 iframe MCP UI、`continue_url`，以及插件和 Wallet 的交互仍在做，以这篇为准。
- OpenAI 代理访问：[Help ensure cloud browser access to your site](https://developers.openai.com/commerce/agent-access)（2026-11-14 核对）。不必预先加白名单、Cloudflare 的 dots, OpenAI 与检测 ID `129220581`、Akamai / HUMAN / Vercel 的 bot 名、Web Bot Auth 与 RFC 9421、和 OAI-SearchBot 的区分，以这篇为准。入口说明见 [Help ensure cloud browser access](https://developers.openai.com/commerce/guides/enable-browser-access)。
- OpenAI 认领商家：[Claim your business](https://developers.openai.com/commerce/guides/create-business-profile)。商品 feed 的身份验证、国家和币种、稳定的 `item_id`，以及 feed 不确认订单，见 [Submit product feeds](https://developers.openai.com/commerce/guides/submit-product-feeds)（2026-11-14 核对）。
- CNBC，Ashley Capoot：[OpenAI launches ChatGPT Wallet, allowing its 'dots' AI agents to make purchases for users](https://www.cnbc.com/2026/11/13/openai-chatgpt-wallet-dot-purchases.html)（2026-11-13，10:00 AM EST）。Chaya Nayak 与 Luke Gebb 的采访、起步阶段不抽成、Instant Checkout 的转向、接近 1 亿付费用户，以及联合航空与亚马逊拒绝代理，只以这篇报道为准，不上升为官方条款。
