import Image from "next/image";
import { useTranslations } from "next-intl";

import type { AgentProject } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { AgentCardLink } from "./AgentCardLink";
import { ProjectLink } from "./project-link";
import { TechBadge } from "./tech-badge";

export type AgentProjectCardProps = {
  project: AgentProject;
  className?: string;
};

export function AgentProjectCard({ project, className }: AgentProjectCardProps) {
  const t = useTranslations();

  return (
    <article
      data-agent-project={project.id}
      className={cn(
        "relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors",
        "hover:border-brand/40",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-brand/60 focus-within:ring-offset-2 focus-within:ring-offset-background",
        className,
      )}
    >
      <header className="flex items-start gap-3">
        {project.iconSrc ? (
          <Image
            src={project.iconSrc}
            alt=""
            aria-hidden
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-xl border border-border/70 bg-surface/60 object-contain"
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h4 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
            <AgentCardLink links={project.links}>
              {t(project.titleKey)}
            </AgentCardLink>
          </h4>
          {project.badges.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-2">
              {project.badges.map((badge) => (
                <li key={badge}>
                  <TechBadge label={badge} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {t(project.descriptionKey)}
      </p>

      {project.links.length > 0 ? (
        <div className="relative z-10 mt-auto pt-2">
          <ProjectLink links={project.links} />
        </div>
      ) : null}
    </article>
  );
}
