import type { ReactNode } from "react";

export function QuoteText({ children }: { children: ReactNode }) {
  return <p className="break-words font-serif text-2xl leading-relaxed tracking-tight sm:text-3xl">{children}</p>;
}
