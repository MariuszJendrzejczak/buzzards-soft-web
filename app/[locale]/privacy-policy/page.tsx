import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link, routing, type Locale } from "@/i18n/routing";
import { buildAlternates, pageSocial } from "@/lib/seo";

const COMPANY_NAME = "Buzzards Soft";
const DOMAIN = "buzzards-soft.com";
const CONTACT_EMAIL = "dev.buzzardssoft@gmail.com";

const LAST_UPDATED_ISO = "2026-05-08";

type SectionSpec = {
  id: string;
  number: string;
  key: string;
  blocks: ReadonlyArray<
    | { kind: "p"; pKey: string }
    | { kind: "list"; introKey?: string; itemKeys: readonly string[] }
    | { kind: "extra"; extraKey: string }
  >;
};

const SECTION_SPECS: readonly SectionSpec[] = [
  {
    id: "zakres-zbieranych-danych",
    number: "01",
    key: "1",
    blocks: [
      { kind: "list", introKey: "intro", itemKeys: ["1", "2"] },
      { kind: "extra", extraKey: "extra" },
    ],
  },
  {
    id: "cele-przetwarzania",
    number: "02",
    key: "2",
    blocks: [
      { kind: "list", introKey: "intro", itemKeys: ["1", "2", "3", "4", "5"] },
    ],
  },
  {
    id: "podstawa-prawna",
    number: "03",
    key: "3",
    blocks: [
      { kind: "list", introKey: "intro", itemKeys: ["1", "2", "3"] },
    ],
  },
  {
    id: "odbiorcy-danych",
    number: "04",
    key: "4",
    blocks: [
      { kind: "p", pKey: "p1" },
      { kind: "p", pKey: "p2" },
    ],
  },
  {
    id: "przechowywanie-danych",
    number: "05",
    key: "5",
    blocks: [{ kind: "p", pKey: "p1" }],
  },
  {
    id: "prawa-uzytkownika",
    number: "06",
    key: "6",
    blocks: [
      {
        kind: "list",
        introKey: "intro",
        itemKeys: ["1", "2", "3", "4", "5", "6", "7"],
      },
      { kind: "extra", extraKey: "extra" },
    ],
  },
  {
    id: "pliki-cookies",
    number: "07",
    key: "7",
    blocks: [
      { kind: "list", introKey: "intro", itemKeys: ["1", "2"] },
      { kind: "extra", extraKey: "extra" },
    ],
  },
  {
    id: "bezpieczenstwo-danych",
    number: "08",
    key: "8",
    blocks: [{ kind: "p", pKey: "p1" }],
  },
  {
    id: "zmiany-w-polityce",
    number: "09",
    key: "9",
    blocks: [{ kind: "p", pKey: "p1" }],
  },
  {
    id: "kontakt",
    number: "10",
    key: "10",
    blocks: [{ kind: "p", pKey: "p1" }],
  },
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const typedLocale = locale as Locale;
  const alternates = buildAlternates(typedLocale, "/privacy-policy");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    alternates,
    ...pageSocial({
      locale: typedLocale,
      title,
      description,
      canonical: alternates.canonical,
    }),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacyPolicy");
  const tCommon = await getTranslations("common");

  return (
    <article className="relative isolate">
      <div className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t("breadcrumbBack")}
          </Link>
        </nav>

        <header className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand uppercase">
            {t("documentBadge")}
          </span>
          <h1 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("introPart1Pre")}
            <span className="text-foreground">{DOMAIN}</span>
            {t("introPart1Mid")}
            <span className="text-foreground">{COMPANY_NAME}</span>
            {t("introPart1Post")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("introPart2")}
          </p>

          <dl className="mt-7 grid gap-4 border-t border-border/60 pt-6 text-sm sm:grid-cols-2">
            <MetaRow label={t("lastUpdatedLabel")}>
              <time dateTime={LAST_UPDATED_ISO}>{t("lastUpdatedValue")}</time>
            </MetaRow>
            <MetaRow label={t("contactLabel")}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-sm outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {CONTACT_EMAIL}
              </a>
            </MetaRow>
          </dl>
        </header>

        <nav
          aria-label={t("tocHeading")}
          className="mt-10 rounded-xl border border-border/60 bg-surface/40 p-5 sm:p-6"
        >
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
            {t("tocHeading")}
          </h2>
          <ol className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {SECTION_SPECS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group/toc inline-flex items-baseline gap-3 rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-text-subtle group-hover/toc:text-brand">
                    {section.number}
                  </span>
                  <span>{t(`sections.${section.key}.title`)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 flex flex-col gap-12">
          {SECTION_SPECS.map((section) => (
            <PolicySection key={section.id} section={section} />
          ))}

          <section
            aria-labelledby="kontakt-details-heading"
            className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-brand"
              >
                <Mail className="size-4" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3
                  id="kontakt-details-heading"
                  className="font-heading text-base font-semibold text-foreground"
                >
                  {t("adminContactHeading")}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("adminContactBody")}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="rounded-sm text-sm font-medium text-foreground outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-10 sm:flex-row sm:items-center sm:gap-4">
          <Button
            size="lg"
            render={<Link href="/" />}
            className="h-12 gap-2 px-5 text-base"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t("breadcrumbBack")}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            render={<Link href="/#contact" />}
            className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface"
          >
            {tCommon("contactCta")}
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

async function PolicySection({ section }: { section: SectionSpec }) {
  const t = await getTranslations("privacyPolicy");
  const headingId = `${section.id}-heading`;
  const sectionT = (key: string) => t(`sections.${section.key}.${key}`);

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className="scroll-mt-24"
    >
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden
          className="font-mono text-xs font-medium tracking-[0.2em] text-brand uppercase"
        >
          {section.number}
        </span>
        <h2
          id={headingId}
          className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          {sectionT("title")}
        </h2>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-l border-border/60 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {section.blocks.map((block, index) => {
          if (block.kind === "p") {
            return <p key={index}>{sectionT(block.pKey)}</p>;
          }

          if (block.kind === "extra") {
            return <p key={index}>{sectionT(block.extraKey)}</p>;
          }

          return (
            <div key={index} className="flex flex-col gap-3">
              {block.introKey ? <p>{sectionT(block.introKey)}</p> : null}
              <ul className="flex flex-col gap-2">
                {block.itemKeys.map((itemKey) => {
                  const text = sectionT(`items.${itemKey}`);
                  return (
                    <li key={itemKey} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                      />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-mono text-[11px] font-medium tracking-[0.2em] text-text-subtle uppercase">
        {label}
      </dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  );
}
