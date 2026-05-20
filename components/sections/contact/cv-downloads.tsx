import { FileDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

type CvItem = {
  href: string;
  downloadAs: string;
  labelKey: "cvPolish" | "cvEnglish";
};

const ITEMS: CvItem[] = [
  {
    href: "/cv/cv-mariusz-jendrzejczak-pl.pdf",
    downloadAs: "CV — Mariusz Jendrzejczak · PL.pdf",
    labelKey: "cvPolish",
  },
  {
    href: "/cv/cv-mariusz-jendrzejczak-en.pdf",
    downloadAs: "CV — Mariusz Jendrzejczak · EN.pdf",
    labelKey: "cvEnglish",
  },
];

export async function CvDownloads() {
  const t = await getTranslations("contact");

  return (
    <div>
      <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
        {t("downloadsLabel")}
      </h3>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              download={item.downloadAs}
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 px-3 py-2.5 outline-none transition-colors hover:border-brand/40 hover:bg-surface/70 focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-brand"
              >
                <FileDown className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] tracking-[0.18em] text-text-subtle uppercase">
                  PDF
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-foreground group-hover:text-brand sm:text-base">
                  {t(item.labelKey)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
