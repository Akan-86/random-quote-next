import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function PageTitle({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={cn("font-serif text-4xl leading-tight tracking-tight sm:text-5xl", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn("text-xl font-semibold", className)} {...props} />;
}

export function BodyText({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-base leading-relaxed text-muted-foreground", className)} {...props} />;
}

export function Caption({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-xs font-medium uppercase tracking-widest text-muted-foreground", className)} {...props} />;
}
