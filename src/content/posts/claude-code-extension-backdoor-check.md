---
title: "Claude Code 扩展 2.1.313 被篡改：先自查再继续用"
description: "2026 年 10 月 29 日，Cursor 扩展市场出现被篡改的 Claude Code 2.1.313，最多影响 5,000 人。本文给出官方自查命令、清理与凭据轮换步骤，并说明 Open VSX 是否受影响仍无定论。"
pubDate: 2026-10-30T12:00:00+08:00
topic: ai-tools
tags: ["Claude Code", "Cursor", "供应链", "扩展安全"]
keyword: "Claude Code 扩展 2.1.313 自查"
author: "AI 效能实验室"
draft: false
aiGenerated: false
faq:
  - q: "我只在网页里用 Claude，没有装编辑器扩展，要处理吗？"
    a: "这次公告的检查对象是 Cursor 扩展市场里的 anthropic.claude-code 2.1.313。只在网页里用 Claude、没有装过这个扩展的人，不在公告写明的范围内。Cursor 写明没有证据表明该扩展的其他版本或官方分发受影响。OpenSourceMalware 的现稿把 npm 上的 @anthropic-ai/claude-code 和微软商店里的 Claude 扩展列为不是恶意的。这两句都只覆盖它们写到的范围。"
  - q: "自查命令显示 No key found，是不是就可以继续用了？"
    a: "这条命令只回答一件事：authorized_keys 里有没有注释为 svc-telemetry 的公钥。公告把没找到解释为这台机器未被这把公钥命中。如果你确认在太平洋时间 10 月 29 日约 2:27 到下午 1:35 之间安装或更新过 2.1.313，再按公告里的文件清单看一遍 LaunchAgent、.smt 和 Windows 计划任务 SysMon。扩展列表里已经不是这个版本号，不能代替这次检查，因为只卸载扩展可能清不掉单独留下的持久化脚本。"
  - q: "只卸载扩展，或者等 Cursor 发邮件，够不够？"
    a: "不够代替自查。Cursor 写明会直接联系受影响的用户，上限是 5,000 人，但没收到邮件不能证明没装过。公告同时写明：只卸载扩展可能不够，载荷会留下仍在运行的持久化脚本。找到公钥或相关文件后，用公告页面上的清理脚本，并从另一台可信电脑轮换这台机器能碰到的凭据和会话。"
  - q: "Open VSX、npm 和官方 Claude Code 是不是也被植入了？"
    a: "Cursor 市场里的 2.1.313 被篡改，这是 Cursor 自己确认的，并写明该版本不是 Anthropic 开发的。Open VSX 是否分发过同一恶意包，Phorion 称 Open VSX 上的包被篡改，OpenSourceMalware 的现稿又把 OpenVSX 版本列为不是恶意的，CellCog 的整理则写成两边都有。截至本文核对的这几份材料，没有 Anthropic 的公开声明。本文不对 Open VSX 下结论。用 Open VSX 装扩展的人，仍可以用同一条公钥检查看一眼。"
  - q: "要不要把 AI 编程工具全部停掉？"
    a: "先查清这台电脑有没有 2.1.313 的痕迹，再决定这一个扩展。Cursor 写明审计后没有其他扩展被篡改，也没有证据表明其他版本或官方分发受影响。停掉全部工具，查不出是哪一次安装带来的问题。团队这周要做的是锁版本、关掉扩展自动更新、写下允许安装的扩展清单，并检查 authorized_keys。"
---

2026 年 10 月 29 日，Cursor 的 VS Code 扩展市场里出现了一个被篡改的扩展版本：`anthropic.claude-code` 2.1.313。Cursor 官方安全公告写明，这个版本不是 Anthropic 开发的。它会在扩展加载时收集主机和用户信息，尝试把攻击者的 SSH 公钥写进 `authorized_keys`，尝试打开本机 SSH、建立反向 SSH 隧道，并在 macOS 上用 LaunchAgent、在 Windows 上用计划任务做持久化。

