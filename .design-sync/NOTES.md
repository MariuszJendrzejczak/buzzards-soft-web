# design-sync notes — buzzards-soft-web

Repo-specific knowledge for syncing this site's components to claude.ai/design.

## How the package is produced

- This is a Next.js app, not a published DS package. `.design-sync/build-pkg.mjs`
  (the `buildCmd`) builds a synthetic package `buzzards-soft-ui` into the
  gitignored `.design-sync/.cache/pkg/`, and the converter consumes it via
  `cfg.entry`. Always run `npm run build` first — fonts are harvested from `out/`.
- Scope = `.design-sync/pkg-src/entry.tsx` (ui + shared + theme toggle + portfolio
  building blocks + portfolio data + `Icons`). Page sections (`components/sections/*`,
  `layout/*`, HoneticHero, *Section, WarsztatGrid/Flow/Toolkit) are deliberately out.
  To add a component: export it from `entry.tsx`, rebuild, author its preview.
- Shims (esbuild `alias` in build-pkg): `next/image` → `pkg-src/next-image.tsx`
  (plain `<img>`, root-relative `/…` paths rewritten to `https://buzzards-soft.com`,
  which serves the same `public/` tree); `next-intl` → `use-intl`.
- npm deps stay external in the pkg bundle (`packages: "external"`) — bundling CJS
  deps into the ESM dist left `require("react")` shims that threw
  `Dynamic require of "react" is not supported` in every card.
- `.d.ts`: `tsc` over `pkg-src/tsconfig.dts.json`, then `@/…` specifiers are
  rewritten to relative paths (the converter's type reader has no tsconfig paths).
- CSS: Tailwind v4 compile of `pkg-src/ds.css` = `app/globals.css` + `--font-*`
  vars (next/font sets them on `<html>` only inside Next) + an `@source inline()`
  safelist of layout/token utilities for the design agent.
- Fonts: next/font `@font-face` rules from `out/_next/static/chunks/*.css`, files
  renamed `<family>-<sha10>.woff2`. The raw next/font names contain `~` and the
  claude.ai/design upload rejects one of them as a "reserved path" (HTTP 403);
  they also change every Next build. Local-only `X Fallback` faces are dropped.
- `BuzzardsRoot` (pkg-src/buzzards-root.tsx) is `cfg.provider`: next-themes
  ThemeProvider (class on `<html>`, so portalled popups are themed) + use-intl
  `IntlProvider` with the real `messages/{pl,en,sv}.json` + bg/text/font wrapper.
  Previews render dark (site default). Every card cell shares `<html>`, so a
  light-theme cell would flip its neighbours — previews stay dark.
- Subparts (CardHeader, SelectItem, SheetContent, FormField, AccordionItem,
  StaggerItem…) are excluded as cards via `componentSrcMap: null`; they stay
  importable and are shown inside their parent's preview. `Icons` (a curated
  lucide namespace object) is also excluded as a card.

## Preview authoring conventions

- Import from `"buzzards-soft-ui"` (components, `Icons`, `HONETI_APPS`,
  `AGENT_PROJECTS`, `cn`). Use real site copy (PL) from `messages/pl.json` and real
  data from `lib/portfolio/*` — never placeholder text.
- Wrap each export in a padded container (`p-6`) — the card body is white and the
  BuzzardsRoot dark panel hugs the content.
- Don't set fixed widths wider than ~600px; wide stories need
  `overrides.<Name>.cardMode: "column"`; overlay/portal stories need
  `cardMode: "single"` + `primaryStory`.
- Select popup: use `alignItemWithTrigger={false}` in an open story or it covers
  the label.
- `pkg-src/ds.css` has `@source "../previews"`, so classes used only in previews
  compile. Before that existed, preview-only utilities (`w-[540px]`, `pl-9`,
  `top-1/2`…) silently produced no CSS — some previews still use inline
  `style={{ width }}` from that period; both are fine.
- Capture is viewport-only (900x700): keep a cell under ~650px tall or it clips.
  At 900px width `sm:`/`md:` apply, `lg:` doesn't.
- Images: next/image is shimmed to `https://buzzards-soft.com`, but CSS
  backgrounds (PhotoBand `src`) and raw `<img>` are not — use absolute
  `https://buzzards-soft.com/...` URLs there.
- Overlays without an open prop (CertificateLightbox): click the trigger in a
  `setTimeout(…, 50)` from a mount effect — an immediate click is ignored.
- Sheet: `defaultOpen`; Base UI focuses the first link, so a focus ring in the
  capture is expected. Toaster: fire `toast(...)` once in a mount effect.
- Form: static errors via `form.setError` in an effect; pass `aria-invalid` to
  Input/Textarea for the red ring (the site's FormControl puts it on a wrapper).
- Accordion (Base UI 1.4): open = `defaultValue={[...]}`, `multiple` for several.
- Previews must not import `framer-motion` themselves (a second copy gets bundled).
- WarsztatTile keys are full paths `portfolio.warsztat.toolkit.enabler.<id>.{title,desc}`.
- HeroAppMiniCard ignores `iconBackground: "white"`, so the Gen / Oczami Dziecka
  icon is dark-on-dark — same as the live site.

## Machine quirks

- Node runs through Volta's shim on Windows, which routes args through cmd.exe:
  `node -e '...'` with `|` or quotes silently misbehaves. Put scripts in files and
  pass patterns via env vars.

## Known render warns

- ScrollReveal, StaggerGroup: the capture harness sheets are blank — package-capture fakes the clock once and reuses one page, so framer-motion WAAPI startTimes land in the future (opacity 0 at screenshot). Verified instead with a fresh-page, real-clock render (all content opacity 1). Grades were written from that render; on re-sync, re-verify the same way rather than trusting the blank sheet.

## Re-sync procedure

1. `npm run build && node .design-sync/build-pkg.mjs` (cfg.buildCmd).
2. Re-copy the staged scripts into `.ds-sync/` (the skill's step-7 `cp -r` line + `npm i esbuild ts-morph @types/react` there).
3. Fetch the project's `_ds_sync.json` → `.design-sync/.cache/remote-sync.json`, then
   `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json`.

## Re-sync risks

- **Scope is hand-curated** in `pkg-src/entry.tsx`. A new site component is
  invisible to claude.ai/design until it is exported there (and given a preview).
  A renamed/removed source file breaks the pkg build loudly.
- **Icons** is a hand-picked list in `entry.tsx` (the lucide icons used at sync
  time, 2026-10-15). New icons on the site need adding there.
- **Fonts depend on `out/`** from `npm run build`; if next/font config in
  `app/[locale]/layout.tsx` changes families, update the `--font-*` vars in
  `pkg-src/ds.css`.
- **Images load from production** (`https://buzzards-soft.com`). Renaming or
  removing files under `public/` breaks preview/design images until deploy.
- **Translations are bundled** from `messages/*.json` at build time — previews
  hard-code a few Polish strings (e.g. AgentCardLink titles) that can drift from
  `pl.json`.
- **ScrollReveal / StaggerGroup** cannot be graded from the capture harness
  (see Known render warns) — re-verify with a fresh-page real-clock render.
- **`@source "../previews"`** in ds.css means preview edits change the compiled
  CSS (styling hash) → a re-upload of `_ds_bundle.css` even if no component changed.
- Built on Node 22.23.2 (Volta), esbuild 0.21.5 (repo, transitive via vite),
  typescript 5.9.3, @tailwindcss/postcss 4.2.4, Playwright chromium-1223.
