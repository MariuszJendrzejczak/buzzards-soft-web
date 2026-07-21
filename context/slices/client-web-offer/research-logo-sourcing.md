---
date: 2026-07-20T13:00:00+02:00
researcher: Claude (Opus 4.8) + Mariusz
git_commit: 50df0b7ad0afe939c254633687445b5c6cfc1f70
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Sub-contracting logo design — freelancer cost (PL), resale model, and the offer's 'nie mam logo' handling"
tags: [research, offer, logo, branding, freelancer, pricing-pl, ip-law, resale]
status: complete
last_updated: 2026-07-20
last_updated_by: Claude (Opus 4.8)
---

# Research: Logo sourcing — freelancer cost + resale model

**Date**: 2026-07-20T13:00:00+02:00
**Researcher**: Claude (Opus 4.8) + Mariusz
**Git Commit**: 50df0b7ad0afe939c254633687445b5c6cfc1f70
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

How much does it cost to commission a **logo** from a freelancer on the PL market? I want to sub-contract logo design for the end clients of our web-pages offer but don't know the price brackets. Research should give real rates (junior / mid / studio, platforms like Fiverr / Behance / OLX / Useme), a resale model for our offer (module / markup), and connect it to the offer's open "nie mam logo" point.

## Summary

**Buy-in cost — the number you asked for:** the realistic **sweet spot for a micro-business logo is ~600–950 zł brutto** from a mid-level PL freelancer who hands over **vector source files + a written rights transfer + a faktura** (anchored by a concrete freelancer cennik, not a blog estimate). Below that, **~80–300 zł** is AI-generator / OLX-gig territory with **real IP risk** (no vector, no rights paper, template/stock reuse). Above it, **2000–8000 zł+** buys studio-grade *identyfikacja wizualna* you don't need to pass through to a 999/1999 zł client.

**Important correction to the premise:** the "nie mam logo" point is **no longer open** — it already has a finalized FAQ answer in the shipped offer (`messages/pl.json:866-868`). Today the offer runs the **honest referral model**: *"Grafika to nie moja działka… podpowiem, jak zdobyć dobre: projekt z AI, płatne zdjęcia stockowe albo polecony grafik. Każda z nich to koszt po Twojej stronie."* So the real question isn't "how do we close it" — it's **"do we upgrade from referral (c) to a paid module (a), and is that worth the legal overhead?"**

**Recommendation:** **keep the current referral stance as the default, optionally formalize a paid "proste logo" path — but only via a clean model.** Concretely:
- **Default (c) "bring your own / referral"** — what's shipped; zero cost, zero IP risk, on-brand honest. Just tighten the file ask (vector SVG/AI/EPS, fallback hi-res transparent PNG).
- **Paid path — prefer (b) pass-through referral** to a vetted designer (optionally with a *disclosed* affiliate fee): the written rights transfer goes **freelancer → client directly**, you never enter the copyright chain.
- **(a) markup module only if** you're genuinely willing to execute **two written rights transfers** (freelancer → you → client), enumerate fields of exploitation, and handle moral rights contractually. The markup is payment for a quality/revisions guarantee in a craft you've publicly said isn't yours — which cuts against the offer's voice.

The one thing you must **not** do at any tier: resell a logo you only hold a **licence** to (or nothing in writing). *Nemo plus iuris* — you can't sell ownership you don't have, and the author can later oppose your client's trademark.

---

## Detailed Findings

### 1. Current state in the offer (codebase) — the point is already closed

- **FAQ answer (shipped)** — `messages/pl.json:866-868`, key `offer.faq.items.logo`:
  - Q: *"A co z logo i zdjęciami?"*
  - A: *"Grafika to nie moja działka — jestem programistą, nie grafikiem, więc logo i zdjęcia nie wchodzą w budowę strony. Nie zostawiam Cię jednak z tym samego: podpowiem, jak zdobyć dobre. Masz trzy drogi: projekt z AI, płatne zdjęcia stockowe albo polecony grafik. Każda z nich to koszt po Twojej stronie, a ja pomogę Ci wybrać tę, która pasuje do Twojego budżetu."*
  - FAQ key registered in [`components/sections/offer/offer-faq.tsx:11-19`](components/sections/offer/offer-faq.tsx) (`OFFER_FAQ_KEYS` includes `"logo"`).
