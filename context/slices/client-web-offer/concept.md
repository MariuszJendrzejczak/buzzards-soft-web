---
date: 2026-07-18
author: Claude (Opus 4.8) + Mariusz
repository: buzzards_soft_web
topic: "Offer concept — AI-native landing pages for individual clients (PL)"
status: draft (working concept — append revisions, don't overwrite)
related: ./research.md
---

# Offer Concept — AI-native landing pages for individual clients

Working concept for a productized landing-page offer. Grounded in `./research.md`.
All prices are **PLN net** and are **starting hypotheses** to validate against real
quotes — not final. This is a design/decision doc: **append dated revisions, do not
overwrite** earlier sections.

---

## 1. Positioning — "AI-native developer, human-led"

**One-line:** *A human who has mastered AI as a power tool, and uses it to deliver —
faster and cheaper — the kind of individually-crafted site that agencies charge 4–5k
for, without the price tag of an agency or the template feel of a generator.*

**Transparency about AI is deliberate and on-brand** — but always framed as
*expertise with a tool*, never as *the product is machine-made*. The distinction
(from `research.md`): "made by AI" signals commodity and cheapens; "I'm an expert who
wields AI" signals capability and sells. Same tool, opposite value signal.

**The moat narrative (say this):**
- AI gives **speed + price**. My craft — specialized skills/workflows, **verifiers**,
  prompt engineering, and a human who decides and takes responsibility — gives the
  **quality a generator can't**.
- Not "napisz mi tekst na stronę". A structured, verified content pipeline run by
  someone who knows when AI is wrong and catches it.
- You talk to a **real person** at every step (answers the PL 67.9% "prefer a human"
  finding) — and still get generator-grade speed and near-generator price.

**The failure mode to actively avoid:** being heard as "a generator / I'll do it
myself in ChatGPT for free". Every AI mention must be paired with a proof of craft
(skills + verification + human accountability) so the offer never collapses into the
"free DIY generator" bucket.

**Segment-aware messaging:**
- Freelancers / creators / tech-savvy small firms → "AI-native" is a **magnet**; lead
  with it.
- Traditional local service providers (hydraulik, fryzjer) → lead with the **outcome**
  ("faster, cheaper, nicer than an agency"); AI is the *explanation for why it's cheap*,
  not the headline.

**Anti-retainer as a selling point:** on a static Firebase stack a "set & forget" site
genuinely stands for years with zero maintenance — so we *don't* push a subscription.
"Nie przywiązuję Cię do abonamentu — na moim stacku nie płacisz za utrzymywanie czegoś,
co się nie psuje." (The only recurring cost is the client's own domain renewal ~50–90 zł/yr,
on their own account — disclosed up front.)

---

## 2. Target segments (all in scope, messaging differs)

1. **Mikrofirmy / lokalni usługodawcy** — the volume buyer; wants leads + credibility.
2. **Freelancerzy / soloprzedsiębiorcy / twórcy** — higher aesthetic bar, AI-native resonates.
3. **Osoby prywatne (wizytówka / event)** — lowest budget; the floor tier is for them.
4. **Małe firmy chcące realnie sprzedawać** — lead-gen landing; upsell to higher tiers.

---

## 3. The tier ladder (floor + progression)

> **SUPERSEDED by Revision v5 (2-tier model: Basic / Full + individual quote).** Kept for
> history. Read Revision v5 for the current, authoritative model.

The floor is the **bottom** of the ladder, not the whole offer — this protects margin
and creates an upsell path (research: avoid anchoring as "cheapest").

| Tier | Price (net) | Who / what | Core delta vs tier below |
|---|---|---|---|
| **Floor — "Landing"** | **~1 000 zł** | One-page landing, 1 chosen theme (dark *or* light) | — |
| **Mid — "Landing+"** | **~1 900–2 200 zł** | Richer/multi-section or up-to-3 subpages, done-for-you content pack included, contact integrations + Google Business/Maps | more content, more sections, integrations, done-for-you copy |
| **Pro — "Sales/Brand"** | **~3 500–4 000 zł** | Full custom design, conversion-oriented, motion/animation, 1 extra language included, advanced integrations (booking) | bespoke design, animation, i18n, conversion tuning |

- All three stay **below the agency 4–5k floor** — the whole point.
- What moves a client **up**: number of pages/sections, depth of custom design,
  done-for-you copy, integrations, animation, multi-language, conversion work.
