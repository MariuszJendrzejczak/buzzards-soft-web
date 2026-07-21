---
date: 2026-07-20T16:30:00+02:00
researcher: Claude (Opus 4.8) + Mariusz
git_commit: 50df0b7ad0afe939c254633687445b5c6cfc1f70
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Current (2026) market prices for delivering an MVP mobile app + MVP backend, incl. dark/light standard, PL/EN, and full App Store + Play Store publication on the client's own accounts"
tags: [research, offer, mobile, pricing, flutter, firebase, app-store, play-store, market-rates]
status: complete
last_updated: 2026-07-20
last_updated_by: Claude (Opus 4.8)
---

# Research: Pricing for the mobile-app (MVP) offer

**Date**: 2026-07-20T16:30:00+02:00
**Researcher**: Claude (Opus 4.8) + Mariusz
**Git Commit**: 50df0b7ad0afe939c254633687445b5c6cfc1f70
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

At what price should Buzzards Soft offer a **Flutter MVP mobile app bundled with an MVP
backend (Firebase)**, given the 2026 market? Fixed assumptions carried into the research
(from the slice brief):

- Scope is meaningfully larger than a website; price is much higher.
- **Dark/light theme is standard** (baked in, not an add-on).
- **PL/EN languages are standard**.
- The package must include the **full publication flow to the App Store + Play Store on the
  client's own accounts**, plus **help setting up those accounts**.

