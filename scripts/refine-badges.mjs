// One-off, dev-only badge refinement — NOT imported by app code, NOT run in CI.
//
// The raw badge crops from extract-cert-assets.mjs carry the certificate's dark
// rectangular background and the baked-in "10xDEVS / <name>" label, and each is
// framed slightly differently — so they look uneven on a card.
//
// This script re-crops each badge tightly to its hexagon emblem (dropping the
// baked-in text — the section renders i18n captions), masks everything OUTSIDE
// the flat-top hexagon to transparency (keeping the emblem's art, incl. its
// intentionally dark starfield interior, fully intact), and normalises all four
// to an identical 512x512 transparent canvas so they render equal.
//
// Run:  node scripts/refine-badges.mjs   [--tmp]
//   --tmp writes previews to scripts/_tmp/ instead of overwriting public/images/.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { createCanvas } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const PDF_PATH = join(__dirname, "assets", "certificate-10xdevs.pdf");
const TMP = process.argv.includes("--tmp");
const OUT_DIR = TMP ? join(__dirname, "_tmp") : join(REPO_ROOT, "public", "images");

const RENDER_SCALE = 6; // oversample — badges are small on the source page
const CANVAS = 512; // final square edge
const FIT = 452; // hexagon bbox fits within this box, centred → equal sizing
const INSET = 0.955; // shrink the mask slightly so it sits just inside the frame

// Hexagon bounding boxes, fractions [0..1] of the scale-6 render, measured off
// diagnostic crops. cx/cy = hexagon centre; fw/fh = hexagon width/height.
const BADGES = [
  { name: "badge-10xbuilder.webp",   cx: 0.7300, cy: 0.0880, fw: 0.0680, fh: 0.0740 },
  { name: "badge-10xarchitect.webp", cx: 0.8250, cy: 0.0880, fw: 0.0680, fh: 0.0740 },
  { name: "badge-10xchampion.webp",  cx: 0.9180, cy: 0.0940, fw: 0.0680, fh: 0.0740 },
  { name: "badge-best-project.webp", cx: 0.8890, cy: 0.8070, fw: 0.1500, fh: 0.1500 },
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Flat-top hexagon polygon filling a w×h box, scaled toward centre by INSET.
function hexMaskSvg(w, h) {
  const cx = w / 2, cy = h / 2;
  const pts = [
    [0, h / 2], [w * 0.17, 0], [w * 0.83, 0], [w, h / 2], [w * 0.83, h], [w * 0.17, h],
  ]
    .map(([x, y]) => [cx + (x - cx) * INSET, cy + (y - cy) * INSET].map(Math.round).join(","))
    .join(" ");
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><polygon points="${pts}" fill="#fff"/></svg>`,
  );
}

async function renderPage() {
  const data = new Uint8Array(await readFile(PDF_PATH));
  const doc = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: RENDER_SCALE });
  const width = Math.ceil(viewport.width);
  const height = Math.ceil(viewport.height);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  console.log(`Rendered page 1 at scale ${RENDER_SCALE}: ${width}x${height}px`);
  return { png: canvas.toBuffer("image/png"), width, height };
}

async function refineBadge(b, page) {
  const w = Math.round(b.fw * page.width);
  const h = Math.round(b.fh * page.height);
  const left = clamp(Math.round(b.cx * page.width - w / 2), 0, page.width - 1);
  const top = clamp(Math.round(b.cy * page.height - h / 2), 0, page.height - 1);
  const cw = Math.min(w, page.width - left);
  const ch = Math.min(h, page.height - top);

  // Crop the hexagon bbox, then mask everything outside the flat-top hexagon.
  const crop = await sharp(page.png)
    .extract({ left, top, width: cw, height: ch })
    .ensureAlpha()
    .png()
    .toBuffer();
  const masked = await sharp(crop)
    .composite([{ input: hexMaskSvg(cw, ch), blend: "dest-in" }])
    .png()
    .toBuffer();

  // Fit the hexagon into FIT and centre it on the CANVAS² transparent square.
  const inner = await sharp(masked)
    .resize({ width: FIT, height: FIT, fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const meta = await sharp(inner).metadata();

  const outPath = join(OUT_DIR, b.name);
  const out = await sharp({
    create: { width: CANVAS, height: CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: inner, left: Math.round((CANVAS - meta.width) / 2), top: Math.round((CANVAS - meta.height) / 2) }])
    .webp({ quality: 92 })
    .toFile(outPath);
  console.log(`  ${b.name} — hexagon ${meta.width}x${meta.height} → ${out.width}x${out.height}px (${out.size} bytes)`);
}

async function main() {
  const page = await renderPage();
  for (const b of BADGES) await refineBadge(b, page);
  console.log(`Done → ${OUT_DIR}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
