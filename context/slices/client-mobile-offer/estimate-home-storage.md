# Estimate benchmark — `home_storage` (neatu-storage) priced against the mobile offer

> **Purpose:** a real-app case study that calibrates the Basic/Full/Większy pricing in
> `mobile-offer-facts.md`. Buzzards' own most-built app (`home_storage`) was priced by **three
> independent agents** against the offer reference, to sanity-check that the tiers aren't
> underpriced and that "Większy od ~30k" has a realistic ceiling. Analysis doc — not client-facing
> copy, not a quote. Numbers are net (zł).
>
> Sources priced against: `context/foundation/mobile-offer-facts.md` (facts oracle) +
> `context/slices/client-mobile-offer/offer-reference.md` (feature matrix).
> App inspected: `C:\_projekty\buzzards_soft\home_manager\home_storage_mobile` (pubspec name
> `home_storage`; ~397 Dart files, ~326 test files, last commit 2026-07-19).
> Run date: 2026-07-21.

## Verdict (unanimous)

All three agents independently landed on the **same tier**: **"Większy projekt" (Full++)** — the
app clears the Basic↔Full boundary (accounts + cloud sync) decisively and then breaks the
Full↔Większy boundary on several axes at once.

| Estimate | Range (net) | Midpoint |
|---|---|---|
| A | 38 000 – 48 000 zł | ~42 000 |
| B | 42 000 – 55 000 zł | ~48 000 |
| C | 45 000 – 60 000 zł | ~50 000 |
| **Consensus** | **~42 000 – 55 000 zł** | **~46–48 000 zł** |

**Working figure: ~45 000–50 000 zł net (midpoint ~48k)** — with the standard "Większy" caveat that
the real number comes out of a scoping conversation ("z zakresu bierze się cena").

**Effective-rate sanity check:** 48 000 zł ÷ ~110 zł/h ≈ **~440 h** — consistent with an app of this
scale (10–11 features, ~397 Dart files, ~326 tests) and with the offer's ~83–124 zł/h effective
solo band. Confirms the number is attractive-but-not-underpriced.

## What the app actually is (agreed across all three)

A home-inventory / pantry manager (warehouses → products → stock → shopping lists), Clean
Architecture + Riverpod, production-grade. Cost drivers, in the order all three ranked them:

1. **Custom offline-first sync engine** — Last-Write-Wins, persistent offline queue surviving
   restart, per-document delta feeds, deletion markers, coordinator + lifecycle, guest→account
   backup-on-sign-in with ordering guarantees. **The most expensive and highest-risk element** —
   data engineering, not "turn on Firestore". (`lib/shared/infrastructure/sync/`,
   `features/auth/application/backup/`.)
2. **Dual monetization** — RevenueCat (paywall, tiers free/noAds/pro, restore, entitlements)
   **plus** AdMob (entitlement-gated) **plus** GDPR/UMP consent. Two independent, store-policy-
   sensitive tracks. (`features/subscription/`, `features/ads/`, `features/entitlements/`.)
3. **Barcode scanner + external API** — `mobile_scanner` + Open Food Facts lookup via Dio, with
   mapping + attribution. (`off_product_lookup_datasource.dart`.)
4. **Scale & maturity** — ~15–27 screens, ~326 tests (unit/widget/integration + Maestro e2e),
   Remote Config, Apple Sign-In + in-app account deletion (store compliance).

**Beyond the matrix entirely** (no tier covers these): ads/freemium, Remote Config, the custom
sync engine. **Full-tier features absent** despite the tier assuming them: push-to-user (no
`firebase_messaging`) and dedicated Cloud Functions (sync is client-side).

## Caveats (shared)

- **B2C vs B2B mismatch.** This is a consumer product with its own subscription revenue; the
  Basic/Full/Większy matrix describes B2B tools for a client's business (owner admin panel,
  loyalty, owner notifications). Mapping is **by effort/complexity, not literal domain fit** — two
  "Full" axes (push, owner panel) are absent, replaced by heavier ones (monetization + sync + integrations).
- The offer's **"pay once, you own everything"** model doesn't map 1:1 onto an app that earns via
  in-app subscriptions — worth flagging in a real conversation; it changes the character, not the
  hours estimate.
- Estimates are **hours-from-code-signals**, not a time log; no `flutter analyze`/build was run. The
  ranges reflect that uncertainty.
- `PROJECT_CONTEXT_EN.md` in the app repo is **stale** (lists Firebase/sync/scanner as TODO); all
  three agents grounded on the live code, not that doc.
- `neatu_brand` is a shared git-dependency (umbrella) — some brand/design cost was borne once
  outside this app, which could shave a one-off quote slightly.

## Calibration insight for the offer

`home_storage` is Buzzards' most-built app and lands **high inside "Większy"** — which means the
Basic/Full price points are **not underpriced**, and "Większy od ~30k" has a realistic ceiling well
above 30k (this app: ~45–50k). A software house would price the same scope at 60–150k+; the ~45–50k
figure deliberately undercuts that while staying above a healthy solo rate — the "third way" holding.
