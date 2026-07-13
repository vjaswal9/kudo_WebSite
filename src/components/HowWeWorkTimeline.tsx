// src/components/HowWeWorkTimeline.tsx
// The "How We Work" section (Clarify -> Govern -> Deliver) with a GSAP
// ScrollTrigger scrubbed reveal: as the reader scrolls through the section the
// connector lines draw, the phase numbers pop, and each phase's text rises in.
// The markup is fully present and visible without JS (SEO / no-JS safe); GSAP
// only enhances. Reduced-motion users get the plain static layout.
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import howWeWorkBg from "@/assets/how-we-work.webp";

export function HowWeWorkTimeline() {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const steps = [0, 1, 2].map((i) => ({
    numKey: `how_${i}_num` as const,
    titleKey: `how_${i}_title` as const,
    descKey: `how_${i}_desc` as const,
  }));

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scope = root.current;
        if (!scope) return;
        const nums = scope.querySelectorAll(".hwt-num");
        const texts = scope.querySelectorAll(".hwt-text");
        const lines = scope.querySelectorAll(".hwt-line");

        // Starting (hidden) state is applied only here, in the client effect,
        // so if JS never runs the content stays fully visible.
        gsap.set(nums, { scale: 0.4, opacity: 0, transformOrigin: "center" });
        gsap.set(texts, { opacity: 0, y: 24 });
        gsap.set(lines, { scaleY: 0, transformOrigin: "top center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        });

        steps.forEach((_, i) => {
          const at = i * 0.6;
          tl.to(nums[i], { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, at)
            .to(texts[i], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, at + 0.1);
          if (lines[i]) {
            tl.to(lines[i], { scaleY: 1, duration: 0.5, ease: "none" }, at + 0.2);
          }
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="how" aria-labelledby="how-heading" className="section-warm relative py-24 md:py-32">
      <div ref={root}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden mb-16 shadow-xl">
            <img
              src={howWeWorkBg}
              alt="AI advisory team planning strategy and governance"
              className="w-full h-52 md:h-64 object-cover"
              loading="lazy"
              width="1200"
              height="256"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("how_label")}</p>
          <h2 id="how-heading" className="text-3xl md:text-5xl mb-4">{t("how_h2")}</h2>
          <ol ref={listRef} className="space-y-0 mt-16" aria-label="AI advisory engagement phases">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-8 items-start group">
                <div className="flex flex-col items-center">
                  <span
                    className="hwt-num step-num text-4xl font-bold text-primary"
                    aria-label={`Phase ${t(s.numKey)}`}
                  >
                    {t(s.numKey)}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hwt-line w-px h-20 bg-border/60 mt-3" aria-hidden="true">
                      <ArrowDown className="w-4 h-4 text-muted-foreground/50 -ml-[7px] mt-16" />
                    </div>
                  )}
                </div>
                <div className="hwt-text pb-12">
                  <h3 className="text-xl font-semibold mb-2">{t(s.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
