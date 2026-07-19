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

### 2026-07-19 · Sprint 002 closing gate (HC1) — PL copy APPROVED for landing

The developer approved the revised PL copy and the locked `offer.*` key map (126 leaves,
frozen in `~/.claude/copy-standard/namespace-contract.md` §6, with the `offer.hero.heading`
+ `offer.quote.*` F2 pins preserved) after the Phase 3 revision (`b86790b`) applied all six
gate decisions. Sprint 003 (landing) is unblocked. Slice stays `implementing` — Phases 4–6
(land PL, restructure page, EN/SV, agent) remain.

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

## Deviations

### 2026-07-19 · Session 1 · Phase 4 — contained
- **Plan assumed:** only two offer-coupled tests need touching
  (`web-pages-offer-3-locales.spec.ts`, `offer-quote.test.tsx`); both read pinned keys
  dynamically, so neither needs content edits.
- **Actually found:** a third coupled test, `tests/unit/offer-faq.test.tsx`, hard-pins the
  *old* logo-answer content (`dostarczasz Ty` / `wycena indywidualna`) as string guards. The
  HC1-approved Phase-3 rewrite (`offer-rewrite-pl.md`, Open Question Q5 — RESOLVED) replaced
  that answer with the developer-not-designer / cost-on-client policy, so the guards went red.
- **What I did:** re-pointed the two guard substrings to the new locked decision's
  load-bearing content (`nie grafikiem`, `koszt po Twojej stronie`); oracle = the approved
  rewrite artifact, not the implementation.
- **For the reviewer:** confirm the logo-answer guard change matches the HC1 Q5 decision
  (developer-not-designer + cost-on-client), and that the guard phrases pin the intended policy.

### 2026-07-19 · Session 2 · Phase 5 — contained
- **Plan assumed:** Phase 4 lands "interim real strings" for EN/SV; the **final** transcreated
  EN and translated SV land in Phase 5.
- **Actually found:** Phase 4 (`ecaa861`) already landed EN as a full native-reading
  transcreation and SV as a complete model-produced translation for the frozen 126-leaf SB7
  map — not rough interim drafts. `messages/en.json` / `messages/sv.json` had no working-tree
  diff in this session.
- **What I did:** authored the missing deliverable — the EN transcreation skill
  (`~/.claude/skills/transcreate-copy-en/`, user-scope) + EN-only rules — then reviewed the
  already-landed EN against the new EN AI-tell ban-list + calque rules (clean) and SV for
  parity/coherence (complete, non-placeholder). No `messages/*` re-write warranted (re-landing
  identical-quality copy would be churn). All three verification gates green.
- **For the reviewer:** confirm comfort that final EN+SV landed in Phase 4 rather than Phase 5
  (copy quality unchanged; manual sign-off rows 5.4–5.6 still apply). The new EN skill/rules
  are user-scope and were not exercised to (re)generate the landed copy.

