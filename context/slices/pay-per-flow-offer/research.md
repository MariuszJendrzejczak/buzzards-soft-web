---
date: 2026-07-21T00:00:00+02:00
researcher: Claude (Opus 4.8)
git_commit: 50df0b7ad0afe939c254633687445b5c6cfc1f70
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Market readiness (PL) for a time-shared, no-fixed-quote, pay-per-flow dev engagement"
tags: [research, market, offer, pricing, fractional, pay-per-flow, ai-augmented]
status: complete
last_updated: 2026-07-21
last_updated_by: Claude (Opus 4.8)
last_updated_note: "Added follow-up research: realistic per-flow price for a mid+/senior- positioning"
---

# Research: Is the Polish market ready for a time-shared, pay-per-flow dev engagement?

**Date**: 2026-07-21
**Researcher**: Claude (Opus 4.8)
**Git Commit**: 50df0b7ad0afe939c254633687445b5c6cfc1f70
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

Can I sell an Agile, **no-fixed-quote, "pay-per-flow"** engagement to Polish clients?
A **flow** = a stand-up with the client's team + ~3h of my hands-on work + AFK AI-agent
work running in the background. I run **up to 3 concurrent flows/day for 3 different
clients** (~9h of my own work/day + interleaved autonomous agent work). Is the market
ready for this transparently time-shared, multi-client model — or does it still expect
"1 dev = 1 full-time exclusive hire" and frown on sharing time across engagements?

Scope: **Polish market**, researched per **buyer segment** (startups / SMB-MŚP /
agencies-subcontracting / mid-large-enterprise), each covering four axes: time-sharing
acceptance, pricing model, AI-agent (AFK) leverage, and risks/objections.

> Method note: this is an **external market-research** slice — no codebase plane. Four
> parallel general-purpose agents ran live WebSearch/WebFetch, one per segment, PL-first.
> Every claim below is source-cited in the segment sections. **No PL source describes a
> literal "pay-per-flow / shared-across-3-clients/day" offer** — the unit is novel, so
> the verdicts are *inferred by analogy* from adjacent, established norms (fractional,
> body-leasing, website-care retainers), not measured directly. Treat as strong
> directional signal, not proof; the price point and the "3/day interleave" tolerance
> need live prospect validation.

## Summary

**Short answer: yes, the market is ready — but not for the words "no fixed quote," and
not equally across segments. Time-sharing is the *easy* part; unbounded pricing is the
hard part; AI leverage is the argument that ties them together.**

Two findings recur across all four segments and are the backbone of the whole answer:

