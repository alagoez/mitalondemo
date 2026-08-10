import type { Metadata } from "next";
import {
  Clock,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
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

const DEPARTMENTS = [
  {
    icon: Headset,
    title: "Satış",
    text: "Ürün seçimi, demo ve teklif talepleri",
    note: "Aynı iş günü dönüş",
  },
  {
    icon: Wrench,
    title: "Teknik Servis",
    text: "Kurulum, eğitim, bakım ve arıza kayıtları",
    note: "Yerinde servis desteği",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    text: "Pazartesi – Cuma · 08:30 – 18:00",
    note: "AI asistan 7/24 yanıtlar",
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
      {/* Koyu hero bandı */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/90">
            İletişim
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl text-balance">
            Size nasıl yardımcı olabiliriz?
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">
            Ürün seçimi, demo talebi veya teklif için bize ulaşın — aynı iş
            günü dönüş yapıyoruz.
          </p>
        </div>
      </section>

      {/* Kanallar + form */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="space-y-4">
              {CHANNELS.map((c) => (
                <li key={c.label} className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-scan-soft text-scan">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a href={c.href} className="text-[15px] font-medium hover:text-scan">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-[15px] font-medium">{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* WhatsApp hattı */}
            <a
              href="https://wa.me/905352492356"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" aria-hidden />
              WhatsApp'tan Yazın — Hemen Yanıtlayalım
            </a>

            {/* Departman kartları */}
            <div className="mt-7 space-y-3">
              {DEPARTMENTS.map((d) => (
                <div
                  key={d.title}
                  className="flex items-start gap-4 rounded-lg border border-line bg-surface p-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white text-scan">
                    <d.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{d.title}</p>
                    <p className="mt-0.5 text-[13.5px] text-muted-foreground">{d.text}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-scan">
                      {d.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sosyal */}
            <div className="mt-7 flex items-center gap-3">
              <p className="text-[13px] font-semibold text-muted-foreground">
                Bizi takip edin:
              </p>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-md border border-line px-4 py-2 text-[13px] font-semibold transition-colors hover:border-scan hover:text-scan"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-md border border-line px-4 py-2 text-[13px] font-semibold transition-colors hover:border-scan hover:text-scan"
              >
                YouTube
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Harita */}
      <section className="border-y border-line bg-surface">
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
      <section>
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
