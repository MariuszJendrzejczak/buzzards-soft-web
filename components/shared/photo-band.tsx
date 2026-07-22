import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Ambient photographic band (PROTOTYPE — web-visual-elevation).
 *
 * A full-width strip whose photo is pinned to the viewport
 * (`background-attachment: fixed`) and clipped to this element's box, so content
 * scrolls OVER it. Placed between opaque content sections, the image is revealed
 * as the band scrolls through, then the next opaque section fully covers it —
 * and because each band owns its own image clipped to its own box, the swap to
 * the next photo happens entirely behind that opaque section (no visible
 * cross-fade). Two uses:
 *   - `variant="backdrop"`: wraps a section (e.g. the hero) so the photo sits
 *     behind its content.
 *   - decorative reveal band: standalone strip with its own height, `aria-hidden`.
 *
 * Degrades under `prefers-reduced-motion` to `background-attachment: scroll`
 * (image scrolls normally — no parallax). Uses only token utilities for the
 * readability scrim (`bg-background/…`, `bg-brand/…`). Placeholder imagery is
 * throwaway (see context/slices/web-visual-elevation/design-review.md).
 */

type PhotoBandProps = {
  src: string;
  children?: ReactNode;
  className?: string;
  /** Neutral scrim over the photo (no hue — keeps the photo neutral to the eye).
   * Lower opacity = more photo. Light theme lightens, dark theme darkens. */
  scrimClassName?: string;
  /** Standalone reveal strip carrying no content — hidden from a11y tree. */
  decorative?: boolean;
  /** Utility classes on the photo layer — brightness filter and/or `bg-[pos]`
   * crop position. Default strongly brightens the (grayscale placeholder) photo
   * in dark and centres the crop; a real colour photo can override to a gentler
   * filter and a subject-preserving position so its colours + subjects survive. */
  photoClassName?: string;
};

export function PhotoBand({
  src,
  children,
  className,
  scrimClassName = "bg-white/45 dark:bg-black/42",
  decorative = false,
  photoClassName = "bg-center dark:brightness-150",
}: PhotoBandProps) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn("relative isolate overflow-hidden", className)}
    >
      {/* photo layer — pinned to the viewport; BRIGHTENED in dark (default) so
       * the neutral photo brings light/air into the dark theme (not just a
       * thinner scrim). Light theme keeps the photo at natural brightness.
       * Brightness + crop position are overridable via `photoClassName`. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-20 bg-cover bg-fixed motion-reduce:bg-scroll",
          photoClassName,
        )}
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* neutral readability scrim — no hue, so the photo stays neutral to the eye */}
      <div className={cn("absolute inset-0 -z-10", scrimClassName)} />
      {children}
    </div>
  );
}
