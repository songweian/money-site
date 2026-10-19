/**
 * 站点总配置 —— 改这一个文件就能换赛道（niche）、换域名、开关广告。
 * 生成脚本、SEO 组件、GitHub Actions 全部读取此处配置，无硬编码。
 */

export const site = {
  // ===== 基础信息 =====
  title: 'AI 效能实验室',
  tagline: '用 AI 工具把工作效率翻倍的实战指南',
  description:
    'AI 效能实验室专注评测 AI 工具、自动化工作流与效率提升方法，每天更新真实可落地的实操教程、横向对比与避坑指南。',
  // 生产域名（Cloudflare Pages 自定义域）
  url: 'https://loc.opengear.org',
  lang: 'zh-CN',
  locale: 'zh_CN',
  timezone: 'Asia/Shanghai',
  author: {
    name: 'AI 效能实验室',
    title: '编辑部',
  },

  // ===== 赛道 / 选题引擎配置 =====
  niche: {
    name: 'AI 工具与效率提升',
    // 内容生成时使用的领域描述，越具体，AI 产出的文章越聚焦
    brief:
      '面向中文互联网从业者与中小企业主，聚焦 AI 工具评测、自动化工作流、提示词工程、效率软件横向对比，强调真实可落地的操作步骤与数据对比。',
    // 固定栏目（每个栏目都会持续产出内容，形成专题页聚合）
    topics: [
      { slug: 'ai-tools', name: 'AI 工具评测', description: '主流 AI 工具的真实评测、定价对比与选型建议' },
      { slug: 'automation', name: '自动化工作流', description: '用 n8n、Make、GitHub Actions 等把重复工作自动化' },
      { slug: 'prompt', name: '提示词工程', description: '可直接复制的提示词模板与调优方法' },
      { slug: 'productivity', name: '效率方法论', description: '个人与团队效能提升的系统方法与工具链' },
      { slug: 'devops', name: '开发与运维', description: '开发者效率工具、部署与运维实践' },
    ],
    // 长尾关键词种子：生成引擎会围绕这些种子不断扩展变体
    keywordSeeds: [
      'AI 工具推荐',
      '免费 AI 工具',
      'AI 写作工具对比',
      'AI 办公自动化',
      'n8n 自动化教程',
      'ChatGPT 提示词模板',
      'AI 效率提升方法',
      'AI 工具性价比',
      'AI 批量生成内容',
      '小团队 AI 提效方案',
      'AI 自动回复邮件',
      'AI 数据整理工具',
    ],
    audience: '中小企业主、运营/市场从业者、独立开发者、想用 AI 提效的职场人',
    tone: '专业但不端着，讲人话，重实操，每个结论都要有可执行的步骤或数据支撑',
  },

  // ===== 内容生产策略 =====
  content: {
    postsPerRun: 1, // 每次自动化运行生成的文章数（建议 1-3，稳定养站）
    minWords: 1400, // 正文最低字数门槛，低于此值判定为不合格并重试
    maxInternalLinks: 5,
    language: 'zh-CN',
  },

  // ===== 广告变现 =====
  ads: {
    enabled: true,
    // AdSense 发布商 ID
    client: 'ca-pub-7888423026579133',
    slots: {
      header: '',
      inArticle: '',
      sidebar: '',
      footer: '',
    },
    // 未创建广告单元时由这段脚本走自动广告，Google 自行选位置
    autoAds: true,
  },

  // ===== 站点运营 =====
  nav: [
    { href: '/', label: '首页' },
    { href: '/topics/ai-tools/', label: 'AI 工具' },
    { href: '/topics/automation/', label: '自动化' },
    { href: '/topics/prompt/', label: '提示词' },
    { href: '/about/', label: '关于' },
  ],
  footerLinks: [
    { href: '/about/', label: '关于我们' },
    { href: '/privacy/', label: '隐私政策' },
    { href: '/contact/', label: '联系我们' },
    { href: '/rss.xml', label: 'RSS' },
  ],
  // 社交/外链（可留空）
  social: {
    github: '',
    x: '',
  },
  // ICP / 版权信息（国内备案需要）
  icp: '',
  copyrightHolder: 'AI 效能实验室',

  // ===== 统计与站长工具 =====
  analytics: {
    // Cloudflare Web Analytics 的 token（免费、无 Cookie，合规压力小）
    cloudflareToken: '',
    // Google Search Console 验证码（<meta name="google-site-verification">）
    googleSiteVerification: '',
    // 百度站长验证码
    baiduSiteVerification: '',
  },
};

export default site;