- **No logo/branding module** exists. Current modules ([`components/sections/offer/offer-modules.tsx:5-17`](components/sections/offer/offer-modules.tsx)): `localVisibility` +250, `animations` +400, `themeToggle` +400, `extraLanguage` +400/jęz., `selfEdit` +700, `leads` +400 (oba +550), `booking` +350, `extraPage` +300, `blog` +700, `conversionTracking` +250, `domainEmail` +150. A `logoDesign` module would slot here (module row = name + `+X zł` in `font-mono text-brand`).
- **Not included in any tier** — `offer-includes.tsx` item `content` (`messages/pl.json:739`, *"Spójny, estetyczny wygląd dopasowany do Twojej marki"*) is design *aesthetic*, not a logo asset. `offer-pricing.tsx` tiers carry no branding row.
- **Prior open-question, now resolved** — `context/slices/client-web-offer/offer-page.md:187` had *"Nie mam logo / zdjęć? [do domknięcia — zakres: co dostarczasz Ty, co jest modułem/wyceną.]"*; `concept.md` (superseded §4) had *"logo design → out of scope (client provides or module)"*. The shipped FAQ closes it as **referral, cost on client**.

**So:** adopting a paid logo path is a **new business-line decision / slice**, not a fix to an unfinished item.

### 2. Freelancer logo cost brackets (PL, 2025–2026) — cited

| Tier | Bracket (PLN) | What you get | IP/resale safety |
|---|---|---|---|
| **Gig / AI floor** | **~80–300 zł** (AI $20–65 ≈ 80–260; OLX "logo w 24h" 150 zł) | 1 concept, flat PNG/JPG, few/no revisions, often no vector | ❌ often no rights paper, no source; AI output may not be copyrightable → **can't cleanly resell** |
| **Mid freelancer (sweet spot)** | **~600–1000 zł** (Paula Grafik cennik: 600/800/950 zł brutto) | 2–4 concepts, 2–3+ revisions, **AI/SVG/EPS source**, rights transfer included, VAT faktura | ✅ resaleable, rights-clean |
| **Experienced + basic guidelines** | **~1000–2500 zł net** (avangardo 2000–8000; studiokreatywnychstron 550–1650 net avg) | multiple routes, księga znaku add-on (500–900 zł) | ✅ |
| **Studio / full identyfikacja** | **~2000–8000 zł+** (agency 8000–15 000–40 000 zł) | research, brand book, applications | ✅ (overkill for pass-through) |

- **Survey (grafmag 2024):** for *logo + simple brand guidelines*, most common designer bracket **2000–3499 zł netto (23%)**; business cards/letterhead **200–499 zł each**. Doesn't split freelancer vs studio, so its mode reads high for a bare solo logo.
- **Price drivers (cited):** # concepts & revisions (Paula Grafik 600→950 as concepts 2→4); **rush fees** (Avangardo +30% for 7-day, +50–100% for 48h); **vector source handover** (the usable-vs-throwaway line); **brand book** separately priced; **rights transfer/exclusivity** (present mid-tier+, absent gig-tier).

### 3. Platforms — which is clean for a business buyer

