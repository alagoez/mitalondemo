"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/** Beyaz perde kalkana kadar geçen süre — kelime animasyonları bundan sonra başlar */
const CURTAIN_MS = 2050;

const TEXT = {
  tr: {
    line1: ["Fiziksel", "parçayı"],
    line2: ["dijital", "gerçekliğe", "taşıyoruz."],
    eyebrow: "Mitalon · 3D Teknolojiler",
    hint: "Keşfetmek için kaydırın",
    distributor: "Shining 3D & Sharebot yetkili distribütörü",
    headline2: "Mikron hassasiyeti, tek çatı altında",
    ctaProducts: "Ürünleri Keşfet",
    ctaGroups: "Ürün Gruplarına Bak",
  },
  en: {
    line1: ["Turning", "physical", "parts"],
    line2: ["into", "digital", "reality."],
    eyebrow: "Mitalon · 3D Technologies",
    hint: "Scroll to explore",
    distributor: "Authorized distributor of Shining 3D & Sharebot",
    headline2: "Micron precision, under one roof",
    ctaProducts: "Explore Products",
    ctaGroups: "Browse Categories",
  },
} as const;

type IntroLang = keyof typeof TEXT;

interface Pt {
  x: number;
  y: number;
  z: number;
  // dağılma yönü (scroll ile parçalanma)
  dx: number;
  dy: number;
  dz: number;
  // tarama öncesi titreme tohumu
  seed: number;
}

/**
 * Nokta bulutu girişi — fotoğraf yok, canlı sahne var:
 * binlerce nokta halka bir makine parçası formunda döner; tarama düzlemi
 * soldan sağa süpürdükçe noktalar dağınık/sönük halden parlak ve "kilitli"
 * hale gelir (3 boyutlu taramanın kendisi). Kaydırınca bulut kameraya
 * yaklaşır, parçacıklara dağılır ve sahne ana sayfayı bırakır.
 * Tamamen Canvas 2D — ek kütüphane yok, ~4200 nokta 60fps.
 */
