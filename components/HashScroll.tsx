"use client";

import { useEffect } from "react";

/**
 * A link like /services#protection should open on that section, but the App
 * Router restores scroll to the top after hydration and cancels the browser's
 * own jump to the hash. Re-assert the position for a short window instead: it
 * outlasts both the router's reset and the reflow that web fonts cause, and it
 * stops the moment the visitor scrolls anywhere themselves.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    const land = () =>
      el.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });

    let last = -1;
    let frames = 0;
    let raf = 0;

    const hold = () => {
      // Anything other than the position we set last frame means the visitor
      // has taken over, so stop correcting.
      if (last !== -1 && Math.round(window.scrollY) !== last) return;
      land();
      last = Math.round(window.scrollY);
      if (++frames < 45) raf = requestAnimationFrame(hold);
    };

    raf = requestAnimationFrame(hold);

    document.fonts?.ready.then(() => {
      if (last !== -1 && Math.round(window.scrollY) === last) land();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