这件事和「聊天记录泄不泄密」不是同一类问题。扩展跑在你的电脑上，用的是你登录这台电脑的权限。下面只写 Cursor 公告里已经确认的事实，以及本文打开核对过的三份分析。Open VSX 是否也受影响，各方说法不一致，放在后面单独说，本文不下结论。自查命令和清理脚本以 Cursor 公告为准。团队平时怎么管编程助手的权限，可以对照 [AI 编程助手选型与团队落地规范](/posts/ai-coding-assistant-team-guide/)。

## 公告确认了什么

Cursor 公告把时间窗口写成：太平洋时间 10 月 29 日大约凌晨 2:27 到下午 1:35，这个被篡改的版本在 Cursor 的扩展市场里可以装到。受影响的用户最多 5,000 人，Cursor 会直接联系。最多 5,000 是上限，不是已经逐台确认的感染人数。没收到邮件，不能代替自己跑下面的命令。

公告写明他们做了这些事：发现后立即下架该版本并阻止继续分发；出于谨慎把整个 VS Code 扩展市场关掉；审计访问后确认没有其他扩展被篡改；轮换了密钥，重建市场并重新上线；与托管这家攻击者服务器的云厂商合作，把服务器下线。公告写：攻击者服务器不再工作，反向 shell 和主机信息的 POST 已经不能用。服务器下线清掉的是对面的接收端。已经写进你电脑里的公钥和持久化脚本，不会因为对面关机就消失。

公告同时写了两条边界。一是这些发现针对的是已经确认的那个包，他们没有证据表明该扩展的其他版本或官方分发受影响。二是在多数 macOS 和 Windows 上，打开本机 SSH 服务需要管理员权限，恶意扩展没有这个权限，这一步会失败，攻击者因此不能经隧道登录。扩展仍然会写入攻击者的公钥、安装持久化、把主机信息送出去。所以不论你觉得隧道有没有建成，公告都要求按清理步骤做。

另一句也要一起读。公告在描述「写入公钥、打开 SSH、建立反向隧道」时写到：除了 Cursor 以管理员权限启动这种极不寻常的情况，由于恶意代码自身的错误，这一步会失败。后面的注释又写明公钥、持久化和回传仍然会发生。处理时以「公钥和持久化可能已经留下、隧道在多数 Mac 和 Windows 上登不进去」为准，不要把两句收成「完全没影响」或「一定已经被登录」。

## 这 66 行在加载时做了什么

OpenSourceMalware（Paul McCarty / 6mile）对这份产物的分析是：恶意代码是插在 `extension.js` 最前面的 66 行加载器，后面才是原来的扩展。扩展模块一加载就会执行，用户不必先开始一段 Claude 对话。他们还写到，扩展会在编辑器启动之后、以及它的 webview 打开时加载这份文件；包里没有 install、postinstall 这类安装钩子，恶意行为发生在扩展运行时，不是发生在包管理器安装的那一下。同一篇文章写：解开的扩展和正常版本一样，附带的二进制也是官方二进制，不一样的只有 `extension.js`。绝大多数异常被吞掉，所以正常功能还可以继续加载，界面看起来没有坏。

Phorion 的通告把同一结构写成：注入的代码在 Node 加载该文件时就执行，早于扩展正常的 `activate`。用户不必和扩展交互。CellCog 的整理用的也是这个顺序：66 行在前，真正的扩展在后，编辑器仍然能正常用。

加载之后做什么，以 Cursor 公告列出的行为为准，研究方的文字用来把「收集了哪些名字」说具体：

