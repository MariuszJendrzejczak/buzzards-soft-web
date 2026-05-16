import {
  Command,
  Database,
  type LucideIcon,
  Plug,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { WarsztatHeroTile } from "./WarsztatHeroTile";
import { WarsztatTile } from "./WarsztatTile";

type WarsztatTileSpec = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  exampleKey: string;
  icon: LucideIcon;
};

// Order mirrors `doc/warsztat_ai_context.md` — "Pozostałe kafelki (kolejność wagi)".
// Icons finalized in Session 6: literal-match Lucide picks (settings -> Settings,
// slash commands -> Command, MCP integrations -> Plug, memory -> Database,
// no-auto-merge -> ShieldCheck). Sub-agents stays on Users (multi-role metaphor).
const TILES: readonly WarsztatTileSpec[] = [
  {
    id: "claude-code-config",
    titleKey: "portfolio.warsztat.tile.1.title",
    descriptionKey: "portfolio.warsztat.tile.1.description",
    exampleKey: "portfolio.warsztat.tile.1.example",
    icon: Settings,
  },
  {
    id: "subagents",
    titleKey: "portfolio.warsztat.tile.2.title",
    descriptionKey: "portfolio.warsztat.tile.2.description",
    exampleKey: "portfolio.warsztat.tile.2.example",
    icon: Users,
  },
  {
    id: "slash-commands",
    titleKey: "portfolio.warsztat.tile.3.title",
    descriptionKey: "portfolio.warsztat.tile.3.description",
    exampleKey: "portfolio.warsztat.tile.3.example",
    icon: Command,
  },
  {
    id: "mcp",
    titleKey: "portfolio.warsztat.tile.4.title",
    descriptionKey: "portfolio.warsztat.tile.4.description",
    exampleKey: "portfolio.warsztat.tile.4.example",
    icon: Plug,
  },
  {
    id: "memory",
    titleKey: "portfolio.warsztat.tile.5.title",
    descriptionKey: "portfolio.warsztat.tile.5.description",
    exampleKey: "portfolio.warsztat.tile.5.example",
    icon: Database,
  },
  {
    id: "git-workflow",
    titleKey: "portfolio.warsztat.tile.6.title",
    descriptionKey: "portfolio.warsztat.tile.6.description",
    exampleKey: "portfolio.warsztat.tile.6.example",
    icon: ShieldCheck,
  },
];

export type WarsztatGridProps = {
  className?: string;
};

export function WarsztatGrid({ className }: WarsztatGridProps) {
  const t = useTranslations("portfolio.warsztat");
  const tRoot = useTranslations();

  return (
    <section
      id="portfolio-warsztat"
      aria-labelledby="portfolio-warsztat-heading"
      className={cn(
        "relative isolate border-t border-emerald-500/20 py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <header className="max-w-3xl">
          <h3
            id="portfolio-warsztat-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </header>

        <div
          data-warsztat-grid
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <WarsztatHeroTile />
          {TILES.map((tile) => (
            <WarsztatTile
              key={tile.id}
              titleKey={tile.titleKey}
              descriptionKey={tile.descriptionKey}
              icon={tile.icon}
              example={tRoot(tile.exampleKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
