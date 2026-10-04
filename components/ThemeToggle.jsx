"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { AppButton } from "@/components/AppButton";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div role="group" aria-label="Color theme" className="flex gap-1 rounded-full border bg-card p-1">
      <AppButton variant="ghost" onClick={() => setTheme("light")} className="rounded-full bg-secondary dark:bg-transparent" aria-label="Use light theme">
        <Sun aria-hidden="true" /> Light
      </AppButton>
      <AppButton variant="ghost" onClick={() => setTheme("dark")} className="rounded-full dark:bg-secondary" aria-label="Use dark theme">
        <Moon aria-hidden="true" /> Dark
      </AppButton>
    </div>
  );
}
