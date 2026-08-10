"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HEADER_TEXT, NAV_ITEMS, langFromPath } from "@/lib/i18n";
import { useQuote } from "@/components/quote-context";

export function SiteHeader() {
  const { items, open } = useQuote();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lang = langFromPath(pathname);

  return (
    <header className="site-header sticky top-0 z-40 bg-background/95 shadow-[0_1px_0_0_var(--line)] backdrop-blur">
      {/* İnce üst bar */}
      <div className="bg-ink text-white">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-4 px-4 text-[12px] sm:px-6">
          <p className="truncate opacity-90">{HEADER_TEXT.topbar[lang]}</p>
          <div className="flex shrink-0 items-center gap-4">
            <a
              href="tel:+905352492356"
              className="hidden items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100 sm:flex"
            >
              <Phone className="size-3" aria-hidden />
              +90 535 249 23 56
            </a>
            {/* Dil seçici */}
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <Link
                href="/"
                className={cn(
                  "cursor-pointer rounded px-1.5 py-0.5 transition-colors",
                  lang === "tr" ? "bg-white/15 font-semibold" : "opacity-60 hover:opacity-100",
                )}
              >
                TR
              </Link>
              <Link
                href="/en"
                className={cn(
                  "cursor-pointer rounded px-1.5 py-0.5 transition-colors",
                  lang === "en" ? "bg-white/15 font-semibold" : "opacity-60 hover:opacity-100",
                )}
              >
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        <Link href={lang === "en" ? "/en" : "/"} aria-label="Mitalon" className="shrink-0">
          <Image
            src="/images/mitalon-logo.svg"
            alt="Mitalon"
            width={172}
            height={50}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium text-foreground/75 transition-colors hover:text-scan"
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-ink px-3.5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-4"
          >
            <ClipboardList className="size-4" aria-hidden />
            <span className="hidden sm:inline">{HEADER_TEXT.quote[lang]}</span>
            <span className="sm:hidden">{HEADER_TEXT.quoteShort[lang]}</span>
            {items.length > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-white font-mono text-[11px] font-semibold text-ink">
                {items.length}
              </span>
            )}
          </button>

          {/* Mobil menü düğmesi */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            className="grid size-11 cursor-pointer place-items-center rounded-md border border-line lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobil menü paneli */}
      {menuOpen && (
        <nav className="border-t border-line bg-background lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-[15px] font-medium text-foreground/85 transition-colors hover:text-scan"
                >
                  {item.label[lang]}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <a
                href="tel:+905352492356"
                className="flex items-center gap-2 text-[14px] font-semibold text-scan"
              >
                <Phone className="size-4" aria-hidden />
                +90 535 249 23 56
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
