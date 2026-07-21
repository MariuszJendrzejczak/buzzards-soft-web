# Live session (Chrome) — scratch, overwrite-allowed
dev url: http://localhost:3000
note: root / is 404 by design (output:"export", no middleware redirect) — use /pl | /en | /sv
task: visual review + polish of the NEW offer subpage /web-pages-offer (StoryBrand/SB7 rewrite:
  hero · problem · guide · plan · proof · includes · pricing · modules · ownership · faq · quote),
  freshly landed this sprint (feature/client-web-offer, commits ecaa861/c1a610a/f07eeac). PL first.
route under review: /pl/web-pages-offer
mode: LIVE — chrome-devtools MCP tools callable this session (console/network/snapshot).
last action: full reload (JSON message edit — ownership + includes.hosting) — console clean.

env recovery just done:
- prior-session orphan next dev (PID 12448) was serving :3000 but its stdout wasn't ours →
  killed it, started a fresh `npm run dev` I own for compile-error visibility.
- Recurring risk: orphaned next-server on the port; if 500s return, kill the PID holding
  :3000 and restart; rm -rf .next only if cache is corrupted.

recent edits:
- messages/pl.json offer.* — killed the "na własność" repetition (meta.description,
  hero.subheading, problem.mineBody, includes.hosting) — ownership now lives in hero
  heading (promise) + ownership section (payoff) only.
- messages/pl.json — fixed the factually-wrong domain claim: faq.domain answer +
  includes.hosting + pricing.rowLabels.base now say help/config is in the price,
  domain COST (~50-90 zł/rok) is the client's (was "zakup i konfiguracja w cenie").