1. **The stigma is on *secrecy*, not on *sharing*.** What the Polish market condemns —
   "overemployment" — is *hidden, deceptive* double-full-time work. Transparent
   multi-client work (fractional executives, freelancers on JDG, body-leased devs) is
   already normal and openly marketed. Your radical transparency ("you share my day with
   2 others, disclosed and capped") is the **exact opposite** of the thing that carries
   stigma. The client's real fear is **availability/responsiveness**, not exclusivity.
2. **The market rejects *unpredictable* cost, not *recurring* cost.** "No fixed quote"
   reads as "blank cheque" and trips the strongest reflex in every buyer segment. The
   fix is the same everywhere: **make the flow itself the fixed unit** — a known price
   per flow, sold as a capped retainer/subscription of flows. That gives fixed-price
   budget certainty *per unit* with T&M flexibility *across* units.

**AI-agent (AFK) leverage** is the connective tissue: it is *why* you can bill per flow
instead of per hour (output decouples from your clock), and — for technical buyers — it
must never be framed as "AI does it, so it's cheaper," or you invite an AI-discount
clawback. For non-technical buyers it is invisible and should stay under the hood,
quietly funding the price predictability they demand.

### Segment readiness at a glance

| Segment | Verdict | The gate | Best framing |
|---|---|---|---|
| **Startups / founders** | Ready (leaning) | Transparency + a daily-availability SLA | Fractional day-unit; "senior time, amplified by agents"; T&M-flex with FP-per-unit certainty |
| **SMB / MŚP** | Ready on sharing, **Resistant on "no quote"** | Cost predictability | **Capped care/subscription retainer** ("opieka"-style), keep AI under the hood, fixed-price first flow |
| **Agencies / subcontracting** | Partially ready — **split by sub-model** | **Conflict of interest / poaching** | White-label *overflow* only; offer reversed non-compete + buy-out; productized flow with an MD bridge |
| **Mid-large / enterprise** | **Resistant — largely out of scope** | Dedicated-FTE norm + PO procurement + bus-factor-1 | Only as advisory/specialist bursts, as a fixed-price flow *retainer*; upper-mid, not true enterprise |

**Where to sell first:** startups and SMBs (as a capped flow-retainer), plus agencies
strictly as white-label overflow. **Where not to fight:** true enterprise team-member
roles — procurement, legal, and vendor-management all structurally reject the model as
designed.

## Detailed Findings

### Segment 1 — Startups / founders — **Ready (leaning), one hard gate**

- **Fractional = multi-client is the *marketed standard* for exactly this segment.**
  justjoin.it frames the fractional CTO as "2–3 dni tygodniowo dla jednego klienta, a
  reszta tygodnia to kolejne projekty," explicitly *"szczególnie atrakcyjny"* for AI
  startups who can't yet afford a full-time CTO. Poland even has a dedicated fractional
  marketplace, **fractio.pl** (CMO/CFO/CTO), whose standard engagement is 1–2 days/week
  "in several firms simultaneously." Multi-client senior time is a *product category*
  here, not a red flag.
- **The line is secrecy, not sharing.** PL "overemployment" discourse (rp.pl,
  homodigital, piotrrawski) condemns *two secret simultaneous full-time jobs* —
  "difficult to call ethical since… based on deception." Your disclosed, capped model is
  its inverse → the transparency is the differentiator.
- **The segment structurally can't afford exclusivity.** Startup Poland 2024: 73%
  bootstrap, 20% employ nobody (solo), most teams 4–10 people; 52% struggle to acquire
  staff. A shared fraction of a senior is often the *only* way they access seniority.
- **Pricing:** they reason in Fixed-Price vs T&M; "no fixed quote" reads as T&M, already
  accepted for iterative MVP work. Live PL anchor (fractio.pl): senior fractional day
  ~**2–3.5k zł/day**, monthly retainer **10–20k zł** for 1–2 days/week (vs a full-time
  CTO 30–55k brutto/mo). A flow ≈ a half-to-full fractional day.
- **AI leverage is the pricing justification** ("you pay per delivered flow because
  agents let output outrun my clock; billing hours would charge you for my speed, not
  your product"), and the interleave becomes a feature (agents keep working your codebase
  while I'm in another stand-up).
- **Verdict gate:** publish a **daily stand-up + response-window SLA**. The fear is "will
  you pick up when I need you," and the daily cadence answers it directly.

### Segment 2 — SMB / MŚP — **Ready on sharing, Resistant on "no fixed quote"**

- **Time-sharing: already the norm.** MŚP buy IT support as "kilka do kilkudziesięciu
  godzin miesięcznie" (advisor.pl), flat monthly IT service 1,200–4,000 zł/mo
  (it-leader.pl), and — the closest analogue to a flow — **"opieka nad stroną"** website
  care sold as *a fixed monthly fee + a capped hour-pool* (noril.pl: 150–1,700 zł/mo
  tiers, overage ~150 zł/h; several providers bundle "4h/month"). A JDG freelancer serving
  many clients is the assumed default (indeed.pl). Sharing is *not* the blocker.
- **Pricing is the blocker.** The whole PL vendor discourse is Fixed-Price vs T&M
  (davinci-studio, boringowl), and the literature steers *this exact segment* toward
  fixed-price "for clients without specialists to verify the work." MŚP are reluctant to
  even state a budget (programisty.pl) out of negotiation instinct. **"No fixed quote"
  triggers the blank-cheque reflex.**
- **But recurring is accepted when framed as care/insurance** — the "opieka" retainer is
  sold as "one outage costs more than a year of care." They reject *unpredictable* cost,
  not *recurring* cost.
- **AI is invisible to this buyer.** Only ~4% of small PL firms used AI in 2024 (PARP
  3.93%); Poland is 2nd-from-last in the EU on firm AI use (Eurostat 8.4%, via bankier).
  Don't sell method. AI's real job here: make each flow's output big/consistent enough
  that you can *commit to a capped price* — the predictability they demand.
- **Verdict:** sell as a **capped flow-subscription** in "opieka"-language + a
  **fixed-price first flow** to anchor value; pre-empt confidentiality (NDA + one-line
  data-handling) because loss-of-control is PL's #1 outsourcing fear (pesi.pl, advisor.pl).

### Segment 3 — Agencies / software houses / white-label — **Partially ready, split by sub-model**

- **Time-sharing: the *most* accommodating segment mechanically.** Body leasing /
  staff augmentation is a mature PL norm — software houses already loan out devs
  fractionally, priced in divisible day-units (mecenasbogna.com). They resell shared
  people for a living.
- **…but this segment carries the *sharpest* objection: conflict of interest / client
  poaching.** White-label practice guards against the sub building a direct line to the
  end-client (agencypro, resourcifi). PL B2B non-competes are *narrow-scope only* —
  a whole-industry ban is unenforceable (silesialegalhouse, wachowskilaw); multi-client
  concurrency is legal by default. So the enforceable line is **named-competitor scope**,
  not sharing per se.
- **Pricing:** they procure in MD/hour/FTE-month and will re-bill onward, so they'll force
  a flow back into an MD line item unless you give them the bridge. PL senior B2B anchors:
  ~20–30k zł net/mo; body-leasing ~€80–180/day (search-relayed, see open questions).
  Give a "1 flow ≈ 0.4 MD but delivers more" translation; keep price output-anchored.
- **AI leverage: this segment's strongest tailwind *and* its sharpest trap.** Agencies
  run the same math — hourly "collapses revenue 75% for the same output" under AI, so
  they're fleeing hourly first (digitalapplied). BUT ~⅓ have already fielded AI-discount
  requests → never expose hours or the AI upside becomes theirs. SoDA 2025 tells PL
  houses to "compete on quality not price" under wage pressure — an AI-augmented overflow
  partner fits that.
- **Verdict:** sell **white-label overflow only** (agency owns the client, sub never
  touches them → the 3-way split is invisible/irrelevant). Neutralize poaching *first,
  unprompted*: offer a **reversed non-compete** ("no competing flow-client for the
  engagement") + **buy-out/transfer clause** + per-client NDA. De-risk with a paid
  single-flow pilot (their own vetting norm).

### Segment 4 — Mid-large / enterprise — **Resistant, largely out of scope as designed**

- **Fails three structural procurement norms at once:**
  1. **Dedicated-FTE norm.** Enterprise staff-aug = a dedicated specialist for a fixed
     period on a monthly rate (ardura, optiveum). Fractional is tolerated *only* as an
     explicitly-pinned FTE fraction (0.2/0.4 FTE) for a *specialist gap* — the opposite
     of an opaque "up to 3, interleaved."
  2. **PO/rate-card procurement.** A PL purchase order needs a unit price + total +
     described scope (commint.pl). "No fixed quote, pay-per-flow" has no field to live in.
  3. **Bus-factor-1 screening.** A solo provider is a named due-diligence risk; a PL
     software house (Bright Inventions) *markets directly against* solo/temporary devs to
     this buyer. You'd be selling into a pre-primed objection.
- **AI is the one tailwind — with a compliance gate.** EY: 77% of medium+large PL firms
  are increasing AI spend, 51% report real benefits — but 39% cite data-security as the
  top barrier, and AI-coding-tool intros die in security review ~73% of the time
  (SOC 2 / DPA / zero-retention demanded). An outsider running autonomous agents on
  client context triggers exactly the risk they're closing down.
- **The only opening: a fixed-price flow *retainer*** (N flows/month, defined inclusions)
  is procurable where raw pay-per-flow is not; light-retainer-plus-outcome is a recognized
  de-risking hybrid.
- **Verdict:** don't chase the enterprise "team-member" case. If at all, target
  **advisory / specialist-burst** work at **upper-mid-size** firms (real procurement, but
  no full CPO/InfoSec gauntlet), packaged as a fixed-price flow retainer, arriving
  pre-armed with a data-handling one-pager. True regulated enterprise is a no.

## Cross-segment synthesis (the actionable core)

1. **Never market "no fixed quote."** Market **"a fixed price per flow"** — the same
   product, framed as certainty instead of open risk. This single rephrase converts the
   universal blank-cheque objection into a selling point, in every segment.
2. **Sell flows as a capped, throttleable retainer/subscription** ("N flows/week or
   /month, dial up/down"). It maps onto what each segment already buys: startup
   fractional retainer, MŚP "opieka" plan, agency MD booking, enterprise retainer.
3. **Lead with the daily stand-up as an SLA, not a courtesy.** It converts the shared-time
   fact into "your slot is reserved daily + a guaranteed response window" — answering the
   real fear (availability) and ignoring the false one (exclusivity).
4. **Weaponize transparency.** Say the quiet part out loud: "up to 3 clients/day,
   disclosed and capped — the honest inverse of secret overemployment." The market
   already dislikes the *hidden* version; being the transparent version is the moat.
5. **Treat AI leverage by audience:** for technical buyers (agencies, some startups) it's
   the *reason* to price by flow not hour — but never a discount lever; for non-technical
   buyers (MŚP, most SMBs) keep it under the hood as the engine of price predictability.
6. **Handle conflict-of-interest proactively** (sharpest for agencies): a client-facing
   rule that no two same-niche clients run in the same window, offered *before* they ask.

## External Sources (live docs)

All claims above are grounded in the sources below (segment → URLs; PL unless noted).

**Startups**
- justjoin.it — fractional = multi-client norm, marketed to PL AI startups; retainer/hourly figures — PL, 2025 — https://justjoin.it/blog/fractional-cto-architect-era-ekspertow-na-godziny-dla-startupow-ai
- fractio.pl — first PL fractional marketplace; PLN pricing (250–450 zł/h, 2–3.5k zł/day, 10–20k zł/mo), "several firms simultaneously" — PL, 2025 — https://fractio.pl/fractional-cto
- Startup Poland 2024 — 73% bootstrap, 20% solo, teams 4–10 — PL, Dec 2024 — https://startuppoland.org/report/polskie-startupy-2024/ ; https://mambiznes.pl/news/raport-startup-poland-...
- Forsal — 52% of PL startups struggle to acquire staff — PL, 2024 — https://forsal.pl/biznes/firma/artykuly/8663724
- Overemployment stigma = secrecy/deception, not multi-client — PL, 2022–2024 — https://www.rp.pl/praca/art36532841-bigamisci-kariery-czyli-specjalisci-pracujacy-na-dwoch-etatach ; https://homodigital.pl/dwa-etaty-dwie-pensje-40-godzin-pracy-witaj-w-swiecie-overemployment/ ; https://piotrrawski.pl/2022/02/05/overemployment-w-branzy-it-...

**SMB / MŚP**
- advisor.pl — MŚP buy IT support as several-to-dozens h/mo — PL — https://www.advisor.pl/blog/outsourcing-it-czemu-warto/
- it-leader.pl — flat monthly IT service 1,200–4,000 zł/mo — PL, 2025 — https://it-leader.pl/ile-kosztuja-uslugi-it/
- noril.pl — "opieka nad stroną" = fixed fee + capped hour-pool, insurance framing — PL, 2026 — https://noril.pl/blog/opieka-nad-strona-www-poradnik-2026
- studiokreatywnychstron.pl ; wmachalica.pl — care plans with monthly change-hour allowance — PL — https://studiokreatywnychstron.pl/uslugi/opieka-nad-strona-internetowa/ ; https://wmachalica.pl/cennik-opieka-nad-strona/
- davinci-studio ; boringowl — FP vs T&M framing; FP recommended for clients lacking tech oversight — PL — https://www.davinci-studio.com/pl/blog/time-and-material-vs-fixed-price/ ; https://boringowl.io/blog/fixed-price-czy-time-material-...
- programisty.pl — MŚP reluctant to state budget — PL — https://programisty.pl/biznes/wycena-projektu-it-jak-uniknac-kosztownych-bledo/
- indeed.pl — JDG freelancer = many clients simultaneously — PL — https://pl.indeed.com/porady-zawodowe/poszukiwanie-pracy/jak-zostac-freelancer
- PARP — 3.93% of small PL firms used AI in 2024 — PL, 2024 — https://www.parp.gov.pl/component/content/article/90199
- bankier / Eurostat — 8.4% of PL firms use AI, 2nd-last in EU — PL/EU, 2025 — https://www.bankier.pl/wiadomosc/Cyfrowa-przepasc-rosnie-...9121586.html
- newseria/PIE — rising SME AI trust; ~23% revenue uplift for adopters — PL, 2025 — https://biznes.newseria.pl/news/polskie-firmy-z-sektora,p99224929

**Agencies / subcontracting**
- mecenasbogna.com — PL body-leasing model, T&M billing, buy-out clause, 14–30d replacement, IP chain — PL, ~2024 — https://www.mecenasbogna.com/post/body-leasing-w-software-house-...
- itds.pl — PL staff-augmentation norms — PL, 2024–2025 — https://itds.pl/pl/co-nowego/blog-staff-augmentation-polska/
- agencypro ; resourcifi — white-label overflow, poaching risk, non-compete/non-solicit, pilot vetting — global — https://agencypro.app/blog/white-label-vs-subcontracting ; https://www.resourcifi.com/for-agencies/white-label-development/
- silesialegalhouse ; wachowskilaw ; zakaz-konkurencji.pl — PL B2B non-compete: narrow-scope only, whole-industry ban unenforceable, multi-client legal by default — PL — https://silesialegalhouse.pl/zakaz-konkurencji-w-umowach-z-programistami-b2b-... ; https://wachowskilaw.com/2021/04/07/zakaz-konkurencji-w-sh/ ; https://zakaz-konkurencji.pl/kontrakt-b2b-dla-programisty-it/
- No Fluff Jobs (via itreseller) ; bulldogjob — PL senior B2B ~20–30k zł/mo, H1-2025 direction — PL, 2025 — https://itreseller.pl/zarobki-w-it-rosna-... ; https://bulldogjob.com/it-report/2025/programmer
- SoDA 2025 (via inwestycje.pl) — wage pressure, "compete on quality not price" — PL, 2025 — https://inwestycje.pl/konferencje/soda-conference-2025-...
- digitalapplied ; chargebee — AI-discount clawback (~⅓ agencies), value>hourly (62% vs 8%), hybrid 27%→41% — global, 2025–2026 — https://www.digitalapplied.com/blog/ai-agency-pricing-models-2026-decision-guide ; https://www.chargebee.com/blog/pricing-ai-agents-playbook/

**Mid-large / enterprise**
- ardura ; optiveum — enterprise staff-aug = dedicated specialist, monthly rate — PL, 2024–2025 — https://ardura.consulting/blog/body-leasing-flexible-acquisition-of-it-specialists/ ; https://optiveum.com/articles/staff-augmentation-and-its-synonyms/
- retaininternational ; viewpointanalysis — fractional accepted only as pinned FTE fraction / gap-fill — global, 2024–2026 — https://www.retaininternational.com/blog/FTE-resource-planning ; https://www.viewpointanalysis.com/post/what-is-fractional-it-procurement
- commint.pl — PL PO requires unit price + total + scope — PL — https://www.commint.pl/zamowienia-zakupu/definicja-zamowienia-zakupu-definicja-purchase-order
- pricinglink ; launchadvisor ; schematichq — retainer / light-retainer-plus-outcome as enterprise-procurable models — global — https://pricinglink.com/knowledge-base/enterprise-software-development/software-development-retainer-agreements/ ; https://www.launchadvisor.co/guides/value-based-pricing-... ; https://schematichq.com/blog/outcome-based-pricing
- EY — 77% of med+large PL firms increasing AI spend; 39% security barrier — PL, 2025–2026 — https://www.ey.com/pl_pl/insights/ai/raport-ey-jak-polskie-firmy-wdrazaja-ai-gc-fy26
- merciv ; orgn — 73% of AI coding-tool intros die in security review; SOC2/DPA/zero-retention — global, 2025–2026 — https://www.merciv.com/blog/ai-vendor-security-review-process ; https://www.orgn.com/blog/ai-coding-tool-procurement-checklist
- generic.de ; brightinventions — bus-factor-1 is a due-diligence risk; PL house markets against solo devs — global + PL — https://www.generic.de/en/blog/busfaktor-in-software-projekten ; https://brightinventions.pl/blog/software-development-projects-bus-factor/

## Architecture Insights (positioning patterns, not code)

- **One rename does most of the work:** "no fixed quote" → **"fixed price per flow."**
  Same mechanics, opposite risk-perception. This is the highest-leverage copy decision.
- **The flow is a productized retainer unit**, and every segment already owns a mental
  model for it (fractional retainer / "opieka" plan / MD booking / enterprise retainer) —
  so *translate into their model*, don't invent vocabulary at them.
- **Transparency is the moat**, because the market's aversion is specifically to the
  *hidden* version of what you're doing openly.
- **AI leverage is audience-conditional:** justification for technical buyers, invisible
  engine of predictability for non-technical ones — never a discount lever.

## Related Research

- `context/slices/client-web-offer/` — the existing client-facing web offer (fixed-scope
  framing); this pay-per-flow model is a distinct engagement type that could become a
  sibling offer page.
- `context/slices/client-mobile-offer/` — mobile counterpart of the offer work.

## Open Questions

- **The "flow" unit has no market precedent** (PL or global). Closest validated
  primitives: fractional day-rate, per-workflow AI billing, productized/"opieka" retainer,
  MD booking. Reception of the *named* unit is inferred, not measured — **price-test with
  real prospects.**
- **Tolerance for 3 clients *per day* (interleaved)** is untested. PL fractional norms are
  framed *weekly* (1–3 days/week per client), not same-day 3-way interleave. The daily
  stand-up may mitigate; unverified.
- **No PL price point** for AI-augmented *output* specifically — all AI-pricing evidence
  is global/US. The AI-leverage narrative is strong but its PL price-elasticity is unproven.
- **Exact per-flow price** is derived by analogy from fractio.pl day-rates (~2–3.5k zł/day
  → a flow ≈ 1.5–3k zł), not from a comparable productized offer — needs live testing.
- **Upper-mid-size boundary** where enterprise resistance drops is a hypothesis, not sourced.
- **Primary reports not fully retrieved:** SoDA "Kondycja/Barometr" PDF, full Startup
  Poland 2025, PwC AI report (403), ardura rates page (403) — figures via secondary
  reporting; direct PDFs may hold sharper engagement-model / rate data.
- **Untested pitch:** how PL buyers react to the explicit "you share my day with 2 others"
  disclosure is reasoned from the overemployment-stigma structure, not from a tested pitch.

## Follow-up Research 2026-07-21 — Realistic per-flow price for a mid+/senior- positioning

**Trigger:** the developer positions as **mid+ / senior-** (not a 15–20yr top senior /
architect) and flagged that the ~1.5–3k zł/flow anchor above felt too high. Three parallel
agents grounded PL B2B rate benchmarks, mid-level productized-unit pricing, and a
reverse-engineered unit-economics model.

### Headline correction

**The developer's instinct was right — the prior anchor used the wrong reference class.**
The ~2–3.5k zł/day figure is a **fractional-CTO / advisory day rate** (fractio.pl), which
carries a **strategic-advisory premium of ~2–3.5×** over a working developer's hands-on
rate. It pays for *deciding what to build*, not for shipping code. A mid+/senior- doing
hands-on delivery must anchor to the **working-developer** band, which is materially lower.

### 1. Real PL B2B rate benchmarks (working developer, hands-on)

| Seniority | Monthly B2B net (PLN) | Implied hourly (÷~160h) | Implied 8h day rate |
|---|---|---|---|
| Mid / regular | ~16,000–17,600 | ~100–110 zł/h | ~800–880 zł/day |
| **Mid+ / senior- (target)** | **~18,000–22,000** | **~120–150 zł/h** | **~900–1,200 zł/day** |
| Senior | ~24,000–26,000 | ~150–180 zł/h | ~1,200–1,425 zł/day |

- **Hands-on mid+/senior- day rate ≈ 900–1,200 zł/day (~120–150 zł/h)**, centred ~1,000 zł.
  Sources: Bulldogjob IT Report 2025 (mid median 16k / senior 24k B2B), JobHunt.pl React
  scrape (Jul 2026), justjoin.it 2026, edge1s (mid 120 / senior 180 zł/h).
- **Working-dev vs fractional-advisory:** hands-on ~900–1,200 zł/day **vs** advisory
  2,000–3,500 zł/day (fractio.pl) — a ~2–3.5× premium. The old anchor lived in the
  advisory band; it does not apply here.
- **Stack note:** JS/React/Next is a **volume, baseline** stack in PL (most crowded
  specialization; actual pay-outs run 5–20% *below* offer medians — justjoin.it 2026).
  TypeScript+React adds only +5–10% (Bulldogjob). Flutter/mobile carries a mild scarcity
  premium (~140–270 zł/h). Net: this profile justifies the **upper half of mid+**, not a
  senior multiplier.

### 2. Mid-level productized-unit price points (not executive)

- Entry "dev-as-a-subscription" implies **~170–460 zł/working-day** (Unlimited Dev
  £695–£1,895/mo, one active request) — a floor, since it amortizes a monthly queue slot.
- PL "opieka nad stroną" **dev overage ~120–150 zł/h**, ad-hoc specialist up to 250 zł/h
  (wpplan.pl 2026). PL useme per-project avg: programming **5,014 zł/project** (2025).
- **AI-agent / outcome billing is real and per-unit** (Fin $0.99/resolution; embedded
  AI-workflow retainers $300–1,500/mo per client). This is the market precedent for pricing
  **the unit / outcome, not the hour** — the exact justification for a per-flow price.
- Synthesized mid-level per-unit band (independent agent): **~700–1,400 zł** for a
  half-day-of-senior-assisted-delivery unit.

### 3. Unit economics — reverse-engineered flow price

- **Income target:** full-time mid+/senior- B2B baseline ≈ **20,000 zł/mo net** revenue;
  solo multi-client operator should target **~1.45× ≈ 29,000 zł/mo gross** (no paid leave,
  self-funded sales/admin/tooling/LLM spend, churn risk). Band 26k (1.3×) → 32k (1.6×).
- **Utilization:** solo devs sustainably bill ~55–65%; PS firms averaged 68.9% (SPI 2024).
  On the 3-slot/day ceiling → **pessimistic 1.3/day, realistic 2.0/day, optimistic 2.7/day**.
- **Effective billable days ≈ 19/month** (PL 26-day leave + holidays → ~10.5 billable
  months/yr) — where "no paid leave" bites.
- **Overhead:** duży ZUS ~1,927 zł + accounting ~250–400 + tooling ~150–300 + **LLM/agent
  spend ~400–1,200** (load-bearing, approx) → cash overhead ~2,900–3,600 zł/mo.
- **Break-even flow ≈ 610 zł** (525 zł raw opportunity-cost of ~3.5 engaged h at the
  mid+ baseline + ~85 zł overhead/flow). **Never quote below ~700 zł** (tax + safety).

**Required price/flow to hit the ~29k target:**

| Scenario | Flows/mo | Required price/flow |
|---|---|---|
| Pessimistic (1.3/day) | ~25 | ~1,160 zł |
| **Realistic (2.0/day)** | ~38 | **~765 zł** |
| Optimistic (2.7/day) | ~51 | ~570 zł |

**Income at a fixed anchor (realistic column):** 700 zł→~26.6k · **900 zł→~34.2k** ·
1,100 zł→~41.8k per month.

### Recommendation

> **Per-flow band: 700–1,200 zł. Recommended anchor: ~900 zł/flow. Break-even floor: ~700 zł.**
> A full-day variant lands ~1,400–2,000 zł — still below the fractional-CTO floor by design.

- A flow ≈ **half a working day** of a mid+/senior- dev (~3.5 engaged h). Naked-labour value
  ≈ **525 zł** (a fair, client-legible floor). The **900 zł anchor = ~1.7× that** — and the
  ~40% gap above raw labour **is** the AI-leverage + solo-risk premium: the client buys
  ~3.5 human hours *plus* a day of background agent output, directed by a senior.
- At 900 zł × 2 flows/day × 19 days ≈ **34k zł/mo revenue ≈ 1.7× a 20k mid+/senior- seat** —
  the correct "beat full-time and get paid for leverage + risk" zone. Even pessimistically
  (25 flows) it clears ~22.5k, above the mid median.
- **Ceiling ~1,200 zł/flow:** above ~2.3× the half-day floor a client starts asking "why is
  half a day this expensive" unless output is visibly a-full-day-plus.

### Follow-up open questions (need the developer's own numbers)

- **Actual LLM/agent spend** — modelled 400–1,200 zł/mo; heavy frontier use across 3 clients
  could be higher and would raise the floor.
- **Tax form** (linear 19% vs scale vs ryczałt) and **Mały ZUS Plus** eligibility change the
  true net behind the 29k revenue target and could loosen the floor.
- **Real sold utilization** — 2 flows/day is benchmarked, not measured for him; whether 3
  simultaneous daily-stand-up clients is *operationally* real is a separate question.
- **À la carte vs blocks** — a 20-flow/month commitment justifies a volume price toward
  ~750 zł, still above break-even.
- **No PL price point for AI-augmented *output*** — all outcome/per-resolution data is
  global; the "flow" would help *define* this unit rather than follow a benchmark.

### Follow-up sources (selected; full lists in agent runs)

- Bulldogjob IT Report 2025 — mid 16k / senior 24k B2B median — PL, 2025 — https://bulldogjob.com/it-report/2025/salaries
- JobHunt.pl React salaries — React mid/senior offer ranges, B2B median 26k — PL, Jul 2026 — https://jobhunt.pl/zarobki/react
- justjoin.it Raport wynagrodzeń 2026 — JS frontend mid 17,640 / senior 23,520 B2B; actuals 5–20% below offers — PL, 2026 — https://justjoin.it/raport-wynagrodzen/statystyki-kategorii
- edge1s — B2B hourly junior 80 / mid 120 / senior 180 zł/h — PL, 2024 — https://edge1s.com/blog/how-much-does-an-hour-of-programming-cost/
- fractio.pl — advisory day rate 2,000–3,500 zł/day (the premium reference to AVOID) — PL, 2026 — https://fractio.pl/fractional-cto
- wpplan.pl — PL site-care dev 120–150 zł/h, ad-hoc up to 250 zł/h — PL, 2026 — https://wpplan.pl/ile-kosztuje-opieka-nad-wordpressem-cennik-2026/
- useme.com — PL freelance programming 5,014 zł/project — PL, 2025 — https://useme.com/pl/blog/ile-zaplacic-freelancerowi/
- unlimiteddev.io — dev-subscription £695–£3,195/mo — UK, 2026 — https://www.unlimiteddev.io/
- kompella.io — fractional CTO $1,500–4,000/day vs senior dev $150–300/h — global, 2026 — https://kompella.io/thinking/fractional-cto-pricing-2026
- fin.ai — $0.99/resolution outcome billing — global, 2026 — https://fin.ai/learn/ai-customer-service-agent-pricing-comparison
- Saibon — consultant utilization SPI 68.9% avg, senior 55–70% — global, 2025 — https://www.saibongroup.com/blogs/consultant-utilization-rate-benchmark
- Solohourly — solo dev 55–65% billable — global, 2025 — https://solohourly.com/guides/how-many-billable-hours-per-week-is-realistic
- Infor.pl / PITax — duży ZUS 2025 ~1,927 zł incl. health — PL, 2025 — https://www.pitax.pl/wiedza/aktualnosci/skladki-zus-2025/
