#!/usr/bin/env node
/**
 * AI 内容生成引擎
 * ---------------------------------------------------------------
 * 流程：读取已有文章 → LLM 选题 → 过滤重复 → LLM 写稿 → 规则校验 → 写入 Markdown
 * 无 LLM Key 时给出明确提示并退出（避免污染仓库内容）。
 *
 * 用法：
 *   npm run gen            # 生成 site.content.postsPerRun 篇
 *   npm run gen:seed       # 冷启动：一次生成 3 倍数量
 *   npm run gen:dry        # 只输出选题与统计，不落盘
 *   node scripts/generate-content.mjs --count=5 --topic=ai-tools
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chat, llmConfigured, llmInfo } from './lib/llm.mjs';
import {
  parseFrontmatter,
  stringifyFrontmatter,
  countWords,
  toSlug,
  readDirFiles,
  ensureDir,
  similarity,
} from './lib/util.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');
const CACHE_DIR = path.join(ROOT, '.content-cache');

const { site } = await import(path.join(ROOT, 'site.config.mjs'));

// ---------- 参数 ----------
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const arg = (name, def) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : def;
};

const seedMode = has('--seed');
const dryRun = has('--dry-run');
const topicFilter = arg('topic', '');
const count = Number(arg('count', seedMode ? site.content.postsPerRun * 3 : site.content.postsPerRun));

const today = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: site.timezone });

// ---------- 读取已有内容 ----------
function loadExisting() {
  return readDirFiles(POSTS_DIR).map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    const { data } = parseFrontmatter(raw);
    return {
      file,
      slug: path.basename(file).replace(/\.mdx?$/, ''),
      title: data.title ?? '',
      keyword: data.keyword ?? '',
      topic: data.topic ?? '',
    };
  });
}

const existing = loadExisting();
const existingTitles = existing.map((e) => e.title).filter(Boolean);
const existingKeywords = existing.map((e) => e.keyword).filter(Boolean);
const existingSlugs = new Set(existing.map((e) => e.slug));

// ---------- Prompt ----------
const SYSTEM = `你是一位资深的中文 SEO 内容编辑和技术写作者，服务于一个内容站点。
你的写作原则：
1. 只写真正有用的内容：给出可执行的步骤、具体的工具名、真实的操作路径，拒绝空话套话。
2. 结构清晰：多级小标题、列表、对比表格，必要时给出配置示例或代码。
3. 事实谨慎：不确定的价格、配额、版本信息必须标注"截至写作时"或"请以官网为准"，绝不编造精确数字。
4. 不写任何关于"我是 AI""本文由人工智能生成"的字样。
5. 严格按要求的 JSON 结构输出，不要输出 JSON 之外的内容。`;

function topicBrief() {
  return site.niche.topics
    .map((t) => `- ${t.slug}（${t.name}）：${t.description}`)
    .join('\n');
}

function ideaPrompt() {
  return `站点定位：${site.niche.brief}
目标读者：${site.niche.audience}
站点语气：${site.niche.tone}

可用栏目（topic 必须使用下列 slug 之一）：
${topicBrief()}

长尾关键词种子（仅供参考，需要扩展出更具体、更有长尾价值的角度）：
${site.niche.keywordSeeds.join('、')}

已经写过的文章标题（严禁重复或高度相似）：
${existingTitles.length ? existingTitles.map((t) => `- ${t}`).join('\n') : '-（暂无，本站处于冷启动阶段）'}

已经用过的核心关键词（严禁重复）：
${existingKeywords.length ? existingKeywords.join('、') : '（无）'}

请产出 ${Math.max(count * 3, 6)} 个新的文章选题，要求：
- 每个选题瞄准一个具体的搜索意图（对比、教程、选型、避坑、清单、评测）
- 优先选择竞争度低、意图明确的长尾角度
- 标题要具体、有信息量，避免"XX 大全"这类空泛标题

返回 JSON：{"ideas":[{"title":"","keyword":"","topic":"","angle":"一句话说明这篇文章解决什么问题"}]}`;
}

function articlePrompt(idea) {
  const topicInfo = site.niche.topics.find((t) => t.slug === idea.topic);
  return `请撰写一篇完整的中文文章。

标题：${idea.title}
核心关键词：${idea.keyword}
所属栏目：${idea.topic}${topicInfo ? `（${topicInfo.name}）` : ''}
写作重点：${idea.angle}
站点定位：${site.niche.brief}
目标读者：${site.niche.audience}
语气：${site.niche.tone}

硬性要求：
1. 正文 Markdown 格式，不要输出文章标题（H1），从正文段落开始。
2. 至少 5 个二级标题（##），结构完整，逻辑递进；适当使用三级标题。
3. 正文字数不少于 ${site.content.minWords} 字（中文按字统计），内容要扎实，不要为凑字数注水。
4. 必须包含一个对比表格或清单表格（用 Markdown 表格语法）。
5. 最后必须有 "## 常见问题" 章节，下面用 3-4 个三级标题（###）形式列出问答。
6. slug 必须是英文小写、用连字符分隔、不超过 6 个单词，体现核心关键词的英文含义。
7. description 是搜索结果摘要，60-160 字，要包含核心关键词且有吸引力，不要写成标题的复述。
8. tags 给 3-5 个中文标签。
9. faq 与正文"常见问题"章节保持一致，3-4 条。

返回严格 JSON：
{
  "title": "",
  "slug": "",
  "description": "",
  "keyword": "",
  "tags": [],
  "topic": "",
  "faq": [{"q": "", "a": ""}],
  "body": "Markdown 正文"
}`;
}

// ---------- 校验 ----------
function validate(article) {
  const errors = [];
  if (!article.title || article.title.length < 6) errors.push('标题过短');
  if (article.title && article.title.length > 60) errors.push('标题超过 60 字');
  if (!article.description || article.description.length < 50)
    errors.push('description 少于 50 字');
  if (article.description && article.description.length > 165)
    errors.push('description 超过 165 字');
  if (!article.body || countWords(article.body) < site.content.minWords)
    errors.push(`正文字数不足（${countWords(article.body || '')} < ${site.content.minWords}）`);
  if (!site.niche.topics.some((t) => t.slug === article.topic))
    errors.push(`topic 非法：${article.topic}`);
  if (!/^##\s/m.test(article.body || '')) errors.push('缺少二级标题');
  if (!/##\s*常见问题/.test(article.body || '')) errors.push('缺少"常见问题"章节');
  if (!Array.isArray(article.faq) || article.faq.length < 3) errors.push('FAQ 少于 3 条');
  if (/我是(一个)?(AI|人工智能)|本文由.{0,6}(AI|人工智能)生成/.test(article.body || ''))
    errors.push('出现 AI 自我声明内容');
  return errors;
}

// ---------- 主流程 ----------
async function planIdeas() {
  const res = await chat({
    system: SYSTEM,
    user: ideaPrompt(),
    temperature: 0.9,
    maxTokens: 2048,
    json: true,
  });
  const ideas = Array.isArray(res?.ideas) ? res.ideas : [];
  const usable = ideas.filter((i) => i?.title && i?.keyword && i?.topic);

  // 去重：标题相似度 / 关键词重复
  const fresh = usable.filter((i) => {
    const dupTitle = existingTitles.some((t) => similarity(t, i.title) > 0.72);
    const dupKeyword = existingKeywords.some(
      (k) => k === i.keyword || similarity(k, i.keyword) > 0.85
    );
    return !dupTitle && !dupKeyword;
  });

  return topicFilter ? fresh.filter((i) => i.topic === topicFilter) : fresh;
}

async function writeArticle(idea) {
  let lastErrors = [];
  for (let attempt = 1; attempt <= 3; attempt++) {
    const article = await chat({
      system: SYSTEM,
      user:
        articlePrompt(idea) +
        (attempt > 1
          ? `\n\n上一次生成未通过校验，问题如下，务必修正：${lastErrors.join('；')}`
          : ''),
      temperature: 0.8,
      maxTokens: 6000,
      json: true,
    });

    article.topic = site.niche.topics.some((t) => t.slug === article.topic)
      ? article.topic
      : idea.topic;
    const errors = validate(article);
    if (errors.length === 0) return { article, attempt };
    lastErrors = errors;
  }
  return null;
}

function persist(article) {
  let slug = toSlug(article.slug || article.keyword || article.title, `post-${Date.now()}`);
  let n = 2;
  while (existingSlugs.has(slug)) slug = `${slug}-${n++}`;
  existingSlugs.add(slug);

  const frontmatter = {
    title: article.title,
    description: article.description,
    pubDate: today(),
    topic: article.topic,
    tags: article.tags ?? [],
    keyword: article.keyword,
    author: site.author.name,
    draft: false,
    aiGenerated: true,
    faq: article.faq ?? [],
  };

  const content = `${stringifyFrontmatter(frontmatter)}\n\n${article.body.trim()}\n`;
  if (!dryRun) {
    ensureDir(POSTS_DIR);
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), content, 'utf8');
  }
  return { slug, words: countWords(article.body) };
}

async function main() {
  ensureDir(CACHE_DIR);
  console.log('─'.repeat(60));
  console.log(`站点：${site.title}  赛道：${site.niche.name}`);
  console.log(`已有文章：${existing.length} 篇   本次目标：${count} 篇${dryRun ? '（dry-run）' : ''}`);

  if (!llmConfigured()) {
    console.error('\n✗ 未检测到 LLM_API_KEY。');
    console.error('  本地：export LLM_API_KEY=sk-xxx  （可选 LLM_BASE_URL / LLM_MODEL）');
    console.error('  GitHub Actions：在仓库 Settings → Secrets 添加 LLM_API_KEY。');
    process.exit(1);
  }
  console.log(`模型：${llmInfo().model}  @  ${llmInfo().baseUrl}`);

  const ideas = await planIdeas();
  console.log(`\n选题池：${ideas.length} 个可用选题`);
  ideas.slice(0, count + 2).forEach((i, idx) => {
    console.log(`  ${idx + 1}. [${i.topic}] ${i.title}  ← ${i.keyword}`);
  });

  if (dryRun) {
    console.log('\ndry-run 模式，未写入文件。');
    return;
  }

  const results = [];
  const targets = ideas.slice(0, count);

  for (const idea of targets) {
    process.stdout.write(`\n生成中：《${idea.title}》... `);
    try {
      const out = await writeArticle(idea);
      if (!out) {
        console.log('✗ 三次校验未通过，跳过');
        results.push({ title: idea.title, ok: false, reason: '校验未通过' });
        continue;
      }
      const saved = persist(out.article);
      console.log(`✓ ${saved.words} 字 → src/content/posts/${saved.slug}.md`);
      results.push({ title: idea.title, slug: saved.slug, words: saved.words, ok: true });
    } catch (err) {
      console.log(`✗ ${err.message}`);
      results.push({ title: idea.title, ok: false, reason: err.message });
    }
  }

  const okCount = results.filter((r) => r.ok).length;
  fs.writeFileSync(
    path.join(CACHE_DIR, 'last-run.json'),
    JSON.stringify({ ranAt: new Date().toISOString(), results }, null, 2)
  );

  console.log('\n' + '─'.repeat(60));
  console.log(`完成：成功 ${okCount} / ${targets.length}`);
  if (okCount === 0) {
    console.error('本次没有产出任何文章，已写入 .content-cache/last-run.json 供排查。');
    process.exit(2);
  }
}

main().catch((err) => {
  console.error('\n生成流程异常：', err.message);
  process.exit(1);
});
