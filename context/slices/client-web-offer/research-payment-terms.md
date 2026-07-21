---
date: 2026-07-20T12:00:00+02:00
researcher: Claude (Opus 4.8) + Mariusz
git_commit: 50df0b7ad0afe939c254633687445b5c6cfc1f70
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Payment terms for the web-pages offer — upfront vs deposit+acceptance vs on-completion, at our price points"
tags: [research, offer, pricing, payment-terms, legal-pl, stripe, consumer-law]
status: complete
last_updated: 2026-07-20
last_updated_by: Claude (Opus 4.8)
---

# Research: Payment terms for the web-pages offer

**Date**: 2026-07-20T12:00:00+02:00
**Researcher**: Claude (Opus 4.8) + Mariusz
**Git Commit**: 50df0b7ad0afe939c254633687445b5c6cfc1f70
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

At our current offer prices, how should we treat the **payment term**? Three candidate models:

- **(A) Full prepayment / upfront** — plus a planned future "shop" step where the client clicks the package they want and pays online.
- **(B) Deposit (zaliczka) + balance after the client accepts the finished site.**
- **(C) Payment after completion (z dołu).**

Grounded in our **real price list** and our static-export + Cloud Function architecture.

## Summary

**Recommendation: a price-tiered Model B, not one flat rule.** The right answer changes with ticket size and client type — a single "always X" policy is wrong at both ends of our range.

