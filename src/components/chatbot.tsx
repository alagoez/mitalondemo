"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
}

const GREETING: Message = {
  role: "bot",
  text: "Merhaba, ben Mia! 👋 Mitalon'un dijital asistanıyım. 3D tarayıcılar, yazıcılar ve kesici takımlar hakkında 7/24 sorularınızı yanıtlarım. Size nasıl yardımcı olabilirim?",
};

const SUGGESTIONS = [
  "Hangi tarayıcı bana uygun?",
  "Fiyat teklifi almak istiyorum",
  "Küçük parça ölçümü yapıyorum",
];

/** Demo amaçlı kural tabanlı yanıtlar — üretimde LLM + ürün bilgi tabanı bağlanır. */
function answer(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("fiyat") || q.includes("teklif")) {
    return "Fiyatlarımız konfigürasyona göre değişiyor. Sağ üstteki “Teklif Listesi”ne ürünleri ekleyip talebinizi gönderirseniz satış ekibimiz aynı iş günü dönüş yapar. Dilerseniz telefonunuzu bırakın, biz sizi arayalım.";
  }
  if (q.includes("küçük") || q.includes("hassas") || q.includes("dental")) {
    return "Küçük ve hassas parçalar için AutoScan Inspec 2 idealdir — mikron seviyesinde hassasiyetle tam otomatik ölçüm yapar. Kesici uç, dental ve kuyum uygulamalarında yaygın kullanılır.";
  }
  if (q.includes("büyük") || q.includes("otomotiv") || q.includes("araç")) {
    return "Büyük parça ve otomotiv ölçümleri için FreeScan Trak Pro 2 öneririm — optik takipli, markersız ölçüm yapar. Alternatif olarak FreeScan UE Pro 2 sahada esneklik sağlar.";
  }
  if (q.includes("tarayıcı") || q.includes("tarama") || q.includes("uygun")) {
    return "Doğru tarayıcı üç soruya bağlı: parça boyutunuz, ihtiyacınız olan hassasiyet ve kullanım yeriniz. Küçük hassas parça → AutoScan Inspec 2, genel amaçlı → EinScan HX, metroloji → FreeScan serisi. Parçanızdan bahseder misiniz?";
  }
  if (q.includes("yazıcı") || q.includes("baskı") || q.includes("metal")) {
    return "3D yazıcıda Sharebot ailesini temsil ediyoruz: fonksiyonel prototip için Q serisi, metal parça için Metal One, toz teknolojisi için Snow White. Ne üretmeyi planlıyorsunuz?";
  }
  if (q.includes("seramik") || q.includes("yedek") || q.includes("tekstil")) {
    return "Teknik seramik parçalar ve tekstil makina yedek parçalarını kendi tesisimizde üretiyoruz — numuneden veya teknik resimden çalışabiliyoruz. Teklif Listesi'nden talep oluşturabilirsiniz.";
  }
  if (q.includes("servis") || q.includes("bakım") || q.includes("arıza")) {
    return "Sattığımız tüm cihazlara kurulum, eğitim ve yerinde servis desteği veriyoruz. Cihazınızın modelini ve sorununuzu yazarsanız kaydınızı oluşturup teknik ekibe iletirim.";
  }
  return "Bunu satış ekibimize aktarıyorum — mesai saatleri içinde dönüş yaparlar. Dilerseniz “Hangi tarayıcı bana uygun?” gibi ürün sorularını hemen yanıtlayabilirim.";
}

