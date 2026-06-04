/* BIZBUYUK brand logo — gold-framed raven emblem with wordmark.
   Self-contained badge image, works on light and dark backgrounds. */

export function LogoImage({
  height = 46,
  className = "",
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/bizbuyuk-logo.png"
      alt="BIZBUYUK Real Estate"
      style={{ height }}
      width={(height * 320) / 337}
      height={height}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
    />
  );
}
