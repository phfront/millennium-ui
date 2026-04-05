import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const directive = '"use client";\n';

for (const name of ['index.js', 'index.cjs']) {
  const file = path.join(dist, name);
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  if (src.startsWith(directive)) continue;
  if (src.startsWith('"use client"')) continue;
  fs.writeFileSync(file, directive + src);
}
