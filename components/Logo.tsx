/* BIZBUYUK brand lockup — gold-framed raven emblem beside the wordmark.

   The old single badge stacked the wordmark under the emblem, so at the 48px
   the nav gives it the name rendered about ten pixels tall and disappeared
   against the dark hero. Set side by side, the name stays readable at the same
   overall height, and `tone` picks the wordmark cut that survives the ground
   it is placed on. */

const WORDMARK = {
  light: "/brand/logo-wordmark-white.webp", // for dark grounds
  dark: "/brand/logo-wordmark-dark.webp", // for sand / light grounds
} as const;

export function LogoImage({
  height = 46,
  className = "",
  priority = false,
  tone = "light",
  emblemOnly = false,
}: {
  /** Height of the emblem in px; the wordmark is set optically against it. */
  height?: number;
  className?: string;
  priority?: boolean;
  /** "light" = light wordmark for dark backgrounds (the default across the site). */
  tone?: "light" | "dark";
  emblemOnly?: boolean;
}) {
  const wordHeight = Math.round(height * 0.38);

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-emblem.webp"
        alt="BIZBUYUK"
        width={Math.round((height * 203) / 176)}
        height={height}
        style={{ height, width: "auto" }}
        fetchPriority={priority ? "high" : "auto"}
        className="shrink-0"
      />
      {!emblemOnly && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={WORDMARK[tone]}
          alt="BIZBUYUK Real Estate"
          width={Math.round((wordHeight * 573) / 72)}
          height={wordHeight}
          style={{ height: wordHeight, width: "auto" }}
          fetchPriority={priority ? "high" : "auto"}
          className="shrink-0"
        />
      )}
    </span>
  );
}
