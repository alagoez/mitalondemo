import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Cog,
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Leaf,
  MessagesSquare,
  ScanLine,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Hakkımızda — Mitalon (Konsept Demo)",
};

/* İçerik mitalon.com/hakkimizda ile birebir hizalı */
const ACTIVITIES = [
  { icon: Cog, label: "Yeni ve özel endüstriyel ürün tasarımı ve imalatı" },
  { icon: FlaskConical, label: "Ar-Ge projeleri" },
  { icon: ScanLine, label: "Tersine mühendislik" },
  { icon: BadgeCheck, label: "Kalite kontrol" },
  { icon: MessagesSquare, label: "Teknik danışmanlık" },
];

const VALUES = [
  {
    icon: Leaf,
    title: "Yalın olma",
    text: "Süreçlerimizi sade ve verimli tutar, israftan kaçınırız.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenilirlik",
    text: "Verdiğimiz sözün ve teslim ettiğimiz işin arkasında dururuz.",
  },
  {
    icon: GraduationCap,
    title: "Uzman bilgisi",
    text: "Sektör birikimimizi her projede müşterimizin hizmetine sunarız.",
  },
  {
    icon: Handshake,
    title: "İşbirliğine açıklık",
    text: "Çözümü müşterilerimiz ve paydaşlarımızla birlikte tasarlarız.",
  },
  {
    icon: HeartHandshake,
    title: "Paydaşlarını değerli hissettirme",
    text: "Birlikte çalıştığımız herkesin katkısını görünür kılarız.",
  },
  {
    icon: Target,
    title: "Müşteri odaklılık",
    text: "Her işe müşterimizin beklentisini aşma hedefiyle başlarız.",
  },
];

const IDENTITY = [
  {
    label: "Vizyonumuz",
    text: "Müşterilerimizin beklentisinin üzerinde hizmet veren; yenilikçi, tercih edilen ve önerilen bir şirket olmak.",
  },
  {
    label: "Misyonumuz",
    text: "Müşteri odaklı çalışan, teknolojiyi etkin kullanan, güvenilir bir iş ortağı olmak.",
  },
  {
    label: "Mottomuz",
    text: "Müşteri beklentilerinin ilerisine geçerek her koşulda çözüm üretmek.",
  },
];

const SECTORS = [
  "Otomotiv",
  "Makine",
  "Kozmetik",
  "Dental & Medikal",
  "Beyaz Eşya",
  "Tekstil",
  "Savunma Sanayi",
];

export default function AboutPage() {
  return (
    <>
      {/* Koyu hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/90">
            Hakkımızda
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl text-balance">
            Otomotiv sektöründe 20 yılı aşkın deneyim
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Mitalon; mühendislik ve üretim alanında Türkiye&apos;nin önde gelen
            firmalarından biri olarak sanayiye uçtan uca çözüm sunar.
          </p>
        </div>
      </section>

      {/* Tanıtım + faaliyetler */}
      <section>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image
                src="/images/seramik-uretim.jpg"
                alt="Mitalon üretim süreci"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Sanayinin içinden gelen bir ekip
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Otomotiv sektöründe 20 yıldan fazla deneyime sahip ekibimizle;
              otomotivden makineye, dental &amp; medikalden savunma sanayisine
              kadar geniş bir yelpazede mühendislik ve üretim hizmeti
              veriyoruz. Shining 3D ve Sharebot&apos;un yetkili distribütörü
              olarak cihaz satışından kuruluma, eğitimden satış sonrası desteğe
              uçtan uca yanınızdayız.
            </p>
            <ul className="mt-6 space-y-2.5">
              {ACTIVITIES.map((a) => (
                <li key={a.label} className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-scan-soft text-scan">
                    <a.icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-[14.5px] font-medium">{a.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Vizyon · Misyon · Motto */}
      <section className="border-y border-white/10 bg-[#07090f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
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

      {/* Değerler */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              Değerlerimiz
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-lg border border-line bg-white p-6">
                  <span className="grid size-11 place-items-center rounded-md bg-scan-soft text-scan">
                    <v.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sektörler + CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              Hizmet verdiğimiz sektörler
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-7 flex flex-wrap justify-center gap-2.5">
            {SECTORS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-surface px-4 py-2 text-[13.5px] font-medium"
              >
                {s}
              </span>
            ))}
          </Reveal>
          <Reveal className="mt-12">
            <Link
              href="/urunler"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Ürünlerimizi İnceleyin
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
