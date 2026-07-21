# Mobile-offer facts — canonical source of truth for the mobile-app offer copy

> **The facts oracle** (sibling of `offer-facts.md`, which governs the web offer). Every
> factual claim in the mobile offer copy — PL/EN/SV — must trace to this file. If a fact
> isn't here, it does **not** go in the copy: it goes to `## Open Questions`, never a
> guessed number. When a fact changes, change it **here first**, then regenerate the copy.
>
> Seeded 2026-07-20 from `context/slices/client-mobile-offer/research.md`, the owner's
> scoping decisions (PL market primary · Flutter + Firebase · price to mobile market
> independently), and the AI-augmented pricing pass in this slice's conversation.
> Items marked **⚠ CONFIRM** need the owner's explicit sign-off.

## Positioning (the "why")

- Buzzards Soft is **one developer** who builds mobile apps for small businesses / freelancers,
  working **AI-augmented and saying so openly**. AI = faster + cheaper; a human decides,
  checks, and is accountable for quality. Never "made by AI" — always "an expert who wields AI".
- **The pricing thesis:** because delivery is AI-augmented (on top of one Flutter codebase for
  both platforms), real build hours are lower, so the price can sit **below the PL solo/small-
  studio market and well below a software house — without being a race to the bottom.** Price
  drops because *time* drops, not because the work is cheap.
- **Accessible price for a real, owned product** is the promise — a published iOS + Android app
  the client fully owns, not a template they rent.

## Packages & pricing (net / "netto")

| Package | Base price | Promo price | For whom | Scope |
|---|---|---|---|---|
| **Start** | 12 900 zł | **9 900 zł** | first real product on iOS+Android; one core flow | app + light Firebase backend + full store publication |
| **Full** | 24 900 zł | **19 900 zł** | a business that wants the app as a working tool | Start + accounts + loyalty + push + owner admin panel |
| **Większy projekt** | wycena indywidualna | — | payments, multi-location, integrations | bespoke (from ~30 000 zł) |

- **All prices are net (netto).** Recommended/working figures accepted by the owner
  2026-07-20; mapped ×10 from the web tiers with `9 900` / `19 900` endings.
- **Why not lower ("nie za niska"):** effective solo rate stays healthy after AI savings —
  Start 9 900 zł ÷ ~80–110 h ≈ **90–124 zł/h**; Full 19 900 zł ÷ ~170–240 h ≈ **83–117 zł/h**.
  Both sit above the ~80 zł/h floor for a PL solo dev — attractive to the client, fair to Buzzards.
- **PL-market anchor these undercut (from research):** solo/small-studio Start-like MVP
  ~12–18k, Full-like ~20–35k, software house 40–150k. The offer sits **below the freelancer
  band and far below the software house** — the deliberate "third way" for mobile.
- ⚠ **CONFIRM — promo window.** Whether the mobile offer carries the same *"do końca sierpnia"*
  promo mechanic as web is the owner's call; not yet confirmed. Until then, promo prices are the
  working headline ask, base prices the anchor.

## What's included in every package (standard)

