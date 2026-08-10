import { Suspense } from "react";
import type { Metadata } from "next";
import { Catalog } from "./catalog";

export const metadata: Metadata = {
  title: "Ürünler — Mitalon (Konsept Demo)",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <Catalog />
    </Suspense>
  );
}
