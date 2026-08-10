import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Not: `output: "standalone"` Docker dağıtımı içindir; Vercel'de
  // platformun kendi çıktı izleme sistemiyle çakışıp build'i kırıyor.
};

export default nextConfig;
