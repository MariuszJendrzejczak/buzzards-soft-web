// One-off, dev-only asset extraction — NOT imported by app code, NOT run in CI.
//
// The certificate visuals live only in a PDF. This machine has no
// pdftoppm/ImageMagick and sharp has no PDF input (sharp.format.pdf.input
// is false), so we rasterise the page with pdfjs-dist (legacy build) +
// @napi-rs/canvas at a high scale, then crop + encode webp with sharp.
//
// Run:  node scripts/extract-cert-assets.mjs
// Outputs land in public/images/ (see scripts/README.md).

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { createCanvas } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const PDF_PATH = join(__dirname, "assets", "certificate-10xdevs.pdf");
const OUT_DIR = join(REPO_ROOT, "public", "images");

// Render scale: badges are small on the source page, so oversample heavily
// (~4x) — a 400-500px badge crop stays crisp at a ~120px display size.
const RENDER_SCALE = 4;

async function renderPageToPng() {
  const data = new Uint8Array(await readFile(PDF_PATH));
  const doc = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: RENDER_SCALE });
  const width = Math.ceil(viewport.width);
  const height = Math.ceil(viewport.height);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  // White backdrop — the certificate art assumes a white page.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  await page.render({ canvasContext: ctx, viewport }).promise;
  const png = canvas.toBuffer("image/png");
  console.log(`Rendered page 1 at scale ${RENDER_SCALE}: ${width}x${height}px`);
  return { png, width, height };
}

async function writeWebp(input, outName, transform) {
  let img = sharp(input);
  if (transform) img = await transform(img);
  const outPath = join(OUT_DIR, outName);
  const info = await img.webp({ quality: 90 }).toFile(outPath);
  console.log(`  ${outName} — ${info.width}x${info.height}px (${info.size} bytes)`);
  return outPath;
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

async function main() {
  const { png, width, height } = await renderPageToPng();

  // --- Full certificate (lightbox) — long edge ~1600px ---
  await writeWebp(png, "certificate-10xdevs.webp", (img) =>
    img.resize(width >= height ? { width: 1600 } : { height: 1600 }),
  );

  // --- Thumbnail — long edge ~640px ---
  await writeWebp(png, "certificate-10xdevs-thumb.webp", (img) =>
    img.resize(width >= height ? { width: 640 } : { height: 640 }),
  );

  // --- Badge crops, expressed as fractions [0..1] of the rendered page. ---
  // Centres/extents were measured against the scale-4 render (disc-centroid
  // detection + eyeballed labels); tune here if the source PDF changes.
  //   cx — horizontal centre of the badge disc
  //   ty — top edge of the crop
  //   fw/fh — crop width/height
  // The three "acclaimed" badges sit in a top-right row; "Best Project" is
  // the larger badge lower-right.
  const badges = [
    { name: "badge-10xbuilder.webp",   cx: 0.7296, ty: 0.040, fw: 0.100, fh: 0.135 },
    { name: "badge-10xarchitect.webp", cx: 0.8276, ty: 0.040, fw: 0.100, fh: 0.135 },
    { name: "badge-10xchampion.webp",  cx: 0.9236, ty: 0.040, fw: 0.100, fh: 0.135 },
    { name: "badge-best-project.webp", cx: 0.8850, ty: 0.660, fw: 0.185, fh: 0.300 },
  ];

  for (const b of badges) {
    let w = Math.round(b.fw * width);
    let h = Math.round(b.fh * height);
    const left = clamp(Math.round(b.cx * width - w / 2), 0, width - 1);
    const top = clamp(Math.round(b.ty * height), 0, height - 1);
    w = Math.min(w, width - left);
    h = Math.min(h, height - top);
    await writeWebp(png, b.name, (img) =>
      img.extract({ left, top, width: w, height: h }).resize({ width: 480 }),
    );
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
