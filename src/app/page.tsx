import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Factory,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PointCloudIntro } from "@/components/point-cloud-intro";
import { ApplicationsTabs } from "@/components/applications-tabs";
import { StatsBand } from "@/components/stats-band";
import { products } from "@/lib/products";

const GRID_SLUGS = [
  "freescan-ue-pro-2",
  "freescan-trak-pro-2",
  "einscan-hx",
  "autoscan-inspec-2",
  "sharebot-metal-one",
  "sharebot-q",
];

const NEW_SLUGS = new Set(["freescan-trak-pro-2", "freescan-trak-nova"]);

const NEWS = [
  {
    title: "FreeScan Trak Nova Türkiye'de: markersız takipli ölçüm dönemi",
    tag: "Yeni Ürün",
    image: "/images/freescan-trak-nova.png",
  },
  {
    title: "Kesici uç üretiminde yeni nesil kaplama teknolojisine geçtik",
    tag: "Üretim",
    image: "/images/cnmg-1204.jpg",
  },
  {
    title: "Tekstil yedek parçada yerlileştirme kapasitemiz genişledi",
    tag: "Duyuru",
    image: "/images/tekstil-10-pro.jpg",
  },
  {
    title: "Metal 3D baskı: Sharebot Metal One demo günleri başlıyor",
    tag: "Etkinlik",
    image: "/images/sharebot-metal-one.jpg",
  },
];

const CHIPS = [
  { label: "El Tipi Tarayıcılar", href: "/urunler?kategori=tarayici" },
  { label: "Masaüstü Tarayıcılar", href: "/urunler?kategori=tarayici" },
  { label: "Robotik Ölçüm", href: "/urunler?kategori=tarayici" },
  { label: "FDM Yazıcılar", href: "/urunler?kategori=yazici" },
  { label: "SLS / Toz", href: "/urunler?kategori=yazici" },
  { label: "Metal Baskı", href: "/urunler?kategori=yazici" },
  { label: "Reçine / DLP", href: "/urunler?kategori=yazici" },
  { label: "CAD-CAM Yazılımları", href: "/urunler?kategori=yazilim" },
  { label: "Karbür Insert", href: "/urunler?kategori=kesici" },
  { label: "Seramik Insert", href: "/urunler?kategori=kesici" },
  { label: "Özel Takımlar", href: "/urunler?kategori=kesici" },
  { label: "Teknik Seramikler", href: "/urunler?kategori=seramik" },
  { label: "Tekstil Yedek Parça", href: "/urunler?kategori=yedek" },
];

const IDENTITY = [
  {
    label: "Vizyonumuz",
    text: "Müşterilerinin beklentisinin üzerinde hizmet veren; yenilikçi, tercih edilen ve önerilen bir şirket olmak.",
  },
  {
    label: "Misyonumuz",
    text: "Müşteri odaklı çalışmak, sektördeki gelişmeleri dünya ölçeğinde takip etmek ve teknolojiyi güvenilir bir iş ortaklığıyla buluşturmak.",
  },
  {
    label: "Mottomuz",
    text: "Her koşulda çözüm üretmek — siz hayal edin, biz gerçekleştirelim.",
  },
];

const SECTOR_CASES = [
  {
    sector: "Otomotiv Yan Sanayi",
    quote:
      "Kalıp revizyonlarında tarama-CAD karşılaştırmasıyla ölçüm süremiz günlerden saatlere indi.",
    person: "Kalite Müdürü, Bursa",
    icon: Factory,
  },
  {
    sector: "Havacılık & Savunma",
    quote:
      "Teknik resmi olmayan parçaları üretilebilir CAD verisine dönüştürüyoruz.",
    person: "Ar-Ge Yöneticisi, Ankara",
    icon: ShieldCheck,
  },
  {
    sector: "Medikal & Dental",
    quote:
      "AutoScan hattıyla günlük ölçüm kapasitemiz hassasiyet kaybı olmadan üç katına çıktı.",
    person: "Laboratuvar Sorumlusu, İstanbul",
    icon: Award,
  },
];

