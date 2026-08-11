"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

/** Panel-içi form: kart görünümünü üst bileşen sağlar, burada yalnız form var. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 p-6 text-center">
        <CheckCircle2 className="size-12 text-scan" aria-hidden />
        <p className="text-lg font-semibold">Mesajınız alındı</p>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Satış ekibimiz aynı iş günü içinde sizinle iletişime geçecek.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Demo — gerçek gönderim yapılmadı
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold">
            Ad Soyad <span className="text-destructive">*</span>
          </span>
          <input
            required
            autoComplete="name"
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan focus:bg-white"
            placeholder="Adınız Soyadınız"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold">Firma</span>
          <input
            autoComplete="organization"
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan focus:bg-white"
            placeholder="Firma adı"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold">
            E-posta <span className="text-destructive">*</span>
          </span>
          <input
            required
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan focus:bg-white"
            placeholder="ornek@firma.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold">
            Telefon <span className="text-destructive">*</span>
          </span>
          <input
            required
            type="tel"
            autoComplete="tel"
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan focus:bg-white"
            placeholder="+90"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">
          Mesajınız <span className="text-destructive">*</span>
        </span>
        <textarea
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-scan focus:bg-white"
          placeholder="Hangi ürün veya uygulama hakkında bilgi almak istiyorsunuz?"
        />
      </label>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-ink py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Gönder
      </button>
      <p className="text-center text-[11.5px] text-muted-foreground">
        Gönderdiğinizde{" "}
        <a href="/kvkk" className="underline underline-offset-2 hover:text-scan">
          KVKK aydınlatma metnini
        </a>{" "}
        kabul etmiş olursunuz.
      </p>
    </form>
  );
}