- 收集主机和用户信息：主机名、用户名、操作系统、架构、home 路径、环境变量名、工作目录、Git 配置里的邮箱，以及公网 IP。OpenSourceMalware 和 Phorion 进一步写明，送出去的是环境变量的名字而不是值，名字要匹配 KEY、TOKEN、SECRET、PASS、AWS、GCP 这类词，最多 40 个。Git 邮箱来自 `git config --global user.email`。公网 IP 是通过 ifconfig.me，失败再问 api.ipify.org。Cursor 写明，这两个是正常服务，单凭访问过它们不能当成中招指标。
- 尝试把攻击者控制的 SSH 公钥追加到 `authorized_keys`。公钥注释是 `svc-telemetry`。OpenSourceMalware 给出的指纹是 `SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk`，与 Cursor 公告里的未授权公钥指纹相同。不要把公告里的整行公钥复制进 `authorized_keys`。那一行是攻击者的公钥，复制进去等于自己写入后门。只用来搜索。
- 尝试打开本机 SSH 服务，并建立反向 SSH 隧道。隧道指向的地址，公告和研究方写的都是 `134.209.82.225`，用户名是 `tunnel`，端口是 TCP 22。后台脚本大约每 60 秒重试一次。Phorion 写这个重试循环是脱离编辑器运行的，关掉 IDE 之后它还可以在。
- 持久化：macOS 用用户级 LaunchAgent，标签和文件名是 `com.apple.sysmond`，路径是 `~/Library/LaunchAgents/com.apple.sysmond.plist`。OpenSourceMalware 写明这个名字容易看成系统组件，但它不是 Apple 的组件。Windows 尝试建立以 SYSTEM 运行的计划任务 `SysMon`，失败则退到启动文件夹里的 `sysmon.cmd`。研究方还描述了 Linux 分支：用户 crontab 里的 `@reboot`，以及 `~/.config/.smt`。Cursor 公告给出的安装包哈希只有 darwin-arm64 和 win32-x64 两份，清理脚本也是 macOS 和 Windows。Linux 路径来自研究方对脚本的描述，不是公告里的第三份安装包。
- 通过 HTTP POST 把主机信息和后门状态送到 8099 端口的 `/beacon`。外部地址是 `134.209.82.225:8099`，另外还会向本机 `127.0.0.1:8099` 投一次。Phorion 写本地这次投递的原因从样本里看不出来，脚本本身没有在该端口上听。响应被丢掉，这一阶段没有「服务器回什么就执行什么」的逻辑。OpenSourceMalware 写，注入的这一段不会再下载别的可执行文件；隧道如果真的接通，之后的操作不会出现在这份静态样本里。

Phorion 对「为什么 macOS 上常常开不了 SSH」给了一个更细的解释：脚本用 `systemsetup -getremotelogin` 看远程登录是不是 Off，但普通用户运行时，系统打出来的是需要管理员权限的报错，不是 Off，于是打开远程登录的那一步经常被跳过。他们同时写明，不能拿这个错误当防御。远程登录如果本来就是开着的，或者以后被打开，已经写入的公钥就在。Windows 路径上，Phorion 写有一处把命令固定成 `/bin/sh`，在普通 Windows 上走不远。这些是研究方的分析。要不要清理，以 Cursor 那句「仍然会写入公钥、安装持久化、回传主机信息，所以无论如何按步骤做」为准。

Phorion 还写，Linux 上检查 crontab 的逻辑有问题，重复运行时可能清掉用户原来的 cron 任务。使用 Linux 且在窗口内装过该扩展的人，除了搜 `svc-telemetry`，还应该看自己的 crontab 是否还在。本文不提供 Linux 清理脚本。公告页面上没有 Linux 版脚本。有疑问写给 security@cursor.com，不要运行从别处拷来的同名脚本。

## 对正在用 AI 编程的人意味着什么

AI 编程扩展不是网页里的对话框。Phorion 写：Open VSX 一类的注册表把扩展提供给兼容 VS Code 的编辑器，扩展以 IDE 和当前用户的权限运行，模块一加载就能碰到本地文件、源代码和开发工具。CellCog 的概括是同一件事：这类扩展几秒就能装上，还可以静默更新，权限却是开发者本人的 SSH 密钥、云凭据和仓库。这次被收走的具体字段以公告为准，不是「整个硬盘」。字段里已经有主机名、用户名、home 路径、工作目录和 Git 邮箱。环境变量进 beacon 的是名字。名字足够让对方知道这台机器上配过哪些云、哪些令牌类型，从而决定先看谁。