export default function HomePage() {
  const grid = GRID_SLUGS.map(
    (slug) => products.find((p) => p.slug === slug)!,
  ).filter(Boolean);

  return (
    <>
      {/* ——— 1. AÇILIŞ: perde + nokta bulutu sahnesi ——— */}
      <PointCloudIntro />

      {/* ——— 1b. KURUMSAL KİMLİK: vizyon · misyon · motto ———
          Koyu zemin giriş sahnesiyle aynı renktir; intro buraya dikişsiz bağlanır. */}
      <section className="bg-[#07090f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-3">
          {IDENTITY.map((item, i) => (
            <Reveal key={item.label} delay={i * 90}>
              <div className="md:border-l md:border-white/10 md:pl-6 md:first:border-l-0 md:first:pl-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-300/90">
                  {item.label}
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— 2. BAŞLIK + ÜRÜN GRİDİ ——— */}
      <section id="urun-gruplari" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6">
          <div className="text-center">
            <WordReveal
              text="Fikri gerçeğe dönüştüren araçlar"
              className="text-3xl font-semibold tracking-tight sm:text-[40px] text-balance"
            />
            <Reveal delay={350}>
              <p className="mx-auto mt-3 max-w-xl text-[16px] text-muted-foreground">
                Profesyoneller için 3D tarama, 3D baskı ve endüstriyel parça
                çözümleri
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  href={`/urunler?kategori=${p.category}`}
                  className="group block cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    {NEW_SLUGS.has(p.slug) && (
                      <span className="absolute left-4 top-4 rounded-full bg-scan px-2.5 py-1 text-[11px] font-semibold text-white">
                        Yeni
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {p.tags[0]} · {p.brand}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">
                    {p.blurb}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-scan">
                    İncele
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              href="/urunler"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Tüm Ürünleri Gör
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— 3. GÜNCEL ——— */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="flex items-center gap-3">
            <Newspaper className="size-6 text-scan" aria-hidden />
            <h2 className="text-2xl font-semibold tracking-tight">Güncel</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={i * 60}>
                <article className="group cursor-pointer overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/10] bg-white">
                    <Image
                      src={n.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-scan">
                      {n.tag}
                    </p>
                    <h3 className="mt-1.5 line-clamp-2 text-[14.5px] font-semibold leading-snug">
                      {n.title}
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 4. UYGULAMALAR (sekmeli) ——— */}
      <section id="uygulamalar">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Mitalon ürünleriyle her şeyi üretin
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">
              Cihaz ve takım portföyümüzün sahadaki kullanım alanları
            </p>
          </Reveal>
          <div className="mt-8">
            <ApplicationsTabs />
          </div>
        </div>
      </section>

      {/* ——— 5. HER UYGULAMA İÇİN ÜRÜN ——— */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              Her uygulama için doğru ürün
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-7 flex flex-wrap gap-2.5">
            {CHIPS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium transition-colors hover:border-scan hover:text-scan"
              >
                {c.label}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ——— 5c. İSTATİSTİKLER (anime.js sayaçları) ——— */}
      <StatsBand />

      {/* ——— 6. REFERANSLAR ——— */}
      <section id="referanslar">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-balance">
              Türk sanayisinin güvendiği çözüm ortağı
            </h2>
          </Reveal>

          {/* Öne çıkan vaka */}
          <Reveal delay={80}>
            <div className="mt-12 grid overflow-hidden rounded-xl border border-line md:grid-cols-2">
              <div className="relative min-h-[260px] bg-[#0b1120]">
                <Image
                  src="/images/hero-rings.jpg"
                  alt="Hassas işlenmiş pirinç parçalar"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center bg-white p-8 md:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-scan">
                  Öne Çıkan Vaka · Tekstil
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug text-balance">
                  İthal yedek parçada teslim süresi 8 haftadan 10 güne indi
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Dokuma tezgahı parçaları tersine mühendislik destekli yerli
                  üretimle stoklanabilir hale geldi; duruş maliyetleri belirgin
                  şekilde azaldı.
                </p>
                <p className="mt-5 text-[13px] text-muted-foreground">
                  İşletme Müdürü — Denizli merkezli tekstil üreticisi
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {SECTOR_CASES.map((c, i) => (
              <Reveal key={c.sector} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-lg border border-line bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-md bg-scan-soft text-scan">
                      <c.icon className="size-5" aria-hidden />
                    </span>
                    <p className="text-sm font-semibold">{c.sector}</p>
                  </div>
                  <blockquote className="mt-4 flex-1 text-[14.5px] italic leading-relaxed text-foreground/85">
                    “{c.quote}”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 text-[13px] text-muted-foreground">
                    {c.person}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 7. CTA ——— */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              Projeniz için doğru ürünü birlikte seçelim
            </h2>
            <p className="mt-2 max-w-md text-[14.5px] text-muted-foreground">
              Ürünleri teklif listenize ekleyin — satış ekibimiz aynı iş günü
              yapılandırılmış teklifinizle dönsün.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="cursor-pointer rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Teklif Oluştur
            </Link>
            <a
              href="tel:+905352492356"
              className="cursor-pointer rounded-md border border-ink/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
            >
              +90 535 249 23 56
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
