import {
  Blocks,
  Bot,
  Check,
  CheckCircle2,
  FlaskConical,
  ListChecks,
  type LucideIcon,
  Play,
  ClipboardList,
  Rocket,
  RotateCcw,
  SearchCheck,
  Smartphone,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type Owner = "human" | "both";

/**
 * OwnerBadge — signals who drives a stage, with a consistent icon language:
 *   human → User glyph (amber)
 *   both  → User + Bot glyphs (amber human + emerald agent)
 *
 * Theme-aware: on the light schematic the accent glyphs/labels shift to darker
 * emerald/amber shades so small-text labels clear WCAG 4.5:1; dark keeps the
 * brighter -300/-400 values (see `pilot-warsztat.md` mapping table).
 */
function OwnerBadge({ owner }: { owner: Owner }) {
  const t = useTranslations("portfolio.warsztat.flow.owner");

  if (owner === "human") {
    return (
      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-amber-600/25 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] text-amber-800 dark:border-amber-500/25 dark:text-amber-300/90">
        <User className="size-3" aria-hidden />
        {t("human")}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-foreground/12 bg-foreground/5 px-2.5 py-1 font-mono text-[10px] text-foreground/70">
      <span className="inline-flex items-center gap-1" aria-hidden>
        <User className="size-3 text-amber-700 dark:text-amber-400" />
        <Bot className="size-3 text-emerald-600 dark:text-emerald-400" />
      </span>
      {t("both")}
    </span>
  );
}

/**
 * Connector — a slim downward chevron between stacked stages. Uniform narrow
 * width (matches the START pill); `vectorEffect="non-scaling-stroke"` keeps the
 * line crisp while stretched, and vertical padding stops it gluing to tiles.
 *
 * Stroke color is theme-aware: it reads a `--flow-stroke-*` CSS var (set per
 * theme in `globals.css`) so the light schematic gets darker, ≥3:1 strokes and
 * dark keeps today's brighter ones.
 */
function Connector({ tone = "neutral" }: { tone?: "neutral" | "agent" | "human" }) {
  const stroke =
    tone === "agent"
      ? "var(--flow-stroke-agent)"
      : tone === "human"
        ? "var(--flow-stroke-human)"
        : "var(--flow-stroke-neutral)";
  return (
    <div className="flex justify-center py-3.5" aria-hidden>
      <svg
        className="h-4 w-14"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M3 4 L100 20 L197 4"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

type StageProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  owner: Owner;
  children?: React.ReactNode;
};

function StageTile({ icon: Icon, title, desc, owner, children }: StageProps) {
  const human = owner === "human";
  return (
    <li
      className={cn(
        "flex items-start gap-5 rounded-2xl border p-5 sm:p-6",
        human
          ? "border-amber-600/25 bg-amber-500/[0.06] dark:border-amber-500/25"
          : "border-border bg-foreground/[0.035]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl border",
          human
            ? "border-amber-600/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
            : "border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        )}
      >
        <Icon className="size-6" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h4>
          <OwnerBadge owner={owner} />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
        {children}
      </div>
    </li>
  );
}

function AgentStep({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-emerald-600/25 bg-emerald-500/[0.06] p-4 dark:border-emerald-500/25">
      <span
        aria-hidden
        className="flex size-10 items-center justify-center rounded-lg border border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <div className="font-heading text-sm font-semibold text-foreground">
          {title}
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </div>
    </div>
  );
}

export type WarsztatFlowProps = {
  className?: string;
};

export function WarsztatFlow({ className }: WarsztatFlowProps) {
  const t = useTranslations("portfolio.warsztat.flow");

  return (
    <div className={cn("mt-12", className)}>
      {/* theme-aware schematic panel: warm off-white inset board in light, the
       * deep-slate schematic in dark (both with the emerald-top / amber-bottom
       * glow). The gradient stops are the sanctioned raw-color exception. */}
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[radial-gradient(90%_45%_at_50%_-8%,rgba(5,150,105,.05),transparent_62%),radial-gradient(70%_60%_at_88%_108%,rgba(180,83,9,.05),transparent_60%),linear-gradient(180deg,oklch(0.965_0.006_90),oklch(0.945_0.008_90))] p-5 shadow-[0_30px_70px_-45px_rgba(23,23,23,.25)] sm:p-8 dark:bg-[radial-gradient(90%_45%_at_50%_-8%,rgba(16,185,129,.14),transparent_62%),radial-gradient(70%_60%_at_88%_108%,rgba(245,158,11,.12),transparent_60%),linear-gradient(180deg,#0b1220,#060a13)] dark:shadow-[0_40px_90px_-50px_rgba(0,0,0,.8)]">
        {/* legend */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-foreground/60 uppercase">
            {t("flowLabel")}
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-foreground/70">
              <span aria-hidden className="inline-flex items-center gap-1">
                <User className="size-3 text-amber-700 dark:text-amber-400" />
                <Bot className="size-3 text-emerald-600 dark:text-emerald-400" />
              </span>
              {t("legend.both")}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-foreground/70">
              <User aria-hidden className="size-3.5 text-amber-700 dark:text-amber-400" />
              {t("legend.human")}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-foreground/70">
              <Bot aria-hidden className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              {t("legend.agent")}
            </span>
          </div>
        </div>

        {/* vertical flow */}
        <ol className="mx-auto flex max-w-2xl list-none flex-col">
          {/* START */}
          <li className="flex items-center gap-3 self-center rounded-full border border-dashed border-foreground/20 bg-foreground/[0.04] py-2.5 pr-5 pl-3">
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 text-foreground/70"
            >
              <Play className="size-3.5" aria-hidden />
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/60 uppercase">
              {t("start")}
            </span>
          </li>

          <Connector />
          <StageTile
            icon={ClipboardList}
            title={t("stage.plan.title")}
            desc={t("stage.plan.desc")}
            owner="both"
          />

          <Connector tone="human" />
          <StageTile
            icon={CheckCircle2}
            title={t("stage.accept.title")}
            desc={t("stage.accept.desc")}
            owner="human"
          />

          <Connector tone="agent" />

          {/* AGENT ZONE (AFK) */}
          <li className="rounded-2xl border border-dashed border-emerald-600/40 bg-emerald-500/[0.05] p-4 sm:p-5 dark:border-emerald-500/35">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-300">
                <Bot className="size-3.5" aria-hidden />
                {t("stage.agent.label")}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] text-emerald-700 dark:text-emerald-300/80">
                <RotateCcw
                  className="size-3 motion-safe:animate-pulse"
                  aria-hidden
                />
                {t("stage.agent.loop")}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
              <AgentStep
                icon={Blocks}
                title={t("stage.agent.build.title")}
                desc={t("stage.agent.build.desc")}
              />
              <div
                aria-hidden
                className="hidden shrink-0 items-center text-emerald-600/70 sm:flex dark:text-emerald-400/70"
              >
                →
              </div>
              <AgentStep
                icon={FlaskConical}
                title={t("stage.agent.test.title")}
                desc={t("stage.agent.test.desc")}
              />
              <div
                aria-hidden
                className="hidden shrink-0 items-center text-emerald-600/70 sm:flex dark:text-emerald-400/70"
              >
                →
              </div>
              <AgentStep
                icon={SearchCheck}
                title={t("stage.agent.review.title")}
                desc={t("stage.agent.review.desc")}
              />
            </div>
          </li>

          <Connector tone="human" />
          <StageTile
            icon={ListChecks}
            title={t("stage.humanReview.title")}
            desc={t("stage.humanReview.desc")}
            owner="human"
          >
            <p className="mt-1 inline-flex items-start gap-2 rounded-lg border border-amber-600/20 bg-amber-500/[0.06] px-3 py-2 font-mono text-[11px] leading-relaxed text-amber-800 dark:border-amber-500/20 dark:text-amber-200/80">
              <RotateCcw className="mt-0.5 size-3 shrink-0" aria-hidden />
              {t("loopback")}
            </p>
          </StageTile>

          <Connector />
          <StageTile
            icon={Smartphone}
            title={t("stage.live.title")}
            desc={t("stage.live.desc")}
            owner="both"
          />

          <Connector tone="human" />
          <StageTile
            icon={Rocket}
            title={t("stage.deploy.title")}
            desc={t("stage.deploy.desc")}
            owner="both"
          />

          <Connector tone="agent" />

          {/* DONE */}
          <li className="flex items-center gap-3 self-center rounded-full border border-emerald-600/40 bg-emerald-500/10 py-2.5 pr-6 pl-3 shadow-[0_0_20px_-8px_rgba(5,150,105,.35)] dark:border-emerald-500/40 dark:shadow-[0_0_26px_-6px_rgba(16,185,129,.5)]">
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-full border border-emerald-600/50 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
            >
              <Check className="size-4" aria-hidden />
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-300">
              {t("done")}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