Cursor 写明，有限的环境变量收集不能排除后来经后门碰到凭据。所以「beacon 里没有密钥的值」和「这台电脑上的令牌可以不换」是两件不同的事。多数 Mac 和 Windows 上隧道登不进去，缩小的是「对方已经交互登录」这一支，没有取消公钥、持久化和主机信息这三支。

供应链上的具体信号是版本号。CellCog 在 2026 年 10 月 30 日 06:45 UTC 核对了 Open VSX、VS Code 市场和 npm：三处都没有 2.1.313，下一版是 2.1.314。他们写 2.1.314 在大约一小时内出现在这三处，并给出时间：npm 上 2.1.314 是 10 月 30 日 00:12 UTC，Open VSX 是 01:07 UTC，VS Code 市场是 01:17 UTC；2.1.312 在 Open VSX 是 10 月 27 日 20:26 UTC，在 npm 是 10 月 27 日 18:36 UTC。版本从 2.1.312 直接跳到 2.1.314。跳号本身不是感染证明，它是更新前要停一下、先看公告的理由。CellCog 还写，Open VSX 页面上的下载量是这个扩展的历史总量，不是 2.1.313 的安装人数。目前公开的人数上限只有 Cursor 写的最多 5,000。

界面还能聊天，也不能当干净的证明。研究方写错误被吞掉，正常扩展继续加载。你昨天用它改完的代码，不能反过来证明加载器没有跑过。

## 怎样判断自己有没有装过 2.1.313

公告的适用范围是一句人话：2026 年 10 月 29 日，太平洋时间大约凌晨 2:27 到下午 1:35，你从 Cursor 的扩展市场安装或更新到了 `anthropic.claude-code` 2.1.313。自动更新也可能在你没有点安装按钮的情况下换版本，所以「我没手动装过」不能跳过检查。

先在本机搜扩展目录名。公告写的文件夹是 `anthropic.claude-code-2.1.313-darwin-arm64`（macOS）或 `anthropic.claude-code-2.1.313-win32-x64`（Windows）。这两个目录里的 `extension.js` 若含有 `134.209.82.225` 和 `svc-telemetry`，就是公告里的被修改代码。目录现在已经不在，只能说明当前磁盘上没有这个文件夹，不能说明昨天没有加载过。公钥和持久化不跟着卸载一起走。

然后跑公告里的公钥检查。macOS 在终端执行：

```bash
grep -qs svc-telemetry ~/.ssh/authorized_keys && echo "svc-telemetry key found" || echo "No key found; machine not impacted"
```

Windows 在 PowerShell 执行：

```powershell
$files = "$HOME\.ssh\authorized_keys", "C:\ProgramData\ssh\administrators_authorized_keys" | Where-Object { Test-Path $_ }
if ($files -and (Select-String svc-telemetry $files)) { "svc-telemetry key found" } else { "No key found; machine not impacted" }
```

`svc-telemetry key found` 表示找到了这把公钥，按受影响处理。`No key found; machine not impacted` 表示没找到，公告把这台机器视为未被这把公钥命中。Phorion 提醒，样本在写入前检查的是注释字符串 `svc-telemetry` 在不在，所以排查时最好同时核对指纹 `SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk`，不要只依赖注释。团队以后做的对比，应该是「`authorized_keys` 里每一行是不是都在已知清单上」，而不是永远只搜这一个词。

