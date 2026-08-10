"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";
import { useQuote } from "@/components/quote-context";

export function ProductCard({ product }: { product: Product }) {
  const { add, items } = useQuote();
  const [detailOpen, setDetailOpen] = useState(false);
  const inList = items.includes(product.slug);

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-scan/50">
        <button
          type="button"
          onClick={() => setDetailOpen(true)}
          className="relative aspect-square w-full bg-white"
          aria-label={`${product.name} detayları`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </button>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-scan">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.blurb}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDetailOpen(true)}
              className="flex-1 rounded-md border border-line px-3 py-2 text-xs font-medium transition-colors hover:border-scan/60 hover:text-scan"
            >
              İncele
            </button>
            <button
              type="button"
              onClick={() => add(product.slug)}
              disabled={inList}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-scan px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Plus className="size-3.5" aria-hidden />
              {inList ? "Listede" : "Teklife Ekle"}
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
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative z-10 max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-background shadow-2xl">
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-square bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 336px"
                  className="object-contain p-6"
                />
              </div>
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
                <button
                  type="button"
                  onClick={() => {
                    add(product.slug);
                    setDetailOpen(false);
                  }}
                  className="mt-auto w-full rounded-md bg-scan py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Teklif Listesine Ekle
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              aria-label="Kapat"
              className="absolute right-3 top-3 rounded-md border border-line bg-background/80 p-2 hover:text-scan"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
