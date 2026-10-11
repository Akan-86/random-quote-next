import type { ComponentProps } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppButtonProps = ComponentProps<typeof ShadcnButton>;

export function AppButton({ children, className = "", type = "button", variant = "outline", ...props }: AppButtonProps) {
  return (
    <ShadcnButton type={type} variant={variant} className={cn("min-h-11 px-4", className)} {...props}>
      {children}
    </ShadcnButton>
  );
}
