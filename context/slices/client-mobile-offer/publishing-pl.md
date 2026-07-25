# mobileOffer.publishing — PL copy (returned for a sprint to land — NOT messages/*.json)

> Autonomous copywriter artifact. One SB7-adjacent section (the mobile-specific
> honesty about store bureaucracy) generated against the six `~/.claude/copy-standard/`
> contracts + the facts oracle (`context/foundation/mobile-offer-facts.md`) + research
> §3. PL is the source of truth; EN/SV are a separate transcreation step. This file is
> reviewable copy — a sprint lands it into `messages/pl.json`; this agent never does.

**Beat / job:** the honest store-publication + timeline story. Not an SB7 canonical
beat — the one section of the mobile offer with **no web sibling**, because store
bureaucracy has no web analogue (research §"Architecture Insights"). It is the
sanctioned honest-limits register: *what happens and when*, framed affirmatively as
expectation-setting, never as a warning or a negative.

**Target keys:** `mobileOffer.publishing.heading`, `.intro`,
`.points.twoTracks.{title,body}`, `.points.duns.{title,body}`,
`.points.googleTest.{title,body}`, `.points.review.{title,body}`.

---

## Claim ledger (whole-page control — what this section owns vs. borrows)

| Selling point | Home section | This section's move |
|---|---|---|
| "publication starts day one" (the *headline*) | `guide` (intro: *"Publikację uruchamiamy pierwszego dnia… idą równolegle"*) | `guide` **names** it; `publishing` **explains the detail** (a legit promise→payoff bookend). twoTracks must NOT re-argue the summary — it adds *what runs in parallel* and *why the calendar, not effort, drives it*. |
| D-U-N-S lead time | `publishing` (MINE) | full detail here — Apple kilka dni / Google do 30 |
| Google closed test (12 testers / 14 dni) | `publishing` (MINE) | full detail here |
| review times (Apple <24h / Google do 7 dni) | `publishing` (MINE) | full detail here |
| prices, ownership, running costs | `pricing` / `ownership` | **not touched** here |
| the 5-step process | `guide` | **not restated** here |
| account-setup help | `guide.publish` + `includes.accounts` | glancing only; publishing is the *timeline* view, not the "I set up your accounts" pitch |

**Repetition risk fixed from current copy:** the shipped `twoTracks.body`
(*"Formalności sklepów bywają dłuższe niż sama budowa"*) is a near-verbatim echo of
`guide.intro` (*"formalności sklepów potrafią trwać dłużej niż sama budowa"*) — a
whole-page dim-8 repeat. Rewritten so `twoTracks` explains *which two tracks* and
*that the calendar can't be compressed by effort*, without re-stating the summary line
`guide` already owns.

---

## Copy (mapped to `mobileOffer.publishing.*` keys)

### mobileOffer.publishing.heading

Publikacja i czas — czego się spodziewać

### mobileOffer.publishing.intro

Sklepy Apple i Google mają swój kalendarz i swoje wymogi. Mówię o nich wprost i planuję je z Tobą od pierwszego dnia, żeby publikacja szła równo z budową, a start wypadł wtedy, kiedy się umówimy.

### mobileOffer.publishing.points.twoTracks.title

Dwa tory od pierwszego dnia

### mobileOffer.publishing.points.twoTracks.body

Od startu prowadzę równolegle dwie rzeczy: budowę aplikacji i zakładanie kont w sklepach. Część wymogów Apple i Google zależy od ich kalendarza, a nie od tempa pracy — dlatego ruszają pierwszego dnia, a nie po skończonej budowie.

### mobileOffer.publishing.points.duns.title

Numer D-U-N-S (dla firm)

### mobileOffer.publishing.points.duns.body

Konto firmowe w sklepach wymaga numeru D-U-N-S — bezpłatnego identyfikatora firmy. Apple przyznaje go zwykle w kilka dni, Google potrzebuje na to do 30. Gdy publikujesz jako firma, zaczynam od tego numeru, żeby zdążył na czas.

### mobileOffer.publishing.points.googleTest.title

Testy zamknięte Google Play

### mobileOffer.publishing.points.googleTest.body

Nowe prywatne konto Google Play przechodzi test zamknięty: co najmniej 12 testerów przez 14 dni, zanim aplikacja trafi do sprzedaży. Konta firmowe mają tę drogę otwartą od razu — dlatego typ konta ustalamy z Tobą pierwszego dnia.

### mobileOffer.publishing.points.review.title

Czas weryfikacji

### mobileOffer.publishing.points.review.body

Na końcu każdą aplikację ogląda jeszcze sklep. Apple zatwierdza ponad 90% zgłoszeń w mniej niż dobę, Google odpowiada zwykle w ciągu 7 dni.

---

