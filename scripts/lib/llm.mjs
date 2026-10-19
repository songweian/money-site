/**
 * LLM 客户端：OpenAI 兼容协议（OpenAI / DeepSeek / 通义 / Moonshot / Groq 等）。
 * 通过环境变量配置，GitHub Actions 里走 Secrets。
 */

const API_KEY =
  process.env.LLM_API_KEY || process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY || '';
const BASE_URL = (
  process.env.LLM_BASE_URL ||
  process.env.OPENAI_BASE_URL ||
  'https://api.openai.com/v1'
).replace(/\/+$/, '');
const MODEL = process.env.LLM_MODEL || 'gpt-4o-mini';

export function llmConfigured() {
  return Boolean(API_KEY);
}

export function llmInfo() {
  return { baseUrl: BASE_URL, model: MODEL, hasKey: Boolean(API_KEY) };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * 发起一次对话。json=true 时要求模型返回严格 JSON，并自动解析。
 */
export async function chat({
  system = '',
  user = '',
  temperature = 0.7,
  maxTokens = 4096,
  json = false,
  retries = 3,
}) {
  if (!API_KEY) {
    throw new Error('未配置 LLM_API_KEY（或 OPENAI_API_KEY），无法调用模型');
  }

  const body = {
    model: MODEL,
    messages: [
      ...(system ? [{ role: 'system', content: system }] : []),
      { role: 'user', content: user },
    ],
    temperature,
    max_tokens: maxTokens,
  };
  if (json) body.response_format = { type: 'json_object' };

  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`LLM ${res.status}: ${text.slice(0, 400)}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content ?? '';
      if (!content) throw new Error('LLM 返回空内容');

      if (json) {
        const cleaned = content
          .replace(/^```(?:json)?\s*/i, '')
          .replace(/```\s*$/, '')
          .trim();
        try {
          return JSON.parse(cleaned);
        } catch {
          // 尝试截取首尾花括号之间的内容
          const s = cleaned.indexOf('{');
          const e = cleaned.lastIndexOf('}');
          if (s >= 0 && e > s) return JSON.parse(cleaned.slice(s, e + 1));
          throw new Error('LLM 返回的不是合法 JSON');
        }
      }
      return content;
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(1500 * attempt);
    }
  }
  throw lastErr;
}
