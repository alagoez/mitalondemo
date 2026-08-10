import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, Target, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Hakkımızda — Mitalon (Konsept Demo)",
};

const VALUES = [
  {
    icon: Users,
    title: "Müşteri odaklılık",
    text: "Her projeye müşterinin beklentisini aşma hedefiyle başlarız; çözümü birlikte tasarlarız.",
  },
  {
    icon: Handshake,
    title: "Güvenilirlik ve yalınlık",
    text: "Yalın üretim ve World Class Manufacturing disiplinini iş yapış biçimimizin merkezine koyarız.",
  },
  {
    icon: Target,
    title: "Kalite odaklılık",
    text: "Tasarımdan seri imalata kadar her adımda ölçülebilir kalite hedefleriyle çalışırız.",
  },
];

const SECTORS = [
  "Otomotiv",
  "Makina",
  "Tekstil",
  "Dental & Medikal",
  "Beyaz Eşya",
  "Savunma Sanayi",
  "Kozmetik",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/90">
            Hakkımızda
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl text-balance">
            20 yılı aşkın otomotiv tecrübesi, tek çatı altında
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Mitalon; 3D teknolojiler, kesici takımlar ve endüstriyel parça
            üretiminde Türkiye'nin güvenilir çözüm ortağıdır.
          </p>
        </div>
      </section>

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
              Yirmi yılı aşkın otomotiv sektörü birikimimizi 3D tarama, 3D
              baskı ve hassas imalat teknolojileriyle birleştiriyoruz. Shining
              3D ve Sharebot'un yetkili distribütörü olarak cihaz satışından
              kuruluma, eğitimden satış sonrası desteğe uçtan uca hizmet
              veriyoruz.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Vizyonumuz; müşterilerinin beklentisinin üzerinde hizmet veren,
              yenilikçi, tercih edilen ve önerilen bir şirket olmak.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              Değerlerimiz
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
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
          <Reveal className="mt-12 text-center">
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
