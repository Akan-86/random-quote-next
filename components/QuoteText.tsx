import type { ReactNode } from "react";

export function QuoteText({ children }: { children: ReactNode }) {
  return <p className="mt-7 text-3xl leading-relaxed font-medium italic tracking-tight text-slate-900 sm:text-4xl">{children}</p>;
}
