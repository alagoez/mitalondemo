import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Factory, Newspaper, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PointCloudIntro } from "@/components/point-cloud-intro";
import { ApplicationsTabs } from "@/components/applications-tabs";
import { StatsBand } from "@/components/stats-band";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Mitalon — 3D Technologies & Industrial Products (Concept Demo)",
};

const GRID: { slug: string; tag: string; blurb: string }[] = [
  {
    slug: "freescan-ue-pro-2",
    tag: "Handheld · Shining 3D",
    blurb: "Metrology-grade handheld laser scanner with photogrammetry integration.",
  },
  {
    slug: "freescan-trak-pro-2",
    tag: "Optical Tracking · Shining 3D",
    blurb: "Marker-free measurement with dynamic optical tracking for large parts.",
  },
  {
    slug: "einscan-hx",
    tag: "Hybrid · Shining 3D",
    blurb: "Hybrid LED + blue laser scanning — fast capture and fine detail.",
  },
  {
    slug: "autoscan-inspec-2",
    tag: "Desktop · Shining 3D",
    blurb: "Fully automatic desktop scanner for small, high-precision parts.",
  },
  {
    slug: "sharebot-metal-one",
    tag: "Metal SLM · Sharebot",
    blurb: "Compact SLM printer bringing metal 3D printing within reach.",
  },
  {
    slug: "sharebot-q",
    tag: "FDM · Sharebot",
    blurb: "Industrial-grade FDM platform with a heated closed chamber.",
  },
];

const NEW_SLUGS = new Set(["freescan-trak-pro-2", "freescan-trak-nova"]);

const NEWS = [
  {
    title: "FreeScan Trak Nova arrives in Türkiye: marker-free tracked scanning",
    tag: "New Product",
    image: "/images/freescan-trak-nova.png",
  },
  {
    title: "Next-generation coating technology for our cutting inserts",
    tag: "Production",
    image: "/images/cnmg-1204.jpg",
  },
  {
    title: "Expanded local production capacity for textile spare parts",
    tag: "Announcement",
    image: "/images/tekstil-10-pro.jpg",
  },
  {
    title: "Metal 3D printing: Sharebot Metal One demo days are starting",
    tag: "Event",
    image: "/images/sharebot-metal-one.jpg",
  },
];

const CHIPS = [
  { label: "Handheld Scanners", href: "/urunler?kategori=tarayici" },
  { label: "Desktop Scanners", href: "/urunler?kategori=tarayici" },
  { label: "Robotic Inspection", href: "/urunler?kategori=tarayici" },
  { label: "FDM Printers", href: "/urunler?kategori=yazici" },
  { label: "SLS / Powder", href: "/urunler?kategori=yazici" },
  { label: "Metal Printing", href: "/urunler?kategori=yazici" },
  { label: "CAD-CAM Software", href: "/urunler?kategori=yazilim" },
  { label: "Carbide Inserts", href: "/urunler?kategori=kesici" },
  { label: "Custom Tooling", href: "/urunler?kategori=kesici" },
  { label: "Technical Ceramics", href: "/urunler?kategori=seramik" },
  { label: "Textile Spare Parts", href: "/urunler?kategori=yedek" },
];

const CASES = [
  {
    sector: "Automotive Supplier",
    quote:
      "Scan-to-CAD comparison cut our mold revision measurement time from days to hours.",
    person: "Quality Manager, Bursa",
    icon: Factory,
  },
  {
    sector: "Aerospace & Defense",
    quote:
      "We turn parts without technical drawings into manufacturable CAD data.",
    person: "R&D Manager, Ankara",
    icon: ShieldCheck,
  },
  {
    sector: "Medical & Dental",
    quote:
      "Our daily measurement capacity tripled with the AutoScan line — with zero loss in accuracy.",
    person: "Lab Supervisor, Istanbul",
    icon: Award,
  },
];

export default function EnglishHomePage() {
  const grid = GRID.map((g) => ({
    ...g,
    product: products.find((p) => p.slug === g.slug)!,
  })).filter((g) => g.product);

  return (
    <>
      <PointCloudIntro lang="en" />

      {/* Headline + product grid */}
      <section id="urun-gruplari" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6">
          <div className="text-center">
            <WordReveal
              text="Tools that turn ideas into reality"
              className="text-3xl font-semibold tracking-tight sm:text-[40px] text-balance"
            />
            <Reveal delay={350}>
              <p className="mx-auto mt-3 max-w-xl text-[16px] text-muted-foreground">
                3D scanning, 3D printing and industrial part solutions for
                professionals
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((g, i) => (
              <Reveal key={g.slug} delay={i * 60}>
                <Link
                  href={`/urunler?kategori=${g.product.category}`}
                  className="group block cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                    <Image
                      src={g.product.image}
                      alt={g.product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {NEW_SLUGS.has(g.slug) && (
                      <span className="absolute left-4 top-4 rounded-full bg-scan px-2.5 py-1 text-[11px] font-semibold text-white">
                        New
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {g.tag}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{g.product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">
                    {g.blurb}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-scan">
                    Explore
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
              View All Products
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* News */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="flex items-center gap-3">
            <Newspaper className="size-6 text-scan" aria-hidden />
            <h2 className="text-2xl font-semibold tracking-tight">Latest News</h2>
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

      {/* Applications */}
      <section id="uygulamalar">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Make anything with Mitalon technologies
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">
              Where our device and tooling portfolio works in the field
            </p>
          </Reveal>
          <div className="mt-8">
            <ApplicationsTabs lang="en" />
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              The right product for every application
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

      {/* Stats */}
      <StatsBand lang="en" />

      {/* Case studies */}
      <section id="referanslar">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-balance">
              Trusted by Turkish industry
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 grid overflow-hidden rounded-xl border border-line md:grid-cols-2">
              <div className="relative min-h-[260px] bg-[#0b1120]">
                <Image
                  src="/images/hero-rings.jpg"
                  alt="Precision-machined brass parts"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center bg-white p-8 md:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-scan">
                  Featured Case · Textile
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug text-balance">
                  Imported spare part lead time cut from 8 weeks to 10 days
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Weaving machine parts became locally producible and stockable
                  through reverse-engineering-backed manufacturing — downtime
                  costs dropped significantly.
                </p>
                <p className="mt-5 text-[13px] text-muted-foreground">
                  Operations Manager — textile manufacturer, Denizli
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {CASES.map((c, i) => (
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

      {/* CTA */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              Let&apos;s pick the right product for your project
            </h2>
            <p className="mt-2 max-w-md text-[14.5px] text-muted-foreground">
              Add products to your quote list — our sales team gets back to you
              with a structured quote the same business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="cursor-pointer rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Build a Quote
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
