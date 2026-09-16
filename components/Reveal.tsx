"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/* The blur that used to ride along with this was expensive to composite and
   made every section look like it was still loading. Shorter travel, no blur. */
const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  const reduced = useReducedMotion();

  if (reduced) return <MotionTag className={className}>{children}</MotionTag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={variants}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
