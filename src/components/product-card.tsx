"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";
import { useQuote } from "@/components/quote-context";
import { cn } from "@/lib/utils";

/** "Shining 3D" → "S3", "Sharebot" → "SH" — amblem dairesi için kısaltma */
function brandMark(brand: string) {
  const words = brand.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return brand.slice(0, 2).toUpperCase();
}

export function ProductCard({ product }: { product: Product }) {
  const { add, items } = useQuote();
  const [detailOpen, setDetailOpen] = useState(false);
  const inList = items.includes(product.slug);
  const firstSpec = Object.entries(product.specs)[0];

  return (
    <>
      <article className="group flex flex-col rounded-[22px] bg-white p-3 shadow-[0_10px_32px_-14px_oklch(0.25_0.03_260/0.35)] ring-1 ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-16px_oklch(0.25_0.03_260/0.45)]">
        {/* Gömülü görsel — kendi yuvarlak köşeleriyle */}
        <button
          type="button"
          onClick={() => setDetailOpen(true)}
          className="relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl"
          aria-label={`${product.name} detayları`}
        >
          {product.photo ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <span className="absolute inset-0 bg-surface">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
            </span>
          )}

          {/* Rozet — sol üst */}
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md",
              product.photo
                ? "bg-white/20 text-white ring-1 ring-white/25"
                : "bg-white/85 text-ink ring-1 ring-line/60",
            )}
          >
            {product.tags[0]}
          </span>

          {/* Marka amblemi — sağ üst daire */}
          <span
            aria-hidden
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white font-mono text-[11px] font-bold tracking-tight text-ink shadow-md"
          >
            {brandMark(product.brand)}
          </span>
        </button>

        {/* Metin bloğu */}
        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="block cursor-pointer text-left"
          >
            <h3 className="text-lg font-bold leading-snug">{product.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">
              {product.brand} · {product.tags[0]}
            </p>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground/90">
              {product.blurb}
            </p>
          </button>

          {/* Alt satır: spec hapı + teklif hapı */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={() => setDetailOpen(true)}
              title={firstSpec ? `${firstSpec[0]}: ${firstSpec[1]}` : undefined}
              className="min-w-0 cursor-pointer rounded-full bg-surface-2 px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-line"
            >
              <span className="block max-w-[9rem] truncate">
                {firstSpec ? firstSpec[1] : "Detay"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => add(product.slug)}
              disabled={inList}
              className={cn(
                "flex shrink-0 cursor-pointer items-center gap-2 rounded-full py-2 pl-4 pr-2 text-sm font-semibold transition-all",
                inList
                  ? "bg-scan-soft text-scan ring-1 ring-inset ring-scan/25"
                  : "bg-ink text-white hover:opacity-90",
              )}
            >
              {inList ? "Listede" : "Teklife Ekle"}
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border",
                  inList ? "border-scan/30" : "border-white/30",
                )}
              >
                {inList ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  <ArrowUpRight className="size-3.5" aria-hidden />
                )}
              </span>
            </button>
          </div>
        </div>
      </article>

      {detailOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setDetailOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative z-10 max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-background shadow-2xl">
            <div className="grid sm:grid-cols-2">
              {product.photo ? (
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 336px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-square bg-surface">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 336px"
                    className="object-contain p-6"
                  />
                </div>
              )}
              <div className="flex flex-col p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-scan">
                  {product.brand} · {CATEGORY_LABELS[product.category]}
                </p>
                <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.blurb}
                </p>
                <dl className="mt-4 space-y-2 border-t border-line pt-4">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-sm">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                {product.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[10.5px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      add(product.slug);
                      setDetailOpen(false);
                    }}
                    disabled={inList}
                    className={cn(
                      "w-full cursor-pointer rounded-full py-2.5 text-sm font-semibold transition-all",
                      inList
                        ? "bg-scan-soft text-scan ring-1 ring-inset ring-scan/25"
                        : "bg-ink text-white hover:opacity-90",
                    )}
                  >
                    {inList ? "Teklif Listesinde" : "Teklif Listesine Ekle"}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              aria-label="Kapat"
              className="absolute right-3 top-3 cursor-pointer rounded-md border border-line bg-white/80 p-2 backdrop-blur-sm transition-colors hover:text-scan"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
