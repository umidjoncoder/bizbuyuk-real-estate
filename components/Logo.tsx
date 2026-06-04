/* Recreated BIZ BUYUK emblem: circular badge + isometric hexagon-cube monogram.
   Pure SVG — crisp at any size, gold on transparent. */

export function Emblem({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="BIZ BUYUK Properties emblem"
    >
      <defs>
        <linearGradient id="bbGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6d2f" />
          <stop offset="42%" stopColor="#ecd49b" />
          <stop offset="60%" stopColor="#c8a15a" />
          <stop offset="100%" stopColor="#8a6d2f" />
        </linearGradient>
        <path id="bbTop" d="M100,100 m-74,0 a74,74 0 1,1 148,0" fill="none" />
        <path id="bbBottom" d="M100,100 m-62,0 a62,62 0 1,0 124,0" fill="none" />
      </defs>

      {/* rings */}
      <circle cx="100" cy="100" r="96" fill="none" stroke="url(#bbGold)" strokeWidth="1.4" opacity="0.7" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="url(#bbGold)" strokeWidth="3" />

      {/* curved text */}
      <text fill="url(#bbGold)" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="15" letterSpacing="3.4">
        <textPath href="#bbTop" startOffset="50%" textAnchor="middle">
          BIZ BUYUK PROPERTIES
        </textPath>
      </text>
      <text fill="url(#bbGold)" fontFamily="var(--font-sans), sans-serif" fontWeight="600" fontSize="9.5" letterSpacing="3.6">
        <textPath href="#bbBottom" startOffset="50%" textAnchor="middle">
          ★ THE BEST REAL ESTATE ★
        </textPath>
      </text>

      {/* isometric hexagon-cube monogram */}
      <g stroke="url(#bbGold)" strokeWidth="3.2" strokeLinejoin="round" fill="none">
        {/* outer hexagon */}
        <polygon points="100,52 142,76 142,124 100,148 58,124 58,76" />
        {/* cube */}
        <polygon points="100,76 121,88 121,112 100,124 79,112 79,88" fill="rgba(200,161,90,0.10)" />
        <line x1="100" y1="76" x2="100" y2="100" />
        <line x1="100" y1="100" x2="79" y2="112" />
        <line x1="100" y1="100" x2="121" y2="112" />
      </g>
    </svg>
  );
}

/* Compact mark for the navbar */
export function Mark({ size = 38, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="bbGoldMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6d2f" />
          <stop offset="45%" stopColor="#ecd49b" />
          <stop offset="100%" stopColor="#8a6d2f" />
        </linearGradient>
      </defs>
      <g stroke="url(#bbGoldMark)" strokeWidth="4" strokeLinejoin="round" fill="none">
        <polygon points="50,10 84,30 84,70 50,90 16,70 16,30" />
        <polygon points="50,32 68,42 68,62 50,72 32,62 32,42" fill="rgba(200,161,90,0.12)" />
        <line x1="50" y1="32" x2="50" y2="52" />
        <line x1="50" y1="52" x2="32" y2="62" />
        <line x1="50" y1="52" x2="68" y2="62" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-[0.12em] ${className}`}>
      <span className="text-[1.2rem] font-extrabold tracking-[0.06em] text-cream leading-none">
        BIZBUYUK
      </span>
      <span className="text-[0.58rem] font-bold tracking-[0.3em] text-gold leading-none">
        REAL ESTATE
      </span>
    </span>
  );
}