在窗口内安装或更新过、但命令显示没有公钥的人，再对一下公告列出的文件。macOS：`~/.config/.smt`、`~/.config/.smtk`、临时目录里的 `.stk_` 加 10 位十六进制、`~/Library/LaunchAgents/com.apple.sysmond.plist`。Windows：`%USERPROFILE%\.config\smt.cmd`、`%USERPROFILE%\.config\smtk`、`%TEMP%` 下的 `.stk_` 加 10 位十六进制、计划任务 `SysMon`、启动文件夹里的 `sysmon.cmd`。进程特征在公告的 Process 一节，包括 `ssh`、`autossh`，以及创建计划任务 `SysMon` 的命令。有公司的终端和网络日志时，按 [线上出故障先查什么](/posts/incident-troubleshooting-log-metrics-trace/) 的顺序，先确认有没有连向 `134.209.82.225` 的 22 或 8099 端口，再收窄到具体电脑。没有这套日志的个人，就用上面的命令和文件清单，一台一台看。

公告还公布了两份被修改安装包的 SHA-256，便于和你留下的 VSIX 对照，不必靠文件名：

| 公告中的包 | SHA-256 |
| --- | --- |
| darwin-arm64 | `432ccdee3801f99e52b8fe31f69ea9870118e96ea7ef9ecabed1479621b5ab62` |
| win32-x64 | `3de1722901165769893bef57c72594e9a54459faa23f3091b136b79966edd081` |

OpenSourceMalware 和 Phorion 对所分析的 `extension.js` 给出的 SHA-256 都是 `ecb58cb29078d9646ad1dcdbe51526f2d9cfea06be5fb2ab183e8ecc3ab6bf15`。这是他们分析的那份文件的哈希，不是本文重新计算的，也不能代替公告里的两份 VSIX 哈希。MD5 和其他进程特征以公告页面为准。

## 清理、轮换凭据，以及要不要重做系统

命令找到公钥，或你看到上表那些文件：先把这台电脑从网络里隔离开，再做清理。公告对窗口内安装或更新过的人给了五步：跑检查；在端点、网络和扩展安装记录里搜指标；隔离有载荷执行或后门安装痕迹的主机；用清理脚本去掉未授权公钥、持久化和正在跑的隧道进程，并评估要不要重做这台机器；从一台可信的系统轮换受影响主机上能访问到的凭据和会话。只卸载扩展可能不够。

清理脚本只从 Cursor 公告页面下载，不使用转贴的副本。macOS 下载 `remediate-macos.sh`，在保存它的目录里，用受影响的那个用户执行，不要用 root：

```bash
bash remediate-macos.sh
```

