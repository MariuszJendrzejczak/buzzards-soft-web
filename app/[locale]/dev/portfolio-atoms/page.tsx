import { setRequestLocale } from "next-intl/server";

import { FeatureGate } from "@/components/FeatureGate";
import { RoleBadge } from "@/components/portfolio/role-badge";
import { StackChip } from "@/components/portfolio/stack-chip";
import { StoreLink } from "@/components/portfolio/store-link";
import {
  AGENT_PORTFOLIO_SECTION_LIVE,
  HOME_STORAGE_MVP_LIVE,
  POLILOCALE_REPO_PUBLIC,
} from "@/lib/config/feature-flags";
import { ROLES, STACKS } from "@/lib/portfolio/types";

export default async function PortfolioAtomsDevPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
      <header className="mb-12">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand uppercase">
          dev · portfolio atoms
        </span>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Portfolio atomic components
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Variants of <code>&lt;RoleBadge&gt;</code>,{" "}
          <code>&lt;StackChip&gt;</code>, and <code>&lt;StoreLink&gt;</code>.
          Temporary preview — removed in Sprint 3.
        </p>
      </header>

      <Section title="RoleBadge — all variants">
        <div data-testid="role-badge-row" className="flex flex-wrap gap-3">
          {ROLES.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>
      </Section>

      <Section title="StackChip — all variants">
        <div data-testid="stack-chip-row" className="flex flex-wrap gap-3">
          {STACKS.map((stack) => (
            <StackChip key={stack} stack={stack} />
          ))}
        </div>
      </Section>

      <Section title="FeatureGate — AGENT_PORTFOLIO_SECTION_LIVE">
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          HOME_STORAGE_MVP_LIVE = {String(HOME_STORAGE_MVP_LIVE)} ·
          POLILOCALE_REPO_PUBLIC = {String(POLILOCALE_REPO_PUBLIC)} ·
          AGENT_PORTFOLIO_SECTION_LIVE = {String(AGENT_PORTFOLIO_SECTION_LIVE)}
        </p>
        <div data-testid="feature-gate-host">
          <FeatureGate flag="AGENT_PORTFOLIO_SECTION_LIVE">
            test-gate-marker
          </FeatureGate>
        </div>
      </Section>

      <Section title="StoreLink — combinations">
        <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
          <li className="flex items-center gap-4">
            <span className="w-56 font-mono text-xs">google + apple</span>
            <StoreLink
              googleLink="https://play.google.com/store/apps/details?id=com.infoshare.infoshareconference"
              appleLink="https://apps.apple.com/app/id6443543236"
            />
          </li>
          <li className="flex items-center gap-4">
            <span className="w-56 font-mono text-xs">google only</span>
            <StoreLink googleLink="https://play.google.com/store/apps/details?id=com.honeti.flags" />
          </li>
          <li className="flex items-center gap-4">
            <span className="w-56 font-mono text-xs">apple only</span>
            <StoreLink appleLink="https://apps.apple.com/app/id6443543236" />
          </li>
          <li className="flex items-center gap-4">
            <span className="w-56 font-mono text-xs">external only</span>
            <StoreLink
              external={{ label: "Gen — gen.edu.pl", url: "https://gen.edu.pl/" }}
            />
          </li>
          <li className="flex items-center gap-4">
            <span className="w-56 font-mono text-xs">empty (renders null)</span>
            <StoreLink />
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 font-heading text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="rounded-2xl border border-border bg-card p-6">
        {children}
      </div>
    </section>
  );
}
