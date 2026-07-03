// src/components/CountUp.tsx
// Animates a numeric stat counting up from 0 when it scrolls into view.
// SSR-safe: the final value is rendered on the server and on first client
// render (correct for crawlers / JS disabled); the count only runs after
// hydration, in view, and when motion is allowed. Non-numeric values and bare
// years (e.g. "2031") render statically. Reuses the existing scroll hook.
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CountUpProps {
  value: string;
  className?: string;
  durationMs?: number;
}

interface Parsed {
  prefix: string;
  suffix: string;
  target: number;
  hasComma: boolean;
}

// Split "prefix + number + suffix". Returns null when there is nothing to
// animate (no digits, or a bare 4-digit year that reads oddly counting from 0).
function parseValue(value: string): Parsed | null {
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!m) return null;
  const prefix = m[1];
  const suffix = m[3];
  const digits = m[2].replace(/,/g, "");
  const target = parseInt(digits, 10);
  if (!Number.isFinite(target)) return null;
  const isBareYear =
    prefix.trim() === "" &&
    suffix.trim() === "" &&
    /^\d{4}$/.test(digits) &&
    target >= 1900 &&
    target <= 2100;
  if (isBareYear) return null;
  return { prefix, suffix, target, hasComma: m[2].includes(",") };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({ value, className, durationMs = 1200 }: CountUpProps) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const { ref, isVisible } = useScrollAnimation(0.4);
  const [display, setDisplay] = useState<number>(parsed ? parsed.target : 0);
  const rafRef = useRef<number | undefined>(undefined);

  const target = parsed?.target ?? 0;

  useEffect(() => {
    if (!parsed || !isVisible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / durationMs, 1);
      setDisplay(Math.round(easeOut(p) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    setDisplay(0);
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, target, durationMs, parsed]);

  // Non-numeric or year: render exactly as given.
  if (!parsed) return <span className={className}>{value}</span>;

  const formatted = parsed.hasComma ? display.toLocaleString() : String(display);
  return (
    <span
      ref={ref as unknown as RefObject<HTMLSpanElement>}
      className={className}
      aria-label={value}
    >
      <span aria-hidden="true" className="tabular-nums">
        {parsed.prefix}
        {formatted}
        {parsed.suffix}
      </span>
    </span>
  );
}
