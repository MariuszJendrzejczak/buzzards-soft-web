# Dev scripts

One-off / build-support scripts. **Not** part of the app bundle and **not** run in CI.

## `extract-cert-assets.mjs` — certificate + badge raster extraction

Rasterises the 10xDevs certificate PDF and crops it into the webp assets the
"Warsztat AI" (`#certification`) section renders. Run it manually whenever the
source PDF changes; the committed webp files under `public/images/` are the
contract, not the tooling.

**Why a script:** the certificate visuals exist only as a PDF. This machine has
no `pdftoppm`/ImageMagick, and `sharp` has no PDF input
(`sharp.format.pdf.input === false`). So the page is rasterised with
`pdfjs-dist` (legacy build) + `@napi-rs/canvas` at scale 4 (badges are small on
the source — oversampling keeps a ~120px display badge crisp), then `sharp`
crops each region and encodes webp.

### Run

```
node scripts/extract-cert-assets.mjs
```

Source PDF: `scripts/assets/certificate-10xdevs.pdf` (a build input — kept in the
repo for reproducibility; deliberately **not** placed in `public/`, and never
offered for download).

### Outputs (`public/images/`)

| File | Size | Purpose |
|---|---|---|
| `certificate-10xdevs.webp` | long edge ~1600px | full page, lightbox |
| `certificate-10xdevs-thumb.webp` | long edge ~640px | clickable thumbnail |
| `badge-10xbuilder.webp` | ~480px | acclaimed badge (rocket) |
| `badge-10xarchitect.webp` | ~480px | acclaimed badge (wrench) |
| `badge-10xchampion.webp` | ~480px | acclaimed badge (astronauts) |
| `badge-best-project.webp` | ~480px | Best Project distinction (trophy) |

The script logs every output path + dimensions. Badge crop rectangles are
defined as page fractions in the `badges` array at the top of `main()`; retune
them there if the source PDF layout changes.

### Dev dependencies

`pdfjs-dist` and `@napi-rs/canvas` (devDependencies). `sharp` is already present.
Nothing here is imported by app code or ships to the client.
