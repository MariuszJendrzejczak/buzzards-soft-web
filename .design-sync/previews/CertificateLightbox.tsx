import { useEffect, useRef } from "react";
import { CertificateLightbox } from "buzzards-soft-ui";

// Real props from components/sections/certification/certification.tsx.
const PROPS = {
  thumbSrc: "/images/certificate-10xdevs-thumb.webp",
  fullSrc: "/images/certificate-10xdevs.webp",
  alt: "Certyfikat ukończenia kursu 10xDevs",
  openLabel: "Powiększ certyfikat 10xDevs",
  closeLabel: "Zamknij podgląd",
};

export function Thumbnail() {
  return (
    <div className="flex flex-col gap-4 p-6" style={{ width: 420 }}>
      <CertificateLightbox {...PROPS} />
      <p className="text-sm leading-relaxed text-muted-foreground">{PROPS.openLabel}</p>
    </div>
  );
}

// The lightbox has no controlled `open` prop — the story clicks the trigger on
// mount to show the portalled overlay (needs cardMode "single").
export function Open() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Defer one tick: a click fired in the mount effect lands before the
    // Base UI trigger has wired its handlers and is ignored.
    const id = setTimeout(() => ref.current?.querySelector("button")?.click(), 50);
    return () => clearTimeout(id);
  }, []);
  return (
    <div ref={ref} className="flex flex-col gap-4 p-6" style={{ height: 640, width: 420 }}>
      <CertificateLightbox {...PROPS} />
    </div>
  );
}
