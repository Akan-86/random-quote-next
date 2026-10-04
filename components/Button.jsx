import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Button({ children, className = "", type = "button", variant = "outline", ...props }) {
  return (
    <ShadcnButton type={type} variant={variant} className={cn("min-h-11 px-4", className)} {...props}>
      {children}
    </ShadcnButton>
  );
}