**Scoping decisions (owner, 2026-07-20):** anchor on the **Polish solo-dev / small-studio
market** (price in zł; Western + Nordic as reference only); assume **Flutter + Firebase on
the client's own account** (mirrors the web offer's ownership model); **price to the mobile
market independently** (the tier shape may diverge from the web offer's 999/1999 zł).

## Summary

**Headline recommendation — a 3-tier offer anchored around ~15–35k zł net for a real
Flutter MVP + Firebase backend, published to both stores on the client's own accounts.**

The converging Polish market data for a **solo/small-studio Flutter MVP with auth + a basic
backend** is **~8–40k zł net**, splitting cleanly into:

| Scope | PL market range (net) | The offer tier it maps to |
|---|---|---|
| Simplest MVP — a few screens, one core flow, minimal/no backend | **~8–18k zł** | **Start / Basic** |
| Standard MVP — auth + Firebase backend + a handful of features + push | **~18–35k zł** | **Full / Standard** (the core sell) |
| MVP + payments / heavier integrations / marketplace | **~30–55k+ zł** | **Większy projekt** (individual quote) |

This is **~10–20× the web offer** (999 / 1999 zł) — the scope gap the owner assumed is real
and market-supported. **Do not average in the agency "widełki" numbers (30–200k+ zł):** those
sources define "MVP" as a full-team, multi-month, discovery-to-QA build — a different product
from a solo AI-augmented dev. For this offer the relevant benchmark is the **8–40k zł
solo/small-studio cluster**, with agency numbers as the *ceiling that justifies the value*, not
the price.

Three findings shape the positioning as much as the number:

1. **Dark/light and PL/EN cost almost nothing to bake in — and buy real positioning.** In
   2026 dark mode is "expected, not optional" (missing it reads as dated/unfinished), and the
   i18n *scaffold* is cheap only if wired from day one (retrofitting "triples the effort").
   On the **web** offer these are +400 zł add-ons each; making them **standard on mobile** is
   a credible, low-cost differentiator, not a giveaway.
2. **Store publication + account-setup help is a signature inclusion, not a line item.** It's
   a genuine client pain point (Apple $99/yr + D-U-N-S; Google's new **12-testers/14-day**
   closed-testing gate; privacy declarations) that a non-technical client cannot navigate
   alone. Owning this end-to-end is a strong differentiator — but it carries **real timeline
   risk** the offer must set expectations around (see §3).
3. **The "pay once, you own everything" model ports cleanly from web to mobile.** Client owns
   the Firebase project (their billing account), the store accounts (their legal identity),
   and the code. Recurring costs the client bears: **Apple $99/yr**, **Firebase ≈ $0 until
   real traffic**, Google one-time $25. This is the mobile analogue of the web offer's
   "darmowy hosting na Twoim koncie + tylko domena ~50–90 zł/rok".

---

## Detailed Findings

### 1. Polish market price for a Flutter MVP app + backend

**Anchor range: ~8–40k zł net (solo/small-studio), sweet spot ~15–35k zł for a real MVP.**

| Tier / scope | Price (net) | Source |
|---|---|---|
| Simple MVP: 3–5 screens, **no backend** | 8 000 – 18 000 zł | itlight (blog-mvp-aplikacji) |
| Standard MVP: 10–15 screens, **auth + REST API** | 18 000 – 35 000 zł | itlight |
| "MVP" generic band | 15 000 – 40 000 zł | itlight (blog-koszt) |
| MVP with payments / external integrations | 30 000 – 55 000 zł | itlight |
| **Freelancer (PL) whole-project MVP band** | 15 000 – 60 000 zł | twojsoftware |
| Packaged "MVP Standard" (login, dashboard, payments, API, 3–4 wk) | **od 12 000 zł** | twojsoftware/oferta |
| Packaged "MVP Pro" (admin, 5+ integrations, 3-mo support, 5–6 wk) | **od 25 000 zł** | twojsoftware/oferta |
| PL **software house** whole-project band (ceiling, not our tier) | 40 000 – 150 000 zł | twojsoftware |
| Agency "widełki" MVP (heavy definition — the ceiling) | 30 000 – 200 000+ zł | atcsc, codeglimmer, strongsoft |

- **Two price populations — do not blend them.** Packaged/solo offers cluster at **8–55k zł**;
  agency blog "widełki" cite **30–200k+ zł** because they define MVP as full-team/multi-month.
  For a solo AI-augmented dev, **anchor on 8–40k**; the agency numbers are the value ceiling.
- **Solo Flutter dev rates (PL, 2026):** experienced ~**120–160 zł/h**; mid B2B 130–200 zł/h;
  senior 200–300 zł/h; blended software-house 100–180 zł/h. No source gave a clean "MVP = N
  hours" — *derived*: 18–35k ÷ ~130 zł/h ≈ **140–270 h ≈ 4–7 person-weeks**, matching the
  packaged 3–6 week timelines. Day rate not quoted directly anywhere (open question).
- **Timeline:** realistic solo/small-studio Flutter MVP = **4–10 weeks** (packaged offers
  claim 1–6 wk; agency framing 6–16 wk).
- **Cross-platform economics (the Flutter sell):** native iOS+Android ≈ **2× single-platform**;
  Flutter ≈ **1.3–1.5×** — i.e. one Flutter codebase saves roughly **a quarter to a third**
  vs dual native. This is the honest basis for "accessible price for both platforms".
- **What PL MVP quotes typically include** (itlight): architecture, UX/UI, Flutter frontend
  (iOS+Android), backend API, testing, **store deployment**, technical docs, **30-day
  post-launch support**. **Charged separately:** store developer accounts (client's own —
  itlight cites Apple ~500 zł/yr, Google ~100 zł one-time), hosting/cloud (200–2000 zł/mo),
  and ongoing maintenance (399–1999 zł/mo, or **10–20% of build cost per year** — a widely
  repeated rule of thumb worth knowing even if we don't sell a maintenance plan yet).
- **Open (not itemised by any PL source):** dark/light theme, i18n, and push as explicit
  line items. Treat their "standard vs extra" status as our **positioning decision**, informed
  by §4 — not a market-quoted fact.

### 2. The MVP backend (Firebase) — scope, cost, ownership

**Baseline MVP backend = Firebase Auth + Cloud Firestore + Cloud Storage + Security Rules +
FCM (push).** That is the honest "MVP structures" bundle to promise.

- **Free vs paid reality:** the Spark (free) tier covers a small app comfortably (Firestore
  **50K reads / 20K writes per day**, **50K Auth MAU**, 5 GB storage, FCM free). **Cloud
  Functions is the one catch** — it's unavailable on Spark and forces the **Blaze**
  pay-as-you-go plan. But Blaze is **not "paid" in practice**: within the same free
  allotments it bills **$0**; you only pay past the thresholds. So the practical baseline is
  *"Blaze plan, client's card on file, $0 bill until the app gets real traffic."*
- **Realistic running cost for a small MVP: $0/month**, creeping to **single-to-low-double-digit
  dollars** as it grows — driven **mostly by Firestore reads** (the 50K/day daily wall is the
  first thing a chatty app hits, before storage or writes). Honest client framing:
  *"$0/month until you have traction; then it scales roughly with usage."*
- **FCM push is free and unlimited** on both tiers, no per-message charge. **iOS caveat:**
  delivery needs an **APNs key from the client's Apple Developer account** ($99/yr) — Apple
  charges nothing per notification, but the membership is a prerequisite to ship iOS at all.
- **Client ownership is fully supported.** Recommended pattern: **client creates the Firebase
  project first** (owns GCP project + billing account = their card), then grants the dev an
  Owner/Editor IAM role to build in it — this avoids all handoff friction. Alternative: dev
  builds, then transfers ownership + relinks billing + rotates credentials (more friction).
- **Supabase** is the main alternative (Postgres) but has a **$25/mo Pro floor** where Firebase
  can genuinely be $0, plus weaker native FCM/FlutterFire integration — **Firebase stays the
  right base** for this offer and keeps stack-consistency with the web offer.

### 3. Store publication + account setup (the signature inclusion)

**The accounts must legally be the client's; the dev joins with a role and publishes.** This
is the honest, ownership-consistent framing — and a real differentiator because the client
cannot realistically do it alone.

| Dimension | Apple App Store | Google Play |
|---|---|---|
| Account cost | **$99 / year (recurring)** (+~23% PL VAT at checkout) | **$25 one-time** |
| Recurring cost to client | $99/yr forever | none after $25 |
| Org account identity | needs **D-U-N-S** (~5–7 business days) | needs **D-U-N-S** (**up to 30 days**) |
| New-account testing gate | none | **new personal accts: ≥12 testers, 14 continuous days** before production |
| Privacy declaration (hard gate) | App Privacy "nutrition labels" | Data safety form |
| Review time (official) | **90% < 24h** | **up to 7 days or longer** |
| Dev's access | Admin / App Manager / Developer; **client stays Account Holder** | admin / user; **client stays account owner** |

- **Corrected figure worth banking:** the widely-quoted **"20 testers"** Google closed-testing
  rule is now **12 testers / 14 days** per Google's own live page (verified twice). Still a
  ~2+ week block for a **new personal** Google account before production is even possible.
- **The two biggest timeline risks the offer must manage expectations around:**
  1. **D-U-N-S lead time** for organization accounts — **up to 30 days on Google**. Start it
     first if a company client has no D-U-N-S.
  2. **Google's 12-tester/14-day closed test** for new personal accounts.
  → Implication: **store setup should start on day one, in parallel with the build**, or the
  publication tail dwarfs the dev time. This belongs in the process/timeline copy.
- **What "account setup help" realistically is:** the client provides legal identity (+ D-U-N-S
  for an org), a payment card, and — for paid apps/IAP — banking/tax (owner-gated: only the
  client can sign Apple's Paid Apps Agreement / Google's payments profile). The dev guides all
  of it and joins with a publishing role. **Alternative path:** publish under the dev's own
  Apple account, then **transfer the app** to the client later (ratings/reviews retained) — a
  fallback when the client's account isn't ready but the app is.
- **Ongoing account costs the client bears** map straight into the "you own it" story:
  **Apple $99/yr**, Google one-time $25, Firebase ≈ $0-then-usage.

### 4. Reference: Western/Nordic pricing + 2026 MVP scope expectations

- **The gap that justifies the value:** Western/Nordic MVP = **€60k–120k+** (named Swedish
  agency quotes reach €20k–250k); a Polish solo/freelance Flutter dev bills ~€30–60/h vs a
  Western agency's ~€120/h — a comparable Flutter MVP runs ~**$20–40k** in PL, i.e. **~2–4×
  cheaper** than Western agency quotes. Useful as a positioning anchor for SV/EN audiences,
  **not** as our price.
- **Dark/light theme = a 2026 expectation, not a feature.** Sources: "expected, not optional";
  a missing dark mode "looks like it hasn't kept up" / reads as dated. → **Strong support for
  baking it in as standard** (and quietly differentiating vs the web offer, where it's +400 zł).
- **i18n:** a *single* well-executed language does **not** read as unfinished — full
  localization is a go-to-market decision ("Minimum Viable Localization" = store listing + key
  content). **But** the i18n *plumbing* should be wired from day one because retrofitting
  "triples the effort". → **PL/EN as standard is cheap precisely because it's built in from the
  start**; framing it as standard is honest and low-cost.
- **Standard MVP scope (2026):** auth/accounts (core), backend+DB (core), push (standard),
  analytics (standard, wire from v1); **extra:** offline, payments, AI/ML, real-time chat.

---

## Recommendation — a market-grounded 3-tier shape (owner sets final numbers)

Priced to the **mobile market independently** (per the scoping decision), the natural shape is
still three tiers — but with mobile-specific numbers, **not** the web 999/1999. Every included
item below is drawn from §1–§4; the **exact zł figures are a `⚠ CONFIRM` owner decision** (like
the web offer's promo/add-on numbers), so treat the ranges as *research orientation, not a quote*.

| Tier | Indicative price (net) | Scope | Standard inclusions |
|---|---|---|---|
| **Start** (simplest MVP) | ~**12–18k zł** | a few screens, one core flow, light Firebase backend (auth + Firestore) | **dark/light**, **PL/EN**, full store publication on client's accounts + account-setup help, 30-day support |
| **Full / Standard** (the core sell) | ~**20–35k zł** | auth + Firebase backend + several features + **push** + basic admin surface | everything in Start + push notifications + richer backend |
| **Większy projekt** (custom) | **wycena indywidualna** | payments, integrations, marketplace, real-time | scoped per project |

**Cross-cutting inclusions to state once (mobile analogue of the web "what's in every build"):**

- **Standard, not add-ons:** dark/light theme; PL/EN. (On web these are +400 zł each — call
  this out internally as the deliberate mobile differentiator, but *never* frame it as fixing a
  deficient web offer.)
- **Full App Store + Play Store publication on the client's own accounts**, plus hands-on help
  setting those accounts up (Apple + Google, incl. D-U-N-S guidance and the closed-testing gate).
- **Pay once — you own everything:** the Flutter codebase, the Firebase project (client's
  account), and the store accounts (client's identity). **Recurring costs are the client's and
  are named honestly:** Apple **$99/yr**, Firebase **≈ $0 until real traffic**, Google one-time
  $25. This is the mobile version of the web offer's ownership promise (`offer-facts.md:80-83`).
- **Timeline honesty:** build ≈ 4–10 weeks, **plus** a store-setup track that must start on day
  one (D-U-N-S up to 30 days on Google; the 12-tester/14-day gate for new personal Google
  accounts) so publication doesn't become an invisible tail.

**Deliberate scope boundaries (honest limits, mobile analogue of `offer-facts.md:104-116`):**

- **Graphics / app icon / brand:** Buzzards is a developer, not a graphic designer — same
  honest-help / external-freelancer stance as the web offer.
- **Ongoing maintenance / feature work after launch** is a separate arrangement (market rule of
  thumb: 10–20% of build/yr) — do **not** promise open-ended support beyond the 30-day window.
- **Payments, complex integrations, marketplaces** → individual quote, not Start/Full.

---

## Code References

- `context/foundation/offer-facts.md:26-39` — web offer packages & pricing (999/1999/custom);
  the ownership + "pay once" model this mobile offer mirrors (`:80-83`), and honest-limits
  pattern (`:104-116`).
- `context/foundation/offer-facts.md:58-77` — web add-on table; **dark/light = +400 zł**,
  **extra language = +400 zł/język** (the two items proposed as *standard* on mobile).
- `app/[locale]/web-pages-offer/page.tsx:73-81` — web offer section order to mirror
  (Hero → Problem → Guide → Includes → Pricing → Modules → Ownership → Faq → Quote).
- `components/sections/offer/` — the 9 web offer section components a mobile offer would parallel.
- `messages/pl.json` (offer namespace ~730–901) — i18n namespace shape a `mobileOffer`
  namespace should mirror (meta, hero, problem, guide, includes, pricing, modules, ownership,
  faq, quote).
- `messages/pl.json:39,44,152,244-245,350` — existing Flutter/mobile credibility copy (Honeti,
  Flutter/Dart, "AI-Augmented Mobile Developer") to reuse for proof.

## External Sources (live docs)

**PL market pricing (Flutter MVP):**
- itlight — https://itlight.eu/blog-mvp-aplikacji · https://itlight.eu/blog-koszt-aplikacji-mobilnej.html
- twojsoftware — https://www.twojsoftware.pl/koszt-aplikacji-mobilnej · https://www.twojsoftware.pl/oferta/tanie-mvp-aplikacje-polska
- atcsc — https://atcsc.pl/mvp-aplikacji-jak-stworzyc-i-ile-to-kosztuje/
- codeglimmer — https://codeglimmer.com/ile-kosztuje-zbudowanie-aplikacji-mobilnej-w-2025-roku/
- strongsoft — https://www.strongsoft.pl/ile-kosztuje-stworzenie-aplikacji-mobilnej-na-ios-i-android/
- PL Flutter/IT rates — https://pl.jooble.org/praca-flutter-developer · https://bizky.ai/blog/stawki-freelancera-w-2025-ile-brac-za-godzine/

**Firebase backend (scope, pricing, ownership):**
- https://firebase.google.com/pricing · https://firebase.google.com/support/faq
- https://firebase.google.com/docs/firestore/pricing · https://cloud.google.com/identity-platform/pricing
- https://firebase.google.com/docs/projects/iam/overview · https://firebase.google.com/docs/projects/iam/roles-basic
- https://firebase.google.com/docs/cloud-messaging/ios/get-started
- Supabase contrast — https://supabase.com/pricing

**App Store + Play Store (2026):**
- Apple — https://developer.apple.com/support/enrollment/ · https://developer.apple.com/support/D-U-N-S/ · https://developer.apple.com/help/account/membership/D-U-N-S/ · https://developer.apple.com/distribute/app-review/ · https://developer.apple.com/app-store/app-privacy-details/ · https://developer.apple.com/help/app-store-connect/reference/role-permissions/ · https://developer.apple.com/help/app-store-connect/transfer-an-app/overview-of-app-transfer/
- Google — https://support.google.com/googleplay/android-developer/answer/6112435 (fee) · https://support.google.com/googleplay/android-developer/answer/14151465 (**12 testers / 14 days**) · https://support.google.com/googleplay/android-developer/answer/13628312 (D-U-N-S) · https://support.google.com/googleplay/android-developer/answer/10787469 (data safety) · https://support.google.com/googleplay/android-developer/answer/9859751 (review) · https://support.google.com/googleplay/android-developer/answer/9844686 (permissions)
- Android developer verification — https://developer.android.com/developer-verification

**Western/Nordic reference + MVP scope:**
- https://www.netguru.com/blog/mobile-app-development-cost · https://www.apptunix.com/blog/mobile-app-development-cost-europe/ · https://theninehertz.com/blog/mobile-app-development-cost-in-sweden · https://www.ptolemay.com/post/how-much-does-it-cost-to-develop-an-app-in-germany · https://www.index.dev/blog/flutter-developer-hourly-rates
- MVP scope — https://www.enacton.com/blog/mvp-app-development/ · https://inceptivesdigital.com/blog/mvp-mobile-app-development · https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/ · https://simpleen.io/blog/internationalize-translate-mvp

## Architecture Insights

- **The web offer's whole apparatus ports to mobile** — same ownership model (client owns the
  project + accounts + code, pays once), same honest-limits stance (dev not a designer), same
  facts-oracle discipline. A `context/foundation/mobile-offer-facts.md` should mirror
  `offer-facts.md`, and a `mobileOffer` i18n namespace should mirror the `offer` namespace.
- **Stack consistency is a genuine asset:** Firebase underpins both the web (hosting/functions)
  and the mobile (backend) offers — one ownership story, one "on your own account" line, one
  set of running-cost mechanics the owner already understands.
- **Store publication is the one thing with no web analogue** — it needs its own section/copy
  (the pain point + the "I set it up on your accounts" promise + the honest timeline).

## Historical Context (from prior changes)

- `context/foundation/offer-facts.md` — the web offer facts oracle; pricing (`:26-39`),
  ownership (`:80-83`), add-ons incl. dark/light +400 and extra-language +400 (`:58-77`),
  honest limits (`:104-116`). The template for a mobile facts sheet.
- `context/slices/client-web-offer/research.md` — web market pricing (simple landing ~1000 zł;
  landing+CMS 1500–2000 zł) that anchored the 999/1999 points — the direct precedent for this
  mobile-market equivalent.
- `context/slices/client-web-offer/research-payment-terms.md` — payment-terms + PL consumer-law
  research (zaliczka/zadatek, art. 15/38 consent block, VAT-zwolnienie at these tickets,
  Stripe/Przelewy24/PayU gateways). **Directly reusable** for the mobile offer, whose higher
  tickets (12–35k+ zł) make **staged milestones / zadatek** even more clearly the right model
  than the web's smaller jobs did (that research already recommends milestones at 5k+).
- `context/archive/slices/2026-07-19-mobile-design-generation/` — the Flutter design-capability
  slice (Material 3, Flutter 3.16+, ColorScheme/TextTheme/ThemeExtension, Riverpod, dark+light
  first-class). Confirms dark/light is already a solved capability, reinforcing "standard".

## Related Research

- `context/slices/client-web-offer/research.md` — web market pricing (sibling).
- `context/slices/client-web-offer/research-payment-terms.md` — payment terms + PL law
  (reusable; higher mobile tickets strengthen the milestone/zadatek recommendation).
- `context/slices/web-copy-generation/*` — the copy pipeline that would author the mobile
  offer's PL copy (then transcreate EN/SV) once the facts sheet exists.

## Open Questions

1. **Exact zł tier prices** — the ranges here are research orientation, not a quote. Owner sets
   the final Start / Full numbers (⚠ CONFIRM, like the web promo/add-on figures). Recommendation
   anchors: Start ~12–18k, Full ~20–35k, custom = individual.
2. **Store publication as a paid line item vs bundled inclusion** — bundle it into every tier
   (recommended, it's the differentiator) or price it as an explicit add-on? Owner's call.
3. **Do we sell a maintenance/support plan** beyond the 30-day window (market rule: 10–20% of
   build/yr), or stay build-only like the web offer? Not yet decided.
4. **Payment terms for the higher tickets** — reuse `research-payment-terms.md`'s milestone +
   zadatek recommendation (12–35k zł clearly warrants staged payment); confirm the exact split
   (e.g. 40/30/30) and whether to surface it on the page or keep it in the contract.
5. **Individual vs organization store accounts** for the typical client — drives whether D-U-N-S
   (and its up-to-30-day Google lead time) is on the critical path; affects the timeline copy.
6. **Where dark/light + PL/EN sit in copy** — stated plainly as "standard" (recommended) vs
   silently included. Positioning guardrail (per web offer's `offer-facts.md:148-151`): frame as
   *elevation baked in*, never as fixing a deficient baseline.
7. **PL-source gaps** — no PL source itemised theme/i18n/push pricing, and none gave a clean
   "MVP = N hours"; hour/day figures here are derived, not quoted.