export function PointCloudIntro({ lang = "tr" }: { lang?: IntroLang }) {
  const t = TEXT[lang];
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!track || !stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ——— Nokta bulutu: CNMG kesici uç formu ———
    // Köşeleri yumuşatılmış kare gövde (süperelips profili) + merkez delik.
    const points: Pt[] = [];
    const N = 5; // süperelips üssü: kare-yuvarlak köşe dengesi
    const HALF_T = 0.24; // gövde yarı kalınlığı
    const HOLE_R = 0.34; // merkez delik yarıçapı

    const push = (x: number, y: number, z: number) => {
      const ux = Math.random() * 2 - 1;
      const uy = Math.random() * 2 - 1;
      const uz = Math.random() * 2 - 1;
      const len = Math.hypot(ux, uy, uz) || 1;
      points.push({
        x, y, z,
        dx: ux / len, dy: uy / len, dz: uz / len,
        seed: Math.random() * Math.PI * 2,
      });
    };

    const inBody = (x: number, y: number) =>
      Math.abs(x) ** N + Math.abs(y) ** N <= 1 && x * x + y * y >= HOLE_R * HOLE_R;

    // Üst ve alt yüzeyler
    let placed = 0;
    while (placed < 2400) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (!inBody(x, y)) continue;
      push(x, y, placed % 2 === 0 ? HALF_T : -HALF_T);
      placed++;
    }

    // Yan duvarlar (süperelips çevresi)
    for (let i = 0; i < 1200; i++) {
      const th = Math.random() * Math.PI * 2;
      const cx = Math.cos(th);
      const sy = Math.sin(th);
      const x = Math.sign(cx) * Math.abs(cx) ** (2 / N);
      const y = Math.sign(sy) * Math.abs(sy) ** (2 / N);
      push(x, y, (Math.random() * 2 - 1) * HALF_T);
    }

    // Merkez delik duvarı
    for (let i = 0; i < 700; i++) {
      const th = Math.random() * Math.PI * 2;
      push(
        Math.cos(th) * HOLE_R,
        Math.sin(th) * HOLE_R,
        (Math.random() * 2 - 1) * HALF_T,
      );
    }

    // ——— Asıl form: MİTALON LOGOSU ———
    // Logo SVG'si gizli bir tuvale çizilir, dolu pikseller örneklenip ince bir
    // 3D levha halinde nokta bulutuna dönüştürülür. Yüklenene kadar yukarıdaki
    // kesici uç formu görünür (perde inerken zaten ekran kapalı).
    const logo = new window.Image();
    logo.src = "/images/mitalon-logo-white.svg";
    logo.onload = () => {
      const SW = 300;
      const ar = (logo.width || 553) / (logo.height || 402);
      const iw = SW;
      const ih = Math.round(SW / ar);
      const oc = document.createElement("canvas");
      oc.width = iw;
      oc.height = ih;
      const octx = oc.getContext("2d");
      if (!octx) return;
      octx.drawImage(logo, 0, 0, iw, ih);
      const data = octx.getImageData(0, 0, iw, ih).data;
      // Yalnızca AMBLEM (üst kısım) — alttaki yazı harfleri nokta bulutunda
      // toz gibi göründüğü için örneklemeye dahil edilmez.
      const emblemCut = Math.round(ih * 0.72);
      const cells: [number, number][] = [];
      let minX = iw, maxX = 0, minY = ih, maxY = 0;
      for (let py = 0; py < emblemCut; py++) {
        for (let px = 0; px < iw; px++) {
          if (data[(py * iw + px) * 4 + 3] > 110) {
            cells.push([px, py]);
            if (px < minX) minX = px;
            if (px > maxX) maxX = px;
            if (py < minY) minY = py;
            if (py > maxY) maxY = py;
          }
        }
      }
      if (cells.length < 50) return; // örnekleme başarısızsa kesici uçta kal
      // Amblemi kendi sınır kutusuna göre ortala ve ölçekle
      const bw = Math.max(1, maxX - minX);
      const bh = Math.max(1, maxY - minY);
      const worldW = 2.3;
      const worldH = worldW * (bh / bw);
      const fresh: Pt[] = [];
      const targetCount = 5200;
      for (let i = 0; i < targetCount; i++) {
        const [cx0, cy0] = cells[(Math.random() * cells.length) | 0];
        const x = ((cx0 + Math.random() - minX) / bw - 0.5) * worldW;
        const y = ((cy0 + Math.random() - minY) / bh - 0.5) * worldH;
        const z = (Math.random() * 2 - 1) * 0.1; // ince levha derinliği
        const ux = Math.random() * 2 - 1;
        const uy = Math.random() * 2 - 1;
        const uz = Math.random() * 2 - 1;
        const len = Math.hypot(ux, uy, uz) || 1;
        fresh.push({
          x, y, z,
          dx: ux / len, dy: uy / len, dz: uz / len,
          seed: Math.random() * Math.PI * 2,
        });
      }
      points.length = 0;
      points.push(...fresh);
    };

    // ——— Durum ———
    let w = 0;
    let h = 0;
    let dpr = 1;
    let target = 0; // ham scroll ilerlemesi
    let p = -1; // yumuşatılmış ilerleme
    let raf = 0;
    let visible = true;
    let mx = 0; // fare paralaksı (-0.5..0.5)
    let my = 0;
    let smx = 0;
    let smy = 0;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const measure = () => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      target = total > 0 ? clamp01(-rect.top / total) : 0;
      visible = rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const start = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      const t = (now - start) / 1000;
      p = p < 0 ? target : p + (target - p) * 0.12;
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;

      // Fazlar
      const boot = clamp01(t / 1.8); // açılışta noktaların toplanması
      const disperse = clamp01((p - 0.24) / 0.58); // scroll ile dağılma
      const fadeOut = clamp01((p - 0.86) / 0.14); // sahne çıkışı (geç ve kısa)

      // CSS katmanlarına faz bildir
      const end = clamp01((p - 0.9) / 0.1); // teslim: sahne koyu kalır, hafifçe küçülüp geri çekilir
      stage.style.setProperty("--p", p.toFixed(4));
      stage.style.setProperty("--h1o", (1 - clamp01((p - 0.3) / 0.2)).toFixed(4));
      stage.style.setProperty("--c2", clamp01((p - 0.52) / 0.24).toFixed(4));
      stage.style.setProperty("--end", end.toFixed(4));
      stage.classList.toggle("cta-on", p > 0.54);

      // Devir anı: menü yukarıdan süzülerek gelir; zemin koyu kaldığı için
      // sahne alttaki koyu kimlik şeridine dikişsiz bağlanır (beyaz parlama yok)
      document.body.classList.toggle("intro-active", p < 0.86);

      // Sonar nabzı: merkezden dışa yayılan yumuşak parlaklık halkası
      const cycle = (t % 4.5) / 4.5;
      const pulseR = cycle * 2.4;
      const pulseStrength = (1 - cycle) * 0.9;

      // Dönüş: logo okunur kalsın diye tam tur atmaz, yumuşakça salınır
      const rotY = Math.sin(t * 0.38) * 0.42 + p * 1.1 + smx * 0.7;
      const rotX = 0.16 + Math.sin(t * 0.27) * 0.08 + smy * 0.35;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const scale = Math.min(w, h) * (0.30 + p * 0.22) * (0.65 + boot * 0.35);
      // Masaüstünde amblem sağda (yazı solda), mobilde üstte ortada
      const desktop = w >= 768;
      const cx = desktop ? w * 0.66 : w / 2;
      const cy = desktop ? h * 0.48 : h * 0.32;
      const fov = 3.2;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1 - fadeOut;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Açılışta noktalar dağınıktan forma toplanır; scroll'da tekrar dağılır
        const spread = (1 - boot) * 1.6 + disperse * disperse * 2.4;
        const assembled = 1 - Math.min(1, spread); // 0: dağınık · 1: oturmuş
        const jitter = 0.008 + (1 - assembled) * 0.16;

        const ox = pt.x + pt.dx * spread + Math.sin(t * 1.7 + pt.seed) * jitter;
        const oy = pt.y + pt.dy * spread + Math.cos(t * 1.3 + pt.seed) * jitter;
        const oz = pt.z + pt.dz * spread + Math.sin(t * 2.1 + pt.seed * 2) * jitter;

        // rotY sonra rotX
        const x1 = ox * cosY + oz * sinY;
        const z1 = -ox * sinY + oz * cosY;
        const y2 = oy * cosX - z1 * sinX;
        const z2 = oy * sinX + z1 * cosX;

        const persp = fov / (fov + z2);
        const sx = cx + x1 * scale * persp;
        const sy = cy + y2 * scale * persp;
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const depth = clamp01((persp - 0.75) * 2.2); // yakın nokta daha parlak

        // Sonar halkası bu noktanın üzerinden geçiyor mu?
        const rad = Math.hypot(pt.x, pt.y, pt.z);
        const pulse =
          Math.max(0, 1 - Math.abs(rad - pulseR) / 0.22) * pulseStrength * assembled;
        // Hafif kıpırtı: her nokta kendi ritminde nefes alır
        const twinkle = Math.sin(t * 1.4 + pt.seed * 3) * 0.05;

        const base = 0.12 + depth * 0.16; // dağınık: sönük gri
        const lit = 0.4 + depth * 0.5; // oturmuş: gök mavisi
        const alpha = clamp01(
          base * (1 - assembled) + lit * assembled + pulse * 0.5 + twinkle * assembled,
        );
        const color =
          pulse > 0.55
            ? "224,242,254" // halkanın tam üstü: beyaza yakın parlama
            : assembled > 0.5
              ? "125,211,252" // gök mavisi
              : "100,116,139"; // sönük gri

        const size = (2.1 + pulse * 0.9) * persp;
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
    };

    // Giriş boyunca menü gizli — sahne gerçek tam ekran
    document.body.classList.add("intro-active");

    // Perde inerken kaydırmayı kilitle — açılış bölünmesin
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const unlock = window.setTimeout(() => {
      html.style.overflow = prevOverflow;
    }, CURTAIN_MS + 350);

    resize();
    measure();
    raf = requestAnimationFrame(frame);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", () => {
      resize();
      measure();
    });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(unlock);
      html.style.overflow = prevOverflow;
      document.body.classList.remove("intro-active");
      window.removeEventListener("scroll", measure);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  let w = 0;

  return (
    // -mt-24: gizlenen menünün boşluğunu da kaplayarak gerçek tam ekran olur
    <div ref={trackRef} className="relative -mt-24 h-[210vh] bg-[#07090f]">
      {/* Yükleme perdesi: beyaz katman logo ile açılır, lacivert katman peşinden süzülür */}
      <div className="preload-curtain pointer-events-none" aria-hidden>
        <Image
          src="/images/mitalon-logo.svg"
          alt=""
          width={200}
          height={58}
          priority
          className="preload-logo h-14 w-auto"
        />
      </div>
      <div className="preload-curtain-2 pointer-events-none" aria-hidden />

      <div
        ref={stageRef}
        className="intro-stage sticky top-0 h-screen overflow-hidden bg-[#07090f]"
      >
        {/* Silik teknik ızgara (teslim fazında söner) */}
        <div className="tech-grid intro-grid absolute inset-0" aria-hidden />

        {/* Canlı sahne */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Başlık katmanı: masaüstünde solda, mobilde altta */}
        <div className="intro-title absolute inset-0 z-10 flex items-end px-5 pb-[16vh] md:items-center md:px-0 md:pb-0">
          <div className="mx-auto w-full max-w-7xl md:px-6">
            <p
              className="intro-word-load font-mono text-xs uppercase tracking-[0.35em] text-sky-300/90"
              style={{ "--d": `${CURTAIN_MS}ms` } as React.CSSProperties}
            >
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              <span className="block">
                {t.line1.map((word) => (
                  <span
                    key={word}
                    className="intro-word-load mr-[0.28em] inline-block"
                    style={{ "--d": `${CURTAIN_MS + 200 + w++ * 120}ms` } as React.CSSProperties}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block text-sky-300">
                {t.line2.map((word) => (
                  <span
                    key={word}
                    className="intro-word-load mr-[0.28em] inline-block"
                    style={{ "--d": `${CURTAIN_MS + 200 + w++ * 120}ms` } as React.CSSProperties}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>
            <p
              className="intro-word-load mt-8 flex items-center gap-2 text-sm text-white/50"
              style={{ "--d": `${CURTAIN_MS + 1050}ms` } as React.CSSProperties}
            >
              <ChevronDown className="size-4 animate-bounce" aria-hidden />
              {t.hint}
            </p>
          </div>
        </div>

        {/* İkinci içerik + CTA */}
        <div className="intro-cta absolute inset-x-0 bottom-0 z-10 pb-[10vh]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/90">
              {t.distributor}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-5xl text-balance">
              {t.headline2}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/urunler"
                className="pointer-events-auto cursor-pointer rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#07090f] transition-opacity hover:opacity-90"
              >
                {t.ctaProducts}
              </Link>
              <a
                href="#urun-gruplari"
                className="pointer-events-auto cursor-pointer rounded-md border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.ctaGroups}
              </a>
            </div>
          </div>
        </div>

        {/* İlerleme çizgisi (teslim fazında söner) */}
        <div className="intro-bar absolute inset-x-0 bottom-0 z-20 h-0.5 bg-white/10">
          <div className="intro-progress h-full w-full bg-sky-300" aria-hidden />
        </div>
      </div>
    </div>
  );
}