- **iOS + Android from one Flutter codebase** (one app, both stores).
- **Dark/light theme AND PL/EN** — **standard**, baked in (on the *web* offer these are +400 zł
  add-ons each; on mobile they are the 2026 baseline and are included). Positioning guardrail:
  frame as *elevation included*, **never** as fixing a deficient base (see [[no-negation-marketing]],
  and the web offer's same guardrail, `offer-facts.md:148-151`).
- **Backend on the CLIENT's own Firebase account** — auth, database (Firestore), push (FCM),
  and (Full) cloud functions. Client owns the project + billing. Keep "Firebase" mostly out of
  client-facing copy (dev jargon) — name it here in the facts; in copy say "backend na Twoim koncie".
- **Full publication to the App Store + Google Play on the CLIENT's own accounts**, including
  **help setting those accounts up** and walking the client through Apple/Google requirements
  (D-U-N-S for companies; Google's closed-testing gate).
- **Pay once — you own everything:** the Flutter code, the Firebase project, the store accounts.
  **Recurring costs are the client's and are named honestly:** Apple **99 USD/rok**, Google
  **25 USD jednorazowo**, Firebase **≈ 0 zł** until real traffic (then scales with usage,
  mostly Firestore reads).
- **30-day post-launch support**; further maintenance is a separate arrangement.

## Scope per tier (the boundary that holds the price)

- **Start (9 900 zł):** one polished core flow + light Firebase backend (auth + Firestore),
  dark/light, PL/EN, full store publication. Example (booking app): browse services → pick a
  slot → book (a *request*) → business is notified. No user accounts (anonymous), no self-service
  cancel, no loyalty, no owner admin panel, no customer push. ~6–7 screens. Build ~3–5 weeks.
- **Full (19 900 zł):** Start + **real accounts/profiles**, **self-service cancel/reschedule**,
  **loyalty program** (stamps/points), **push notifications** (reminders), and an **owner admin
  surface** (manage services, availability, bookings from the phone). ~31 screens (customer +
  owner). Build ~6–9 weeks. Still an MVP — no payments/marketplace.
- **Większy projekt (indywidualna, od ~30k):** online payments/prepay, multi-location, staff/
  resource selection, external calendar sync, deep integrations, real-time collaboration.

## Ownership & running costs (client-borne)

- Code, Firebase project, and store accounts are the client's. **Pay once — no subscription to
  Buzzards.** Ongoing costs the client pays directly: **Apple 99 USD/rok**, **Google 25 USD
  jednorazowo**, **Firebase ≈ 0 zł** at small scale (scales with usage). Mobile analogue of the
  web offer's "darmowy hosting na Twoim koncie + tylko domena ~50–90 zł/rok".

## Process, timeline & the publication risk

- **Two parallel tracks from day one: build + store setup.** Store setup MUST start on day one
  because store bureaucracy can be longer than the build and cannot be compressed by effort.
- **Timeline:** Start end-to-end to "live" ~**5–7 weeks** (up to ~8–9 with D-U-N-S / Google gate);
  Full ~**8–11 weeks**.
- **The two calendar risks to communicate honestly (not to scare):**
  1. **D-U-N-S** for an organization store account — Apple ~5–7 business days, **Google up to 30
     days**. Start it first if the client is a company.
  2. **Google closed-testing gate** — a **new personal** Google Play account must run a closed
     test with **≥12 testers for 14 continuous days** before production. (The widely-quoted
     "20 testers" is outdated — Google's live figure is **12**.) Org / existing accounts are
     exempt — so choose the account type on day one.
- **Review times (official):** Apple 90% < 24h; Google up to 7 days.

## Honest limits (what is NOT included)

- **Graphics / app icon / brand** are not the build — Buzzards is a **developer, not a graphic
  designer**; honest help pointing to routes (AI, stock, a recommended designer), each an extra
  cost on the client's side. Same stance as the web offer.
- **Maintenance beyond the 30-day window** (bug-fixes, OS/SDK/store-policy upkeep, new features)
  is a separate engagement. Market rule of thumb for orientation only: **10–20% of build cost / yr**.
- **Payments, multi-location, marketplaces, deep integrations, real-time collaboration** → individual quote.

## Payment terms

- Not yet set for mobile. The web slice's `research-payment-terms.md` recommendation applies and
  is **stronger here**: at 10–20k+ zł tickets, use **staged milestones + zadatek** (that research
  already recommends milestones at 5k+). ⚠ CONFIRM the split (e.g. 40/30/30) and whether to
  surface it on the page or keep it in the contract.

## Open / to-confirm (owner is the authority)

1. ⚠ **Final tier prices** — 9 900 / 19 900 accepted as working figures 2026-07-20; confirm as final.
2. ⚠ **Promo window** — carry the web's *do końca sierpnia* mechanic to mobile, or price flat?
3. ⚠ **Store publication** — bundled inclusion in every tier (recommended, it's the differentiator)
   vs an explicit add-on?
4. ⚠ **Maintenance plan** — sell one beyond 30 days, or stay build-only like the web offer?
5. ⚠ **Payment terms** — milestone split + zadatek wording (reuse `research-payment-terms.md`).
6. ⚠ **Individual vs organization store accounts** as the default assumption (drives the D-U-N-S
   critical path and the timeline copy).

## Sources

- `context/slices/client-mobile-offer/research.md` — the full 2026 market-pricing + Firebase +
  store-publication research this offer is built on (cited live sources).
- `context/slices/client-web-offer/research-payment-terms.md` — payment terms + PL consumer law (reusable).
- `context/foundation/offer-facts.md` — the web offer facts oracle this file mirrors.

## Revision log

- **2026-07-20 — seeded.** Created from the mobile research + the AI-augmented pricing pass.
  Prices set at Start 12 900/9 900, Full 24 900/19 900, Większy indywidualna (od ~30k), justified
  by the effective-rate floor (~83–124 zł/h after AI savings) so the offer is attractive but not
  underpriced. Dark/light + PL/EN made standard (vs +400 zł add-ons on web). Store publication +
  account-setup help made a signature bundled inclusion across all tiers.