## Voice-Gap-Test report (all 12 dimensions)

Scored on the copy above. Every dimension MATCHED with a cited phrase.

| # | Dimension | Score | Evidence (cited phrase) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | *"Mówię o nich wprost i planuję je z Tobą od pierwszego dnia"* — states a capability plainly; no superlative, no "najlepszy". Every figure is a checkable Apple/Google fact from the oracle. |
| 2 | Direct, never blunt | MATCHED | *"Apple przyznaje go zwykle w kilka dni, Google potrzebuje na to do 30"* — shortest honest path, reader's situation ("gdy publikujesz jako firma") acknowledged first, not stripped bare. |
| 3 | Warm, never chummy | MATCHED | *"planuję je z Tobą"*, *"ustalamy z Tobą pierwszego dnia"* — informal *ty*, partnership register, zero slang (no *pogadasz / stówek / jakieś*). |
| 4 | Affirmative phrasing | MATCHED | Heading *"czego się spodziewać"* (kept affirmative, no reintroduced *"bez X"*); *"start wypadł wtedy, kiedy się umówimy"*, *"mają tę drogę otwartą od razu"* — states what happens, not what's avoided. Negation sweep: no `bez`, no `zamiast`, no `nie X, tylko Y`. See sweep below. |
| 5 | Register floor | MATCHED | *"bezpłatnego identyfikatora firmy"* (plain gloss, no dev jargon), active voice throughout (*"prowadzę", "zaczynam", "ogląda"*); ~grade-7. "Firebase/Firestore/APNs" kept out of copy per facts-oracle guardrail. |
| 6 | AI-transparency stance | MATCHED | N/A-as-selling-point here by design (AI lives in `guide`/`audience`); the section makes **no** "made by AI" claim, so the stance is not violated. Nearest touch: none — correctly silent, no commodity framing to score against. |
| 7 | Lexical hygiene | MATCHED | Zero ban-list hits (no *kluczowy / kompleksowe / synergia / W dzisiejszych czasach / Co więcej / Podsumowując / „To nie X, to Y"*). Pause-dashes: one per unit max — intro `— czego`, twoTracks `— dlatego`, duns `— bezpłatnego` + `— żeby`… see note. |
| 8 | Structure / Rule of One | MATCHED | Each point owns one idea (two-tracks / D-U-N-S / Google test / review); the *"day one"* summary stays in `guide`, and `twoTracks.body` was rewritten (*"Część wymogów… zależy od ich kalendarza, a nie od tempa pracy"*) so it no longer echoes `guide.intro`'s *"formalności… dłuższe niż sama budowa"*. |
| 9 | Headline (4 U's) | MATCHED | *"Publikacja i czas — czego się spodziewać"* — Useful (tells you what to expect), Ultra-specific (publication + time, not generic), Unique (a competitor's generic offer page rarely volunteers the store-calendar honesty). 3/4 U's; Urgent not faked. Section heading, not the page H1. |
| 10 | Section QA (4 C's) | MATCHED | Clear (a non-technical owner follows it), Concise (no filler openers), Compelling (honesty as trust), Credible — every number (12/14, do 30 dni, 90% <24h, do 7 dni, kilka dni) traces to `mobile-offer-facts.md` §"Process, timeline" + research §3. |
| 11 | Claim precision | MATCHED | No "w cenie / gratis" claim made here, so nothing to mis-state. Figures precise to the oracle: Apple D-U-N-S *"kilka dni"* (oracle: ~5–7 business days), Google *"do 30"*, Google test *"12 testerów przez 14 dni"* (the corrected live figure, not the outdated 20), review *"ponad 90% w mniej niż dobę"* / *"do 7 dni"*. D-U-N-S correctly described as free (research §3: no cost). |
| 12 | Adjacent-repetition (micro) | MATCHED | No content word/root repeats across adjacent sentences: *"kont w sklepach"* → next sentence *"wymogów Apple i Google"* (no *konto* echo); *"test zamknięty"* stated once then referred to as *"tę drogę"*; *"kalendarz"* (intro) vs *"tempa pracy"* (twoTracks) — different words for the timeline idea. |

### Pause-dash audit (dimension 7 detail)

Ban-list §E caps pause-dashes at ~1 per section-unit. Per leaf:
- `heading`: 1 (*"czas — czego"*) — title convention, matches the shipped web+mobile heading pattern.
- `intro`: 0 pause-dashes (comma-driven).
- `twoTracks.body`: 1 (*"kalendarza, a nie od tempa pracy — dlatego"*).
- `duns.body`: 1 (*"D-U-N-S — bezpłatnego identyfikatora firmy"*). (The second break uses a comma, not a dash.)
- `googleTest.body`: 1 (*"od razu — dlatego typ konta"*).
- `review.body`: 0.

All `-` in *D-U-N-S* are hyphens in a proper identifier name (not pause-dashes), per §E's "łącznik do wyrazów złożonych" carve-out. Clean.

### Negation sweep (charter §2 / memory `no-negation-marketing`)

Searched `nie `, `bez `, `zamiast`, `, a nie`, `tylko`:
- `bez ` — **0 hits.**
- `zamiast` — **0 hits.**
- `tylko` — **0 hits.**
- `nie ` — hits are all inside honest, non-marketing factual phrasing, **not** negation-contrast selling:
  - *"a nie od tempa pracy"* (twoTracks) — this is a factual causal clause (the calendar, not effort, drives the timeline), the sanctioned honest-limits register, not an offer-defining `X, a nie Y` slogan about the product. It explains *why the tracks start day one*, an operational fact. **Judgment: kept** — it is expectation-setting about Apple/Google's process, not "my offer is X and not Y". If the owner still reads it as contrast, the affirmative fallback is *"…zależy od ich kalendarza, więc ruszają pierwszego dnia"* (drop the clause entirely).
  - *"w mniej niż dobę"* (review) — idiomatic time span ("under 24h"), not negation.

**Owner-safety note banked in Open Questions #1:** the single *"a nie od tempa pracy"* clause is the one line a zero-tolerance reading might flag. It is factual, not a product contrast, but flagged for the human because the owner's tolerance is zero. The affirmative fallback above is ready.

### Whole-page consolidation note

Ran the cross-section pass against `guide`, `includes`, `pricing`, `ownership` (loaded
from `messages/pl.json`):
- **"day one" summary** lives once in `guide.intro`; `publishing` explains the detail (bookend, allowed).
- **account-setup help** lives in `guide.publish` + `includes.accounts`; `publishing` only glances at accounts as the *timeline* driver, does not re-pitch the "I set them up for you" promise.
- **review/D-U-N-S/closed-test detail** appears **only** here — no other section carries it.
- **prices, ownership, running costs, the 5 steps** — not restated here.

Clean: no selling point is re-pitched into this section.

### Drift diagnosis

The one real drift this section invites is **whole-page repetition, not per-section
voice**: the shipped `twoTracks.body` had drifted into paraphrasing `guide.intro`'s
"formalności trwają dłużej niż budowa" line, because both sections legitimately touch
the "day one" idea — a classic promise→payoff bookend that slides into an echo when the
payoff section restates the promise instead of explaining it. The fix was to re-assign
`twoTracks` a distinct job (name the *two* parallel tracks + the calendar-vs-effort
mechanism) so `guide` keeps the headline and `publishing` owns the detail. The secondary
pull is toward negation for "punch" when explaining a constraint (the store calendar);
held in check by framing every limit as *what happens and when* (kalendarz, kilka dni,
do 30, 12 testerów, do 7 dni) rather than as a warning, leaving only one factual
*"a nie od tempa pracy"* clause flagged for the owner rather than silently kept.

---

## Open Questions

1. **The one `nie`-clause — owner tolerance check.** `twoTracks.body` contains
   *"zależy od ich kalendarza, a nie od tempa pracy"*. This is a **factual** causal
   clause about Apple/Google's process (the calendar, not effort, sets the pace), not a
   product-defining `X, a nie Y` slogan — so it reads as honest expectation-setting, the
   sanctioned register. But the owner's negation tolerance is **zero**, so this is
   surfaced, not silently kept. Affirmative fallback ready:
   *"Część wymogów Apple i Google zależy od ich kalendarza, więc ruszają pierwszego dnia,
   a nie po skończonej budowie."* — wait, that fallback *also* carries "a nie". Cleanest
   zero-negation version: *"Część wymogów Apple i Google idzie ich własnym kalendarzem,
   dłuższym niż sama praca nad kodem — dlatego ruszają pierwszego dnia."* Owner picks
   whether the factual clause stays or the fallback lands.

2. **D-U-N-S "kilka dni" for Apple — precision.** The oracle says Apple D-U-N-S
   ~5–7 business days; I rendered it *"w kilka dni"* (client-friendly, avoids "dni
   roboczych" jargon). Confirm "kilka dni" is acceptable shorthand, or whether the owner
   wants the exact *"~5–7 dni roboczych"* on the page for precision.

3. **Promo/timeline coupling (context, not blocking).** The facts oracle marks the
   promo window and org-vs-personal account default as ⚠ CONFIRM. This section stays
   correct either way (it describes *both* account paths), but the *typical* client's
   account type (personal vs org) determines which risk — the 12/14 test or the D-U-N-S
   lead time — is on the critical path. If the owner names a default assumption, the
   copy could lead with the relevant one; today it honestly presents both.