- ~/.claude/copy-standard/voice-gap-test.md (v2) + voice-charter.md (v2) — hardened
  the copy standard so the copywriter/skills won't repeat these: new Claim-precision
  dimension + whole-page repetition sweep (per-section scoring couldn't see the echo).
  NOTE: pl.json en/sv NOT yet updated to match — EN/SV still carry the old ownership
  echo + domain wording. Re-sync locales before landing/PR.
- copy-standard hardened (user req: whole-page control + facts input): framework-spine.md
  §9 (page = unit of quality, claim ledger, whole-page consolidation pass; + facts oracle),
  skill + copywriter agent house-rules updated to require both. NEW canonical facts sheet:
  context/foundation/offer-facts.md (seeded from shipped copy + HC1; has ⚠ CONFIRM items:
  promo end date, hosting-free scope, domain-config module vs base, timeline).
- generate-professional-copy-pl SKILL process redesigned (user req): step 2 is now a
  /plan-style facts INTERVIEW that BUILDS offer-facts.md from the page walkthrough (asks
  like /plan; autonomous agent banks instead); step 1 builds whole-page inventory+ledger;
  new step 6 = whole-page consolidation pass; new "Invocation from /plan" contract (skill
  is callable as a /plan sub-step). Voice-gap-test now 11 dims (added Claim precision).
  TODO (separate): wire /plan itself to call the skill — not done yet, only the contract.
- IN PROGRESS: paragraph-by-paragraph human review of /pl/web-pages-offer, section by
  section down the SB7 spine. Flow: USER writes the copy, Claude fixes PL grammar/ortho +
  proposes light refinements; this doubles as the input feed for the copywriter skill.
  DONE — HERO (landed in pl.json offer.hero): eyebrow unchanged; heading → "Profesjonalna
  strona zaprojektowana dla Twojej firmy" (user picked variant B); subheading → user's
  paragraph, corrected ("twoją"→"Twoją"; "wspomaga się AI"→"wspomagam się AI"; then
  "proces tworzenia"→"W trakcie pracy" to kill the tworzę/tworzenia adjacent-root echo).
  Hero CTAs REMOVED (offer-hero.tsx) per user (reads top-to-bottom, no jumps); ctaPrimary/
  ctaSecondary keys parked in pl.json (unused, still i18n-parallel). NOTE: meta.description
  (line ~686) still "pod Twoją firmę" + "profesjonalną" H1↔subheading echo — defer to
  consistency pass (user didn't decide the echo).
  DONE — PROBLEM section fully reworked: heading "Czego możesz się po mnie spodziewać" →
  "Dla kogo skierowana jest ta oferta"; the 3 cards (agency/generator/mine Title+Body)
  DROPPED (user confirmed) and REPLACED with 3 prose paragraphs body1/body2/body3
  (who / how / promise split). Component offer-problem.tsx rebuilt: card grid →
  heading+paragraphs (mirrors offer-guide.tsx styling, max-w-3xl). AI-price claim now
  named ONCE here (body2), full pitch stays in guide.body2 (name-here → explain-in-guide
  bookend, since problem renders before guide).
  ⚠ LOCALE DEBT: en.json/sv.json offer.problem STILL have old keys (agencyTitle… mineBody);
  pl.json now has heading/body1/body2/body3. Key parity BROKEN → i18n-completeness test
  will fail + /en /sv will error on t("body1"). Must restructure en/sv offer.problem
  (transcreate) before build/test/PR. Same for the parked hero CTA keys if we drop them there.
  COPY-STANDARD (~/.claude): banked this approved rewrite as the corpus seed —
  NEW file copy-standard/exemplars-pl.md (Exemplar 001, annotated before→after +
  reusable "assign one job per paragraph" pattern). Wired as the 6th contract into
  SKILL.md (generate-professional-copy-pl) + agents/copywriter.md, and pointed at from
  voice-gap-test.md §Corrections-as-data. Dim count updated eleven→twelve everywhere.
  DONE — GUIDE section fully rebuilt as a 6-step process flow (user co-authored, meaty).
  pl.json offer.guide: heading kept, NEW keys intro + steps.{conversation,mockup,content,
  build,review,publish}.{title,body}; old body1/body2/proof* + the warsztat link REMOVED
  (user OK — linked to the dev workflow). New order: Rozmowa → Makieta na żywo (live page on
  placeholders, comes early = differentiator) → Treść i materiały (parallel; content is
  client's "co do zasady", missing → we find a route incl. paid external designer add-on) →
  Budowa i testy → Odbiór i poprawki (rounds DEPEND ON PACKAGE, ~2–4, no "aż wynik Ci
  odpowiada") → Hosting/domena/publikacja. Component offer-guide.tsx rewritten: prose →
  numbered vertical rail flow (StaggerGroup ol, brand number badges 1–6 + lucide icon per
  step + gradient connector), server component, max-w-3xl. Console clean.
  AI-honesty lives in guide intro; AI-price mention stays a single glance in problem.body2.

  BIG STANDARD/FEEDBACK CHANGES THIS TURN (owner corrections during guide review):
  - ⛔ NEGATION-CONTRAST MARKETING = zero tolerance (owner: "pisałem milion razy"). Recorded
    in 3 places: voice-charter.md §2 (loud owner-hard-rule callout + exception-2 RETIRED),
    ban-list-pl.md (family: `X, a nie Y` / `Nie X — Y` / `bez X, bez Y` + mandatory negation
    sweep), project memory no-negation-marketing.md. Also FIXED the already-shipped offender
    problem.body1 ("…a nie rozbudowanego serwisu" → "Jeśli to brzmi jak Twój przypadek…").
  - "dla firmy/kogoś" > "na firmę/kogoś" (2–3rd correction): ban-list-pl.md §K + memory
    prefer-dla-over-na.md.
  - no-infantile-tone.md memory ("błagam nie infantylnie").
  - MEMORY.md index created (3 feedback entries).
  offer-facts.md: process 3→6 steps, live-mockup-first, content-ownership refined, rounds
  depend on package (~2–4), CMS self-edit = FUTURE paid add-on that doesn't exist yet
  (owner must build the panel) — all appended w/ superseded pointers.

  ⚠ LOCALE DEBT (growing): en.json/sv.json now out of parity on BOTH offer.problem AND
  offer.guide (old keys vs new intro/steps.*). Plus parked hero ctaPrimary/ctaSecondary.
  Must transcreate + restructure en/sv before build/test/PR.
  DONE — removed the now-DUPLICATE `plan` section ("Od rozmowy do publikacji, w trzech
  krokach") — the new 6-step guide flow supersedes it. Unwired <OfferPlan/> + import from
  page.tsx, deleted components/sections/offer/offer-plan.tsx, and removed offer.plan from
  ALL THREE locales (pl/en/sv) so i18n parity stays intact (clean removal, no new debt).
  Page order now: hero → problem → guide → includes → pricing → modules → ownership → faq
  → quote. Console clean.
  DONE — INCLUDES section expanded via /generate-professional-copy-pl skill (artifact:
  context/slices/client-web-offer/includes-expanded-pl.md, VGT all 12 MATCHED). Landed:
  6 item bodies rewritten (FAB feature→benefit, meaty) + 2 NEW cards support + security
  (owner-confirmed facts: support = DURING-project only; security = SSL + Google infra only).
  SSL MOVED from hosting → security (Rule of One). Order in ITEM_KEYS: mobile, seo, contact,
  support, content, hosting, security, gdpr. support+security keys added to pl/en/sv (parity
  GREEN — 8 items each, validated). Also cut "techniczne podstawy pod Google" from
  guide.steps.build (SEO now owned solely by includes.seo, per user). offer-facts.md updated
  with the 2 confirmed facts. Console clean.
  ⚠ LOCALE DEBT unchanged-in-shape: en/sv includes ITEM values (mobile..content) are still
  the OLD short versions + en/sv hosting still names SSL (now doubled w/ new security card) —
  full transcreation of the expanded includes still owed before PR (added support/security
  keys are only rough MT for parity). problem + guide en/sv restructure still owed too.
  DONE — PRICING section reworked. Copy: heading "Proste pakiety, jawne ceny" → "Cennik";
  rowLabels.aiContent "Teksty przygotowane pod Twoją firmę" → "Pomoc z tekstami, jeśli nie
  masz swoich" (CONSISTENCY FIX — texts are client's by default per guide/facts; the old row
  promised copywriting in-price); basic.cta/full.cta "Wyceń X" → "Zamów X" (custom stays
  "Porozmawiajmy"). Component offer-pricing.tsx: each card now filters out rows whose cell ==
  "moduł" → packages show ONLY what they include (user: "bez modułów w pakiecie"); base/other
  enumerations KEPT (user OK'd the includes-dup because pricing is a terse spec list, not
  prose). CTA replaced with NEW client component order-button.tsx: on click dispatches
  `offer:order` CustomEvent(pkg) + anchors to #offer-quote; contact-form.tsx gained a
  useEffect listener that prefills the message field via t("orderPrefill",{package}). New i18n
  key contactForm.orderPrefill added to pl/en/sv (parity). Tested live via evaluate_script:
  "Zamów Basic" click → message prefilled + scrolled to form + Basic shows no "moduł". Console
  clean. Consistency check: revisions 2/7 & 4/14 confirmed consistent with guide.
  ⚠ LOCALE DEBT: en/sv pricing.heading + basic/full.cta + rowLabels.aiContent still OLD
  (transcreation debt); orderPrefill added to all 3 (rough MT for en/sv).
  DONE — PRICING package contents REDESIGNED (user: base row stale/redundant vs the 8-item
  includes; section-count framing too dev-ish). New model = cards show only DIFFERENCES:
  removed the "Dla kogo" (audience) row, and dropped the base/aiContent/googleBusiness/
  animations/themeToggle/language rows from the cards. Cards now show: Zakres + Rundy, a
  Full-only "W cenie dodatkowo" box (widoczność lokalna / animacje / tryb ciemny+jasny), and
  a single base-reference line "+ cała baza z «W cenie każdej strony»". Scope reframed to
  SUBPAGES not section counts: basic.pages "Jedna strona (wizytówka)", full.pages "Strona
  główna + do 2 podstron", custom.pages "Ustalany indywidualnie". NEW i18n keys baseReference
  + extrasLabel + full.extras added to pl/en/sv (parity green, validated). offer-pricing.tsx
  rewritten (rows = pages+revisions only; removed included/moduleLabel/filter). Verified
  render via evaluate_script — all 3 cards correct. Console clean.
  ⚠ LOCALE DEBT: en/sv pages values still OLD (section-count wording) + earlier pricing debt;
  new keys are rough MT. Unused JSON keys left in place (audience, base, aiContent, module
  rowLabels) — harmless, reversible.
  DONE — OWNERSHIP section reworked via /generate-professional-copy-pl (artifact:
  context/slices/client-web-offer/ownership-pl.md, VGT all 12 MATCHED). Landed in pl.json
  offer.ownership: heading "Co zostaje u Ciebie" → "Własność i koszty" (user picked opt 1,
  less kumpelski); limitsHeading "Czego oferta nie obejmuje" → "Granice oferty"; body +
  both limits (seo/commerce) rewritten affirmatively (killed the two negation-first limit
  lines "…nie prowadzę" / "Nie mieszczą się…"). TWO owner facts changed (→ offer-facts.md,
  rev 2026-07-21): (1) domain range widened 50–90 → "zwykle od 50 do 200 zł rocznie zależnie
  od końcówki" (owner: domeny do ~200 zł); (2) hosting free-tier ceiling quantified — Firebase
  Hosting Spark VERIFIED vs official docs (10 GB stored + 10 GB/mo transfer) → client-facing
  "spokojnie obsługuje stronę-wizytówkę i kilka tysięcy odwiedzin miesięcznie", landed in
  includes.hosting (Rule of One — hosting's home; also removed its duplicated domain-cost
  "płacisz tylko za własną domenę" line). Console clean.
  ⛔ OWNER HARD RULE landed mid-review (ownership.body): the portability closer was rejected
  TWICE — "…zabierasz całość i działasz dalej" (infantile) then "…możesz przenieść stronę do
  innego wykonawcy lub dostawcy…" (ANTI-ADVERTISING). Owner: ownership YES, any "you can
  leave / switch vendor" message NEVER. Final body affirms ownership + ends on cost, no
  migration sentence. Rule recorded EVERYWHERE: voice-charter §2 (v4 hard rule + retired the
  old "gdy odejdziesz→zabierasz całość" example) · ban-list §L (v5) · copywriter agent +
  generate-professional-copy-pl SKILL house-rules · memory no-migration-messaging (+MEMORY.md)
  · offer-facts.md (fact kept, flagged "never a copy message"). Also §G1/no-infantile-tone for
  the earlier "działasz dalej" flag. Console clean.
  ⚠ LOCALE DEBT: en/sv ownership.heading/limitsHeading/body/limits.* + includes.hosting still
  OLD (values only; keys all unchanged so i18n parity stays GREEN). Transcreation owed pre-PR.
  DONE — OWNERSHIP fully reviewed (heading/limits/body all landed; console clean).
  DONE — FAQ reworked (live). (1) `duration`: REALIZATION time per package (Basic kilka dni–
  ~tydzień, Full ~1–2 tyg, większe osobno) as main content; SEPARATE disclaimer that the
  START may slip with backlog ("obłożenie / zlecenia w kolejce"); dokładny czas realizacji na
  1. spotkaniu. (duration vs start kept distinct per owner correction 2026-07-21.)
  (2) `texts` + `logo` MERGED → new `materials` ("Jakie materiały muszę przygotować?"),
  answered per established facts (materiały klienta co do zasady; brak → rozwiązanie razem,
  dojrzale; grafika = osobna dziedzina, 3 drogi AI/stock/designer-add-on, koszt klienta;
  BEZ negacji "nie grafikiem", BEZ polecania SEO). FAQ set 7→6. (3) Consistency: faq.domain
  koszt 50–90 → 50–200 zł (match ownership). (4) `selfEdit` reframed → question "A co z
  późniejszymi zmianami na stronie?"; answer: rundy dopracowania wliczone, zmiany PÓŹNIEJ =
  usługa płatna wg zakresu, ALBO jednorazowo dokupić dostęp do panelu CMS (samodzielna edycja
  wszystkich treści). ⚠ owner DECISION 2026-07-21: CMS panel now offered in copy (retires the
  "keep CMS out of copy" facts flag) — BUT panel BUILD TASK still open (must exist before an
  order is fulfilled); recorded in offer-facts.md. COUPLED CHANGES same commit: component
  OFFER_FAQ_KEYS (7→6), tests/unit/offer-faq.test.tsx (count + assertions moved logo→materials
  incl. affirmative guards), en/sv materials transcreated (parity green), namespace-contract.md
  v3 revision, offer-facts.md (per-package timeline + availability + first-meeting estimate).
  offer-faq.test.tsx GREEN. Console clean.
  ⚠ i18n-offer-completeness STILL RED — but from PRE-EXISTING debt (en/sv offer.problem.* old
  agency/generator/mine keys + guide), NOT from FAQ; diff shows only offer.problem.* rozjazd.
  FAQ merge is parity-clean across pl/en/sv.
  ⚠ LOCALE DEBT (values): en/sv duration answer still OLD (key unchanged); en/sv materials +
  ownership + includes.hosting are rough MT. Full transcreation + problem/guide en/sv
  restructure still owed pre-PR.
  DONE — FAQ TRIMMED: removed `monthly` ("Płacę co miesiąc?") + `domain` ("Pomożesz z domeną?")
  — both redundant with ownership (płacisz raz + koszt domeny). FAQ set 6→4 (duration ·
  materials · selfEdit · gdpr). pl+en+sv removed together (parity kept), OFFER_FAQ_KEYS +
  offer-faq.test.tsx count 6→4, test GREEN, namespace-contract v4. Console clean.
  DONE — FAQ: gdpr made professional ("Czy strona jest zgodna z RODO?" + 2 zdania, scoped do
  wizytówki+formularza, nie blankietowo). ADDED `security` ("Czy moja strona jest bezpieczna?"
  — SSL/HTTPS + infra Google, BEZ backupów/monitoringu per facts). FAQ set 4→5 (duration ·
  materials · selfEdit · security · gdpr). pl+en+sv parity, OFFER_FAQ_KEYS + test count 4→5,
  test GREEN, namespace-contract v5. security = 2. touchpoint; feature home stays
  includes.security. Console clean.
  DONE — QUOTE (CTA) reworked: removed the "odezwę się z wyceną" push. New flow per owner
  (2026-07-21): contact form → reply to arrange a CALL / online meeting → quote ONLY AFTER
  that talk (unhurried). heading "Napisz do mnie, czego potrzebujesz."; intro leads with the
  call/meeting, defers wycena. Values only (keys pinned by offer-quote.test.tsx, read
  dynamically → test GREEN). offer-facts.md Contact updated. Console clean.
  NEXT: user reviews quote live → poprawki; only `modules` left on the spine (⚠ external
  designer prices to set). Then whole-page consolidation + en/sv transcreation before PR.
  DONE — MARKET RESEARCH saved (no site changes): context/slices/web-copy-generation/
  market-research-offer.md — 6 parallel web-research passes (PL + int'l: solo-dev offers, AI
  positioning, pricing, SB7 narrative, FAQ/objections, process) + section-by-section challenge
  of current copy via copy-standard + 7 PROPOSED skill/agent rules (NOT yet wired) + concrete
  site opportunities (NOT applied). PENDING owner decisions logged in the doc §F: (1) bank soft
  reference of current copy, (2) wire the 7 rules into charter/ban-list/spine, (3) accept
  AI-affordability positioning, (4) schedule §E site tweaks (Full badge, custom floor+triggers,
  promo date visibility, timeline "od kompletu materiałów"). Owner said "na razie nie zmieniamy
  nic na stronie" → site untouched.

carried-over live notes (still pending, from prior sessions):
- PROD DEPLOY BLOCKED ON USER: GitHub Actions has NO secret
  FIREBASE_SERVICE_ACCOUNT_BUZZARDS_SOFT_WEB (Firebase Hosting SA JSON). `gh secret list`
  empty. Fix via `firebase init hosting:github` or add manually. Once present: rerun the
  failed Actions run or push to trigger firebase-hosting-merge.yml.
- KNOWN E2E RED (out of scope for offer): portfolio-honeti/home/regression-routes + smoke
  specs stale vs revamped portfolio content on main (last touched f8336c2). Separate cleanup.
