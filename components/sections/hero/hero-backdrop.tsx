"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const BASE_LAYER_CLASS = "pointer-events-none absolute inset-0 -z-10";

const GLOW_PRIMARY_STYLE = {
  background:
    "radial-gradient(60% 50% at 18% 12%, color-mix(in oklab, var(--brand) 22%, transparent) 0%, transparent 70%)",
} as const;

const GLOW_SECONDARY_STYLE = {
  background:
    "radial-gradient(45% 40% at 85% 18%, color-mix(in oklab, var(--cta) 16%, transparent) 0%, transparent 75%)",
} as const;

const GRAIN_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
} as const;

/**
 * Page-wide hero backdrop — soft emerald glow + subtle grain.
 * Adds a small (max 20px) scroll parallax on the glow layers.
 * Respects prefers-reduced-motion.
 */
export function HeroBackdrop() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 600], [0, 20]);

  return (
    <div aria-hidden className={BASE_LAYER_CLASS}>
      {reduced ? (
        <div
          className="absolute inset-x-0 top-0 h-[42rem] opacity-60"
          style={GLOW_PRIMARY_STYLE}
        />
      ) : (
        <motion.div
          className="absolute inset-x-0 top-0 h-[42rem] opacity-60"
          style={{ ...GLOW_PRIMARY_STYLE, y: glowY }}
        />
      )}
      {reduced ? (
        <div
          className="absolute inset-x-0 top-0 h-[42rem] opacity-40"
          style={GLOW_SECONDARY_STYLE}
        />
      ) : (
        <motion.div
          className="absolute inset-x-0 top-0 h-[42rem] opacity-40"
          style={{ ...GLOW_SECONDARY_STYLE, y: glowY }}
        />
      )}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
        style={GRAIN_STYLE}
      />
    </div>
  );
}
