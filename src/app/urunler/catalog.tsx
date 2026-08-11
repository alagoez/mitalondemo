"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BRANDS,
  CATEGORY_LABELS,
  products,
  type Category,
} from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const CATEGORY_FILTERS: { value: Category | "hepsi"; label: string }[] = [
  { value: "hepsi", label: "Tümü" },
  { value: "tarayici", label: CATEGORY_LABELS.tarayici },
  { value: "yazici", label: CATEGORY_LABELS.yazici },
  { value: "kesici", label: CATEGORY_LABELS.kesici },
  { value: "yazilim", label: CATEGORY_LABELS.yazilim },
  { value: "seramik", label: CATEGORY_LABELS.seramik },
  { value: "yedek", label: CATEGORY_LABELS.yedek },
];

const VALID_CATEGORIES = new Set<string>([
  "tarayici",
  "yazici",
  "kesici",
  "yazilim",
  "seramik",
  "yedek",
]);

export function Catalog() {
  const params = useSearchParams();
  const raw = params.get("kategori");
  const paramCategory: Category | "hepsi" =
    raw && VALID_CATEGORIES.has(raw) ? (raw as Category) : "hepsi";
  const [category, setCategory] = useState<Category | "hepsi">(paramCategory);
  const [brand, setBrand] = useState<string | "hepsi">("hepsi");
  const [query, setQuery] = useState("");

  // Menüden gelen kategori linkleri sayfa açıkken de filtreyi değiştirsin
  useEffect(() => {
    setCategory(paramCategory);
  }, [paramCategory]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "hepsi" && p.category !== category) return false;
      if (brand !== "hepsi" && p.brand !== brand) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.brand} ${p.blurb} ${p.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, brand, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-scan">
        Katalog
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Ürünler</h1>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Filtreleyin, inceleyin, teklif listenize ekleyin — satış ekibimiz aynı
        iş günü dönüş yapar.
      </p>

      {/* Filtreler */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                category === c.value
                  ? "border-scan bg-scan text-primary-foreground"
                  : "border-line text-muted-foreground hover:border-scan/60 hover:text-scan",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün ara…"
              className="w-52 rounded-md border border-line bg-surface py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-scan"
            />
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            aria-label="Marka filtresi"
            className="rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-scan"
          >
            <option value="hepsi">Tüm markalar</option>
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sonuçlar */}
      <p className="mt-6 font-mono text-xs text-muted-foreground">
        {filtered.length} ürün listeleniyor
      </p>
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-line p-12 text-center text-sm text-muted-foreground">
          Bu filtrelerle eşleşen ürün yok. Filtreleri temizleyip tekrar deneyin.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
