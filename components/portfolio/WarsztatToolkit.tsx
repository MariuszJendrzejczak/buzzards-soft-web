import {
  Command,
  Database,
  GitBranch,
  type LucideIcon,
  Plug,
  ScrollText,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { WarsztatTile } from "./WarsztatTile";

type Card = {
  id: string;
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
};

// Two methodological pillars — the "why" beneath the flow.
const PILLARS: readonly Card[] = [
  {
    id: "spec",
    titleKey: "portfolio.warsztat.toolkit.pillar.spec.title",
    descKey: "portfolio.warsztat.toolkit.pillar.spec.desc",
    icon: ScrollText,
  },
  {
    id: "context",
    titleKey: "portfolio.warsztat.toolkit.pillar.context.title",
    descKey: "portfolio.warsztat.toolkit.pillar.context.desc",
    icon: Database,
  },
];

// Four concrete enablers that keep the flow fast and disciplined.
const ENABLERS: readonly Card[] = [
  {
    id: "sessions",
    titleKey: "portfolio.warsztat.toolkit.enabler.sessions.title",
    descKey: "portfolio.warsztat.toolkit.enabler.sessions.desc",
    icon: Users,
  },
  {
    id: "tools",
    titleKey: "portfolio.warsztat.toolkit.enabler.tools.title",
    descKey: "portfolio.warsztat.toolkit.enabler.tools.desc",
    icon: Plug,
  },
  {
    id: "commands",
    titleKey: "portfolio.warsztat.toolkit.enabler.commands.title",
    descKey: "portfolio.warsztat.toolkit.enabler.commands.desc",
    icon: Command,
  },
  {
    id: "git",
    titleKey: "portfolio.warsztat.toolkit.enabler.git.title",
    descKey: "portfolio.warsztat.toolkit.enabler.git.desc",
    icon: GitBranch,
  },
];

function Pillar({ titleKey, descKey, icon: Icon }: Card) {
  const t = useTranslations();
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand"
        >
          <Icon className="size-6" aria-hidden />
        </span>
        <h4 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {t(titleKey)}
        </h4>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t(descKey)}
      </p>
    </article>
  );
}

export type WarsztatToolkitProps = {
  className?: string;
};

export function WarsztatToolkit({ className }: WarsztatToolkitProps) {
  const t = useTranslations("portfolio.warsztat.toolkit");

  return (
    <div className={cn("mt-16", className)}>
      <header className="max-w-2xl">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          <span aria-hidden className="inline-block h-px w-5 bg-brand" />
          {t("eyebrow")}
        </div>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {t("lead")}
        </p>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {PILLARS.map((p) => (
          <Pillar key={p.id} {...p} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ENABLERS.map((e) => (
          <WarsztatTile
            key={e.id}
            titleKey={e.titleKey}
            descriptionKey={e.descKey}
            icon={e.icon}
          />
        ))}
      </div>
    </div>
  );
}
