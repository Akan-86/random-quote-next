import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/20 bg-slate-50 p-8 shadow-2xl sm:p-12">
      {children}
    </div>
  );
}