- **Self-edit is NOT a tier — it's a one-time module** (see §5). A "set & forget"
  client never pays for it; a client who wants to edit forever buys the CMS module once,
  still with **no subscription**. (This replaces the original "landing + CMS 1500–2000"
  assumption: CMS becomes an owned, one-time capability, not a recurring product.)

---

## 4. Floor tier — exact contents

**"Landing" — ~1 000 zł net. Includes:**
1. **One-page landing** — responsive/mobile-first, fast (static export), one chosen
   colour scheme (client picks **dark or light** — no extra cost, it's their pick).
2. **Free hosting on Firebase Hosting** (Spark, no billing) — set up for the client,
   incl. help creating the Firebase account, or we create it *for* them during a call.
3. **Client's own domain connected** (A records + ownership TXT, auto-SSL).
4. **Help buying + configuring the domain** — registrar recommendation (cheap-renewal:
   OVH/Hostido), domain registered **in the client's name**, DNS via Cloudflare (grey-cloud).
5. **Optional AI-generated content** — if the client brings no copy, we draft it from a
   short **AI-assisted interview**, then run it through the verified content pipeline.
   (Opt-in flow; if they bring content, we use theirs.)
6. **2 rounds of changes**, requestable up to **7 days after deploy**.
7. **Legal baseline** — cookie/RODO consent banner + privacy policy (in the floor, not a
   module — otherwise we'd be selling the client legal risk).
8. Basic on-page SEO + analytics (GA4 / consent-aware), a contact form, click-to-call.

**"Not Included" in the floor (explicit — prevents scope creep):**
- More than one page / additional subpages → module.
- Dark/light **toggle** (floor = one chosen theme) → module.
- Additional languages → module.
- Self-edit CMS → module.
- Custom illustrations / photography / logo design → out of scope (client provides or module).
- Advanced integrations (booking, CRM, payments), animations, blog → module / higher tier.
- Google Business / local SEO setup → module (all tiers).
- **Ongoing SEO campaigns, link building, ranking guarantees → out of scope, all tiers.**
  Disclosed honestly; refer out / partner. (See Revision v4.)
- Changes after the 7-day / 2-round window → billed per change or via a change-credit pack.

**Definition of "one round of changes":** one consolidated feedback list (not one email =
one change). Two lists max within 7 days of first deploy. This must be written into the
quote before the first client.

---

## 5. Module catalog (à-la-carte add-ons)

Design principle: each module has (a) **build-once, reuse** infrastructure so margin grows
per client, (b) **legible client value**, (c) a **clear scope boundary**. Prices are
hypotheses to calibrate.

| Module | Price (net) | Notes / rationale |
|---|---|---|
| **Additional language** | **+300–500 / lang** | Best add-on — obvious value (reach + hreflang SEO). i18n infra built once; per-language = translation + switcher. Showcases the AI-native pipeline. Scope: we translate provided/AI-drafted copy, client approves meaning. |
| **Dark/light toggle** | **+300–500** | Craft/portfolio signal more than a revenue driver — niche demand, asymmetric effort (contrast, images/logo on both themes, double testing). Floor = pick one theme; toggle = the upsell. **Build it on buzzards_soft_web first** as the reference implementation + portfolio proof. |
| **AI-generated + verified content** (PL customer-facing: "Treść z AI — generuję i weryfikuję za Ciebie") | **+300–600** | Flagship module — *materializes* the AI-native pitch. Named honestly: I **generate + analyze + verify** the copy via my AI pipeline; the client neither writes nor prompts nor verifies. **"Za Ciebie" = the effort is mine, not the client's — NOT a claim of hand-written copywriting.** Transparency about AI is the selling point here, not something to hide. |
| **Contact integrations** (WhatsApp/Messenger, booking/calendar, form→mail) | **+200–400** | High value for service providers — "this is what gets me leads." |
| **Google Business + Maps + reviews embed** | **+150–300** | Direct hit on local SEO (86% of local-search clicks). Sells itself. |
| **Self-edit CMS** (Sanity free tier / Decap git) | **+500–800 one-time** | Client edits text/prices/photos forever, **no subscription**. Fits "set & forget but occasionally editable". On-stack, $0 infra. |
| **Extra subpage** | **+200–400 / page** | Simple scope unit for growing a floor landing toward a small site. |
| **Motion / animations** | **+300–600** | Higher-tier feel; part of the Pro tier. |
| **Blog / news section** | **+500–800** | Usually paired with the CMS module. |
| **Analytics / Pixel + conversion tracking** | **+150–300** | For lead-gen clients running ads. |
| **Domain + business email setup** (service) | **+100–200** | One-off configuration help (Google Workspace / hosting mailbox). |

---

## 6. Price map vs market (from research.md)

- Floor **1 000 zł** = OLX/low-freelancer band (OLX avg ~1 360), **2–5× under studios/agencies**.
- Mid **~2 000 zł** = still under the market's own "landing + CMS" combined price (2 500–4 500).
- Pro **~3 500–4 000 zł** = at/just under the agency sweet spot (4 000–6 000) — deliberately
  the "agency quality, not agency price" ceiling.
- The "**4–5k agency landing**" reference point is confirmed accurate — it's the anchor we
  undercut on every tier.

**Delivery-economics guardrail:** 1 000 zł only pencils out as an **AI-accelerated ≤4–6h
build where the client provides (or approves AI-drafted) content**. At 4h ≈ 250 zł/h (good);
at 8h ≈ 125 zł/h (break-even); at 16h ≈ 62 zł/h (loss-leader). The whole floor design —
static stack, AI content pipeline, one theme, hard 2-round cap — exists to keep the floor in
the ≤6h regime. The business becomes real at ~15 projects/mo (→ lead-source is an open question).

---

## 7. Delivery model (the AI-native workflow, made visible)

The workflow itself is part of the product and the pitch:
1. **Human intake call** — real conversation about needs (the differentiator vs a generator).
2. **AI-assisted content interview** → draft copy → **verified pipeline** (specialized
   skills + verifiers, human review). Client sees "done for you", not "prompt it yourself".
3. **AI-accelerated build** on the house stack (Next.js static + Firebase free hosting).
4. **Deploy + domain/DNS/SSL setup** (client-owned domain, Cloudflare grey-cloud → Firebase).
5. **2 change rounds within 7 days**, then handover — client owns the domain, the site, and
   (if bought) the CMS. No lock-in, no forced subscription.

---

## 8. Open decisions (to resolve before going live)

1. **Exact tier prices + names** — validate 1000 / ~2000 / ~3500–4000 and what precisely
   separates them (page count? design depth? which modules bundled in Mid/Pro?).
2. **Module prices** — calibrate the table in §5 against real effort once infra is built.
3. **Revision-round wording + "Not Included" list** — lock before the first client.
4. **Registrar SOP** — migrate off webd.pl to OVH/Hostido? Fix the domain-ownership +
   DNS runbook as a standard operating procedure (one Firebase project per client).
5. **Lead source & niche** — the floor becomes a business only at volume; where do leads
   come from, and does niching one vertical raise speed + price?
6. **Brand/narrative assets** — landing copy for the offer itself, portfolio proof
   (starting with the dark/light toggle on buzzards_soft_web), case-study framing.
7. **Contract / invoicing** — deposit mechanics, VAT-invoice framing, scope doc template.
8. **Mobile-app tier** — the same "AI-native, individual, you own it" thesis for simple
   mobile apps needs its own research + concept pass (next phase).

---

## Revision 2026-07-18 v2 — concrete Mid/Pro tier split

> **SUPERSEDED by Revision v5 (2-tier model).** The Floor/Mid/Pro matrix below is history;
> the current model is Basic / Full + individual quote. Read v5.

Expands §3's summary table (which stays as the at-a-glance version). Mobile offer is
explicitly **out of scope** for this concept — web only.

### The progression axis (the sales story)

**Floor = present · Mid = get found & capture · Pro = convert & stand out.**

- **Floor "Landing"** — *"Twoja profesjonalna wizytówka online — szybko i tanio."*
  Be present, look credible, be reachable.
- **Mid "Landing+"** — *"Strona gotowa pod Google i realnie łapiąca kontakt."*
  Google-ready technical foundation + turn visitors into calls/messages. (Local SEO /
  Google Business is a paid add-on module — not baked into the tier; see Revision v4.)
- **Pro "Sales/Brand"** — *"Dedykowany design nastawiony na sprzedaż."*
  Bespoke look + conversion-oriented + multilingual reach.

### Feature matrix

Legend: **✓** = included in the tier · **+** = available as a paid module (§5) · **—** = not offered.

| Capability | Floor ~1 000 | Mid ~1 900–2 200 | Pro ~3 500–4 000 |
|---|---|---|---|
| **Scope** | 1 page | rich one-pager **or up to 3 subpages** | multi-page **up to ~5** or long sales page |
| **Design** | curated system, individually arranged | system + **custom section layouts + brand palette** | **fully bespoke art direction** |
| **Copy / content** | client's, or basic AI-drafted (opt-in) | **AI-generated + verified pack ✓** | **AI-generated + verified, conversion-tuned ✓** |
| **Contact form + click-to-call** | ✓ | ✓ | ✓ |
| **Contact integrations** (WhatsApp/Messenger/form→mail) | + | **✓** | ✓ |
| **Booking / calendar / simple CRM** | + | + | **✓** |
| **Google Business + Maps + reviews** (local SEO) | + | + | + |
| **Ongoing SEO campaigns / ranking guarantees** | — | — | — (out of scope, all tiers) |
| **SEO** | basic on-page | **SEO pack** (schema, sitemap, hreflang-ready) | **SEO pack + conversion structure** |
| **Analytics / Pixel / conversion tracking** | basic GA4 | GA4 (consent-aware) | **GA4 + Pixel + conversion tracking ✓** |
| **Motion / animation** | — | + | **✓** |
| **Multi-language** | + | + | **1 extra language ✓** (more: +/lang) |
| **Self-edit CMS** (one-time, no sub) | + | + | + |
| **Dark/light toggle** | — (floor = pick one theme) | + | + |
| **Legal baseline** (RODO/cookies + privacy) | ✓ | ✓ | ✓ |
| **Free hosting + client-owned domain + SSL** | ✓ | ✓ | ✓ |
| **Change rounds / window** | 2 rounds / 7 days | 3 rounds / 14 days | 4 rounds / 21 days |

### The three deltas that carry each jump

- **Floor → Mid** is bought with **content + findability foundation + lead-capture**: the
  AI-generated+verified content pack, contact integrations, and the technical **SEO pack**
  become *included*. This is the micro-business "gets me leads + a proper Google-ready
  foundation" value. (Local SEO / Google Business stays a paid module — see Revision v4.)
  Bundling ~500–1 000 zł of module value into a ~2 000 price = a slight bundle discount
  that rewards trading up.
- **Mid → Pro** is bought with **bespoke design + conversion + reach**: fully custom art
  direction (the big lever), motion, one language included, and the conversion stack
  (Pixel + tracking + booking + CRO-minded structure).
- **Design depth is the spine** of the ladder: curated-system (Floor) → customized-system
  (Mid) → fully-bespoke (Pro). Floor is the **efficiency play** (AI-accelerated ≤6h,
  keeps 1 000 zł viable); Pro is the **craft play** (more human design hours, and the
  price supports them).

### Modules that stay à-la-carte at every tier

Additional languages beyond the included one, dark/light toggle, self-edit CMS,
blog/news, extra subpages beyond the tier's limit, business-email setup. (Full prices: §5.)

### Delivery-hours sanity check

- Floor ~1 000 → 4–6 h AI-assisted → ~170–250 zł/h ✓
- Mid ~2 000 → 8–12 h → ~170–250 zł/h ✓
- Pro ~3 800 → 16–24 h → ~160–240 zł/h ✓ (more human design hours, still healthy)

All three land in a sane effective-rate band **provided** content is client-supplied or
AI-drafted+verified (never hand-written from scratch) and design reuses the house system
below Pro.

### Still open after v2

- Exact numbers for Mid (1 900 vs 2 200?) and Pro (3 500 vs 4 000?) — pick and hold.
- Whether Pro's "1 extra language included" is the right included-module, or swap for
  something higher-value to that segment (e.g. a full CRO pass).
- Subpage limits (Mid "up to 3", Pro "up to 5") vs charging per page from the start.

## Revision 2026-07-18 v5 — FINAL model: 2 tiers (Basic / Full) + individual quote

**This is the current, authoritative offer model.** Supersedes the 3-tier ladder in §3 and
Revision v2 (kept above for history). The two priced tiers use **AI-designed-from-interview**
delivery; fully-bespoke design and larger scope move to the individual quote.

### Tiers & prices (PLN net)

| | **Basic** | **Full** | **Individual quote** |
|---|---|---|---|
| **Price** | **1 299 zł** (promo **999**, 1–3 mo.) | **2 499 zł** (promo **1 999**) | no price — disclaimer |
| **Line** | *"Profesjonalna wizytówka online — szybko, tanio, gotowa pod Google."* | *"Rozbudowana strona: widoczność lokalna, animacje, przełącznik motywu — realnie łapie kontakt."* | *"Większe projekty (sklep, custom design od zera, rozbudowany serwis, realny CRM) — wycena indywidualna."* |

**Promo rationale:** a deliberate **investment** window (1–3 months) while building the
marketing strategy — grows the portfolio *and* refines the workflow (so later builds are
faster). First 2–5 projects may fall below the hourly band — accepted. Base prices
(1299 / 2499) are set to **hold the effective hourly rate** once the workflow matures.
Hour-math check: Basic 6–9 h → ~145–215 zł/h ✓; Full 12–18 h → ~140–210 zł/h ✓.

### Feature matrix (authoritative)

Legend: **✓** = standard in the tier · **+** = paid module (see prices below) · **—** = not offered.

| Capability | **Basic — 1 299** | **Full — 2 499** |
|---|---|---|
| **Scope** | 1 page, up to **5 sections** (one-pager) | up to **8 sections + 2 subpages** (subpage = a section) |
| **Design** | AI from interview | AI from interview, **more feedback rounds** |
| **Content** | 2 tracks (client text→review; or AI→review, 2–3 rounds) ✓ | same ✓ |
| **Contact form + click-to-call** | ✓ | ✓ |
| **Contact integration** (WhatsApp/Messenger/form→mail) | ✓ | ✓ |
| **SEO** (full technical pack) | ✓ | ✓ |
| **Analytics** (GA4) | ✓ | ✓ |
| **Google Business + Maps + reviews** (local SEO) | + | ✓ |
| **Animations / motion** | + | ✓ |
| **Dark/light toggle** | + | ✓ |
| **Language** | 1 included | 1 included |
| **Lead-capture integration** (CRM lvl 2/3) | + | + |
| **Self-edit CMS** | + | + |
| **Legal baseline** (RODO/cookies) | ✓ | ✓ |
| **Hosting + client-owned domain + SSL** | ✓ | ✓ |
| **Ongoing SEO / ranking guarantees** | — | — |
| **Change rounds / window** | 2 / 7 days | 4 / 14 days |

### Content flow (both tiers, standard)

Two tracks, client picks:
- **Client's text** → review → client receives the review and responds.
- **AI text after interview** → review → to client for acceptance, **up to 2–3 rounds**. The
  client may use it as a base for their own copy (gets a foundation for their own invention —
  also fine). Honest naming: **AI-generated + verified**, never "hand-written copywriting" (v3).
Uses **content-generator skills — TO BE BUILT (dependency).**

### Design (both tiers)

AI-designed from the interview. **Full gets more design-feedback rounds** (a design must be
presented to the client). Proposed: **Basic = 1 proposal + 1 revision; Full = up to 2–3
revisions** (confirm after first projects). Fully-bespoke / from-scratch design → individual quote.

### Module prices (working set — adjustable after first real projects)

| Module | Price (net) | Note |
|---|---|---|
| **Google Business + Maps + reviews** (local SEO) | **+250** | module for Basic; standard in Full |
| **Animations / motion** | **+400** | module for Basic; standard in Full |
| **Dark/light toggle** | **+400** | module for Basic; standard in Full; build on buzzards_soft_web first |
| **Additional language** (beyond the 1 included) | **+400 / lang** | strongest module; showcases the AI pipeline |
| **Self-edit CMS** (Sanity/Decap, one-time, **no subscription**) | **+700** | edit-forever, 0 zł infra |
| **Lead-capture integration** (mailing list OR leads sheet) | **+400** (both **+550**) | CRM lvl 2/3; client-owned free tool; you only wire it |
| **Booking / calendar** | **+350** | heavier than a plain form |
| **Extra subpage** (beyond tier limit) | **+300 / ea** | subpage = section |
| **Blog / news** | **+700** | usually paired with CMS |
| **Pixel + conversion tracking** | **+250** | for clients running ads |
| **Domain + business-email setup** | **+150** | one-off service |

### CRM = INTEGRATION, not a built CRM (final)

Module **"Integracja pozyskiwania leadów"** = wire the site's (public, no-login) form into an
**external, free-tier, client-owned tool**. Levels: **1** (form→mail) already standard;
**2** (mailing list — MailerLite/Brevo) **or 3** (leads sheet — Airtable/Sheets) = **this module**;
**4** (real CRM, e.g. HubSpot) = individual quote. All accounts owned by the client; you only
set them up and connect; **no subscription from you**. The landing itself stays a normal
no-auth landing — the only login lives in the external SaaS tool, off the site. Price: one
level **+400**, both **+550**.

### What changed vs the (superseded) 3-tier model

- 3 priced tiers → **2 priced tiers + individual-quote disclaimer**.
- Bespoke design removed from priced tiers → **individual quote** (priced tiers = AI-from-interview).
- **Content** (AI-generated + verified, 2 tracks) is now **standard in both**, not a module.
- **Contact integration** is now **standard in both**, not a module (cheap + high-value).
- **Full SEO pack standard in both** (dropped the basic-vs-pack split).
- **Google Business, animations, dark/light toggle** = module for Basic, **standard in Full**.

### Open decisions after v5

- Confirm module prices after real delivery data.
- Exact design-round counts per tier (proposed Basic 1+1, Full 2–3).
- **Build the content-generator skills** (dependency for the content flow).
- Registrar SOP (migrate to OVH/Hostido vs stay on webd); one Firebase project per client.
- Lead source / niche; the **marketing strategy** that gates the promo window.

## Revision log

- **2026-07-18 — v1 (initial concept).** Locked: AI-native transparent positioning;
  no mandatory retainer (set & forget); floor contents (8 items) + "Not Included";
  tier ladder floor/mid/pro; module catalog; CMS reframed as one-time module not
  subscription. Prices are hypotheses pending calibration.
- **2026-07-18 — v2 (tier split).** Added concrete Floor/Mid/Pro feature matrix, the
  present→capture→convert progression axis, the three deltas carrying each jump, which
  modules bundle into Mid/Pro vs stay à-la-carte, and a delivery-hours sanity check.
  Mobile offer marked out of scope for this concept.
- **2026-07-18 — v5 (FINAL 2-tier model).** Restructured 3 priced tiers → **Basic 1 299
  (promo 999) / Full 2 499 (promo 1 999) + individual-quote disclaimer**. Bespoke design →
  individual quote; priced tiers are AI-designed-from-interview. Content + contact integration
  + full SEO now standard in both. Google Business / animations / dark-light toggle = module
  for Basic, standard in Full. Locked module price set (working, adjustable). CRM finalized as
  an integration with client-owned free tools (lvl 2/3 module, lvl 4 individual quote). Promo
  = deliberate portfolio + workflow-refinement investment. Content-generator skills flagged as
  a build dependency.
- **2026-07-18 — v4 (SEO scope boundary).** Decision (user): the offer takes
  responsibility for **technical/on-page SEO foundation only** (fast, mobile, meta/titles,
  schema, sitemap, semantic HTML, Core Web Vitals) — **included in every tier** via the
  basic-on-page / SEO-pack rows. **Google Business / local SEO = paid module at all tiers**
  (moved out of Mid/Pro "included"). **Ongoing SEO campaigns / link building / ranking
  guarantees = explicitly out of scope, all tiers**, disclosed honestly and referred out.
  Rationale: provider is not an SEO specialist; owning only the objective, checklist-able,
  AI+dev-deliverable layer keeps promises honest (no "hidden overpromise") while still
  beating cheap sites that skip the foundation. Three SEO layers for reference:
  (1) technical/on-page = owned; (2) local (Google Business) = paid module;
  (3) ongoing/off-page campaigns = out, partner/refer.
- **2026-07-18 — v3 (content honesty).** Renamed the "done-for-you content pack" to
  **"AI-generated + verified content"** across §5 and the §4 matrix. Rationale: the
  provider does NOT hand-write copy — copy is generated + analyzed + verified via the AI
  pipeline (same as buzzards_soft_web's own copy). "Done-for-you / za Ciebie" is honest
  as an *effort* descriptor (client does none of it) but must never imply human
  copywriting — that would contradict the AI-native brand and mislead. Value = client
  neither writes, prompts, nor verifies; transparency about AI is the selling point.
