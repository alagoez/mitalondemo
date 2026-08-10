"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface QuoteContextValue {
  items: string[]; // ürün slug'ları
  isOpen: boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

const STORAGE_KEY = "mitalon-teklif-listesi";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as string[]);
    } catch {
      // depolama erişilemezse boş liste ile devam
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // yazılamazsa sessiz geç — demo akışını bozma
    }
  }, [items]);

  const add = useCallback((slug: string) => {
    setItems((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ items, isOpen, add, remove, clear, open, close }),
    [items, isOpen, add, remove, clear, open, close],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote yalnızca QuoteProvider içinde kullanılabilir");
  return ctx;
}
