"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileCheck2,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { CATEGORY_LABELS, products } from "@/lib/products";
import { useQuote } from "@/components/quote-context";

const TRUST = [
  { icon: Clock, text: "Aynı iş günü dönüş" },
  { icon: FileCheck2, text: "Kalem kalem teklif" },
  { icon: ShieldCheck, text: "Ücretsiz danışmanlık" },
];

export function QuoteDrawer() {
  const { items, isOpen, remove, clear, close } = useQuote();
  const [sent, setSent] = useState(false);
  const selected = products.filter((p) => items.includes(p.slug));

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Teklif listesi">
      <button
        type="button"
        aria-label="Kapat"
        onClick={close}
        className="drawer-backdrop absolute inset-0 cursor-pointer bg-ink/45 backdrop-blur-[2px]"
      />
      <aside className="drawer-panel absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        {/* Başlık */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-scan-soft text-scan">
              <ClipboardList className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-semibold">Teklif Listesi</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {selected.length} ürün seçili
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="grid size-10 cursor-pointer place-items-center rounded-md border border-line transition-colors hover:border-scan/60 hover:text-scan"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {sent ? (
          /* Başarı ekranı */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="grid size-20 place-items-center rounded-full bg-scan-soft"
            >
              <CheckCircle2 className="size-11 text-scan" aria-hidden />
            </motion.div>
            <p className="text-xl font-semibold">Talebiniz alındı 🎉</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {selected.length} ürünlük talebiniz satış ekibimize iletildi —
              aynı iş günü içinde yapılandırılmış teklifinizle dönüş yapacağız.
            </p>
            <button
              type="button"
              onClick={() => {
                clear();
                setSent(false);
                close();
              }}
              className="mt-2 cursor-pointer rounded-md bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Tamam
            </button>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Demo — gerçek gönderim yapılmadı
            </p>
          </div>
        ) : selected.length === 0 ? (
          /* Boş durum */
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="grid size-24 place-items-center rounded-full border-2 border-dashed border-line text-muted-foreground">
              <ClipboardList className="size-10 opacity-50" aria-hidden />
            </span>
            <div>
              <p className="font-semibold">Listeniz henüz boş</p>
              <p className="mx-auto mt-1.5 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                Ürün kartlarındaki <span className="font-semibold text-scan">“Teklife Ekle”</span>{" "}
                ile ilgilendiğiniz ürünleri buraya toplayın.
              </p>
            </div>
            <Link
              href="/urunler"
              onClick={close}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Ürünlere Göz At
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            {/* Ürünler */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-2.5">
                {selected.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3 transition-colors hover:border-scan/40"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
                        {p.brand} · {CATEGORY_LABELS[p.category]}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      aria-label={`${p.name} ürününü listeden çıkar`}
                      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground opacity-60 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Güven şeridi */}
            <div className="flex items-center justify-center gap-4 border-t border-line bg-surface px-4 py-2.5">
              {TRUST.map((t) => (
                <span
                  key={t.text}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
                >
                  <t.icon className="size-3.5 text-scan" aria-hidden />
                  {t.text}
                </span>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 border-t border-line px-4 py-4">
              <label className="block">
                <span className="mb-1 block text-[12px] font-semibold">
                  Ad Soyad <span className="text-destructive">*</span>
                </span>
                <input
                  required
                  autoComplete="name"
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold">
                    E-posta <span className="text-destructive">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="ornek@firma.com"
                    className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold">
                    Telefon <span className="text-destructive">*</span>
                  </span>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="+90"
                    className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-ink py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Teklif Talebini Gönder
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                Talebiniz anında satış ekibimize düşer — aynı iş günü dönüş.
              </p>
            </form>
          </>
        )}
      </aside>
    </div>
  );
}
