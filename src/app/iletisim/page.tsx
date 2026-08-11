import type { Metadata } from "next";
import {
  Clock,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "./contact-form";
import { LocationMap } from "./location-map";

export const metadata: Metadata = {
  title: "İletişim — Mitalon (Konsept Demo)",
};

const CHANNELS = [
  { icon: Phone, label: "Telefon", value: "+90 535 249 23 56", href: "tel:+905352492356" },
  { icon: Mail, label: "E-posta", value: "info@mitalon.com", href: "mailto:info@mitalon.com" },
  {
    icon: MapPin,
    label: "Adres",
    value: "Alaaddinbey Mah. Pazar Cad. Pega 2 Plaza No: 5/A Nilüfer / Bursa",
    href: undefined,
  },
];

const FAQ = [
  {
    q: "Teklif talebime ne kadar sürede dönüş yapılıyor?",
    a: "Teklif Listesi veya iletişim formu üzerinden gelen taleplere aynı iş günü içinde dönüş yapıyoruz. Mesai dışı taleplerde ertesi iş günü sabahı ilk işimiz sizsiniz.",
  },
  {
    q: "Cihazları satın almadan önce deneyebilir miyim?",
    a: "Evet — 3D tarayıcı ve yazıcılarımız için demo düzenliyoruz. Kendi parçanızı getirin, cihazı kendi uygulamanız üzerinde test edin.",
  },
  {
    q: "Kurulum ve eğitim hizmeti veriyor musunuz?",
    a: "Sattığımız tüm cihazlara kurulum, operatör eğitimi ve satış sonrası teknik destek dahildir. Yerinde servis ağımızla üretiminizi bekletmiyoruz.",
  },
  {
    q: "Özel parça üretimi için ne göndermem gerekiyor?",
    a: "Teknik resim varsa yeterli; yoksa numune parçanızı gönderin — 3D tarama ile üretime hazır CAD verisini biz çıkarırız.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ——— Tek parça iletişim kartı: solda koyu bilgi paneli, sağda form ——— */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_52px_-22px_oklch(0.25_0.03_260/0.4)] ring-1 ring-line/70">
              <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                {/* Sol panel — koyu */}
                <div className="relative flex flex-col overflow-hidden bg-ink p-7 text-white sm:p-9">
                  {/* Yumuşak mavi parlama */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-28 -top-28 size-80 rounded-full bg-sky-400/10 blur-3xl"
                  />

                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/90">
                    İletişim
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                    Size nasıl yardımcı olabiliriz?
                  </h1>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/60">
                    Ürün seçimi, demo talebi veya teklif için yazın — aynı iş
                    günü dönüş yapıyoruz.
                  </p>

                  <ul className="mt-9 space-y-5">
                    {CHANNELS.map((c) => (
                      <li key={c.label} className="flex items-start gap-4">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-sky-300">
                          <c.icon className="size-[18px]" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {c.label}
                          </p>
                          {c.href ? (
                            <a
                              href={c.href}
                              className="mt-0.5 block text-[15px] font-medium transition-colors hover:text-sky-300"
                            >
                              {c.value}
                            </a>
                          ) : (
                            <p className="mt-0.5 text-[15px] font-medium leading-snug">
                              {c.value}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/905352492356"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-9 flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <MessageCircle className="size-5" aria-hidden />
                    WhatsApp&apos;tan Yazın
                  </a>

                  <div className="mt-auto pt-9">
                    <div className="space-y-2.5 border-t border-white/10 pt-6 text-[13px] text-white/55">
                      <p className="flex items-center gap-2.5">
                        <Clock className="size-4 shrink-0 text-sky-300/80" aria-hidden />
                        Pazartesi – Cuma · 08:30 – 18:00 · AI asistan 7/24 yanıtlar
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Headset className="size-4 shrink-0 text-sky-300/80" aria-hidden />
                        Satış ve teknik serviste aynı iş günü dönüş
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-5 text-[13px] font-semibold text-white/70">
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer transition-colors hover:text-sky-300"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer transition-colors hover:text-sky-300"
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>

                {/* Sağ panel — form */}
                <div className="p-7 sm:p-9">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Harita */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">Bizi ziyaret edin</h2>
            <p className="mt-2 text-[14.5px] text-muted-foreground">
              Pega 2 Plaza, Nilüfer / Bursa — randevu için önceden arayın, demo
              cihazlarımızı hazır edelim.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6">
              <LocationMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SSS */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold tracking-tight">
              Sık sorulan sorular
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group rounded-lg border border-line bg-white open:border-scan/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-xl text-scan transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
