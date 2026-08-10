import type { Metadata } from "next";
import { Sora, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/components/quote-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuoteDrawer } from "@/components/quote-drawer";
import { Chatbot } from "@/components/chatbot";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Mitalon — 3D Teknolojiler & Endüstriyel Ürünler (Konsept Demo)",
  description:
    "Alta AI tarafından hazırlanan konsept tasarım demosu: 3D tarayıcılar, 3D yazıcılar, kesici takımlar, teknik seramikler ve yedek parça.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sora.variable} ${sourceSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <QuoteProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <QuoteDrawer />
          <Chatbot />
        </QuoteProvider>
      </body>
    </html>
  );
}
