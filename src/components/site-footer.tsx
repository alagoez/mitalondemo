"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_TEXT, langFromPath, type Lang } from "@/lib/i18n";

type ColumnKey = keyof typeof FOOTER_TEXT.columns;

const COLUMNS: {
  key: ColumnKey;
  links: { label: Record<Lang, string>; href: string }[];
}[] = [
  {
    key: "scanners",
    links: [
      { label: { tr: "FreeScan Serisi", en: "FreeScan Series" }, href: "/urunler?kategori=tarayici" },
      { label: { tr: "EinScan Serisi", en: "EinScan Series" }, href: "/urunler?kategori=tarayici" },
      { label: { tr: "AutoScan Inspec", en: "AutoScan Inspec" }, href: "/urunler?kategori=tarayici" },
      { label: { tr: "RobotScan", en: "RobotScan" }, href: "/urunler?kategori=tarayici" },
      { label: { tr: "Tümü", en: "View all" }, href: "/urunler?kategori=tarayici" },
    ],
  },
  {
    key: "printers",
    links: [
      { label: { tr: "FDM Yazıcılar", en: "FDM Printers" }, href: "/urunler?kategori=yazici" },
      { label: { tr: "SLS / Toz", en: "SLS / Powder" }, href: "/urunler?kategori=yazici" },
      { label: { tr: "Metal (SLM)", en: "Metal (SLM)" }, href: "/urunler?kategori=yazici" },
      { label: { tr: "Reçine / DLP", en: "Resin / DLP" }, href: "/urunler?kategori=yazici" },
      { label: { tr: "Tümü", en: "View all" }, href: "/urunler?kategori=yazici" },
    ],
  },
  {
    key: "cutting",
    links: [
      { label: { tr: "Karbür Insert", en: "Carbide Inserts" }, href: "/urunler?kategori=kesici" },
      { label: { tr: "Seramik Insert", en: "Ceramic Inserts" }, href: "/urunler?kategori=kesici" },
      { label: { tr: "Özel Takımlar", en: "Custom Tooling" }, href: "/urunler?kategori=kesici" },
      { label: { tr: "Yazılımlar", en: "Software" }, href: "/urunler?kategori=yazilim" },
    ],
  },
  {
    key: "industrial",
    links: [
      { label: { tr: "Teknik Seramikler", en: "Technical Ceramics" }, href: "/urunler?kategori=seramik" },
      { label: { tr: "Tekstil Yedek Parça", en: "Textile Spare Parts" }, href: "/urunler?kategori=yedek" },
      { label: { tr: "Özel Üretim", en: "Custom Production" }, href: "/urunler?kategori=yedek" },
    ],
  },
  {
    key: "corporate",
    links: [
      { label: { tr: "Hakkımızda", en: "About Us" }, href: "/hakkimizda" },
      { label: { tr: "Referanslar", en: "Case Studies" }, href: "/#referanslar" },
      { label: { tr: "İletişim", en: "Contact" }, href: "/iletisim" },
    ],
  },
  {
    key: "support",
    links: [
      { label: { tr: "Teklif İste", en: "Request a Quote" }, href: "/urunler" },
      { label: { tr: "Servis & Kurulum", en: "Service & Setup" }, href: "/iletisim" },
      { label: { tr: "KVKK", en: "Privacy (KVKK)" }, href: "/kvkk" },
    ],
  },
];

export function SiteFooter() {
  const pathname = usePathname();
  const lang = langFromPath(pathname);

  return (
    <footer id="iletisim" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.3fr_repeat(6,1fr)]">
          <div>
            <Image
              src="/images/mitalon-logo-white.svg"
              alt="Mitalon"
              width={158}
              height={46}
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-[210px] text-[13px] leading-relaxed text-white/60">
              {FOOTER_TEXT.tagline[lang]}
            </p>
            <ul className="mt-4 space-y-1 text-[13px] text-white/60">
              <li>+90 535 249 23 56</li>
              <li>info@mitalon.com</li>
              <li>{FOOTER_TEXT.address[lang]}</li>
            </ul>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.key}>
              <p className="text-[13px] font-semibold text-white/90">
                {FOOTER_TEXT.columns[col.key][lang]}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label.tr}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-white/55 transition-colors hover:text-white"
                    >
                      {l.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <p className="text-xs text-white/45">{FOOTER_TEXT.rights[lang]}</p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">
            {FOOTER_TEXT.demo[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