- **Useme (recommended for a faktura + rights buyer):** Polish escrow/invoicing intermediary — contracts the freelancer, **issues your business a VAT faktura even if the freelancer has no firm**, and passes **copyright freelancer → Useme → your client** with a one-click **protokół przekazania praw autorskich** at settlement. Cleanest single channel for resale/pass-through.
- **A designer's own cennik with faktura + rights** (e.g. Paula Grafik) is equally clean and skips the platform fee.
- **Fiverr:** cheapest catalog but **USD** pricing, seller −20% + buyer ~5.5% + $2 small-order fee; **no PL VAT faktura** in the form a business needs; rights per-gig — extra diligence.
- **OLX / Fixly:** informal, cash, real 150 zł listings, but **no contract / no rights / no vector / no faktura** by default — avoid for resale.
- **AI generators (floor):** Looka $20 PNG / $65 vectors; Brandmark $65 for commercial use; Canva SVG on Pro; Fiverr AI $30/$60. Honest limits: **no true uniqueness**, and **AI-only output may not be copyrightable** (no human authorship) → can't guarantee/transfer ownership.

### 4. Resale models + the IP chain (PL law) — cited

**To resell *ownership*, you need a written TRANSFER, not a licence:**
- **Przeniesienie autorskich praw majątkowych** (transfer) vs **licencja** (permission): only a transfer makes you owner and lets you pass rights on. A transfer is by default further-transferable unless barred (**art. 41 ust. 1 pkt 2 upa**); a licence by default **cannot** be sub-licensed without an explicit clause.
- **Form:** transfer requires **forma pisemna pod rygorem nieważności** (**art. 53 upa**) — a scan or email exchange does **not** suffice; needs a handwritten or **qualified electronic** signature.
- **Fields of exploitation:** must be **explicitly enumerated** (**art. 41 ust. 2** + catalogue **art. 50**); unnamed fields stay with the author. Blanket "wszystkie pola" is risky.
- **Moral rights (art. 16 upa)** are **inalienable** — author keeps authorship + integrity rights forever. Handle contractually: author's **undertaking not to exercise** moral rights + **consent to modifications / no attribution**, and these consents should pass to the client (mechanism is a synthesis, not a direct citation — flagged).
- **Trademark** is a separate layer: copyright arises automatically, but **znak towarowy needs UPRP registration**; registering the mark **does not cure** a missing copyright transfer.
- **THE RISK (nemo plus iuris):** if the freelancer gave you only a licence (or nothing in writing), the transfer to you is void → law falls back to a **licence presumption (art. 65 upa)**, and without written form only a *non-exclusive* licence can arise. You then **have no ownership to sell**, the freelancer can license the same logo to others, and **PARP** warns the author can **oppose your client's trademark** or seek its invalidation. Resale needs **two unbroken written transfers: freelancer → you → client** (a faktura transfers nothing).

**Three business models:**
- **(a) Module markup:** white-label markup norm **30–70%** (analogy from web-dev white-label, no logo-specific % source — flagged). At ~800 zł buy-in → add-on ~+1100–1200 zł. Downsides: the markup pays for a quality/revisions **guarantee in a craft you've said isn't yours**, and it drags you into the two-transfer copyright chain.
- **(b) Pass-through / referral:** connect client ↔ vetted designer, rights transfer goes **directly to the client**, you stay out of the copyright chain. Optional *disclosed* affiliate fee. Cleanest legally; less "one-contact" convenience; reputational risk if the designer disappoints (mitigate with a short vetted list).
- **(c) Bring your own logo:** client supplies it; you ask for **vector (SVG/AI/EPS/PDF)**, fallback **hi-res transparent PNG**. Zero cost / risk / rights chain — the baseline the shipped FAQ already assumes.

### 5. VAT / margin for a (likely VAT-exempt) sole proprietor — cited