/** Göz kırpan, hafifçe salınan asistan karakteri — dış varlık yok, saf SVG+CSS. */
function MiaAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "avatar-head relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-sky-300 to-sky-500",
        className,
      )}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
        {/* saç */}
        <path d="M8 18 Q8 7 20 7 Q32 7 32 18 L32 15 Q32 10 27 10 Q22 9 20 9 Q13 9 11 14 Q9 15 8 18 Z" fill="#0b1120" opacity="0.85" />
        {/* gözler */}
        <g className="avatar-eye">
          <circle cx="14.5" cy="20" r="2.3" fill="#0b1120" />
          <circle cx="25.5" cy="20" r="2.3" fill="#0b1120" />
          <circle cx="15.2" cy="19.3" r="0.7" fill="#fff" />
          <circle cx="26.2" cy="19.3" r="0.7" fill="#fff" />
        </g>
        {/* yanaklar */}
        <circle cx="12" cy="25" r="1.7" fill="#fff" opacity="0.3" />
        <circle cx="28" cy="25" r="1.7" fill="#fff" opacity="0.3" />
        {/* gülümseme */}
        <path d="M15.5 26.5 Q20 30.5 24.5 26.5" stroke="#0b1120" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isTyping, isOpen]);

  /** Web Audio ile sentezlenen kısa "blip" — ses dosyası gerekmez. */
  function blip(freqFrom: number, freqTo: number, dur = 0.12, vol = 0.07) {
    try {
      type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };
      const Ctx = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
      if (!Ctx) return;
      audioRef.current ??= new Ctx();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") void ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freqFrom, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqTo, ctx.currentTime + dur);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur + 0.03);
    } catch {
      // ses açılamazsa sessiz devam — deneyimi bozma
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);
    blip(660, 980); // gönderim: yukarı süzülen blip
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: answer(trimmed) }]);
      setIsTyping(false);
      blip(540, 360, 0.16, 0.05); // yanıt: yumuşak iniş
    }, 900);
  }

  return (
    <>
      {/* FAB: küçük, gradyanlı, nabızlı */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
          if (!isOpen) blip(500, 740, 0.1, 0.05);
        }}
        aria-label={isOpen ? "Asistanı kapat" : "Asistanı aç"}
        className="chatbot-fab group fixed bottom-5 right-5 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-[#0e1526] to-[#1b2a4a] shadow-lg shadow-ink/30 ring-1 ring-sky-300/30 transition-transform hover:scale-105"
      >
        {isOpen ? (
          <X className="size-5 text-sky-200" aria-hidden />
        ) : (
          <>
            <MiaAvatar className="size-9" />
            <span className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0e1526]" />
            <span className="fab-pulse absolute inset-0 rounded-full ring-2 ring-sky-300/40" aria-hidden />
          </>
        )}
      </button>

      {isOpen && (
        <div className="chat-panel fixed bottom-20 right-5 z-40 h-[min(520px,calc(100dvh-6.5rem))] w-[min(390px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl p-[2px] shadow-2xl">
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-sky-300/25"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />

          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b1120]">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#101a30] via-[#0b1120] to-[#0e1526]"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
              aria-hidden
            />

            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute size-1 rounded-full bg-sky-200/20"
                animate={{ y: ["0%", "-1300%"], opacity: [0, 1, 0] }}
                transition={{
                  duration: 6 + (i % 5),
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
                style={{ left: `${(i * 7.3) % 100}%`, bottom: "-4%" }}
                aria-hidden
              />
            ))}

            {/* Başlık: animasyonlu karakter avatarı */}
            <div className="relative z-10 flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="relative">
                <MiaAvatar className="size-10" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-[#0b1120]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Mia · Mitalon Asistan</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sky-300/90">
                  7/24 çevrimiçi · Demo
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="relative z-10 flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed shadow-md",
                    m.role === "bot"
                      ? "self-start bg-white/10 text-white backdrop-blur-md"
                      : "self-end bg-sky-300 font-medium text-[#0b1120]",
                  )}
                >
                  {m.text}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex items-center gap-1.5 self-start rounded-xl bg-white/10 px-3.5 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="size-2 animate-pulse rounded-full bg-sky-200" />
                  <span className="size-2 animate-pulse rounded-full bg-sky-200 [animation-delay:200ms]" />
                  <span className="size-2 animate-pulse rounded-full bg-sky-200 [animation-delay:400ms]" />
                </motion.div>
              )}

              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="cursor-pointer rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/75 transition-colors hover:border-sky-300/60 hover:text-sky-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="relative z-10 flex items-center gap-2 border-t border-white/10 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mia'ya sorun…"
                className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-300/60 focus:ring-1 focus:ring-sky-300/40"
              />
              <button
                type="submit"
                aria-label="Gönder"
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg bg-sky-300/15 text-sky-300 transition-colors hover:bg-sky-300/25"
              >
                <Send className="size-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
