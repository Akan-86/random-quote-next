import type { ReactNode } from "react";

export function AuthorText({ children }: { children: ReactNode }) {
  return (
    <footer className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-primary" />
      {children}
    </footer>
  );
}
