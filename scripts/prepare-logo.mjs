import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const srcSvg = path.join(root, 'logo.svg');
let s = fs.readFileSync(srcSvg, 'utf8');
s = s
  .replace(/<g>/, '<g fill="currentColor">')
  .replace(/ fill=""/g, '')
  .replace(/ fill="rgb\(254,254,254\)"/g, '');

const assetsDir = path.join(__dirname, '../src/assets');
fs.mkdirSync(assetsDir, { recursive: true });
fs.writeFileSync(path.join(assetsDir, 'logo.svg'), s);
fs.writeFileSync(path.join(root, 'logo.svg'), s);

const m = s.match(/<g[^>]*>[\s\S]*<\/g>/);
if (!m) throw new Error('Could not extract <g> from logo.svg');

const innerDir = path.join(__dirname, '../src/components/nexus-logo');
fs.mkdirSync(innerDir, { recursive: true });
fs.writeFileSync(
  path.join(innerDir, 'logo-inner.ts'),
  `export const NEXUS_LOGO_SVG_INNER = ${JSON.stringify(m[0])};\n`,
);

console.log('Wrote logo.svg and logo-inner.ts');
