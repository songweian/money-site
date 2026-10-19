import fs from 'node:fs';
import path from 'node:path';

/** 简单 YAML frontmatter 解析（只处理本站用到的结构） */
export function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const block = m[1];
  const body = raw.slice(m[0].length);
  const data = {};
  let currentKey = null;

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const kv = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (kv) {
      const [, key, value] = kv;
      const v = value.trim();
      if (v === '' || v === '[]') {
        data[key] = v === '[]' ? [] : null;
        currentKey = v === '[]' ? null : key;
      } else if (v.startsWith('[') && v.endsWith(']')) {
        data[key] = v
          .slice(1, -1)
          .split(',')
          .map((s) => unquote(s.trim()))
          .filter(Boolean);
        currentKey = null;
      } else {
        data[key] = unquote(v);
        currentKey = null;
      }
    } else if (/^\s+-\s+/.test(line) && currentKey) {
      const item = unquote(line.replace(/^\s+-\s+/, '').trim());
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(item);
    } else if (/^\s+\w+:/.test(line) && currentKey) {
      // 嵌套对象（如 faq 列表项），本站不解析，忽略
    }
  }
  return { data, body };
}

function unquote(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

/** 序列化为 YAML frontmatter */
export function stringifyFrontmatter(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else if (typeof value[0] === 'object') {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`  - q: ${JSON.stringify(item.q)}`);
          lines.push(`    a: ${JSON.stringify(item.a)}`);
        }
      } else {
        lines.push(`${key}:`);
        for (const v of value) lines.push(`  - ${JSON.stringify(String(v))}`);
      }
    } else if (value instanceof Date) {
      lines.push(`${key}: ${value.toISOString().slice(0, 10)}`);
    } else if (typeof value === 'object') {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else if (typeof value === 'string' && /[:#\-{}[\]&*?|>!%@`"']/.test(value)) {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

/** 统计正文字数：中文按字符，英文按单词 */
export function countWords(md) {
  const text = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ')
    .trim();
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const en = (text.match(/[A-Za-z]+/g) || []).length;
  return cjk + en;
}

/** 生成 URL 安全的 slug */
export function toSlug(input, fallback = '') {
  const base = String(input)
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]+/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || fallback;
}

export function readDirFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => path.join(dir, f));
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** 标题相似度（简易 Jaccard，用于去重） */
export function similarity(a, b) {
  const setA = new Set(String(a).replace(/\s+/g, '').split(''));
  const setB = new Set(String(b).replace(/\s+/g, '').split(''));
  let inter = 0;
  for (const c of setA) if (setB.has(c)) inter++;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}