- **Basic (999 zł)** — take it **as one payment, effectively upfront** (or a simple 50/50), *because* the accounting/invoicing overhead of splitting a sub-1000 zł job is disproportionate and the market accepts single-payment for the smallest jobs. The catch: for a **konsument**, naked full-prepayment is *legally fragile* — you must pair it with a contract, a timeline, bounded deliverables, and the **art. 15 ust. 3 consent block** (below), or you owe a full refund for 14 days.
- **Full (1999 zł)** — classic **Model B: ~40–50% deposit + balance on acceptance.** This is the Polish market norm and it balances both parties' risk.
- **Wycena indywidualna (sklep / 5k+ zł)** — **stage-gated milestones** (e.g. 40/30/30 or per-phase), with **zadatek** and a deemed-acceptance clause. Never carry a multi-week custom build with no money down.
- **Model C (z dołu)** is the highest commercial risk (you finance all the work, then chase non-payers) — keep it only as a deliberate concession, never the default.
- **The deposit label matters legally:** for **B2B** use **zadatek** (art. 394 KC — you keep it if the client walks); for **konsumenci** use **zaliczka + the consent block**, and never write full-forfeiture (it's an abusive clause).
- **The "shop"/pay-online step (A) is architecturally clean and cheap to add later:** **Stripe Checkout** (hosted page) + two new Cloud Functions mirroring the existing `contact` function. A deposit is just a smaller charge — no special primitive needed. This does **not** require abandoning static export.

One flag worth internalizing: **"it's a firm, so consumer rules don't apply" is false for one-person clients.** A JDG buying a website whose purchase lacks *professional character* (a plumber, a dentist) can still hold consumer withdrawal rights (art. 385⁵ KC). Default one-person clients to the consumer-safe variant.

---

## Detailed Findings

### 1. What the offer currently says about payment (codebase)

Today the offer page states a **one-time price** and is otherwise **silent on payment term** — there is no mention of "z góry", "zaliczka", "faktura", or a payment schedule anywhere in the UI or i18n.

- Pricing render: [`components/sections/offer/offer-pricing.tsx:87-181`](components/sections/offer/offer-pricing.tsx) — three tiers (`basic`, `full`, `custom`); Basic/Full show struck base price + promo price, `custom` shows "Wycena indywidualna".
- The promo window is **hard-coded copy**: `offer.pricing.promoNote` = *"cena ważna do końca sierpnia"* and `offer.pricing.footnote` = *"Ceny netto. Cena promocyjna obowiązuje do końca sierpnia."* ([`messages/pl.json`](messages/pl.json), offer namespace ~lines 745–848). **Note: this hard-codes "end of August" with no flag/date logic** — it must be edited by hand when the promo ends.
- One-time-payment framing is explicit in FAQ: `offer.faq.items.monthly.answer` = *"Nie, płacisz jednorazowo…"* and `offer.ownership.body` = *"Za stronę płacisz raz."* (~lines 845, 879).
- The lead form is **not** a checkout — `offer.quote.intro` = *"Bez zobowiązań… Odpiszę z wyceną…"* ([`components/sections/offer/offer-quote.tsx:1-35`](components/sections/offer/offer-quote.tsx)) reuses `ContactForm`, which POSTs a lead to `/api/contact`.

**Implication:** payment terms today live (implicitly) in the sales conversation and any contract — **not** on the page. Whatever we decide, the *marketing page* needs at most a short "Jak płacisz" line + one FAQ item; the enforceable mechanics (consent, zadatek/zaliczka) belong in the **contract / regulamin**, not the page.

### 2. Architecture: what a future online-payment step permits/forbids

Confirmed against the repo:

- `output: 'export'` in [`next.config.ts:6-7`](next.config.ts) → fully static `out/`, **no SSR / no route handlers / no server actions at runtime**.
- The **only** dynamic surface is the Firebase rewrite [`firebase.json:15-20`](firebase.json): `/api/contact` → Cloud Function `contact` (Node 22, `europe-west1`), which validates a Zod payload and relays email via Resend ([`functions/src/index.ts:24-33,139-219`](functions/src/index.ts)). Secrets (`RESEND_API_KEY`) live in Firebase Secret Manager.
- Feature-flag seam exists (build-time `NEXT_PUBLIC_*`, [`docs/adr/0001-feature-flags-strategy.md`](docs/adr/0001-feature-flags-strategy.md)) — could gate a "buy" UI, but **payment logic must live in a Cloud Function**, not the static export.

**Permitted (no architecture change):** a "buy/deposit" button that POSTs to a new Cloud Function which creates a **hosted checkout session** and returns its URL; the browser redirects; a second function receives the gateway webhook and confirms. **Forbidden:** in-page card handling, cart/session state on the site, server-side payment verification anywhere but a Cloud Function. See §5 for the concrete Stripe shape.

### 3. Legal grounding (PL) — the load-bearing constraints

*Every claim below is grounded in a fetched source; see [External Sources](#external-sources-live-docs). This is research, not legal advice — one contract review by a radca prawny before launch is worth it.*

**Zaliczka vs zadatek (art. 394 KC).** A **zaliczka** is a plain advance — refundable in full if the deal doesn't complete, regardless of who walks. A **zadatek**: if the client (who gave it) backs out, you **keep it**; if you (who received it) back out, you return **double**; on normal completion it's credited to the price; on mutual/no-fault dissolution it's returned 1×.
→ For **B2B**, **zadatek is the stronger instrument** on exactly our risk (client commissions custom work, then walks). Two caveats: (1) art. 394 covers *total non-performance only*, not disputes over partially-delivered work — that risk is bounded by **milestones/acceptance (Model B)**, not by the deposit label; (2) if the contract is **silent**, do **not** assume zadatek effects — **write the word "zadatek" explicitly** (the "courts presume zadatek" claim is contested and unverified).

**Consumer 14-day withdrawal right (art. 27 ustawy o prawach konsumenta).** Ordering a website via a web form / online checkout is a *umowa zawarta na odległość*, so a **konsument** may withdraw within 14 days without reason. **Prepayment does not waive this** — if they withdraw and no exception applies, you refund **all payments within 14 days** (art. 32), no fee deductions. So **Model A against a consumer is only safe if you lock in an art. 38 exception before starting work.**

**The consent block (art. 15 ust. 3 / art. 21).** To begin a **paid** service before the 14 days elapse and be able to keep payment for work done, you must obtain — **on a durable medium (email/PDF), as a separate active tick or signed line, never pre-checked or buried in a regulamin** — the consumer's (1) express request to start early and (2) acknowledgment that they lose the withdrawal right on **full** performance. Suggested wording:

> *"Wyrażam wyraźną zgodę na rozpoczęcie świadczenia usługi przed upływem 14-dniowego terminu na odstąpienie od umowy oraz przyjmuję do wiadomości, że po pełnym wykonaniu usługi przez wykonawcę utracę prawo odstąpienia od umowy."*

If the consumer withdraws mid-work (after valid consent), they owe a **proportional** amount for work done (art. 35). If consent was **not** obtained properly: they keep the full right, get a full refund, and owe nothing; if never informed of the right at all, the window extends to **12 months**.

**Which art. 38 exception covers a custom website is genuinely unsettled** (pkt 1 "service fully performed", pkt 3 "made-to-spec good", pkt 13 "digital content" all arguably apply; pkt 3 is written around a *rzecz*, which a website isn't cleanly). **Recommendation: engineer the pkt 1 "service performed at the consumer's express request" path** (which you control procedurally) rather than lean on pkt 3. This is the one point genuinely worth a lawyer's classification call.

**Never write full forfeiture against a consumer.** A deposit-forfeiture near the full contract value is an **abusive clause** (art. 385³ pkt 17 KC — *rażąco wygórowane odstępne*) and unenforceable. Tie any retained amount to **work actually performed** (the art. 35 proportional route).

**B2C vs B2B — and the one-person-firm trap.** A company buying in a professional capacity has **no** withdrawal right. **But** a JDG whose purchase **lacks professional character** for them (art. 385⁵ KC) *can* still hold consumer protections — e.g. a marketing/IT agency buying a website = professional = no withdrawal; a plumber/dentist buying one for their own admin = possibly non-professional = consumer rules may apply. **Practical drafting: keep two contract variants** — a **B2C** one (art. 15/21 consent block + proportional wording) and a **B2B** one (states professional capacity + uses explicit **zadatek**). For a one-person client whose purchase might be non-professional, **default to the B2C-safe variant.**

**VAT / faktura zaliczkowa.** If **VAT-registered**: receiving a zaliczka triggers the VAT tax point on receipt (art. 19a ust. 8) and a faktura zaliczkowa by the 15th of the following month (art. 106i ust. 2) — *unless* advance and delivery fall in the **same month** (SLIM VAT 3: single final invoice suffices). If on **zwolnienie z VAT** (**realistic at 999/1999 zł tickets** — limit 200 000 zł, rising to **240 000 zł from 2026-01-01**): **no VAT faktura-zaliczkowa obligation**; a pure advance is generally **not PIT income on receipt** either (recognized on performance). → At our ticket sizes, VAT overhead is **not** a reason to avoid deposits.

### 4. Market norms (PL) — what small studios actually do

- **Deposit norm is 30–50% upfront, balance on acceptance.** Multiple independent sources converge: "software houses and pro freelancers rarely take the full amount upfront… 30–50% deposit", "two × 50% (before / after approval)", a 3-stage **40/30/30** for larger freelance jobs, one studio at a low **20% tied to design approval**.
- **Payment-on-acceptance is the standard, doubly-protective structure** — protects the dev (a website contract is *umowa o dzieło*; unpaid = no copyright license = client can't lawfully publish, the lever behind "no payment, no go-live") and the client (doesn't pay for unseen work).
- **100% upfront: sources genuinely conflict.** One defends it as normal for agencies (real costs, makes the client serious); another (2026 dev guide) calls **"100% z góry bez żadnego harmonogramu"** a red flag and says "an honest contractor takes 30–50%". **Reconciliation:** near-full prepay is defensible **when backed by a signed contract + timeline + bounded deliverables/revisions**; naked "pay it all, trust me" reads as a scam signal. For our low tier, keep a **visible structure** even if it's effectively prepay.
- **Anti-scope-creep: our 2/4 revision caps are exactly the market instrument.** Reinforce them with a written **"1 round = 1 consolidated email"** definition + a **deemed-acceptance clause** (e.g. "no comments within 5 days = accepted, triggers payment") so a client can't stall approval to defer payment forever.
- **Small-ticket friction is real:** for a ~999 zł job, splitting into tranches **doubles invoicing/JPK overhead** for little risk reduction. Practitioners lean to **upfront or single-balance-on-acceptance** for the smallest jobs, reserving true milestone schedules for 10k+ builds. (MPP split-payment doesn't apply below 15 000 zł, so that's not a reason to split either.)

### 5. The "shop" / pay-online step (Model A's second half)

- **Gateways (all support BLIK + e-przelew + cards):** Przelewy24 (~1.29–1.9% + 0.30 zł), PayU (BLIK ~1.19% + 0.09 zł; JDG can start on a private account up to **2500 zł/txn** during verification — comfortably covers a 999–1999 zł package), Tpay (2026 package model), **Stripe** (BLIK 1.6% + 1 zł, EEA cards 1.5% + 1 zł, Przelewy24 1.9% + 1 zł). At ~1000 zł tickets the fixed component is a rounding error, so **developer experience + a hosted page dominate**.
- **All offer a hosted/redirect checkout** → the static site **never touches card data** (no PCI burden).
- **Minimal flow (mirrors `contact`):** static button POSTs `{packageId}` → `createCheckout` Cloud Function creates a session (amount, success/cancel URLs) → returns hosted URL → browser redirects → customer pays (card/BLIK/bank) → `paymentWebhook` Cloud Function verifies signature → marks paid / emails via Resend → redirect to a static `/pl/dziekujemy`. **Two new Cloud Functions + two `firebase.json` rewrites**, structurally identical to `contact`.
- **Stripe specifics (Context7 live docs):** Checkout supports **BLIK** (PLN, hosted ✅, no manual capture, single-use 2-min code) and **Przelewy24** (EUR+PLN); a PL account can accept both. Create: `stripe.checkout.sessions.create({ mode:'payment', line_items, success_url, cancel_url })` → redirect to `session.url`. Confirm: webhook `stripe.webhooks.constructEvent(rawBody, sig, secret)` on `checkout.session.completed` (`payment_status === 'paid'`). **Gotcha:** the webhook needs the **raw** request body, not Firebase's auto-parsed JSON.
- **Deposit online = just a smaller charge** (set amount to 30–50%). The balance is a **separate later transaction** (second link/session, or invoiced). BLIK is single-use so a balance can't be auto-charged on BLIK — needs a fresh code or a saved card (Stripe off-session).
- **Compliance to attach to any online sale:** a **regulamin** + pre-contract **obowiązki informacyjne** (NIP/address, total price incl. tax, the 14-day right) + the **art. 15/38 consent checkbox** on the checkout page.

---

## Recommendation mapped to the three models

| Tier | Recommended term | Label | Why |
|---|---|---|---|
| **Basic 999 zł** | **One payment upfront** (or simple 50/50), backed by contract + timeline + revision cap. B2C: + art. 15 consent block. | zaliczka (B2C) / zadatek (B2B) if split | Split overhead disproportionate at sub-1000 zł; market accepts single-payment for smallest jobs; consumer-safe only with the consent block. |
| **Full 1999 zł** | **~40–50% deposit + balance on acceptance** (Model B). | zadatek (B2B) / zaliczka + consent (B2C) | Market norm; balances both risks; acceptance gate handles the disputed-work risk art. 394 doesn't. |
| **Wycena indywidualna (sklep, 5k+)** | **Stage-gated milestones** (40/30/30 or per-phase) + deemed-acceptance. | zadatek | Never carry a multi-week custom build with no money down. |

- **Model C (z dołu)** — deliberate concession only; highest commercial risk.
- **Model A's "pay online" half** — build it **later** as Stripe Checkout + 2 Cloud Functions; first useful step is a **deposit/prepay link**, not a full self-serve shop.

## Code References

- `app/[locale]/web-pages-offer/page.tsx:1-86` — offer route, 11 sections, static params.
- `components/sections/offer/offer-pricing.tsx:87-181` — 3 tiers, promo/base price render.
- `components/sections/offer/offer-quote.tsx:1-35` — lead form (reuses `ContactForm`), **not** a checkout.
- `messages/pl.json` (offer namespace ~745–895) — pricing/promo/FAQ copy; `promoNote`/`footnote` hard-code "end of August"; no payment-term keys.
- `functions/src/index.ts:24-33,139-219` — the `contact` Cloud Function pattern to clone for payments.
- `firebase.json:15-20` — the `/api/contact` rewrite pattern (europe-west1, Node 22).
- `next.config.ts:6-7` — `output: 'export'` constraint.
- `docs/adr/0001-feature-flags-strategy.md` — build-time flag seam.

## External Sources (live docs)

**Legal (PL):**
- art. 394 KC (zadatek/zaliczka): https://lexlege.pl/kc/art-394/ · https://przepisy.gofin.pl/przepisy,6,9,9,204,286058,20211005,art-394-ustawa-z-dnia-23041964-r-kodeks-cywilny1.html · https://ksiegowosc.infor.pl/obrot-gospodarczy/dzialalnosc-gospodarcza/4660998,Zaliczka-a-zadatek-zasady-zwrotu-przy-odstapieniu-od-umowy.html
- Consumer withdrawal / consent: art. 27 https://lexlege.pl/ustawa-o-prawach-konsumenta/art-27/ · art. 32 https://lexlege.pl/ustawa-o-prawach-konsumenta/art-32/ · art. 35 https://lexlege.pl/ustawa-o-prawach-konsumenta/art-35/ · art. 38 https://lexlege.pl/ustawa-o-prawach-konsumenta/art-38/ · art. 15 https://lexlege.pl/ustawa-o-prawach-konsumenta/art-15/ · art. 21 https://lexlege.pl/ustawa-o-prawach-konsumenta/art-21/ · Ustawa z 1.12.2022 https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20220002581 · UOKiK terminy https://prawakonsumenta.uokik.gov.pl/prawo-odstapienia-od-umowy/terminy-odstapienie/
- Abusive clauses / B2B nuance: art. 385³ https://arslege.pl/kodeks-cywilny/k9/a123469/ · https://poradnikprzedsiebiorcy.pl/-klauzule-abuzywne-w-umowach-z-konsumentami · art. 385⁵ / 38a https://lexlege.pl/ustawa-o-prawach-konsumenta/art-38a/ · https://www.biznes.gov.pl/pl/portal/00310 · umowa wzór https://www.infor.pl/prawo/umowy/uslugi/293527,Umowa-o-zaprojektowanie-i-wykonanie-strony-internetowej-WZOR-UMOWY.html
- VAT: art. 19a https://lexlege.pl/ustawa-o-podatku-od-towarow-i-uslug/art-19a/ · art. 106i https://lexlege.pl/ustawa-o-podatku-od-towarow-i-uslug/art-106i/ · SLIM VAT 3 https://ksiegowosc.infor.pl/wiadomosci/5574197,SLIM-VAT-3-Faktury-zaliczkowe.html · zwolnienie https://www.podatki.gov.pl/podatki-firmowe/vat/poradniki-i-informatory/zwolnienie-podmiotowe-od-podatku-vat · 2026 próg https://www.inforlex.pl/dok/tresc,FOB0000000000007438916,Od-2026-r-podatnicy-beda-mogli-wrocic-do-zwolnienia-z-VAT.html

**Market norms (PL):**
- https://webwavecms.com/blog/ile-kosztuje-strona-internetowa · https://opracyzdalnej.pl/co-ustalic-ze-zleceniodawca-zanim-zaczniesz-prace/ · https://www.studiowww.com.pl/pytania-i-odpowiedzi · https://prakreacja.pl/umowa-o-wykonanie-strony-internetowej-na-co-zwrocic-uwage/ · https://prakreacja.pl/zaliczka-czy-zadatek-jak-najlepiej-zabezpieczyc-swoje-interesy/ · https://czujowski.pl/blog/ile-bierze-programista-za-strone-internetowa.html · https://portalmarketingowy.pl/strony-www,ac229/oplata-za-strone-internetowa-z-gory-to-nic-nadzwyczajnego,924 · https://www.kancelariamojecki.pl/jak-okielznac-rundy-poprawek/ · https://czasopismo.legeartis.org/2021/09/umowa-wykonanie-strony-internetowej-dzielo-zlecenie-ciezar-dowodu/

**Payment gateways / Stripe:**
- Stripe fees https://stripe.com/en-pl/pricing · BLIK https://docs.stripe.com/payments/blik · P24 https://docs.stripe.com/payments/p24 · KYC https://docs.stripe.com/connect/required-verification-information · Checkout API surface via **Context7 `/stripe/stripe-node`** (topics: checkout sessions, webhooks)
- Przelewy24 https://www.przelewy24.pl/oferta/tabela-prowizji-i-oplat · https://developers.przelewy24.pl/ · PayU https://poland.payu.com/oferta-handlowa/ · Tpay https://tpay.com/user/assets/files_for_download/pakiety-serwisowe-2026.pdf

## Architecture Insights

- **Deposits are a business/contract decision, not a site feature** — nothing needs to change in code to adopt Model B tomorrow. The *page* only needs a short "how you pay" line + FAQ item; the enforceable mechanics live in the contract/regulamin.
- **The "shop" step reuses the exact `contact` seam** — static button → Cloud Function (create session) → hosted checkout → webhook Cloud Function (confirm). No departure from static export.
- **Promo window is hard-coded copy** (`offer.pricing.promoNote/footnote` say "end of August") — if payment terms and promo end are ever coupled (e.g. "prepay to lock the promo"), note there's no date/flag logic today; it's a manual edit.

## Historical Context (from prior changes)

- `context/slices/client-web-offer/research.md` — earlier **market pricing validation** (simple landing ~1000 zł net; landing+CMS 1500–2000 zł net) that anchored the 999/1999 price points this document builds on.
- `context/slices/client-web-offer/concept.md` (Revision v5) — locks the 2-tier + custom model, one-time payment framing, and lists **"Contract / invoicing — deposit mechanics, VAT-invoice framing, scope doc template"** as an explicit open decision (§7). **This research answers that open decision.**
- `context/slices/client-web-offer/offer-page.md` — the client-facing structure/copy; §5 (Cennik) and §10 (FAQ) are where a payment-term line would land.

## Related Research

- `context/slices/client-web-offer/research.md` (market pricing).
- `context/slices/web-copy-generation/*` — copy pipeline that would author any new "Jak płacisz" section text.

## Open Questions

1. **Which art. 38 exception classifies a custom website** (pkt 1 service / pkt 3 made-to-spec / pkt 13 digital content) — genuinely unsettled; **worth a radca-prawny call**. Recommendation stands: engineer the pkt 1 consent path regardless.
2. **VAT status of the business** — the whole faktura-zaliczkowa question dissolves if on *zwolnienie z VAT* (likely at these tickets). Confirm actual status before drafting invoicing.
3. **Zadatek naming default when silent** — contested/unverified; always write the intended term explicitly. Not a research gap to chase, a drafting rule to follow.
4. **Do we surface payment terms on the page now, or keep them in the sales conversation/contract?** (Recommendation: one short line + FAQ item on the page; full mechanics in the contract.)
5. **Sequencing of the "shop" step** — is a deposit/prepay link a near-term slice, or deferred until the offer proves demand? (This research says it's cheap when wanted, not that it's urgent.)
