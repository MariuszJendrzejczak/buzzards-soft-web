---
date: 2026-07-18T00:00:00+02:00
researcher: Claude (Opus 4.8)
git_commit: bcd752fe23016af8964ab050dfa4ffae27a7d457
branch: main
repository: buzzards_soft_web
topic: "Market validation of an AI+human landing-page offer for individual clients (PL market)"
tags: [research, market, pricing, landing-page, offer, business-model]
status: complete
last_updated: 2026-07-18
last_updated_by: Claude (Opus 4.8)
last_updated_note: "Added follow-up research: floor-tier definition, optional care-retainer model, PL domain registrars/reseller economics + DNS→Cloudflare, Firebase Hosting vs App Hosting"
---

# Research: AI+human landing-page offer for individual clients — price validation (PL)

**Date**: 2026-07-18
**Researcher**: Claude (Opus 4.8)
**Repository**: buzzards_soft_web
**Branch**: main / **Commit**: bcd752f

## Research Question

Validate the market assumptions behind a productized offer: landing pages built
with an **AI + human workflow** (not a generator — individual approach, the client
talks to a real person, a human is involved at every step), for **individual
clients** (micro-businesses, freelancers/creators, private persons, and small
firms that want to actually sell). Proposed prices: **simple landing 1000 zł net**;
**landing + CMS 1500–2000 zł net**. Are these realistic against (a) human/agency
landings at 4–5k zł, and (b) AI generators at a few hundred zł / subscriptions?
What is the real competition, price positioning, client expectations, margins,
risks, and differentiators?

> All four requested segments and all four focus areas were in scope (user
> selected everything in the scoping step).

---

## Summary — the five load-bearing conclusions

1. **The prices are realistic but sit at the budget/floor of the PL market.**
   1000 zł net for a simple landing lands at the **OLX/low-freelancer band**
   (OLX average ~1,360 zł; simplified freelancer LP 500–1,500 zł) and **well below
   the agency floor** (~3,000 zł). The **4–5k zł "agency landing" reference is
   accurate** — the well-sourced agency sweet spot is 4,000–6,000 zł net.

2. **The landing + CMS bundle at 1,500–2,000 zł is priced *below* the market's own
   "CMS add-on" figure** (a content panel alone is typically quoted at +1,500–3,000 zł;
   the combined product trends 2,500–4,500 zł at freelancer level). Very
   client-attractive, but structurally low-margin.

3. **1000 zł net only pencils out as an AI-accelerated, ≤4–6h product where the
   client provides content, on a static Next.js + Firebase stack.** At 4h that's
   ~250 zł/h (good); at 8h ~125 zł/h (break-even after overhead); at 16h ~62 zł/h
   (a loss-leader, below every freelancer floor). The traditional (WordPress, 8–16h)
   way to deliver this price is a loss.

4. **Do NOT headline "made with AI."** Evidence is consistent: an AI label
   *lowers* perceived authenticity/value (consumer-vs-industry perception gap widened
   to 37 pts in 2026), and Poland specifically prefers humans (SW Research 2025:
   **67.9% of Poles prefer waiting for a human**; only 8.1% fully trust virtual
   assistants). Sell **"you talk to a real person, built individually for you, yours
   to keep."** Keep AI as the backstage speed engine.

5. **The offer only survives financially if productized + bounded + fed into a
   retainer.** Fixed scope + explicit "Not Included" list + non-refundable deposit +
   2-revision cap + client-prep onboarding, then bolted to a **capped-scope monthly
   care plan (99–275 zł/mo)** — which on a static stack carries near-100% margin
   because the WordPress maintenance labor the retainer market prices for simply
   isn't there. **The landing is the acquisition channel; the retainer is the
   business.**

---

## Detailed Findings

### Area 1 — Price benchmarks (PL agencies & freelancers)

**Landing page, by provider tier (PLN):**

| Provider tier | Typical range | Notes |
|---|---|---|
| Solo freelancer, low end (OLX / Fiverr) | **400 – 2,000** | OLX floor ~400, avg ~1,360, up to 3,000 |
| Mid freelancer / small studio | **1,500 – 5,000** | Template WP/Webflow 1,500–4,000; studio "from 3,500" |
| Professional agency | **3,000 – 8,000** (custom to 15,000) | Dedicated LP sweet spot **4,000–6,000 net** |

