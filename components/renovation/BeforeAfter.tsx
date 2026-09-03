"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-compare slider. Pointer events cover mouse, touch and pen with one
 * code path; the handle is also a real ARIA slider so it works from the
 * keyboard. The "after" image sits underneath and the "before" image is
 * clipped, so the pair must be the same room from the same angle.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  hint,
  alt,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  hint: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPos((v) => Math.max(0, v - step));
    else if (e.key === "ArrowRight") setPos((v) => Math.min(100, v + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={frame}
      className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-[1.6rem] ring-1 ring-line"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      {/* Clipping rather than resizing keeps both images at the same scale, so
          the two halves line up at any width without measuring the frame. */}
      <img
        src={before}
        alt=""
        aria-hidden
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cream backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cream backdrop-blur">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-cream/80" style={{ left: `${pos}%` }} />
      <button
        type="button"
        role="slider"
        aria-label={hint}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        style={{ left: `${pos}%` }}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-cream text-ink shadow-lg ring-1 ring-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
