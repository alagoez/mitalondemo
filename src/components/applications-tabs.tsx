"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TabLang = "tr" | "en";

interface AppTab {
  key: string;
  label: Record<TabLang, string>;
  title: Record<TabLang, string>;
  text: Record<TabLang, string>;
  image: string;
  href: string;
}

const TABS: AppTab[] = [
  {
    key: "tersine",
    label: { tr: "Tersine Mühendislik", en: "Reverse Engineering" },
    title: {
      tr: "Kırık parçadan üretime hazır CAD modeline",
      en: "From a broken part to a production-ready CAD model",
    },
    text: {
      tr: "Yedek parçası bulunamayan veya teknik resmi olmayan parçalar, 3D tarama ile mikron hassasiyetinde dijitalleştirilir; Geomagic Design X ile üretime hazır CAD modeline dönüştürülür.",
      en: "Parts with no spare supply or technical drawings are digitized with micron-level 3D scanning, then converted into production-ready CAD models with Geomagic Design X.",
    },
    image: "/images/freescan-combo.png",
    href: "/urunler?kategori=tarayici",
  },
  {
    key: "kalite",
    label: { tr: "Boyutsal Kalite Kontrol", en: "Dimensional Inspection" },
    title: {
      tr: "CAD ile karşılaştırmalı renk haritalı raporlar",
      en: "Color-map inspection reports against CAD",
    },
    text: {
      tr: "Üretilen parça, tasarım verisiyle otomatik karşılaştırılır; sapmalar renk haritasıyla raporlanır. RobotScan hücresiyle bu denetim üretim hattında tam otomatik çalışır.",
      en: "Manufactured parts are automatically compared with design data; deviations are reported as color maps. With the RobotScan cell, this inspection runs fully automated on the production line.",
    },
    image: "/images/robotscan-e0505.png",
    href: "/urunler?kategori=tarayici",
  },
  {
    key: "prototip",
    label: { tr: "Hızlı Prototip", en: "Rapid Prototyping" },
    title: {
      tr: "Fikirden fonksiyonel prototipe günler içinde",
      en: "From idea to functional prototype in days",
    },
    text: {
      tr: "Sharebot FDM ve reçine platformlarıyla tasarım doğrulama, montaj denemesi ve fonksiyonel testler için prototipler saatler içinde üretilir.",
      en: "With Sharebot FDM and resin platforms, prototypes for design validation, assembly checks and functional testing are produced within hours.",
    },
    image: "/images/sharebot-big.jpg",
    href: "/urunler?kategori=yazici",
  },
  {
    key: "uretim",
    label: { tr: "Son Kullanım Üretimi", en: "End-Use Production" },
    title: {
      tr: "Düşük adetli seri üretim ve metal parçalar",
      en: "Low-volume production and metal parts",
    },
    text: {
      tr: "SLS toz teknolojisi ve Metal One ile kalıp maliyetine girmeden fonksiyonel son kullanım parçaları ve üretim aparatları basılır.",
      en: "SLS powder technology and Metal One print functional end-use parts and manufacturing aids without tooling costs.",
    },
    image: "/images/sharebot-metal-one.jpg",
    href: "/urunler?kategori=yazici",
  },
  {
    key: "takim",
    label: { tr: "Talaşlı İmalat", en: "Machining" },
    title: {
      tr: "Kesici uçtan özel takıma işleme çözümleri",
      en: "Machining solutions from inserts to custom tooling",
    },
    text: {
      tr: "CNMG/SNGX insert uçlar, özel çapak alma ve pah kırma takımları ile talaşlı imalat hatlarınız için yüksek takım ömrü ve ölçü kararlılığı.",
      en: "CNMG/SNGX inserts plus custom deburring and chamfering tools deliver long tool life and dimensional stability for your machining lines.",
    },
    image: "/images/cnmg-1204.jpg",
    href: "/urunler?kategori=kesici",
  },
];

const LINK_TEXT: Record<TabLang, string> = {
  tr: "İlgili ürünleri incele",
  en: "Browse related products",
};

export function ApplicationsTabs({ lang = "tr" }: { lang?: TabLang }) {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={cn(
              "-mb-px cursor-pointer border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              active === t.key
                ? "border-scan text-scan"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white">
          <Image
            key={tab.image}
            src={tab.image}
            alt={tab.title[lang]}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-contain p-6"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-balance">
            {tab.title[lang]}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {tab.text[lang]}
          </p>
          <Link
            href={tab.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-scan hover:underline"
          >
            {LINK_TEXT[lang]}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