- Repeatedly cited overall band: **999 zł (template) → 15,000 zł (custom + CRO + A/B + CRM)**.
- **Landing + editable CMS**: a content panel adds **+1,500–3,000 zł**; combined
  product trends **2,500–4,500 zł** at freelancer level. Note: with WordPress the
  "CMS" is effectively free (dev builds on WP admin) — the uplift is for a *custom*
  editable panel.
- **What cheap cuts**: professional copywriting, CRO, A/B infrastructure, proper
  GA4/Pixel tracking, post-launch support, cross-device testing, code-repo access,
  formal contract + VAT invoice.
- **Delivery**: template LP 3–7 days; freelancer custom 1–4 weeks; agency 2–8 weeks.
- **Hourly rates**: freelancer 80–250 zł/h; agency 150–400 zł/h.

**Where the user's prices sit:** simple LP 1000 zł net = at/slightly below the
freelancer norm, undercutting studios 2–5×; LP+CMS 1,500–2,000 zł = below the
market's combined price. The "4–5k agency landing" reference is factually correct.

*Uncertainty:* clean OLX numeric analysis is from 2023 (directionally valid, floors
likely a touch higher now); explicit revision-count data is essentially unpublished.

### Area 2 — AI website generators (the low-end competition)

**Pricing anchors (2025–2026):**
- **Global builders**: ~$10–17/mo entry — Wix (Light $17/mo), Framer ($10), Durable
  ($12), 10Web (~$10), Squarespace ($16), Webflow ($15). ≈ €10–20/mo ≈ ~500–900 zł/yr.
- **PL-native**: **Hostinger** (heavily marketed in PL) **11,99 zł/mo net first term
  → renews 41,99 zł/mo net (~504 zł/yr)**; WebWave ~396 zł/yr net; home.pl Start
  45 zł/yr yr-1 → **400 zł/yr renewal**; cyberFolks ~490 zł/yr net.
- **"Kilka stówek/rok" holds only for the promo first year.** Honest renewal TCO is
  **~500 zł/yr+ per tool**, before .pl domain renewal (~60–200 zł), email, and the
  client's own **10–40 hours** of build/maintenance time.

**The generators' structural weaknesses (the gap a human fills):**
- **Lock-in / no ownership** — the biggest one. Wix/Squarespace have *no code
  export*; cancel = site gone; migration = full rebuild.
- **"Sea of Sameness"** — output converges on the average of the internet
  (same hero + pricing table + testimonial row, same gradient).
- **Bland AI copy** (Wix's own blog concedes it's "generic"), **rigid customization**
  (section blocks, ignores brand/prompt), **shallow SEO**, **renewal-price hikes**.
- **DIY reality for a non-technical owner**: decision fatigue → abandonment; the
  average owner stops maintaining within ~14 months.

**Best framing line found:** *"business card vs business infrastructure"* — an AI
builder is genuinely great value for a digital business card; for a site that must
drive leads it "will cost you more in lost opportunity than it saves you."

### Area 3 — Client expectations, CMS options & delivery economics

**What PL micro-businesses actually expect (non-negotiable core):**
- **Mobile-first** — 91% of PL internet users are on phones; ~75% of online time is mobile.
- **Easy contact** (click-to-call, minimal-field form), **Google visibility +
  Business Profile/Maps** (86% of local-search clicks), **fast** (<2–2.5s),
  **"looks professional"** (>50% judge credibility by design), **trust signals**
  (reviews), and **self-editability** (a CMS panel to change text/prices/hours).
