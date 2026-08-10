"use client";

import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";

const STATS: {
  value: number;
  suffix: string;
  label: { tr: string; en: string };
}[] = [
  { value: 20, suffix: "+", label: { tr: "Yıl otomotiv tecrübesi", en: "Years of automotive experience" } },
  { value: 35, suffix: "+", label: { tr: "Ürün portföyü", en: "Products in portfolio" } },
  { value: 7, suffix: "", label: { tr: "Hizmet verilen sektör", en: "Industries served" } },
  { value: 2, suffix: "", label: { tr: "Global marka distribütörlüğü", en: "Global brand partnerships" } },
];

/**
 * Görünüme girince anime.js ile 0'dan hedefe sayan istatistik bandı.
 * prefers-reduced-motion açıkken animasyonsuz, doğrudan hedef değer basılır.
 */
export function StatsBand({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const numbers = root.querySelectorAll<HTMLElement>("[data-count]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      if (started.current) return;
      started.current = true;
      numbers.forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        if (reduced) {
          el.textContent = String(target);
          return;
        }
        const counter = { value: 0 };
        animate(counter, {
          value: target,
          duration: 1600,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = String(utils.round(counter.value, 0));
          },
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label.tr} className="text-center">
            <p className="font-mono text-4xl font-semibold text-sky-300 tabular-nums sm:text-5xl">
              <span data-count={s.value}>0</span>
              {s.suffix}
            </p>
            <p className="mt-2 text-[13px] text-white/60">{s.label[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
