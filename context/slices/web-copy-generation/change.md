---
change-id: web-copy-generation
title: "Professional web-copy generation — reusable copywriting capability + offer-page rewrite"
status: implementing
created: 2026-07-18
updated: 2026-07-19
---

# Professional web-copy generation

Reusable capability for producing genuinely professional, on-brand marketing copy
(PL source → EN + SV) for the Buzzards Soft site, plus the first application:
rewriting the amateur-reading `/web-pages-offer` copy to a professional register.

Triggered by review of the shipped offer page: the copy reads crude, repetitive and
over-casual ("jak do kolegi w gimnazjum"). This slice researches how professionals
produce web copy — both authoring our own copywriting skill/framework and adopting a
ready-made solution — and lands a standard we can reuse for every future page.

First artifact: `research.md` — build-vs-buy analysis + a professional copywriting
standard, grounded in the current offer copy and live external sources.

## Notes

### 2026-07-19 · Sprint 002 closing gate (HC1) — PL copy NOT yet approved; loop back to Phase 3

The developer reviewed `offer-rewrite-pl.md` at the HC1 gate and requested a Phase 3
revision before approval. Decisions on the six Open Questions:

1. **Hero price anchor (F1/Q1):** drop *"w cenie kilkuset złotych"* — use a different
   phrasing for `hero.heading`, `hero.subheading`, and `meta.description`. Reframe the
   hero away from the *"kilkuset złotych"* anchor.
2. **Proof/CTA link target (Q2):** `/#warsztat` is confirmed OK for the proof links.
3. **Promo end date (Q3):** the "1–3 months" was a plan-time placeholder; the promo now
   runs **until end of August** (*do końca sierpnia*), possibly extended later — and the
   end date must be **visible on the page** (`pricing.promoNote` keeps *"cena ważna do
   końca sierpnia"* as a firm, visible claim).
4. **`meta.title` suffix (Q4):** keep *"— Buzzards Soft"* per the proposal; normalize the
   separator to the site's `lib/seo.ts` convention at landing (Sprint 003).
5. **FAQ `logo` answer (Q5):** the current answer needs a **general re-edit**. Confirmed
   factual policy: **Buzzards is a developer, not a graphic designer — graphics and logos
   are not part of the build.** The honest, helpful stance: point the client to options —
   **AI design, paid stock, or a recommended human designer** — with any extra cost **on
   the client's side**. This applies to both logos *and* photos. Rewrite the answer
   affirmatively in-voice (not "you must supply everything", but "graphics aren't my craft;
   here's how to get good ones").
6. **Pricing footnote / promo framing (Q6):** **no "offer window" language anywhere**
   (drop *okno/okres startu oferty*). The **offer is one fixed, permanent offer**; the
   **promo applies to the base price and runs until end of August**. Retag the discounted
   price from *"cena startowa"* → *"cena promocyjna"*; reword `pricing.footnote` to state
   the promo-on-base-price-until-end-August framing without any launch-window wording.

