import { useTranslations } from "next-intl";

import { AGENT_PROJECTS } from "@/lib/portfolio/agent-projects";
import { cn } from "@/lib/utils";

import { AgentProjectCard } from "./AgentProjectCard";

export type AgentPortfolioSectionProps = {
  className?: string;
};

// Always rendered — the release gate (AGENT_PORTFOLIO_SECTION_LIVE) was retired;
// the section is now a permanent part of the portfolio. See ADR 0001 (to be
// superseded) + the feature-flag cleanup follow-up.
export function AgentPortfolioSection({ className }: AgentPortfolioSectionProps) {
  const t = useTranslations("portfolio.agent");

  return (
    <section
      id="portfolio-agent"
      data-testid="agent-portfolio-section"
      aria-labelledby="portfolio-agent-heading"
      className={cn(
        "relative isolate border-t border-emerald-500/20 py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <header className="max-w-4xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          <h3
            id="portfolio-agent-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </header>

        <div
          data-agent-projects-grid
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AGENT_PROJECTS.map((project) => (
            <AgentProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
