# Offer facts — canonical source of truth for `/web-pages-offer` copy

> **The facts oracle** (see `~/.claude/copy-standard/framework-spine.md` §9b). Every
> factual claim in the offer copy — PL/EN/SV — must trace to this file. If a fact
> isn't here, it does **not** go in the copy: it goes to `## Open Questions`, never a
> guessed number. When a fact changes, change it **here first**, then regenerate the
> copy. The copy is never the de-facto source of truth.
>
> Seeded 2026-07-19 from the shipped `messages/pl.json`, the HC1 gate decisions
> (`context/slices/web-copy-generation/change.md`), and today's live corrections.
> Items marked **⚠ CONFIRM** need the owner's explicit sign-off.

## Positioning (the "why")

- Buzzards Soft is **one developer** who builds small-business / freelancer websites,
  working AI-augmented and **saying so openly**. AI = faster + cheaper; a human decides,
  checks, and is accountable for quality. Never "made by AI" — always "an expert who
  wields AI".
- The "third way" between an **agency** (nice + bespoke, but 4–5k zł and weeks of
  waiting) and an **AI generator** (a few hundred zł, but a template like a thousand
  others, and you only keep it while you pay the subscription).
- Proof = **site-as-proof**: this very page was built through the exact process being
  sold. Under-the-hood anchor: `/#warsztat`. No client screenshots / testimonials exist
  yet (do not invent them).

## Packages & pricing (net / "netto")

| Package | Base price | Promo price | For whom | Scope | Revisions |
|---|---|---|---|---|---|
| **Basic** | 1299 zł | **999 zł** | wizytówka / prosta oferta | 1 strona, do 5 sekcji | 2 rundy / 7 dni |
| **Full** | 2499 zł | **1999 zł** | firma, która chce być widoczna i pozyskiwać kontakt | do 8 sekcji + 2 podstrony | 4 rundy / 14 dni |
| **Większy projekt** | wycena indywidualna | — | sklep, custom od zera, złożone integracje | wg potrzeb | ustalane |

- **All prices are net (netto).**
- **Promo:** the promo price applies to the **base price** and runs **until end of
  August** (*do końca sierpnia*), possibly extended later. The end date must stay
  **visible on the page**. The discounted price is labelled **"cena promocyjna"** (never
  "cena startowa"). **The offer is one fixed, permanent offer** — no "launch window" /
  "okno oferty" language anywhere. ✓ CONFIRMED 2026-07-19: *do końca sierpnia* still holds.

## What's included in every site (base)

- Fast, mobile-first site (works on every phone).
- Contact form + click-to-call.
- Technical SEO foundation.
- **Free hosting** — a **free Firebase package on the CLIENT's own account** (✓ CONFIRMED
  2026-07-19). Genuinely free-to-client and formally on the client's account, so
  "darmowy hosting" is true **and** consistent with "you own everything / take it all with
  you". Copy may say *"darmowy hosting na Twoim koncie"*; keep "Firebase" out of the
  client-facing copy (dev jargon) — name it only here in the facts.
  - **Free-tier ceiling (Firebase Hosting Spark, ✓ verified 2026-07-21 against the
    official Firebase docs): 10 GB stored + 10 GB/month CDN→user transfer.** For a static
    wizytówka (~2–3 MB per full pageview) that comfortably covers **a few thousand visits
    per month**. Client-facing translation (the only form allowed in copy):
    *"spokojnie obsługuje stronę-wizytówkę i kilka tysięcy odwiedzin miesięcznie"*. Do
    **not** print raw GB figures or "Firebase" in client copy; above the free tier the
    project would move to the paid Blaze plan (out of scope of the base offer).
- **Domain: help choosing/buying + configuration is included; the domain registration
  fee (zwykle 50–200 zł/rok, depending on the TLD — .pl, .com, etc.) is the CLIENT's
  cost, paid to the registrar.** Domain is registered in the client's name.
- SSL certificate.
- GDPR/RODO: cookie banner + privacy policy.
- Copy written and checked through the process, if the client doesn't have their own.

## Add-on modules (one-off, net)

| Module | Price |
|---|---|
| Widoczność lokalna (Google Business, Mapy, opinie) | +250 zł |
| Animacje i efekty | +400 zł |
| Tryb ciemny i jasny (przełącznik) | +400 zł |
| Dodatkowy język | +400 zł / język |
| Samodzielna edycja treści (płatna raz, bez abonamentu) | +700 zł |
| Zbieranie leadów (lista mailingowa albo arkusz zgłoszeń) | +400 zł (oba +550) |
| Rezerwacje i kalendarz | +350 zł |
| Dodatkowa podstrona | +300 zł |
| Blog i aktualności | +700 zł |
| Śledzenie konwersji pod reklamy | +250 zł |
| Konfiguracja domeny i firmowej poczty | +150 zł |

✓ CONFIRMED 2026-07-19: the +150 zł buys the **firmowa poczta e-mail on the client's
domain** (e.g. kontakt@twojafirma.pl). Base domain **configuration is already included**;
this module adds the business-email side only. Copy/module name must not imply that domain
config itself costs +150 — rename toward *"Firmowa poczta na Twojej domenie"*.