- **Zwolnienie podmiotowe limit rose to 240 000 zł from 2026-01-01** (many blogs still say 200 000 — confirm with księgowa mid-2026).
- A **nievatowiec invoices the client "zw"** (no VAT), **doesn't charge VAT** on resale even if the freelancer charged 23%, and **can't deduct** that input VAT → the **gross** paid to the freelancer is a **cost**; margin = client price − gross cost, taxed as **PIT** (not on ryczałt, where you can't deduct costs — flagged).
- Logo resale is **not** in the art. 113 ust. 13 exclusion list → doesn't break the exemption; only the 240k threshold matters. **Caveat:** framing the invoice as *doradztwo/strategia* is dangerous — advisory services **lose the exemption entirely**.

---

## Recommendation mapped to your question

| If you want… | Do this | Buy-in | Sell-side |
|---|---|---|---|
| **Zero effort, stay honest (default)** | Keep shipped FAQ (c); tighten file ask to vector + fallback PNG | 0 | 0 (cost on client) |
| **A paid path without legal exposure** | **(b) pass-through** to a vetted designer via **Useme**; optional disclosed prowizja | ~600–950 zł (client pays designer) | prowizja only |
| **A true "+X zł logo module" (a)** | Only with **two written transfers** + enumerated pola eksploatacji + moral-rights clauses; scope = "proste logo", not brand book | ~600–950 zł | +1100–1800 zł line item (markup over buy-in) |

- **Sweet-spot buy-in to quote against: ~600–950 zł brutto** (mid freelancer, vector + rights + faktura, via Useme or own cennik).
- **Never** resell gig/OLX/AI-tier output as "your logo, full rights" — the IP chain won't hold.

## Code References

- `messages/pl.json:866-868` — `offer.faq.items.logo` (shipped referral answer; the "nie mam logo" resolution).
- `messages/pl.json:739` — `offer.includes.items.content` (brand-aesthetic, not a logo asset).
- `components/sections/offer/offer-faq.tsx:11-19` — `OFFER_FAQ_KEYS` (includes `"logo"`).
- `components/sections/offer/offer-modules.tsx:5-17,57-68` — module list + row render (where a `logoDesign` module would slot).
- `components/sections/offer/offer-includes.tsx:10-17` — included items (no logo/branding).
- `context/slices/client-web-offer/offer-page.md:187` — the (now-resolved) "nie mam logo" open question.
- `context/slices/client-web-offer/concept.md` — logo "out of scope (client provides or module)".

## External Sources (live docs)

**Freelancer pricing (PL):**
- https://www.nlogo.pl/ile-kosztuje-logo-w-2025-roku · https://avangardo.pl/ile-kosztuje-logo/ · https://studiokreatywnychstron.pl/blog/ile-kosztuje-logo/ · **https://paulagrafik.pl/cennik-grafika/** (concrete 600/800/950 zł brutto anchor) · https://grafmag.pl/artykuly/ile-kosztuje-logo-ilustracja-i-projekt-strony-przeglad-stawek-za-projekty-graficzne-2024 · https://katarzynawisniewska.pl/ile-kosztuja-uslugi-grafika-freelancera-w-2025-roku-przykladowe-stawki/ · https://www.olx.pl/uslugi/uslugi-reklamowe/q-projektowanie-logo/
- Fiverr: https://www.fiverr.com/resources/guides/graphic-design/logo-design-costs · https://www.fiverr.com/logo-maker/pricing · fees https://iskills.com/blog/fiverr-fee-calculator/
- Useme: https://useme.com/pl/blog/jak-wygladaja-umowy-zawierane-przez-useme,72/ · https://help.useme.com/na-czym-polega-przekazanie-praw-autorskich-i-udzielenie-licencji
- AI generators: https://looka.com/ · https://similarlabs.com/blog/looka-alternatives · https://www.canva.com/ai-logo-generator/

**IP / copyright (PL):**
- Transfer vs licence: https://prakreacja.pl/przeniesienie-licencja/ · art. 41 https://arslege.pl/przejscie-autorskich-praw-majatkowych-umowa-o-przeniesienie-autorskich-praw-majatkowych-lub-umowa-o-korzystanie-z-utworu/k442/a36775/ · art. 50 https://lexlege.pl/ustawa-o-prawie-autorskim-i-prawach-pokrewnych/art-50/ · art. 53 (forma) https://lexlege.pl/ustawa-o-prawie-autorskim-i-prawach-pokrewnych/art-53/ · art. 16 (osobiste) https://lexlege.pl/ustawa-o-prawie-autorskim-i-prawach-pokrewnych/art-16/ · art. 65 (domniemanie licencji) https://czasopismo.legeartis.org/2021/12/domniemanie-udzielenia-licencji-korzystanie-utworow-brak-jednoznacznego-przeniesienia-autorskich-praw-majatkowych/
- Form of contract: https://kancelaria-annastepien.pl/przeniesienie-praw-autorskich-jaka-powinna-byc-forma-umowy/ · resale/two-transfers: https://zastrzezone.pl/kupilem-logo-od-grafika-czyli-jak-poprawnie-przeniesc-prawa-autorskie-do-utworu · https://www.kancelarialech.pl/jak-przeniesc-prawo-autorskie-do-logo-umowa/ · https://predotalegal.pl/umowa-z-grafikiem-na-projekt-logo/
- Moral-rights waiver mechanism: https://mojafirma.infor.pl/prawo-autorskie/ochrona-praw-tworcy/311497,... · https://lookreatywni.pl/baza-wiedzy/wiez-tworcy-z-utworem/
- Trademark: https://uprp.gov.pl/pl/przedmioty-ochrony/znaki-towarowe/... · https://wzoryprzemyslowe-blog.pl/prawa-autorskie-znak-towarowy/ · https://en.parp.gov.pl/component/content/article/77232
- White-label markup: https://kenny.pl/white-label-web-development/

**VAT (PL):**
- https://poradnikprzedsiebiorcy.pl/-limit-zwolnienia-podmiotowego-w-vat · https://www.tpa-group.pl/pl/news/od-2026-r-wyzszy-limit-zwolnienia-podmiotowego-z-vat-... · refakturowanie nievatowca https://poradnikprzedsiebiorcy.pl/-refakturowanie-uslug-przez-nievatowca-dla-podatnika-vat-rozliczenie · https://www.fakturaxl.pl/faktura-od-nievatowca-dla-vatowca-jak-zaksiegowac · exclusions https://www.podatki.biz/artykuly/zwolnienie-podmiotowe-z-vat-nie-dla-prawnika-jubilera-i-doradcy_4_41907.htm

## Architecture Insights

- Adding a logo path is a **copy/business decision**, not a technical one — at most a new `logoDesign` module row in `offer-modules.tsx` + i18n, or a reworded FAQ. No code architecture is affected.
- The offer's honest-boundary voice ("nie obiecuję rzeczy, których nie umiem dowieźć") is **already load-bearing** in the shipped logo FAQ — any paid module must not contradict it (don't imply brand-design expertise).

