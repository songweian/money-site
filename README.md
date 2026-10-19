# money-site · AI 全自动运维的 SEO 内容站

一套「AI 写稿 → GitHub 版本管理 → Cloudflare Pages 自动部署 → 广告变现」的无人值守内容站。
配置好密钥之后，每天会自动选题、写稿、校验、发布，不需要人工干预。

## 架构

```
┌──────────────┐   定时触发    ┌───────────────────┐
│ GitHub       │ ───────────▶ │ 内容生成引擎        │  选题 → 写稿 → 规则校验
│ Actions      │              │ scripts/generate   │  字数/结构/去重/FAQ
└──────┬───────┘              └─────────┬─────────┘
       │ 提交 Markdown                   │ 写入 src/content/posts
       ▼                                ▼
┌──────────────┐   git push    ┌───────────────────┐
│ 仓库 main    │ ───────────▶ │ Cloudflare Pages  │  自动构建 → 全球 CDN
└──────────────┘              └─────────┬─────────┘
                                        │
                                        ▼
                              搜索引擎收录 → 自然流量 → 广告收入
```

技术选型：**Astro 5**（纯静态输出，Lighthouse 接近满分）+ **GitHub Actions**（调度与 CI）+ **Cloudflare Pages**（托管与 CDN）。

## 目录结构

```
site.config.mjs              # 站点总配置：换赛道、换域名、开关广告，改这里
src/content/posts/           # 文章（Markdown，AI 生成 + 人工可改）
src/pages/                   # 路由：首页/文章/栏目/搜索/RSS/robots
src/components/              # 广告位、面包屑、卡片、结构化数据
scripts/generate-content.mjs # 内容生成引擎
scripts/seo-audit.mjs        # 构建产物 SEO 自检
.github/workflows/           # 每日生成 + CI 校验
```

## 快速开始

```bash
npm install
npm run dev          # 本地预览 http://localhost:4321
npm run build        # 构建到 dist/
npm run seo:audit    # 构建后 SEO 自检
```

## 一、配置你的赛道（重要）

所有内容策略集中在 `site.config.mjs` 的 `niche` 字段，换赛道只需改这几项：

| 字段 | 作用 |
| --- | --- |
| `niche.name` / `brief` | 领域定位，直接决定 AI 写什么 |
| `niche.topics` | 栏目（会生成栏目聚合页，利于收录） |
| `niche.keywordSeeds` | 长尾关键词种子，AI 会围绕它不断扩展 |
| `niche.audience` / `tone` | 目标读者与文风 |
| `content.postsPerRun` | 每次生成篇数（建议 1-3，稳定养站） |
| `content.minWords` | 正文字数门槛，不达标会重写 |

## 二、接入 AI 模型（内容生成的燃料）

支持任何 **OpenAI 兼容**接口（OpenAI / DeepSeek / 通义 / Moonshot / Groq）。

**本地**：复制 `.env.example` 为 `.env` 并填入，或

```bash
export LLM_API_KEY=sk-xxx
export LLM_BASE_URL=https://api.deepseek.com   # 可选
export LLM_MODEL=deepseek-chat                 # 可选
npm run gen          # 生成 1 篇
npm run gen:seed     # 冷启动：一次生成 3 篇
npm run gen:dry      # 只看选题，不落盘
node scripts/generate-content.mjs --count=5 --topic=ai-tools
```

**线上（GitHub Actions）**：仓库 `Settings → Secrets and variables → Actions` 添加
`LLM_API_KEY`（必填）、`LLM_BASE_URL`、`LLM_MODEL`、`ALERT_WEBHOOK`（可选，失败告警）。

## 三、部署到 Cloudflare Pages（已上线）

**线上信息**

| 项目 | 值 |
| --- | --- |
| 生产域名 | https://loc.opengear.org |
| Pages 项目 | `money-site` |
| 默认地址 | https://money-site-4g0.pages.dev |
| Cloudflare 账户 | `REDACTED_CF_ACCOUNT_ID` |

部署方式为 **GitHub Actions + wrangler 直接上传**：push 到 `main` 后，CI 自动构建 → SEO 自检 → 部署上线。
DNS 由 Cloudflare 自动管理（`loc.opengear.org` CNAME 到 `money-site-4g0.pages.dev`，已开启代理与自动证书）。

**自动化部署依赖的 Secrets**（已配置，换机器时需重新填写）：
`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。

**手动部署**（本地也想发一次时用）：

```bash
export CLOUDFLARE_API_TOKEN=xxx
npm run build
npx wrangler@latest pages deploy dist --project-name money-site --branch main
```

（域名已固化在 `site.config.mjs` 的 `url` 字段，canonical、sitemap、RSS 全部指向它。）

## 四、收款：接入 AdSense

1. **申请**：见 [docs/adsense-apply.md](docs/adsense-apply.md)。注册与审核必须本人在 Google 账号下完成（涉及身份与收款），
   建议内容到 10-20 篇后再提交，通过率显著更高。
2. **接入**（拿到发布商 ID 后一条命令）：

```bash
node scripts/enable-ads.mjs ca-pub-1234567890123456 --slot-inArticle=1234567890 --deploy
```

脚本会自动开启 `site.ads.enabled`、写入 client 与广告单元 ID、更新 `public/ads.txt`，并可选择直接部署。
3. 广告位已内置在：文章头部、正文下方、栏目页、页脚；拿到 ID 前显示占位块，不影响收录。

> 提示：本站模板已包含隐私政策页（AdSense 审核必要条件）。国内主体备案通过后还可接入百度联盟等补充收入。

## 五、让搜索引擎找到你

- 站点已内置 `sitemap-index.xml`、`robots.txt`、`RSS`、面包屑与 Article/FAQ 结构化数据。
- Google Search Console：提交 sitemap，把验证码填入 `site.analytics.googleSiteVerification`。
- 百度站长平台：提交 sitemap，验证码填入 `site.analytics.baiduSiteVerification`（国内流量主要来源）。
- Cloudflare Web Analytics：免费且无 Cookie，token 填入 `site.analytics.cloudflareToken` 即可自动注入。

## 六、自动化节奏

- `.github/workflows/daily-content.yml`：每天北京时间 09:00 自动生成 → 构建 → SEO 自检 → 提交 → 触发部署。
- `.github/workflows/ci.yml`：任何推送/PR 都跑构建与 SEO 自检。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 构建 |
| `npm run seo:audit` | SEO 自检（会输出到 `.content-cache/seo-report.json`） |
| `npm run gen` | 生成文章（需 LLM_API_KEY） |
| `npm run gen:dry` | 只看选题 |

## 免责声明

站内内容由 AI 辅助生成并经过规则校验，涉及价格、配额、政策等易变信息请以官方来源为准。
收到纠错反馈后请及时修正。
