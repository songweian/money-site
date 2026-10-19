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

## 三、部署到 Cloudflare Pages

1. 推送代码到 GitHub（见下方命令）。
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**，选中本仓库。
3. 构建配置：

   | 项目 | 值 |
   | --- | --- |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | 环境变量 `NODE_VERSION` = `22` |

4. 部署完成后把 `site.config.mjs` 的 `url` 改成真实域名（`*.pages.dev` 或自定义域）。
5. 自定义域：Pages 项目 → Custom domains → 按指引接入（域名 NS 托管到 Cloudflare 最省事）。

之后每次 push，Pages 会自动重新构建部署；每日定时任务生成内容并提交后，同样会自动上线。

## 四、收款：接入 AdSense

1. 站点有 **10-20 篇**原创内容、且能正常访问后再申请，通过率显著更高。
2. 申请地址：Google AdSense → 提交站点 → 等待审核（通常 1-2 周）。
3. 通过后：
   - 把 `site.ads.enabled` 改为 `true`
   - 填入 `site.ads.client`（形如 `ca-pub-1234567890123456`）
   - 在 AdSense 后台创建广告单元，把单元 ID 填进 `site.ads.slots` 对应位置
   - 在 `public/ads.txt` 中取消注释并填入发布商 ID
4. 广告位已内置在：文章头部、正文下方、栏目页、页脚。

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