## Ownership

- Domain, hosting, code, content, and accounts are registered to the client's name /
  accounts. **Pay once — no subscription.** The only recurring cost is the client's own
  domain (zwykle 50–200 zł/rok to the registrar, depending on the TLD).
- ⛔ **The client legally owns everything and could leave — this FACT is true, but it must
  NEVER appear in copy as a "you can move to another contractor/provider" message**
  (owner hard rule 2026-07-21, anti-advertising — see `voice-charter.md` §2, `ban-list-pl.md`
  §L, memory `no-migration-messaging`). Copy affirms **ownership** only ("cała strona jest
  Twoją własnością… płacisz raz") and stops there; no migration / portability / lock-in angle.

## Process & timeline

- ~~**3 steps:** (1) Rozmowa; (2) Treść i projekt; (3) Publikacja.~~ *(Superseded
  2026-07-20 — see Revision log: process is now **6 steps**, live-mockup-first.)*
- **6 steps (2026-07-20):** (1) **Rozmowa** — scope + who supplies what; (2) **Makieta na
  żywo** — a real, clickable page on placeholder content, shown fast so the client reacts
  to a live layout early (not a static wireframe tool); (3) **Treść i materiały** — runs in
  parallel with the mockup; (4) **Budowa i testy** — real content poured in, polish,
  responsive + technical-SEO checks; (5) **Odbiór i poprawki** — bounded **2–4 rounds**;
  (6) **Hosting, domena i publikacja**.
- **Timeline:** usually a few days to ~2 weeks, depending on the package. ✓ CONFIRMED
  2026-07-19: the *kilka dni–2 tygodnie* range is still accurate.
  - **Realization time per package (2026-07-21):** Basic ≈ a few days to ~1 week; Full ≈
    ~1–2 weeks; larger builds arranged separately. This is the **work duration** once the
    build starts (orientation, not a hard commit).
  - **START date is separate — disclaimer.** The realization duration is one thing; **when
    work can start** depends on current backlog ("obłożenie / ile mam zleceń w kolejce"), so
    the start may be pushed out. Keep these two **distinct** in copy: per-package duration
    first, then the start-date caveat as an add-on note.
  - **The precise realization estimate is given at the first meeting**, not on the page.
- ~~Client may supply their own texts; otherwise Buzzards prepares them.~~ *(Refined
  2026-07-20 — see Revision log.)* **Texts, logo and photos are the client's by default
  ("co do zasady po stronie klienta").** If something is missing, Buzzards does not leave
  the client alone — together they find a route (help refining copy, AI graphics, stock,
  or the paid external designer add-on). Buzzards does **not** casually ghost-write all
  copy as a matter of course.

## Honest limits (what is NOT included)

- **Graphics/logo/photos are not part of the build** — Buzzards is a **developer, not a
  graphic designer**. Honest help: point the client to three routes — AI design, paid
  stock, or a recommended human designer — each an **extra cost on the client's side**.
  Applies to both logos and photos. *(Partially superseded 2026-07-20 — see Revision log:
  logo + bespoke UX/site design are now two **sellable external add-ons** via a trusted
  freelancer, still extra cost on the client's side. Photos stay client-supplied.)*
- **SEO:** a solid technical foundation is included; **ongoing ranking campaigns / a
  guarantee of #1 in Google are NOT** — that's a separate continuous service. **Owner does
  NOT want to refer/recommend an SEO specialist** (2026-07-21: "nie chcę się w to bawić").
  Copy just **gently notes** ongoing positioning is outside scope ("poza tym, czym się
  zajmuję") — no referral, no "polecę specjalistę", no pointing elsewhere.
- **Shops, complex integrations, a real CRM system** are done under **individual
  quote**, not in Basic/Full.

## Contact

- Contact form → Buzzards replies **to arrange a call or online meeting** (not with a quote).
  The **quote comes only after that conversation** — unhurried, once the full picture is
  clear. Do **not** frame the CTA as "send needs → get an instant quote" (owner, 2026-07-21:
  "nie odpiszę z wyceną… wycena dopiero potem, nie przyspieszajmy"). No obligation.

## Open / to-confirm (owner is the authority)

All four open items were resolved with the owner on **2026-07-19** — no `⚠ CONFIRM`
remains. Resolutions folded into the sections above.

1. ✓ Promo end date — *do końca sierpnia* still current.
2. ✓ Hosting — free Firebase package on the **client's own account** (not "year one";
   formally the client's, so consistent with full ownership).
3. ✓ Domain-config module (+150) — buys the **firmowa poczta e-mail**; base already
   includes domain configuration.
4. ✓ Timeline — *kilka dni–2 tygodnie* still accurate.

## Revision log

- **2026-07-19 — confirmations.** Owner resolved all four `⚠ CONFIRM` items during the
  offer-copy consistency pass (`context/slices/web-copy-generation/offer-consistency-pass-pl.md`):
  promo end date holds; hosting is a free Firebase package on the client's own account;
  the +150 module is business email (domain config is in the base); timeline range holds.
- **2026-07-20 — external design add-ons (policy change; owner decision, live review).**
  Owner extended the offer with **two paid external design services**, sold as add-ons but
  **delivered by a trusted external freelancer**, not produced by Buzzards:
  1. **Logotyp** — a logo for the client's company.
  2. **Design/UX strony od zera** — bespoke site design by a UX designer (Buzzards is a
     developer, *not* a UX designer, and says so openly).
  Both are **extra cost on the client's side**; Buzzards positions as **curator + integrator**
  ("spinam to w całość"), not the producer. Positioning guardrail (owner's concern —
  avoid sounding amateur): the **base build is a deliberate, professional standard on
  proven layout patterns** — the add-on is an *elevation* for clients wanting a unique
  identity, **never** framed as fixing a deficient base. Honesty-as-strength line agreed:
  *"Wolę powiedzieć wprost, co robię sam, a do czego zapraszam specjalistę."*
  - **Page placement:** glancing mention only in the `guide` process flow (step 2); full
    add-on offer lives in `modules`/`pricing`.
  - ⚠ **CONFIRM — pricing of both add-ons** is not set. Owner "muszę ustalić" — get the
    real numbers from the freelancer before any price lands in copy. Market orientation
    only (NOT a quote): logo ~0–200 zł AI/template · ~100–500 zł fiverr-tier · ~500–2000 zł
    solid freelancer · 2000–8000+ zł studio. Until confirmed, copy names the add-on but
    **states no price**.
  - ⚠ CONFIRM — one freelancer for both, or separate logo vs UX people? (owner undecided.)
- **2026-07-20 (b) — process refinements (owner, live review).**
  - **Live-mockup-first.** Because code is AI-assisted, the mockup is built **as a real,
    clickable page on placeholders**, not designed in a wireframe tool — and it comes
    **early** (differentiator: the client sees a live page fast). Frame affirmatively
    (see [[no-negation-marketing]] — do NOT say "not a flat wireframe").
  - **Content ownership.** Texts/logo/photos are the **client's by default**; if missing,
    "szukamy rozwiązań razem" — mature partnership, **not** infantile hand-holding
    ([[no-infantile-tone]]). Buzzards no longer positioned as default copy ghost-writer.
  - **Revision phase is bounded, and the round count DEPENDS ON THE PACKAGE** (range
    ~2–4). Not unlimited. Do **not** write "aż wynik Ci odpowiada" / "until you're happy"
    — that contradicts the fixed rounds. Sell it as *predictable structure* (client knows
    up front how many rounds their package includes), affirmatively.
  - **Included support = DURING the project only** (confirmed 2026-07-20). Full
    availability + consultation at every stage of the build (questions, advice, joint
    decisions). Post-launch support is arranged **separately** — do NOT promise ongoing
    care in the base copy.
  - **Security we can claim = SSL/HTTPS + Google (Firebase) infrastructure** (confirmed
    2026-07-20). Encrypted connection + the padlock; site sits on Google's proven
    backend. Do NOT claim backups, monitoring, or "static-architecture" hardening in copy
    unless later confirmed. Note: SSL now OWNED by the `includes.security` card (moved out
    of `includes.hosting` to keep Rule of One).
  - ⚠ **CMS / self-edit is a PAID add-on that does NOT exist yet.** "Pokazuję, jak
    samodzielnie zmieniać treści" applies **only** if the client buys a CMS panel — and
    the owner still has to build that panel. Until it exists, **keep any self-edit / CMS
    promise OUT of the copy.** Bank as a future add-on + build task.
    - **Superseded 2026-07-21 (owner decision, live FAQ review):** owner **chose to offer**
      the CMS/self-edit panel in copy as a purchasable add-on — `faq.selfEdit` now says
      "możesz jednorazowo dokupić dostęp do panelu CMS…" and `modules.items.selfEdit` (+700 zł)
      already lists it. Framing also confirmed: **changes after the bounded "Dopracowanie"
      (revision) rounds are a PAID service, priced by scope**; the CMS panel is the
      self-service alternative. ⚠ **BUILD TASK STILL OPEN — the panel must actually exist
      before any client order is fulfilled.** The "keep out of copy" line above is retired;
      the deliverability risk (panel not built yet) is now a build obligation, not a copy gate.
- **2026-07-21 — domain range widened + hosting free-tier ceiling (owner, live review).**
  - **Domain recurring cost widened `~50–90` → `zwykle 50–200 zł/rok`** (owner: domains
    can run up to ~200 zł depending on the TLD). Updated in *What's included → Domain* and
    *Ownership*. Copy figure lands as *"zwykle od 50 do 200 zł rocznie zależnie od
    końcówki"*.
  - **Hosting free-tier ceiling quantified.** Owner wants the "darmowy hosting" claim to
    name its load limit in client-measurable terms. Firebase Hosting Spark (free) verified
    2026-07-21 against the official docs: 10 GB stored + 10 GB/month transfer → *a few
    thousand visits/month* for a wizytówka. Home = `includes.hosting` (Rule of One; hosting
    feature lives there). Raw GB / "Firebase" stay out of copy.