- New 2025 expectation: **accessibility (EAA)** applies to PL firms from 28 Jun 2025.
- **Dissatisfaction drivers**: slow load (#1 — 40% leave if >3s), not mobile-friendly,
  invisible on Google, stale content the owner can't fix, **hidden costs**, and an
  **unresponsive developer**.

**CMS recommendation for a Next.js + Firebase shop (this repo's stack):**
- **Default to Sanity** — best editor UX for a non-technical client, $0 free tier,
  hosted (nothing to patch), stays on the static pipeline.
- **Decap/Sveltia** (git-based) for fully-owned, zero-SaaS content ($0).
- **Firestore + a tiny custom edit form** is viable when edits are minimal.
- **Avoid WordPress** (73% of PL sites, but a permanent maintenance/security tax —
  11,334 new WP vulns in 2025, +42% YoY) and self-hosted Payload/Strapi (need a
  persistent server a static landing doesn't justify).

**Delivery economics — the złoty-per-hour math at 1000 zł net:**

| Total effort | Effective rate | Verdict |
|---|---|---|
| 4 h (AI-assisted, materials ready) | 250 zł/h | At/above senior rate — genuinely good |
| 8 h (typical simple LP) | 125 zł/h | Mid-freelancer floor — thin after overhead |
| 16 h (design + revisions + content) | 62.5 zł/h | Below every floor — loss-leader |

- **AI-assisted build** (v0/Bolt + AI copy/images): <45 min to build, 1–2h polished —
  ~75% time cut vs hand-building. Realistic band 4h→8h→16h.
- **Monthly viability (solo, ~15k zł/mo target, ~120 billable h):** only the
  **4h/project (250 zł/h)** regime is a real business (~15 projects in ~60h). 8h is
  break-even; 16h is not viable.
- **Hidden/ongoing costs**: on a static Firebase/Vercel/Netlify stack, **infra ≈ 0 zł
  and SSL = 0 zł** (Let's Encrypt), leaving only **.pl renewal (~60–200 zł/yr)** and
  optional **email (~250 zł/user/yr)**. The real hidden cost is human time (revisions,
  training, support) + **scope creep**.

**Recurring revenue ("opieka nad stroną"):** PL market 100–300 zł/mo (99/199/275 tiers
common). The market is WordPress-centric, so update/backup labor is the headline —
**on a static stack that labor disappears, so the same 99–275 zł/mo retainer carries
near-100% margin.**

### Area 4 — Positioning, differentiation & business-model risks

**Productized "website in a day" is a mature category:** fixed outcome + fixed
timeline + fixed price + an explicit **"Not Included" list**. PL live example —
**KC Mobile: 999 / 1,999 / 3,499 zł** tiers, each bundling GA4/Pixel/SSL. The ~1000 zł
price sits **exactly at the PL "productized floor"** — so differentiation must come
from the human/individual layer, not price.

**"Made with AI" is a liability as a headline** (perception gap 37 pts in 2026;
disclosure lowers perceived authenticity; Gen Z ~2× more negative). **"Human in the
loop" is the asset.** Poland-specific: **67.9% prefer waiting for a human**, only
8.1% fully trust bots. Winning narrative is explicitly **hybrid**: AI does the
repetitive parts, humans own strategy/relationship.

**The three-tier map & the mid tier's defensible claim:**

| Tier | PL cost | Timeline | Limit |
|---|---|---|---|
| (a) DIY AI generator | free–~999 zł/yr | minutes | template-bound, "obviously AI", no strategy |
| (b) **AI+human (this offer)** | **~1000–2000 zł** | days | human rewrite + conversion tuning + real person |
| (c) Full agency | 4–5k+ | 6–8 weeks | custom, tested, team |

> **The only cell b can occupy:** *human judgment + individual relationship + AI
> speed + low price + code ownership.* The generator has no human/judgment; the
> agency has no low price/speed. Anchor the whole brand there.

**Risks of the low-price model (heavily cautioned in sources):**
- Cheap price attracts **cheap/difficult clients**, not more clients.
- **Scope creep / "death by 1000 emails"** from uncapped revisions.
- **Non-payment / ghosting** (→ deposits are now standard defense).
- The **admin-access trap** cheap providers fall into (withholding logins) — a
  documented PL pain point the offer can **weaponize as a differentiator** (sell ownership).
- **Burnout + no recurring revenue** — one-off work "doesn't get a multiple";
  recurring revenue is a 2–3× valuation multiple.

**Mitigations (the sane model):** fixed-scope productized package + "Not Included"
list → non-refundable **booking-fee** deposit (30/30/40 or 50/50) → **2 revision
rounds then paid** → client-prep onboarding (forces the "one-day" build) →
Good/Better/Best tiers + add-on upsells → **capped-scope monthly care plan** for
recurring revenue. Never offer "unlimited" anything.

---

## External Sources (live docs / market)

Every pricing/market claim below is drawn from a cited source retrieved via live web
research (2024–2026 PL + global). Key sources by area:

**Prices (PL agencies/freelancers):**
- KC Mobile — cennik 999–15000 zł: https://kcmobile.pl/baza-wiedzy/marketing/ile-kosztuje-landing-page-cennik/
- Seomantyczny — ceny 2026 per tier: https://seomantyczny.pl/ile-kosztuje-strona-internetowa-ceny-2026/
- Varsite — freelancer vs studio vs agency: https://varsite.pl/blog/ile-kosztuje-strona-internetowa/
- EnjoyAds — OLX real prices: https://enjoyads.pl/olx-strony-internetowe-cena/
- Cyrek Digital — cena landing page (agency): https://cyrekdigital.com/pl/baza-wiedzy/cena-landing-page/
- PK Marketing — cennik 2025 (4–6k net sweet spot): https://pkmarketing.pl/ile-kosztuje-strona-internetowa-w-2025/

**AI generators:**
- Hostinger PL kreator (11,99→41,99 zł/mo): https://www.hostinger.com/pl/kreator-stron
- WebWave oferta: https://webwavecms.com/Oferta · home.pl strony: https://home.pl/strony
- Wix plans: https://www.wix.com/plans · Framer: https://www.framer.com/pricing · Durable: https://durable.com/pricing
- Lock-in / no export: https://onesmartsheep.com , https://rocketwebdesigner.com
- "Sea of sameness": https://usemotion.com , https://www.925studios.co/blog/ai-website-builder-vs-design-agency-2026

**Client expectations & delivery economics:**
- PL mobile usage (91% / 75%): https://pbi.org.pl/informacje-prasowe/polski-internet-w-iv-kwartale-2024-r/
- What a small-firm site must have: https://seobit.pl/strona-internetowa-dla-malej-firmy-co-musi-zawierac/
- Google Business Profile weight: https://dawidgicala.pl/jak-polaczyc-strone-firmowa-z-profilem-firmy-w-google-zeby-wzmacniac-lokalna-widocznosc/
- WP dominance/vulns PL: https://www.web-systems.pl/wordpress-w-2025-roku-niezwykla-dominacja-na-rynku-stron-internetowych/
- Sanity pricing: https://www.sanity.io/pricing · Decap: https://decapcms.org/
- PL freelancer rates: https://bizky.ai/blog/stawki-freelancera-w-2025-ile-brac-za-godzine/
- .pl renewal trap: https://danieldryzek.pl/2025/04/27/ceny-odnowien-domen-pl-04-2025/
- "opieka" retainer pricing: https://studiokreatywnychstron.pl/uslugi/opieka-nad-strona-internetowa/ , https://opiekawordpress.pl/blog/oplaty-za-administrowanie-strona-internetowa-ile-to-kosztuje/

**Positioning / risks:**
- Three-tier breakdown: https://www.925studios.co/blog/ai-website-builder-vs-design-agency-2026
- AI perception gap (IAB): https://ppc.land/iab-introduces-disclosure-framework-as-gen-z-trust-in-ai-ads-plummets-19-points/
- PL human-preference (SW Research): https://pomoc.ai/poprawa-satysfakcji-klienta
- Productized "website in a day": https://selfmadewebdesigner.com/scale-a-1-to-1-web-design-business-with-productized-services/
- Cheap-client risks (PL): https://arturkosinski.pl/baza-wiedzy/tania-strona-internetowa-uwazaj-na-te-rzeczy/ , https://blue-point.pl/blog/tania-strona-internetowa-czy-to-naprawde-mozliwe/
- Care plans / recurring revenue: https://newpulselabs.com/web-design-recurring-revenue/ , https://jenniferbourn.com/website-care-plan-mistakes/

---

## Architecture / offer-design insights

- **Your own stack is the moat.** Next.js + Firebase static delivery drops infra +
  SSL to ~0 zł and eliminates the WordPress maintenance labor — this is exactly what
  makes both a 1000 zł build *and* a high-margin retainer viable. Competitors on
  WordPress cannot match that cost structure.
- **The "1 day" you spent on your own landing is the proof-of-concept for the
  productized model** — but only if the client arrives with content (copy, photos,
  brand). The onboarding form / "design day" discipline is what protects the 4h regime.
- **Pricing the CMS bundle at 1,500–2,000 zł is arguably under-priced** vs the market
  (+1,500–3,000 zł for a panel alone). There is room to hold 2,000–2,500 zł without
  losing the "far below agency" position — worth testing.
- **Sell three things the generator and agency structurally can't co-offer:** a real
  person to talk to, an individually-designed (not templated) page, and **ownership
  of the code/site + full admin access.**

## Open Questions (for the concept/plan stage)

1. **Is 1000 zł net the right floor, or does it anchor you as "cheapest"?** Consider a
   999/1999/3499-style ladder (à la KC Mobile) where 1000 zł is the *entry* tier, not
   the whole offer — protects margin and creates an upsell path.
2. **What is the hard revision cap and the "Not Included" list?** Needs to be defined
   before the first client, not after scope creep hits.
3. **Retainer product design**: what does the 99–275 zł/mo "opieka" actually include
   on a static stack (content edits quota, monitoring, small changes, hosting/domain
   management), and how is scope capped?
4. **CMS default**: confirm Sanity vs Decap vs Firestore-form against real client
   edit-frequency and current free-tier limits (verify on live pricing pages).
5. **Lead source & niche**: the low price only becomes a business at ~15 projects/mo —
   where do those leads come from, and does niching (one trade/vertical) raise speed
   and price?
6. **Legal/ops**: contract template, deposit mechanics (non-refundable booking fee),
   VAT-invoice framing, EAA accessibility baseline in the standard deliverable.
7. **Mobile-app tier (next phase)**: the same "AI+human, individual, you own it"
   thesis needs its own price validation — not covered here.

## Related Research

- None yet — this is the first artifact for `client-web-offer`. The mobile-app
  offer will warrant its own research pass.

---

## Follow-up Research 2026-07-18 — floor-tier contents, optional care retainer, domains & Firebase Hosting

Triggered by the user's definition of the **floor (entry) tier** and three questions:
what the floor should include, whether to add an **optional** (non-mandatory) care
retainer, and the plumbing (domain provider + reseller upside + DNS→Cloudflare, and
Firebase Hosting vs App Hosting).

### A. The floor tier as the user defined it — validated

User's floor (1000 zł net, the *bottom* of a multi-tier ladder) = landing page +
free hosting + client's own domain connected + help buying/configuring the domain +
optional AI-generated content (from an AI interview) if the client brings none +
**2 change iterations within ~1 week of first deploy**.

Verdict: **each item is cheap-to-deliver on your stack and matches market must-haves**
(mobile, fast, professional, self-serviceable, Google-ready). Two guardrails from the
research:
- **The "2 iterations within 1 week" cap is exactly the right instinct** — sources are
  unanimous that an *uncapped* revision promise is "death by 1000 emails". Write it as
  "2 rounds of changes, requestable up to 7 days after deploy; after that, changes are
  billed / covered by a care plan or a change-credit pack." Define what counts as *one*
  round (one consolidated feedback list, not per-email).
- **AI-generated content stays backstage.** It's fine as an internal accelerator/option
  ("we'll draft your copy from a short interview if you don't have text"), but per the
  positioning research **do not brand it as "AI-written"** — sell "we write it for you."

### B. Optional care retainer ("opieka") — the answer to the user's main question

**Yes, it's a strong optional upsell — but it must be re-based, opt-in-framed, and
hard-capped**, because your static stack removes the usual WordPress justification.

**PL market anchors (net/mo):** entry ~**175–299 zł**, mid ~**599–659 zł** (bestseller),
top ~**979–1,290 zł**. Concrete: Studio Kreatywnych Stron 175 (no shop)/275 (shop);
Noril 299/599/1290; KC Mobile 299/659/979. Standard-in-tier items: backup, monitoring,
malware scan, SSL watch, monthly report, N support hours.

**The static-stack problem:** on Next.js + Firebase, ~60–70% of a classic WP plan
(core/plugin patching, malware removal, SSL renewal, server backups) is **free/auto or
irrelevant** — git *is* the backup, SSL is auto. Billing those as line items reads as
padding and invites churn. **Re-base the fee on your TIME + convenience + availability:**
- **Legit recurring value here:** monthly **content-edit quota** (text/prices/photos —
  the real product, client can't touch the deploy); **domain+hosting+DNS management**
  (you hold renewals/DNS, client never sees a registrar/console); **uptime + analytics
  report**; **priority turnaround SLA**; **seasonal/campaign page** on request;
  **dependency/framework bump + redeploy** (the honest technical residue that *does*
  remain on a static stack).
- **Do NOT headline:** "SSL renewal", "malware removal", "daily server backups",
  "plugin updates" — none apply; they cheapen the pitch on this stack.

**Opt-in framing that keeps take-up high without forcing it** (industry default is to
*require* it → ~99% attach; you want optional, so use these):
- **Include the first 3 months in the build price** — softest opt-in; they experience it
  and choose to *keep* it.
- **Present the choice at handover** (client is happiest, most aware they can't self-edit).
- **Good/Better/Best with a double-priced top tier** as a decoy anchor → the decision
  becomes *which* plan, not *whether*.
- **Annual = 2 months free** (~15–17%).

**Alternatives for clients who decline** (essential for a non-forced model — give a real
menu, not nothing):
- **Prepaid change-credit pack / block of hours** (e.g. buy 5 edits or a 5h block, drawn
  at ~150 zł/h, overflow at list rate) — best fit for the opt-in decliner; cash upfront,
  no monthly obligation.
- **Pay-per-change hourly** (~150–180 zł/h net for small jobs).
- **Annual maintenance lump sum** (~10–20% of build cost/yr).
- **Hosting/domain-management-only floor** (~99–149 zł/mo) — the minimum recurring product;
  near-pure margin on a static stack; keep it even if they refuse everything else.

**Scope-cap discipline (non-negotiable):** never "unlimited". A **quota + turnaround SLA**
beats "unlimited best-effort" (e.g. "up to 30–60 min of changes / 1–2 requests per month,
48h turnaround, overflow 150 zł/h"). Sell response-time SLA separately from work quota.
Explicitly exclude scope-creep magnets (SEO deliverables, email admin, accessibility
projects) from the recurring base — offer them as add-ons.

**Margin reality on the static stack:** hard cost ≈ 0 (Firebase free, SSL free, monitoring
~$20/mo covers dozens of sites, domain a passthrough). The **only real cost is your time
per edit** (~150 zł/h). So:
- **99–149 zł/mo hosting/domain-management, ~0 edit quota → >80% margin** (the honest floor).
- **175–299 zł/mo with a *hard-capped* ~1h edit quota → profitable only if edits stay
  ≤1h/mo**; a soft/"unlimited small changes" quota is the trap (one 40-min edit can wipe a
  175 zł month). Providers cite **1–2h/mo per client** as the safe design; e.g. 10 clients
  × ~150 zł ≈ predictable recurring base.

**Suggested opt-in shape:** base ~99–149 zł (mgmt + report + dep-bump, minimal edits) →
bestseller ~199–299 zł (hard-capped 1h edits + 48h SLA + overflow 150 zł/h) → top
~499–599 zł (3–4 edit-h + priority SLA + seasonal page). Decliners → 5-edit credit pack
or keep the ~99 zł mgmt-only floor.

### C. Domains — provider, reseller upside, and DNS→Cloudflare→Firebase

**Split the two roles; don't force one vendor to do both.**

**1) DNS + Firebase glue → Cloudflare (Free), for every client.** Free, `.pl`-compatible
as pure DNS, has an API for templated bulk setup, matches your existing webd→Cloudflare
pattern. **Cloudflare is NOT your registrar** here: Cloudflare Registrar **does not support
.pl** and is deliberately at-cost/no-margin (and forces CF nameservers) — irrelevant as a
reseller tool. Use it only as the DNS layer.

**2) The load-bearing Firebase caveat:** Firebase custom-domain A records + ownership TXT
in Cloudflare **must be DNS-only (grey cloud), NEVER proxied (orange cloud)** — proxying
breaks Firebase's SSL/ACME provisioning (Firebase's own rule: "remove any records pointing
to other providers or Firebase cannot provision an SSL certificate"). Trade-off: on
grey-cloud you get free DNS but not Cloudflare's WAF/caching on the Firebase hostname —
fine, Firebase's own CDN/SSL handles that. (This grey-cloud rule is well-founded inference +
community-standard; not stated verbatim in Firebase docs — flagged.)

**3) The .pl renewal trap is the number that matters** (register price is marketing; only
**renewal recurs**, per domain, per client). NASK wholesale floor = **50 zł net renewal**.
Live-verified renewals (net, 2026-07-18):

| Registrar | .pl renewal (net) | Read |
|---|---|---|
| **Hostido** | **~51 zł** | at NASK floor — best long-term value |
| **OVHcloud** | **~59 zł** | near cost + real domain **API** + partner program |
| seohost | ~69 zł | good, trending up (domains excluded from its affiliate) |
| **webd.pl (your current)** | **~90 zł** | ~80% over NASK floor; only its volume-wholesale tiers (≈65 zł brutto @100+ domains) beat OVH/hostido |
| dhosting / AZ.pl / home.pl / cyberFolks / nazwa.pl | **139 / ~160 / 169 / 179 / 200–240 zł** | avoid for a recurring client portfolio |

**Reseller reality:** none of the mainstream PL hosts publishes a strong
domain-wholesale + API + white-label program for "one operator, many small clients." Most
"programy partnerskie" are **affiliate % on inflated retail** (a 20–25% kickback on a
179 zł renewal still leaves the client paying far more than a 51–59 zł renewal elsewhere),
and several (**seohost, dhosting**) **exclude domains entirely**. webd.pl gives you a 10%
referral + a cPanel *hosting*-reseller — **not** a true domain-wholesale unlock (its
"hurtowe ceny domen" nav has no published API/white-label). The category that actually fits
bulk multi-client domains is the **dedicated wholesale platforms** — **HRD.pl** (100%
white-label, API + WHMCS, ~1000 TLDs) and **Domeny.tv** (registrar API, WHMCS) — worth
evaluating if you ever scale to 50–100+ domains.

**Ownership: register each domain in the CLIENT's name (abonent), under your management.**
For `.pl`, the registrant is the legal owner and you must issue the **AuthInfo code** on
request (NASK rule) — so client-owned = clean handover, no hostage risk, GDPR-clean. Never
register client domains under your own identity "for convenience".

**Recommended per-client runbook:** register `.pl` at **OVH or Hostido** (cheap renewal;
OVH if you want the API/partner track, Hostido if you want the absolute floor), abonent =
client, managed under your account → add zone to Cloudflare Free, set registrar NS to the
CF pair → in Cloudflare add Firebase's A records + ownership TXT **all grey-cloud**, remove
stray AAAA/old A → add custom domain in Firebase console, let it verify + issue SSL → bank
the AuthInfo issuance as a standard offboarding step. **Reconsider staying on webd.pl only
if you'll concentrate enough domains to hit its wholesale tiers; otherwise migrate — saves
~30–40 zł net/domain/yr.**

### D. Firebase Hosting vs App Hosting — use Hosting (free) for the floor

**Decision rule (grounded in current Firebase docs + pricing):**

| Landing character | Use | Cost | Billing |
|---|---|---|---|
| **Static export** (`output: 'export'` — no SSR/route handlers/server actions/ISR/runtime image opt.) | **Firebase Hosting** | **Free (Spark)** | **None** |
| Needs server features (SSR, API routes, server actions, ISR, dynamic middleware) | **App Hosting** | Metered (no-cost Blaze allotment) | **Blaze required** |

- **Firebase Hosting free (Spark):** custom domain + **free auto-SSL** are **✓ on Spark, no
  billing required**; 10 GB storage; **transfer cap 360 MB/day** (per-project, per-DAY, not
  monthly). For a low-traffic micro-business landing (~1–2 MB/load ⇒ ~180–360 loads/day)
  this stays free indefinitely. **This is the floor-tier host.**
- **App Hosting** is built for SSR Next.js (git deploys → Cloud Run) but is **"Not
  applicable" on Spark — it REQUIRES Blaze (a card on file)**; there's a no-cost monthly
  allotment but any overage bills. Only cross into it if a landing genuinely needs server
  features.
- **Keep landings static:** a contact form can post to a third-party endpoint (Formspree /
  a Cloud Function / external API) instead of a Next.js server action — that one choice
  keeps the site on **free Hosting**. A server action/route handler is what would force
  App Hosting + Blaze.
- **Multi-client caveat:** all sites in one Firebase project share the single 360 MB/day
  pool → prefer **one Firebase project per client** so each gets its own free daily
  allotment; each custom domain connects to one site and allows 20 subdomains/apex.
- **Custom-domain setup:** add domain in console → ownership **TXT** (keep it permanently) →
  **A record to Firebase IP** (take the exact IP(s) from the console; docs example shows
  `199.36.158.100`) → SSL auto-provisions, usually hours, up to 24h. **Remove any stray
  A/AAAA/CNAME to other providers or SSL won't issue.**

### Follow-up Open Questions

1. **Design the tier ladder concretely** (floor 1000 zł + 2–3 higher tiers): what moves a
   client up — pages, custom design depth, copywriting, integrations, animation, e-com?
2. **Write the floor-tier "Not Included" list** and the exact revision-round definition.
3. **Pick the care-plan shape** (base/bestseller/top numbers + hard quota + SLA + credit
   pack for decliners) and whether the first 3 months ship inside the build price.
4. **Registrar decision:** migrate off webd.pl to OVH/Hostido, or stay and pursue volume
   wholesale? Decide the DNS+ownership runbook as a fixed SOP.
5. **One Firebase project per client vs shared** — set the operational default now.
6. **Verify perishable numbers before quoting a live client:** .pl renewals, Sanity/CF free
   tiers, care-plan competitor prices, OVH/nazwa partner margins (all flagged stale-risk).

## Follow-up External Sources (2026-07-18)

**Care retainer:** [noril.pl 2026](https://noril.pl/blog/opieka-nad-strona-www-poradnik-2026) ·
[kcmobile cennik opieki](https://kcmobile.pl/cennik/opieka-wordpress/) ·
[studiokreatywnychstron opieka](https://studiokreatywnychstron.pl/uslugi/opieka-nad-strona-internetowa/) ·
[premiumdigital ceny](https://www.premiumdigital.pl/obsluga-strony-internetowej-ceny/) ·
[theadminbar — what's in a care plan](https://theadminbar.com/what-is-a-website-care-plan-and-whats-included/) ·
[geary.co — lucrative maintenance plans](https://geary.co/lucrative-website-maintenance-plans/) ·
[tuesday.is — pricing guide 2026](https://www.tuesday.is/blog/website-maintenance-pricing-guide-2026/) ·
[fatlab — packages buyer's guide](https://fatlabwebsupport.com/blog/website-maintenance/website-maintenance-packages-compared-your-complete-buyers-guide/) ·
[abbacus — JAMstack maintenance cost](https://www.abbacustechnologies.com/how-much-does-a-jamstack-website-cost-in-2025-4/) ·
[contractable.ai — revision limits](https://contractable.ai/blog/uiux-designer-service-agreement-scope-creep-and-revision-limits) ·
[sentinel.rootstuff — care-plan economics](https://sentinel.rootstuff.io/blog/website-care-plan-for-clients)

**Domains / reseller / DNS:** [NASK cennik dla rejestratorów](https://www.dns.pl/cennik_dla_rejestratorow) ·
[danieldryzek — .pl renewals Apr 2025](https://danieldryzek.pl/2025/04/27/ceny-odnowien-domen-pl-04-2025/) ·
[OVH .pl TLD](https://www.ovhcloud.com/pl/domains/tld/pl/) · [Hostido domeny](https://hostido.pl/domeny/pl) ·
[webd cennik](https://webd.pl/cennik-domen/) + [hurtowy](https://webd.pl/cennik-hurtowy-domen/) + [reseller](https://webd.pl/reseller/) + [program partnerski](https://webd.pl/program-partnerski/) ·
[nazwa.pl cennik domen](https://www.nazwa.pl/cennik/cennik-domen/) · [home.pl program partnerski](https://pomoc.home.pl/baza-wiedzy/program-partnerski-domeny-pl) ·
[cyberFolks partner](https://cyberfolks.pl/program-partnerski/) · [hostido partner](https://hostido.pl/program-partnerski) ·
[HRD.pl reseller](https://hrd.pl/reseller-domen/) · [Domeny.tv registrar API](https://www.domeny.tv/registrar-api) ·
[Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) + [supported TLDs](https://developers.cloudflare.com/registrar/top-level-domains/) + [.pl request](https://community.cloudflare.com/t/polish-domains-pl/667294) ·
[NASK transfer / AuthInfo](https://www.dns.pl/en/transfer_domain_pl)

**Firebase Hosting / App Hosting:** [Hosting docs](https://firebase.google.com/docs/hosting) ·
[App Hosting docs](https://firebase.google.com/docs/app-hosting) ·
[Pricing (Spark/Blaze)](https://firebase.google.com/pricing) ·
[Custom domain + SSL + Cloudflare records](https://firebase.google.com/docs/hosting/custom-domain) ·
grounded via Context7 `/llmstxt/firebase_google_llms_txt`
