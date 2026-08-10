"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  /** İlk kelimenin gecikmesi (ms) */
  baseDelay?: number;
  /** Kelimeler arası kademe (ms) */
  step?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Metni kelimelere bölüp görünüme girince kademeli (blur'dan süzülen)
 * girişle sahneler — giriş sahnesindeki kelime koreografisinin sayfa içi hali.
 */
export function WordReveal({
  text,
  className,
  baseDelay = 0,
  step = 90,
  as: Tag = "h2",
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={cn("wreveal", className)}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="wreveal-word mr-[0.26em] inline-block"
          style={{ "--d": `${baseDelay + i * step}ms` } as React.CSSProperties}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
