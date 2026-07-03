// src/components/BrandMark.tsx
// Decorative animated version of the Kudo dot-mark: a diamond (rhombus) of
// champagne-gold dots (rows 1,3,5,7,9,11,9,7,5,3,1), matching the mark in the
// logo. On load the dots assemble outward from the centre with a staggered
// GSAP animation. The real PNG logo in the nav/footer is untouched.
// Reduced-motion / no-JS: the mark renders fully assembled (static).
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const ROW_COUNTS = [1, 3, 5, 7, 9, 11, 9, 7, 5, 3, 1];
const GAP = 11;
const R = 3.4;

// Build the diamond: each row is centred, so the dots form a rhombus with
// points at top and bottom and the widest row (11) through the middle. Rows
// fade from solid at the top to nearly transparent at the bottom point,
// matching the logo. This inline opacity is also the resting/static state.
const DOTS = (() => {
  const out: { cx: number; cy: number; opacity: number }[] = [];
  const lastRow = ROW_COUNTS.length - 1;
  ROW_COUNTS.forEach((count, row) => {
    const opacity = Math.round(Math.max(0.06, 1 - Math.pow(row / lastRow, 1.8) * 0.95) * 100) / 100;
    for (let i = 0; i < count; i++) {
      out.push({ cx: (i - (count - 1) / 2) * GAP, cy: row * GAP, opacity });
    }
  });
  return out;
})();

export function BrandMark({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const circles = ref.current?.querySelectorAll("circle");
        if (!circles) return;
        gsap.from(circles, {
          opacity: 0,
          scale: 0,
          transformOrigin: "center",
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: { each: 0.012, from: "center" },
          delay: 0.15,
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={className}
      width="64"
      height="65"
      viewBox="-60 -6 120 122"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {DOTS.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={R} fill="hsl(var(--primary))" opacity={d.opacity} />
      ))}
    </svg>
  );
}
