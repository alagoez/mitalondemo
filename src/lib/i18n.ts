export type Lang = "tr" | "en";

/** /en ile başlayan yollar İngilizce sürümdür. */
export function langFromPath(pathname: string | null): Lang {
  return pathname?.startsWith("/en") ? "en" : "tr";
}

export const NAV_ITEMS: { href: string; label: Record<Lang, string> }[] = [
  { href: "/urunler?kategori=tarayici", label: { tr: "3D Tarayıcılar", en: "3D Scanners" } },
  { href: "/urunler?kategori=yazici", label: { tr: "3D Yazıcılar", en: "3D Printers" } },
  { href: "/urunler?kategori=yazilim", label: { tr: "Yazılımlar", en: "Software" } },
  { href: "/urunler?kategori=kesici", label: { tr: "Kesici Takımlar", en: "Cutting Tools" } },
  { href: "/urunler?kategori=seramik", label: { tr: "Teknik Seramikler", en: "Technical Ceramics" } },
  { href: "/urunler?kategori=yedek", label: { tr: "Yedek Parça", en: "Spare Parts" } },
  { href: "/hakkimizda", label: { tr: "Hakkımızda", en: "About" } },
  { href: "/iletisim", label: { tr: "İletişim", en: "Contact" } },
];

export const HEADER_TEXT = {
  topbar: {
    tr: "Shining 3D & Sharebot yetkili distribütörü",
    en: "Authorized distributor of Shining 3D & Sharebot",
  },
  quote: { tr: "Teklif Listesi", en: "Quote List" },
  quoteShort: { tr: "Teklif", en: "Quote" },
} as const;

export const FOOTER_TEXT = {
  tagline: {
    tr: "20 yıllık otomotiv tecrübesiyle 3D teknolojiler ve endüstriyel ürünlerde çözüm ortağınız.",
    en: "Your partner in 3D technologies and industrial products, backed by 20+ years of automotive experience.",
  },
  address: { tr: "Pega 2 Plaza, Nilüfer / Bursa", en: "Pega 2 Plaza, Nilüfer / Bursa, Türkiye" },
  columns: {
    scanners: { tr: "3D Tarayıcılar", en: "3D Scanners" },
    printers: { tr: "3D Yazıcılar", en: "3D Printers" },
    cutting: { tr: "Kesici Takımlar", en: "Cutting Tools" },
    industrial: { tr: "Endüstriyel Parça", en: "Industrial Parts" },
    corporate: { tr: "Kurumsal", en: "Company" },
    support: { tr: "Destek", en: "Support" },
  },
  rights: {
    tr: "© 2026 Mitalon Yenilikçi Mühendislik — Tüm hakları saklıdır.",
    en: "© 2026 Mitalon Innovative Engineering — All rights reserved.",
  },
  demo: {
    tr: "Konsept Tasarım Demosu · Alta AI",
    en: "Concept Design Demo · Alta AI",
  },
} as const;
