// Builds the design-sync package for claude.ai/design from this Next app.
//
// The app has no publishable dist/, so this script produces one in the
// gitignored .design-sync/.cache/pkg/ for the design-sync converter to consume:
//   dist/index.mjs   - esbuild ESM bundle of pkg-src/entry.tsx (npm deps external);
//                      next/image -> pkg-src/next-image.tsx, next-intl -> use-intl
//   types/           - tsc declaration tree (the converter's .d.ts contract)
//   styles.css       - Tailwind v4 compile of pkg-src/ds.css (site globals + safelist)
//   fonts/           - next/font @font-face rules + woff2 harvested from out/
//   package.json     - {name, version, module, types}
//
// Requires `npm run build` first (fonts come from out/). Run from the repo root:
//   npm run build && node .design-sync/build-pkg.mjs

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import * as esbuild from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SRC = join(HERE, "pkg-src");
const OUT = join(HERE, ".cache", "pkg");
const posix = (p) => p.split("\\").join("/");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const rootPkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

// -- 1. JS bundle ------------------------------------------------------------
await esbuild.build({
  entryPoints: [join(SRC, "entry.tsx")],
  outfile: join(OUT, "dist", "index.mjs"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  tsconfig: join(ROOT, "tsconfig.json"),
  // Only repo source is bundled here; npm packages stay bare imports for the
  // converter to resolve (bundling CJS deps into ESM leaves `require("react")`
  // shims that throw at runtime).
  packages: "external",
  alias: {
    "next/image": join(SRC, "next-image.tsx"),
    "next-intl": "use-intl",
  },
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".json": "json" },
  logLevel: "warning",
  logOverride: { "unsupported-directive": "silent" },
});

// -- 2. .d.ts tree -------------------------------------------------------------
try {
  execFileSync(process.execPath, [
    join(ROOT, "node_modules", "typescript", "bin", "tsc"),
    "-p", join(SRC, "tsconfig.dts.json"),
  ], { cwd: ROOT, stdio: "inherit" });
} catch {
  // tsc exits non-zero on type errors but still emits declarations.
  console.error("! tsc reported type errors (declarations still emitted)");
}
const typesDir = join(OUT, "types");
const walk = (d) => readdirSync(d, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
// The emitted declarations keep the `@/…` path alias; the converter's type
// reader has no tsconfig paths, so rewrite them to relative specifiers.
for (const f of walk(typesDir).filter((f) => f.endsWith(".d.ts"))) {
  const src = readFileSync(f, "utf8");
  const out = src.replace(/(from\s+|import\()(["'])@\/([^"']+)\2/g, (_, pre, q, p) => {
    let rel = posix(relative(dirname(f), join(typesDir, p)));
    if (!rel.startsWith(".")) rel = "./" + rel;
    return `${pre}${q}${rel}${q}`;
  });
  if (out !== src) writeFileSync(f, out);
}

// -- 3. fonts (next/font output in out/) ---------------------------------------
const cssDir = join(ROOT, "out", "_next", "static", "chunks");
if (!existsSync(cssDir)) {
  console.error("✗ out/ not found - run `npm run build` first (fonts are harvested from it)");
  process.exit(1);
}
const fontsOut = join(OUT, "fonts");
mkdirSync(fontsOut, { recursive: true });
const faces = new Set();
for (const f of readdirSync(cssDir).filter((n) => n.endsWith(".css"))) {
  const css = readFileSync(join(cssDir, f), "utf8");
  for (const rule of css.match(/@font-face\{[^}]*\}/g) ?? []) {
    // next/font file names change every build and contain `~`, which the
    // claude.ai/design upload rejects - rename to <family>-<content sha>.
    const family = /font-family:\s*([^;]+)/.exec(rule)?.[1].replace(/["']/g, "").trim() ?? "font";
    faces.add(rule.replace(/url\(([^)]+)\)/g, (_, u) => {
      const buf = readFileSync(join(ROOT, "out", "_next", "static", "media", basename(u.replace(/["']/g, ""))));
      const sha = createHash("sha256").update(buf).digest("hex").slice(0, 10);
      const file = `${family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${sha}.woff2`;
      writeFileSync(join(fontsOut, file), buf);
      return `url(./${file})`;
    }));
  }
}
if (!faces.size) {
  console.error("✗ no @font-face rules found in out/ - did next/font change?");
  process.exit(1);
}
writeFileSync(join(fontsOut, "fonts.css"), [...faces].join("\n") + "\n");

// -- 4. Tailwind -----------------------------------------------------------------
const input = join(SRC, "ds.css");
const result = await postcss([tailwind({ base: ROOT, optimize: false })])
  .process(readFileSync(input, "utf8"), { from: input, to: join(OUT, "styles.css") });
writeFileSync(join(OUT, "styles.css"), result.css);

// -- 5. package.json -------------------------------------------------------------
writeFileSync(join(OUT, "package.json"), JSON.stringify({
  name: "buzzards-soft-ui",
  version: rootPkg.version,
  private: true,
  module: "dist/index.mjs",
  types: "types/.design-sync/pkg-src/entry.d.ts",
}, null, 2) + "\n");

console.log(
  `✓ pkg → ${posix(relative(ROOT, OUT))} ` +
  `(${faces.size} font faces, styles.css ${(result.css.length / 1024).toFixed(0)} KB)`,
);
