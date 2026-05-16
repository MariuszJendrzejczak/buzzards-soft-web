import { useTranslations } from "next-intl";

import { FeatureGate } from "@/components/FeatureGate";
import { AGENT_PROJECTS } from "@/lib/portfolio/agent-projects";
import { cn } from "@/lib/utils";

import { AgentProjectCard } from "./AgentProjectCard";

export type AgentPortfolioSectionProps = {
  className?: string;
};

export function AgentPortfolioSection({ className }: AgentPortfolioSectionProps) {
  return (
    <FeatureGate flag="AGENT_PORTFOLIO_SECTION_LIVE">
      <AgentPortfolioSectionInner className={className} />
    </FeatureGate>
  );
}

function AgentPortfolioSectionInner({ className }: AgentPortfolioSectionProps) {
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
        <header className="max-w-4xl">
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
