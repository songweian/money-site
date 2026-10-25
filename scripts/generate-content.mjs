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
const EN_DIR = path.join(ROOT, 'src/content/en');
const CACHE_DIR = path.join(ROOT, '.content-cache');
const ZH_TITLE_MAX = 70 - ' | AI 效能实验室'.length;
const EN_TITLE_MAX = 70 - ' | AI Efficiency Lab'.length;

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
const existingSlugs = new Set([
  ...existing.map((e) => e.slug),
  ...readDirFiles(EN_DIR).map((file) => path.basename(file).replace(/\.mdx?$/, '')),
]);
let recentNotes = '';

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
- 每个选题必须落在「最近两周正在发生的 AI 变化」上：新模型、新价格、新接口、新政策或新的工作流做法
- 角度仍是读者这周能执行的一件事（对比、试用步骤、选型、避坑），不要写成只有口号的新闻稿
- 优先使用下面提供的近期公开讨论；没有出处的发布日期、价格和基准分数不要编
- 标题要具体，避免「AI 大全」

近期公开讨论（来自 Hacker News 近两周，仅供选题，事实仍要谨慎）：
${recentNotes || '-（暂未拉到，请只写你能标明日期的变化）'}

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
4. 标题不超过 ${ZH_TITLE_MAX} 个字符，否则加上站点名后会超过搜索结果标题限制。
5. 必须包含一个对比表格或清单表格（用 Markdown 表格语法）。
6. 最后必须有 "## 常见问题" 章节，下面用 3-4 个三级标题（###）形式列出问答。
7. slug 必须是英文小写、用连字符分隔、不超过 6 个单词，体现核心关键词的英文含义。
8. description 是搜索结果摘要，60-160 字，要包含核心关键词且有吸引力，不要写成标题的复述。
9. tags 给 3-5 个中文标签。
10. faq 与正文"常见问题"章节保持一致，3-4 条。
11. 价格、发布日期、基准分数没有把握就写成「以官网当前说明为准」，不要编造精确数字。近期讨论只作线索：
${recentNotes || '（无）'}

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
  if (article.title && article.title.length > ZH_TITLE_MAX)
    errors.push(`标题超过 ${ZH_TITLE_MAX} 字（加上站点名后搜索标题会超过 70）`);
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

function countEnWords(md) {
  const text = String(md)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|~\[\]]/g, ' ');
  return (text.match(/[A-Za-z]+/g) || []).length;
}

function validateEn(article) {
  const errors = [];
  if (!article.title || article.title.length < 8 || article.title.length > EN_TITLE_MAX)
    errors.push(`英文标题需在 8-${EN_TITLE_MAX} 个字符`);
  if (!article.description || article.description.length < 50 || article.description.length > 165)
    errors.push(`英文 description 长度需在 50-165（当前 ${article.description?.length || 0}）`);
  if (countEnWords(article.body) < 320)
    errors.push(`英文正文偏短（约 ${countEnWords(article.body || '')} 词）`);
  if (/^##\s*faq\b/im.test(article.body || '')) errors.push('英文正文不要写 FAQ 标题');
  if (!Array.isArray(article.faq) || article.faq.length < 3) errors.push('英文 FAQ 少于 3 条');
  return errors;
}

function englishPrompt(article) {
  return `Rewrite the Chinese article below as a shorter English article for the same readers.
Keep the same facts. Do not invent prices, dates, or benchmark scores that are not in the Chinese text.
If a number is uncertain in the source, say to check the vendor page.

Constraints:
- title: at most ${EN_TITLE_MAX} characters, specific, no site name suffix
- description: 50-165 characters
- body: Markdown, no H1, at least 4 level-2 headings, at least 320 English words, include one Markdown table
- do not add a FAQ heading in the body
- faq: 3 or 4 items, each answer at least 10 characters, matching the article
- tags: 3-5 short English tags
- keyword: a short English search phrase

Chinese title: ${article.title}
Chinese body:
${article.body}

Return JSON: {"title":"","description":"","keyword":"","tags":[],"faq":[{"q":"","a":""}],"body":""}`;
}

async function writeEnglish(article) {
  let lastErrors = [];
  for (let attempt = 1; attempt <= 3; attempt++) {
    const en = await chat({
      system:
        'You are a practical editor. Write useful English, with steps and named tools. No phrase about being an AI. Output JSON only.',
      user:
        englishPrompt(article) +
        (attempt > 1 ? `\n\nFix these problems: ${lastErrors.join('; ')}` : ''),
      temperature: 0.5,
      maxTokens: 5000,
      json: true,
    });
    const errors = validateEn(en);
    if (errors.length === 0) return en;
    lastErrors = errors;
  }
  return null;
}

function persistEnglish(slug, article) {
  const frontmatter = {
    title: article.title,
    description: article.description,
    pubDate: today(),
    topic: article.topic || 'ai-tools',
    tags: article.tags ?? [],
    keyword: article.keyword,
    author: 'AI Efficiency Lab',
    draft: false,
    aiGenerated: true,
    faq: article.faq ?? [],
  };
  const content = `${stringifyFrontmatter(frontmatter)}\n\n${article.body.trim()}\n`;
  if (!dryRun) {
    ensureDir(EN_DIR);
    fs.writeFileSync(path.join(EN_DIR, `${slug}.md`), content, 'utf8');
  }
  return countEnWords(article.body);
}

async function fetchRecentAiNotes() {
  const since = Math.floor(Date.now() / 1000) - 14 * 86400;
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&hitsPerPage=12&numericFilters=created_at_i>${since}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const lines = (data.hits ?? [])
      .filter((h) => h?.title)
      .slice(0, 10)
      .map((h) => {
        const day = String(h.created_at || '').slice(0, 10);
        const link = h.url || `https://news.ycombinator.com/item?id=${h.objectID}`;
        return `- ${h.title}（${day}，${link}）`;
      });
    return lines.join('\n');
  } catch (err) {
    console.log(`近期讨论拉取失败，将只要求模型标注不确定信息：${err.message}`);
    return '';
  }
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
  recentNotes = await fetchRecentAiNotes();
  if (recentNotes) console.log('已附上近两周公开讨论，选题会围绕当前 AI 变化。');

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
      process.stdout.write(`中文 ${saved.words} 字，英文... `);
      const en = await writeEnglish({ ...out.article, topic: out.article.topic });
      if (!en) {
        if (!dryRun) fs.rmSync(path.join(POSTS_DIR, `${saved.slug}.md`), { force: true });
        existingSlugs.delete(saved.slug);
        console.log('✗ 英文三次未通过，中英都未保留');
        results.push({ title: idea.title, ok: false, reason: '英文校验未通过' });
        continue;
      }
      en.topic = out.article.topic;
      const enWords = persistEnglish(saved.slug, en);
      console.log(`✓ ${saved.words} 字 / 英文约 ${enWords} 词 → ${saved.slug}.md`);
      results.push({ title: idea.title, slug: saved.slug, words: saved.words, enWords, ok: true });
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
