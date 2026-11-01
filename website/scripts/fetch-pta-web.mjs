#!/usr/bin/env node
// Fetches the PTA canary harness's browser module into public/pta-web/ before
// a build, for /playground/photonic. It is published by kubeworkz/grxcp's
// .github/workflows/pta-web.yml to the `pta-web` branch only when it printed
// the same bytes as the native harness. Every file is checked against that
// branch's manifest.json; on any failure nothing is kept and the page says the
// simulator is unavailable, but the build goes on.
// PTA_WEB_URL overrides the source (for testing).
import { createHash } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.PTA_WEB_URL || 'https://raw.githubusercontent.com/kubeworkz/grxcp/pta-web';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '../public/pta-web');
const get = async (name) => {
  const r = await fetch(`${BASE}/${name}`, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error(`${name}: HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
};

try {
  const manifestBytes = await get('manifest.json');
  const manifest = JSON.parse(manifestBytes.toString());
  if (manifest.identical_to_native !== true) throw new Error('manifest does not say the build matched the native harness');
  const files = {};
  for (const [name, { sha256 }] of Object.entries(manifest.files)) {
    const b = await get(name);
    const got = createHash('sha256').update(b).digest('hex');
    if (got !== sha256) throw new Error(`${name}: sha256 ${got} != manifest ${sha256}`);
    files[name] = b;
  }
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  for (const [name, b] of Object.entries(files)) writeFileSync(join(OUT, name), b);
  writeFileSync(join(OUT, 'manifest.json'), manifestBytes);
  console.log(`[pta-web] ${Object.keys(files).length} files from ${manifest.repo}@${manifest.commit.slice(0, 7)}, checked against its manifest`);
} catch (e) {
  rmSync(OUT, { recursive: true, force: true });
  console.warn(`[pta-web] not fetched (${e.message}); /playground/photonic will say the simulator is unavailable`);
}
