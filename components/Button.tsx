import type { ComponentProps } from "react";

export function Button({ children, className = "", type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={`rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300 aria-pressed:bg-violet-700 aria-pressed:text-white aria-pressed:hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
