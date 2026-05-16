# ADR 0001 — Feature flags strategy

- **Status:** Accepted
- **Date:** 2026-05-15
- **Scope:** Section 4.2 release gating (`HOME_STORAGE_MVP_LIVE`, `POLILOCALE_REPO_PUBLIC`, `AGENT_PORTFOLIO_SECTION_LIVE`).

## Context

This repository is a Next.js App Router project configured for static export (`output: "export"` in `next.config.ts`). Production deployment is a pre-rendered bundle served from static hosting. There is no Node server at runtime, no edge runtime in front of the static files.

Section 4.2 ("Programowanie agentowe") must stay hidden from the public site until two independent gates land:

- `HOME_STORAGE_MVP_LIVE` — Home Storage MVP is shipped.
- `POLILOCALE_REPO_PUBLIC` — Polilocale OSS repo is public with session 1 + skeleton.

`AGENT_PORTFOLIO_SECTION_LIVE` is derived: `HOME_STORAGE_MVP_LIVE && POLILOCALE_REPO_PUBLIC`. All three default to `false`.

Three options considered:

1. **Build-time env vars (`NEXT_PUBLIC_*`)** — inlined at build time, work in both server and client components, zero runtime cost, no extra fetch.
2. **Runtime JSON config (`public/feature-flags.json`)** — fetched client-side after hydration; allows toggling without a rebuild but adds a flash of un-gated content and a network round-trip.
3. **Hybrid** — build-time defaults overridden by an optional runtime JSON.

## Decision

**We use build-time env vars (`NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE`, `NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC`) read once in `lib/config/feature-flags.ts`.** The computed flag `AGENT_PORTFOLIO_SECTION_LIVE` is the boolean AND of the two source flags. All three flags are exported as plain `boolean` constants; `FeatureGate` consumes them via the `FeatureFlags` map by key.

Sourcing per environment:

| Env | Source | How to toggle |
|---|---|---|
| dev | `.env.development.local` (gitignored) | edit the file, restart `next dev` |
| staging | CI build env (e.g. Vercel / GitHub Actions secrets) prefixed `NEXT_PUBLIC_` | flip the secret, redeploy |
| production | CI build env, same prefix | flip the secret, redeploy |

Defaults when the env var is missing or not exactly `"true"`: `false`. We parse only the literal string `"true"` so typos like `True` / `1` / `yes` collapse to `false` — this is intentional, the gate stays closed unless you opt in explicitly.

## Rationale

- **Simplicity wins for a 3-flag setup.** A runtime config introduces a fetch, a hydration mismatch surface, and a flash of content for a benefit (no-rebuild toggle) that does not exist in a static-export pipeline — every config change in this app is already a build + redeploy.
- **No runtime divergence between server and client.** With env vars inlined at build, the same boolean is visible in server components, client components, and the static HTML. `FeatureGate` stays trivially SSR-safe with no client-only hooks.
- **Closed-by-default semantics.** Strict `=== "true"` parsing means a forgotten env var, a `.env.production` mistake, or a copy-paste with whitespace all keep the gated section dark. This matches the planning docs: "v2 ships without section 4.2 until both gates land."
- **No new dependency.** We rejected runtime-config libraries (LaunchDarkly, ConfigCat, flagsmith) — overkill for two booleans on a static site.

## Consequences

- Toggling a gate in production = redeploying. Acceptable: gates flip rarely (once per gate, when the underlying project ships).
- Anyone with read access to the production bundle can `view-source` the inlined values. Not a problem here: the flags gate *visibility of marketing copy*, not authorisation.
- If we later want runtime toggling (e.g. preview environments, A/B), `lib/config/feature-flags.ts` is the single seam to extend — replace the constant exports with a getter that reads runtime config first and falls back to the build-time value. Callers (`FeatureGate`, future consumers) do not change.

## Chosen: build-time `NEXT_PUBLIC_*` env vars, because the host project is statically exported and the gates flip on deploy cadence — runtime config would be machinery without payoff.