## Historical Context (from prior changes)

- `context/slices/client-web-offer/offer-page.md:187` — the original "nie mam logo" open question (§Open questions #4), now resolved in the shipped FAQ.
- `context/slices/client-web-offer/concept.md` — logo consistently "out of scope; client provides or module / individual quote".
- `context/slices/client-web-offer/research-payment-terms.md` — sibling research (same slice) on payment terms; the two together cover the offer's remaining commercial-policy open decisions.

## Related Research

- `context/slices/client-web-offer/research.md` — market pricing validation for the website tiers.
- `context/slices/client-web-offer/research-payment-terms.md` — payment-term policy (also touches zaliczka/zadatek + VAT, which recur here).

## Open Questions

1. **Keep referral (c), or add a paid module (a)/(b)?** — a business call. Recommendation: keep (c) default, add (b) pass-through as the paid path; (a) only with proper contracts.
2. **If (a): are you willing to run two written rights transfers** (freelancer → you → client) for every logo? If not, (a) is off the table on IP grounds.
3. **Vetted designer(s)** — who is the "polecony grafik" the FAQ already promises? Line up 1–2 (ideally invoiceable via Useme) before advertising the path.
4. **VAT status confirmation** (shared with the payment-terms research) — determines margin/invoicing mechanics if you resell.
5. **"Wszystkie pola eksploatacji" enforceability** and the moral-rights consent pass-through — flagged as unverified against primary sources; worth a lawyer's eye if you go with (a).
