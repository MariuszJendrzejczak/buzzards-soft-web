/**
 * Left-column abstract graphic for the About section — placeholder per D3
 * (no portrait, designer delivers final art). Shares the visual language of
 * <HeroGraphic /> (slate surface + emerald accent + thin PCB-ish lines), but
 * uses a radial/node-graph composition instead of horizontal traces, so the
 * two graphics read as a family without being repetitive.
 */
export function AboutGraphic() {
  return (
    <div
      aria-hidden
      className="relative h-full min-h-[22rem] w-full overflow-hidden rounded-2xl border border-border bg-surface/60 lg:min-h-[28rem]"
    >
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="about-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          </pattern>
          <radialGradient id="about-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill="url(#about-grid)" />
        <rect width="400" height="500" fill="url(#about-glow)" />

        {/* Concentric orbits — abstracted "person at the centre of a network" */}
        <g
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.75"
          strokeLinecap="round"
        >
          <circle cx="200" cy="250" r="60" opacity="0.55" />
          <circle cx="200" cy="250" r="110" opacity="0.35" />
          <circle cx="200" cy="250" r="170" opacity="0.2" />
        </g>

        {/* Branches reaching outward */}
        <g
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.25"
          strokeLinecap="round"
        >
          <path d="M200 250 L80 130" opacity="0.6" />
          <path d="M200 250 L340 110" opacity="0.5" />
          <path d="M200 250 L60 360" opacity="0.55" />
          <path d="M200 250 L350 380" opacity="0.45" />
          <path d="M200 250 L200 80" opacity="0.4" />
          <path d="M200 250 L200 440" opacity="0.4" />
        </g>

        {/* Outer nodes — scattered along the branches */}
        <g fill="var(--brand)">
          <circle cx="80" cy="130" r="3.5" />
          <circle cx="340" cy="110" r="3.5" />
          <circle cx="60" cy="360" r="3.5" />
          <circle cx="350" cy="380" r="3.5" />
          <circle cx="200" cy="80" r="3" />
          <circle cx="200" cy="440" r="3" />
        </g>

        {/* Inner ring nodes */}
        <g fill="var(--brand-soft)" opacity="0.85">
          <circle cx="260" cy="250" r="2.5" />
          <circle cx="140" cy="250" r="2.5" />
          <circle cx="200" cy="190" r="2.5" />
          <circle cx="200" cy="310" r="2.5" />
        </g>

        {/* Central node — the "person" */}
        <g>
          <circle cx="200" cy="250" r="10" fill="var(--brand)" opacity="0.18" />
          <circle cx="200" cy="250" r="5" fill="var(--brand)" />
        </g>

        {/* Subtle frame rectangles to echo HeroGraphic */}
        <g
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.75"
          opacity="0.3"
        >
          <rect x="40" y="40" width="80" height="40" rx="4" />
          <rect x="280" y="420" width="80" height="40" rx="4" />
        </g>
      </svg>
    </div>
  );
}
