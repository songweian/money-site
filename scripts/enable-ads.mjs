#!/usr/bin/env node
/**
 * 一键开启 AdSense 广告
 * ---------------------------------------------------------------
 * 用法：
 *   node scripts/enable-ads.mjs ca-pub-1234567890123456
 *   node scripts/enable-ads.mjs ca-pub-1234567890123456 --slot-inArticle=1234567890 --slot-header=0987654321
 *   node scripts/enable-ads.mjs ca-pub-1234567890123456 --deploy   # 顺便构建并部署
 *
 * 作用：
 *   1. 校验发布商 ID 格式
 *   2. 写入 site.config.mjs（开启 ads.enabled、填入 client 与各广告单元 ID）
 *   3. 更新 public/ads.txt（AdSense 要求的授权声明）
 *   4. 可选：构建 + 部署到 Cloudflare Pages
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'site.config.mjs');
const ADS_TXT = path.join(ROOT, 'public/ads.txt');

const argv = process.argv.slice(2);
const pubId = argv.find((a) => !a.startsWith('--'));
const shouldDeploy = argv.includes('--deploy');
const slots = Object.fromEntries(
  argv
    .filter((a) => a.startsWith('--slot-'))
    .map((a) => {
      const [k, v] = a.replace('--slot-', '').split('=');
      return [k, v];
    })
);

if (!pubId) {
  console.error('用法：node scripts/enable-ads.mjs ca-pub-1234567890123456 [--slot-inArticle=xxx] [--deploy]');
  process.exit(1);
}
if (!/^ca-pub-\d{16}$/.test(pubId)) {
  console.error(`发布商 ID 格式不对：${pubId}\n正确形如：ca-pub-1234567890123456（ca-pub- 前缀 + 16 位数字）`);
  process.exit(1);
}

// ---- 1. 更新 site.config.mjs ----
let config = fs.readFileSync(CONFIG, 'utf8');
const before = config;

config = config.replace(/(  ads: \{\n)(\s*)(enabled: )false/, `$1$2$3true`);
config = config.replace(/(    )client: '',/, `$1client: '${pubId}',`);

for (const [slot, id] of Object.entries(slots)) {
  if (!id) continue;
  const re = new RegExp(`(      )${slot}: '',`);
  if (re.test(config)) {
    config = config.replace(re, `$1${slot}: '${id}',`);
  } else {
    console.warn(`  ! 未找到广告位 ${slot}，已跳过（检查 site.config.mjs 的 ads.slots）`);
  }
}

if (config === before) {
  console.error('配置未发生变化，可能已经开启过广告或文件格式有变动，请检查 site.config.mjs');
} else {
  fs.writeFileSync(CONFIG, config, 'utf8');
  console.log('✓ site.config.mjs 已更新：启用广告并写入发布商 ID');
  if (Object.keys(slots).length) console.log(`  广告单元：${Object.entries(slots).map(([k, v]) => `${k}=${v}`).join(', ')}`);
}

// ---- 2. 更新 ads.txt ----
const numericId = pubId.replace('ca-pub-', '');
const adsLine = `google.com, pub-${numericId}, DIRECT, f08c47fec0942fa0`;
let adsTxt = fs.readFileSync(ADS_TXT, 'utf8');
if (!adsTxt.includes(`pub-${numericId}`)) {
  adsTxt = adsTxt.replace(/^# google\.com.*$/m, adsLine);
  if (!adsTxt.includes(adsLine)) adsTxt = `${adsTxt.trimEnd()}\n${adsLine}\n`;
  fs.writeFileSync(ADS_TXT, adsTxt, 'utf8');
  console.log('✓ public/ads.txt 已写入授权声明');
} else {
  console.log('· ads.txt 已包含该发布商 ID，跳过');
}

// ---- 3. 可选：构建 + 部署 ----
if (shouldDeploy) {
  console.log('\n开始构建...');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit', env: { ...process.env, NODE_OPTIONS: '' } });
  console.log('部署到 Cloudflare Pages...');
  execSync('npx wrangler@latest pages deploy dist --project-name money-site --branch main', {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
  });
  console.log('\n✓ 已部署。广告通常几分钟内开始展示。');
} else {
  console.log('\n下一步：');
  console.log('  npm run build && npx wrangler@latest pages deploy dist --project-name money-site --branch main');
  console.log('  （或直接 git push，CI 会自动构建并部署）');
}
