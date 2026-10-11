import type { ReactNode } from "react";
import { Card as ShadcnCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type QuoteCardProps = {
  children: ReactNode;
  className?: string;
  isLiked?: boolean;
};

export function QuoteCard({ children, className = "", isLiked = false }: QuoteCardProps) {
  return (
    <ShadcnCard className={cn("gap-0 rounded-2xl p-6 shadow-sm sm:p-10", isLiked && "border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/30", className)}>
      {children}
    </ShadcnCard>
  );
}
