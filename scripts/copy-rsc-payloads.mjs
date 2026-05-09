// Workaround for a Next.js 16 + `output: 'export'` quirk:
//
// The segment-cache prefetcher requests RSC payloads with dot-separated
// paths, e.g. `/pl/__next.$d$locale.__PAGE__.txt`, but `next build` writes
// them slash-separated (`/pl/__next.$d$locale/__PAGE__.txt`). On Vercel a
// rewrite layer translates between the two; on plain static hosts (Firebase
// Hosting) the prefetch 404s.
//
// This script walks `out/` and, for every file under a directory whose
// basename starts with `__next.`, also writes a copy whose path collapses
// the rest of the segments into the filename with `.` separators. The
// originals are left in place so existing slash-form requests keep working.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "..", "out");

let copied = 0;

async function* walkRscDirs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      yield { rscDir: full, prefix: entry.name };
    } else {
      yield* walkRscDirs(full);
    }
  }
}

async function* walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(full);
    } else {
      yield full;
    }
  }
}

async function main() {
  try {
    await fs.access(OUT_DIR);
  } catch {
    console.error(`copy-rsc-payloads: ${OUT_DIR} not found, skipping`);
    return;
  }

  for await (const { rscDir, prefix } of walkRscDirs(OUT_DIR)) {
    const parent = path.dirname(rscDir);
    for await (const file of walkFiles(rscDir)) {
      const relInsideRsc = path.relative(rscDir, file);
      const dotted = `${prefix}.${relInsideRsc.split(path.sep).join(".")}`;
      const target = path.join(parent, dotted);
      await fs.copyFile(file, target);
      copied += 1;
    }
  }

  console.log(`copy-rsc-payloads: wrote ${copied} dot-separated alias(es)`);
}

main().catch((err) => {
  console.error("copy-rsc-payloads failed:", err);
  process.exitCode = 1;
});
