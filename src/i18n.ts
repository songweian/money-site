export type Lang = 'zh' | 'en';

/** 这些地区默认中文，其余地区默认英文。手动选择会覆盖。 */
export const ZH_REGIONS = ['CN', 'TW', 'HK', 'MO'];

export function barePath(pathname: string): string {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const rest = pathname.replace(/^\/en/, '') || '/';
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname || '/';
}

export function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}

export function withLocale(lang: Lang, pathname: string): string {
  let path = barePath(pathname);
  if (path !== '/' && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/';
  if (lang === 'zh') return path;
  return path === '/' ? '/en/' : `/en${path}`;
}

export const topics: Record<Lang, Record<string, { name: string; description: string }>> = {
  zh: {
    'ai-tools': { name: 'AI 工具评测', description: '主流 AI 工具的真实评测、定价对比与选型建议' },
    automation: { name: '自动化工作流', description: '用 n8n、Make、GitHub Actions 等把重复工作自动化' },
    prompt: { name: '提示词工程', description: '可直接复制的提示词模板与调优方法' },
    productivity: { name: '效率方法论', description: '个人与团队效能提升的系统方法与工具链' },
    devops: { name: '开发与运维', description: '开发者效率工具、部署与运维实践' },
  },
  en: {
    'ai-tools': {
      name: 'AI Tools',
      description: 'Hands-on reviews and practical ways to choose AI tools',
    },
    automation: {
      name: 'Automation',
      description: 'Workflows with n8n, Make, and GitHub Actions',
    },
    prompt: {
      name: 'Prompts',
      description: 'Prompt templates you can copy, test, and reuse',
    },
    productivity: {
      name: 'Productivity',
      description: 'Methods and toolchains for individuals and small teams',
    },
    devops: {
      name: 'Dev & Ops',
      description: 'Setup, deployment, and performance practices',
    },
  },
};

export const ui = {
  zh: {
    siteTitle: 'AI 效能实验室',
    siteDescription:
      'AI 效能实验室专注评测 AI 工具、自动化工作流与效率提升方法，每天更新真实可落地的实操教程、横向对比与避坑指南。',
    tagline: '用 AI 工具把工作效率翻倍的实战指南',
    language: '语言',
    home: '首页',
    about: '关于',
    search: '搜索',
    topics: '栏目',
    navAi: 'AI 工具',
    navAutomation: '自动化',
    navPrompt: '提示词',
    readLatest: '阅读最新文章',
    subscribe: '订阅 RSS',
    articles: '篇深度文章',
    topicCount: '个专题栏目',
    daily: '每日',
    dailyHint: '自动更新',
    latest: '最新文章',
    browseTopics: '查看全部栏目 →',
    browseByTopic: '按专题浏览',
    emptyPosts: '还没有文章。',
    publishedOn: '发布于',
    updatedOn: '更新于',
    toc: '本文目录',
    faq: '常见问题',
    related: '相关阅读',
    ad: '广告',
    skip: '跳到主要内容',
    footerAbout: '关于',
    copyright: '本站内容由 AI 辅助生成并经人工流程校验',
    postsUnit: '篇',
    aboutTitle: '关于我们',
    contactTitle: '联系我们',
    privacyTitle: '隐私政策',
    searchTitle: '站内搜索',
    notFoundTitle: '页面不存在',
  },
  en: {
    siteTitle: 'AI Efficiency Lab',
    siteDescription:
      'Hands-on reviews of AI tools, automation workflows, and productivity methods, with practical guides updated every day.',
    tagline: 'Practical guides for getting more done with AI',
    language: 'Language',
    home: 'Home',
    about: 'About',
    search: 'Search',
    topics: 'Topics',
    navAi: 'AI Tools',
    navAutomation: 'Automation',
    navPrompt: 'Prompts',
    readLatest: 'Read the latest',
    subscribe: 'RSS',
    articles: 'in-depth articles',
    topicCount: 'topics',
    daily: 'Daily',
    dailyHint: 'updates',
    latest: 'Latest articles',
    browseTopics: 'Browse topics →',
    browseByTopic: 'Browse by topic',
    emptyPosts: 'No articles yet.',
    publishedOn: 'Published',
    updatedOn: 'Updated',
    toc: 'On this page',
    faq: 'FAQ',
    related: 'Related reading',
    ad: 'Ad',
    skip: 'Skip to content',
    footerAbout: 'About',
    copyright: 'Drafted with AI and checked before publishing',
    postsUnit: 'articles',
    aboutTitle: 'About',
    contactTitle: 'Contact',
    privacyTitle: 'Privacy policy',
    searchTitle: 'Search',
    notFoundTitle: 'Page not found',
  },
} as const;
