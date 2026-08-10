import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — Mitalon (Konsept Demo)",
};

const SECTIONS = [
  {
    title: "1. Veri Sorumlusu",
    text: "Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla Mitalon Yenilikçi Mühendislik (Alaaddinbey Mah. Pazar Cad. Pega 2 Plaza No: 5/A Nilüfer / Bursa) tarafından hazırlanmıştır.",
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    text: "Web sitemizdeki iletişim ve teklif formları aracılığıyla ad-soyad, firma adı, e-posta adresi, telefon numarası ve mesaj içeriğinde paylaştığınız bilgiler işlenmektedir.",
  },
  {
    title: "3. İşleme Amaçları",
    text: "Kişisel verileriniz; talep ve tekliflerinizin yanıtlanması, ürün ve hizmetlerimiz hakkında bilgilendirme yapılması, satış ve satış sonrası süreçlerin yürütülmesi amaçlarıyla işlenir.",
  },
  {
    title: "4. Aktarım",
    text: "Verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz; hizmet altyapısı sağlayıcılarıyla yalnızca hizmetin gerektirdiği ölçüde paylaşılabilir.",
  },
  {
    title: "5. Haklarınız",
    text: "KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme haklarına sahipsiniz. Talepleriniz için info@mitalon.com adresine yazabilirsiniz.",
  },
];

export default function KvkkPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-scan">
          Hukuki Bilgilendirme
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-4 rounded-md border border-line bg-surface px-4 py-3 text-[13px] text-muted-foreground">
          Bu metin konsept demo için hazırlanmış bir taslaktır — yayına
          alınmadan önce hukuk danışmanı onayından geçirilmelidir.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