Windows 下载 `remediate-windows.ps1`，用「以管理员身份运行」打开的 PowerShell，在脚本所在目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\remediate-windows.ps1
```

公告写这两个脚本会去掉恶意扩展、持久化、正在运行的隧道进程和攻击者的公钥；如果还有残留，退出码不是 0。退出码不是 0 就不要当成已经干净。

轮换在另一台没有这个问题的电脑上做。公告没有说下列各项一定已经被读走。它要求轮换，是因为这台主机上能碰到的凭据和会话都在范围内，而且有限的环境变量名收集不能排除后门事后碰到它们。对照时看这几类：用来推代码的 SSH 密钥和代码托管网站的访问令牌、浏览器里的仓库与云控制台登录、云 CLI 的访问密钥、编辑器账号和包管理器登录态。环境变量名字里出现过 KEY、TOKEN、SECRET、PASS、AWS、GCP 的那些服务，优先换。换完之后，旧钥匙在确认新机器或新密钥可用后再作废。重做系统时，密钥不要用网盘从旧盘拷走，按 [新电脑开发环境初始化](/posts/new-machine-dev-setup/) 的做法重新签发。

要不要重做系统，公告的用词是「评估」。OpenSourceMalware 写得更直接：重做主机，比假定删掉已知文件就恢复信任更稳妥，因为这条植入打开的是通往 SSH 的交互路径，磁盘上看到的文件不一定是全部。能碰到生产密钥或客户数据的电脑，按重做来计划。只放过个人草稿、检查和脚本都干净、也没有上述文件的，再决定继续使用。本文不替你做这个判断。

## 团队层面的扩展管理

一个人的电脑查完，小团队还剩四件可以这周定下来的事。不需要新买一套安全产品才能做。谁来维护这份清单，可以放进 [3-10 人小团队工具链](/posts/small-team-toolchain-setup/) 里已有的工具表，单独加一行「编辑器扩展」。

第一，锁版本。把正在用的扩展 ID 和版本号写进共享文档，例如 `anthropic.claude-code` 当前允许的版本。更新前先看版本是不是从上一号连续增加。这次公开注册表上是从 2.1.312 跳到 2.1.314，中间的 2.1.313 就是问题版本。跳号时先读发布方公告，再决定装不装。Cursor 没有把 2.1.314 写成一份逐行审计报告，只写了没有证据表明其他版本或官方分发受影响。离开 2.1.313，更新前再打开一次公告。

第二，关掉扩展自动更新。在 Cursor 或 VS Code 的设置里搜索扩展自动更新并关掉，改成有人看过版本号再装。VS Code 系编辑器里对应的设置项是 `extensions.autoUpdate`。公告的范围写成「安装或更新」，不只是亲手点一次安装。关掉自动更新，是为了让下一次版本变化先经过人眼。这次包是怎么进到具体某一台电脑的，公告没有按「手动」和「自动」拆开统计，本文也不补这个数字。

第三，白名单。允许安装的扩展 ID 写在同一份文档里。清单外的扩展，先由一个人看过来源和版本再装。这次市场里的名字是 Anthropic，版本号也像正常更新。名字对，不能代替版本核对。Cursor 审计后确认没有其他扩展被篡改，这个结论覆盖的是他们查过的那次市场，不是以后每一个新扩展。

第四，监控 `authorized_keys`。每台开发电脑留一份已知公钥清单，定期和 `~/.ssh/authorized_keys` 对比，多出来的行要能说出是谁的钥匙。这次可以先跑公告里的 `svc-telemetry` 检查，再把指纹 `SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk` 放进搜索。只搜这一个注释，会漏掉以后换了注释的同类问题，这是 Phorion 在这次样本上指出的。另外不要为了省掉权限弹窗，用管理员身份启动编辑器。公告把「以管理员权限启动 Cursor」写成极不寻常的情况。

代码仍然要有人看再合并。扩展出问题的那几天，助手改过的补丁不因为「当时能跑」就免审。审查清单见 [AI 代码评审怎么用才不出事](/posts/ai-code-review-workflow/)。

## Open VSX 与官方渠道：分歧先摆在这里

Cursor 市场上的 2.1.313 被篡改，这是 Cursor 公告确认的，没有分歧。有分歧的是：同一个版本号在 Open VSX、npm 和微软的 VS Code 市场里，到底有没有以恶意形式存在过。截至本文核对，Anthropic 没有公开声明。下面四份材料各自的说法并列，不合成一个结论。

Cursor 公告写的是自己的扩展市场。该版本不是 Anthropic 开发的。他们没有证据表明其他版本或官方分发受影响。本文打开公告时，正文没有对 Open VSX 作出是或否的结论。

Phorion 在 2026 年 10 月 30 日的通告里写：他们在 Open VSX 上的官方 Claude Code 扩展包中发现了后门，并称 Anthropic 已撤下 Open VSX 上的相关版本，同时从 NPM 和 VS Code 市场撤下了 2.1.313。通告的分析重点在 macOS，并写到脚本里同时有 Linux 和 Windows 的逻辑。

OpenSourceMalware 的文章顶部有一条更新：Cursor 联系了他们，并告知 Cursor 市场里的 Claude Code 扩展当天发生了某种形式的入侵，这才是恶意扩展的来源，不是 Open-VSX。正文把三件东西列为不是恶意的：npm 上的 `@anthropic-ai/claude-code`、OpenVSX 上的扩展、微软商店里的 Claude 扩展。同一篇文章又写：所分析目录的来源没有确立；这些发现说明这份特定产物是恶意的，但单凭这些不能证明 Anthropic 的官方市场发布或分发基础设施被入侵。文末还写，分发来源、攻击者身份和任何官方发布的状态都尚未核实，不应从包装上的品牌去推断。文首更新和文末「来源未核实」都在这篇现稿里，本文两句都保留。

CellCog 在 2026 年 10 月 30 日的整理里，把 2.1.313 写成同时出现在 Open VSX 和 Cursor 市场，并称 OpenSourceMalware 是在 Open VSX 上发现的。这和 OpenSourceMalware 现稿里「OpenVSX 不是恶意的」那条更新并不一致。CellCog 还写，研究方不知道包是怎么发出去的，只知道 Open VSX 的发布账号属于一名 Anthropic 员工，这名员工未必被入侵。本文核对 OpenSourceMalware 的当前文章时，没有读到「员工账号」这句。因此它是 CellCog 的转述，不是本文从 OpenSourceMalware 现稿里读到的事实，不把它当成已经核实。CellCog 写他们没有找到 Anthropic、Open VSX 或 Eclipse Foundation 的声明。他们还写，第一条被较多人看到的警告是 10 月 30 日 03:33 UTC 的一则 X 帖子。这个时间本文没有另作换算。

可以执行的部分并不依赖把分歧判完。Cursor 市场在该窗口内装过或更新过 2.1.313 的，按公告检查。使用从 Open VSX 安装扩展的编辑器的人，CellCog 点了 VSCodium 和 Windsurf，Phorion 也写 Open VSX 会把扩展提供给 Cursor 和 Windsurf。在 Open VSX 这件事有统一说法之前，用同一条公钥检查看一眼。看一眼不是认定 Open VSX 被植入，而是在说法不一致时少做一个「肯定没有」的假设。npm 上的包，OpenSourceMalware 现稿写不是恶意的；Phorion 写 2.1.313 被从 NPM 撤下；CellCog 写 npm 上没有 2.1.313 的发布时间记录。三句可以同时为真或互相冲突，本文不选一句当作终局。

## 这周可以执行的决定

窗口、版本和上限都有出处，检查动作也有命令，所以这周的决定可以写成三句。

在太平洋时间 10 月 29 日约 2:27 到下午 1:35 之间，从 Cursor 扩展市场安装或更新过 `anthropic.claude-code` 2.1.313 的电脑，今天跑公告里的 macOS 或 Windows 命令。出现 `svc-telemetry key found`，或看到 `com.apple.sysmond`、`.smt`、计划任务 `SysMon`：断开网络，只从公告页面下载对应脚本并运行，退出码不是 0 就继续查残留，然后从另一台电脑轮换这台机器能碰到的凭据。能碰到生产或客户数据的，评估重做系统。攻击者服务器已经下线，不能代替这三步。

命令显示 `No key found`，并且公告列出的文件也不在：公告把这台机器视为未被这把公钥命中。扩展若还停在 2.1.313，先卸掉这个版本。CellCog 看到的下一公开版本是 2.1.314。Cursor 的原话是没有证据表明其他版本或官方分发受影响。更新前再看一次公告，而不是把 2.1.314 理解成已经由本文审计过。

没用过这个扩展、只在网页里使用 Claude 的人，不必因为标题重装系统。团队无论查没查到公钥，都把四条习惯定下来：写下允许的扩展和版本、关掉 `extensions.autoUpdate`、清单外的扩展先审批、用已知公钥清单对比 `authorized_keys`。人数依据只有一个公开数字：Cursor 写的最多 5,000 名用户。它够用来说明「不是个例演示」，不够用来推算你的公司有几台中招。有几台，要跑命令才知道。

## 常见问题

### 我只在网页里用 Claude，没有装编辑器扩展，要处理吗？

不必按这次公告重装系统。检查对象是 Cursor 扩展市场里的 `anthropic.claude-code` 2.1.313。Cursor 写明没有证据表明其他版本或官方分发受影响。OpenSourceMalware 的现稿把 npm 包和微软商店里的 Claude 扩展列为不是恶意的。

### 自查命令显示 No key found，是不是就可以继续用了？

命令只说明 `authorized_keys` 里没有 `svc-telemetry` 这把公钥。确认自己在那个时间窗口安装或更新过 2.1.313 的，再看公告里的 LaunchAgent、`.smt` 和 `SysMon`。这些都不在，才符合公告对「未被这把公钥命中」的说法。只看扩展列表里的当前版本号不够，因为卸载可能清不掉持久化脚本。

### 只卸载扩展，或者等 Cursor 发邮件，够不够？

不够代替自查。Cursor 会直接联系，上限 5,000 人。公告写明只卸载扩展可能不够。找到痕迹后使用公告上的脚本，并从另一台可信电脑轮换凭据和会话。

### Open VSX、npm 和官方 Claude Code 是不是也被植入了？

Cursor 市场里的这个版本被篡改，且不是 Anthropic 开发的，这是公告确认的。Open VSX 是否受影响，Phorion、OpenSourceMalware 现稿和 CellCog 的说法不一致。这几份材料里没有 Anthropic 的公开声明。本文不下结论。从 Open VSX 装扩展的，可以用同一条公钥检查。

### 要不要把 AI 编程工具全部停掉？

先查 2.1.313 的痕迹。Cursor 写明没有其他扩展在那次审计中被篡改。停掉全部工具并不能代替公钥检查。接下来锁版本、关自动更新、使用白名单，并对比 `authorized_keys`。

## 信息来源

- Cursor 官方安全公告：[Security notice — malicious version of Anthropic.claude-code (2.1.313)](https://cursor.com/blog/claude-code-extension-security-notice)（页面标注 2026-10-29）。时间窗口、最多 5,000 名用户、不是 Anthropic 开发的、收集的字段、持久化方式、约 60 秒重试、`/beacon`、服务器下线、管理员权限导致开 SSH 失败、只卸载扩展可能不够、自查命令、清理脚本、VSIX 的 SHA-256、密钥轮换与市场重建，均以这篇为准。脚本请从该页下载。联系邮箱是 security@cursor.com。
- OpenSourceMalware：[Trojanized Claude Code Extension Plants an SSH Backdoor](https://opensourcemalware.com/blog/trojanized-claude-code-extension-plants-persistent-ssh-backdoor)（Paul McCarty / 6mile；页面时间为 2026-10-30）。66 行加载器、不必开始对话、`extension.js` 的 SHA-256、环境变量只上报名字、OpenVSX 与 npm 在现稿中被列为不是恶意的、文首关于 Cursor 市场而非 Open-VSX 的更新，以及文末「分发来源尚未核实」。
- Phorion：[Official Claude Code Extension Compromise](https://phorion.io/blog/offical-claude-code-vsx-compromise/)（Calum Hall，2026-10-30）。Open VSX 上的包被篡改这一说法、macOS 上 `systemsetup` 判断被跳过、Windows 路径中的 `/bin/sh`、Linux crontab 可能被清掉、反向隧道在 IDE 关闭后仍可运行、排查时核对指纹而不只核对注释。URL 中的 offical 是对方页面的拼写。
- CellCog：[Claude Code Extension Backdoored on Open VSX and Cursor](https://cellcog.ai/blog/claude-code-extension-backdoor/)（Nitish Garg，2026-10-30）。三处注册表从 2.1.312 跳到 2.1.314 的核对时间 06:45 UTC、各版本时间戳、下载量不是感染人数、未见 Anthropic / Open VSX / Eclipse Foundation 声明，以及对 OpenSourceMalware 发现位置的转述。其中「发布账号属于 Anthropic 员工」只出现在这篇整理里，OpenSourceMalware 现稿中本文没有读到。

公告若在本文之后更新了命令或脚本，以公告页面上的版本为准。本文没有引用上述四篇之外的报道，也没有把 Open VSX 是否受影响写成定论。
