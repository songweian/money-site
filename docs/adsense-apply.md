# AdSense 申请与接入指南

> 说明：AdSense 账号注册与审核必须在你本人的 Google 账号下完成（涉及身份验证、税务信息与收款账户），
> 任何自动化工具都无法代替。本文档把「需要你手动点」的部分压到最少，其余全部已由脚本与站点模板就绪。

## 一、申请前自检（本站已完成项）

| 检查项 | 状态 |
| --- | --- |
| 站点可公开访问 | ✅ https://loc.opengear.org |
| 隐私政策页 | ✅ /privacy/（含 Cookie 与广告说明） |
| 联系方式页 | ✅ /contact/ |
| 关于页 | ✅ /about/ |
| ads.txt | ✅ /ads.txt（拿到 ID 后由脚本自动填真值） |
| sitemap / robots / RSS | ✅ 均已生成 |
| 原创内容量 | ⚠️ 目标 10-20 篇后再提交，通过率显著更高 |
| 页面无死链、无空洞占位 | ✅ 构建时 SEO 自检已校验 |

## 二、提交申请（约 10 分钟）

1. 打开 https://www.google.com/adsense 用你的 Google 账号登录。
2. 填写**网站网址**：`https://loc.opengear.org`（不要带路径）。
3. 选择国家或地区、接受条款，提交。
4. 系统会给出一段**验证代码**，两种用法任选：
   - 推荐：在 Google 后台复制 `google-site-verification` 的 content 值，填进 `site.config.mjs` 的
     `analytics.googleSiteVerification`，然后 `git push`（CI 自动部署）。
   - 或：不做验证，等 AdSense 审核时由审核员自行访问（稍慢）。
5. 填写收款信息（地址、税务表单、付款方式）—— 这部分必须本人完成。

## 三、审核期间

- 通常 **1-2 周**，快则 2-3 天。期间保持站点每天有新内容最好（本站每日自动生成）。
- 常见拒因：内容过少、内容非原创、页面未完成（有占位符/死链）、缺少隐私政策、违反内容政策。
- 被拒后可在后台查看原因，整改后**重新提交**，没有次数限制。

## 四、审核通过后：创建广告单元

1. AdSense 后台 → **广告 → 按广告单元 → 展示广告**，创建单元：
   - 建议创建 2 个：`文章内广告`（in-article，自适应）与 `展示广告`（display，自适应）。
   - 尺寸一律选**自适应（Responsive）**，移动端表现最好。
2. 创建完成后会给出**广告单元 ID**（10 位左右数字）。

## 五、一键接入（拿到 ID 后）

```bash
# 只填发布商 ID
node scripts/enable-ads.mjs ca-pub-1234567890123456

# 连同广告单元一起填
node scripts/enable-ads.mjs ca-pub-1234567890123456 \
  --slot-inArticle=1234567890 \
  --slot-header=0987654321

# 填完立刻构建并部署
node scripts/enable-ads.mjs ca-pub-1234567890123456 --slot-inArticle=1234567890 --deploy
```

脚本会自动：开启 `site.ads.enabled`、写入 client 与 slot ID、更新 `public/ads.txt`，
然后 `git push` 或直接 `--deploy` 即可上线。广告一般在几分钟内开始展示。

## 六、上线后

- **不要自己点自己的广告**，也不要让同事点，会导致账号被封。
- 前 1-2 周收入很低是正常的，收入随内容量与收录量增长。
- AdSense 后台可开启**自动广告（Auto Ads）**，把 `site.ads.autoAds` 设为 `true` 可让 Google 自行挑选位置。
- 建议同时提交 sitemap 到 Google Search Console：https://search.google.com/search-console
