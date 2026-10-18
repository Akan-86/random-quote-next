"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Quote } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-tight">
          <Quote aria-hidden="true" className="size-6 text-primary" /> Random Quote
        </Link>
        <ThemeToggle />
        <nav aria-label="Main navigation" className="w-full text-sm sm:w-auto">
          <ul className="flex flex-wrap gap-6">
            <li><Link href="/" aria-current={pathname === "/" ? "page" : undefined} className="inline-flex min-h-11 items-center border-b-2 border-transparent font-medium hover:text-primary aria-[current=page]:border-primary aria-[current=page]:text-primary">Discover</Link></li>
            <li><Link href="/user/quotes/liked" aria-current={pathname === "/user/quotes/liked" ? "page" : undefined} className="inline-flex min-h-11 items-center border-b-2 border-transparent font-medium hover:text-primary aria-[current=page]:border-primary aria-[current=page]:text-primary">Liked quotes</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
