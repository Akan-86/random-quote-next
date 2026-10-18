"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import { Quote } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const linkStyle = "inline-flex min-h-11 items-center border-b-2 border-transparent font-medium hover:text-primary aria-[current=page]:border-primary aria-[current=page]:text-primary";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const links = user
    ? [{ href: "/", label: "Discover" }, { href: "/user/quotes/liked", label: "Liked quotes" }, { href: "/user/profile", label: "Profile" }]
    : [{ href: "/", label: "Discover" }];

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-tight">
          <Quote aria-hidden="true" className="size-6 text-primary" /> Random Quote
        </Link>
        <ThemeToggle />
        <nav aria-label="Main navigation" className="w-full text-sm sm:w-auto">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map(({ href, label }) => (
              <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined} className={linkStyle}>{label}</Link></li>
            ))}
            {isLoading ? <li role="status">Loading account…</li> : user ? (
              <li><a href="/auth/logout" className={linkStyle}>Log out</a></li>
            ) : (
              <>
                <li><a href="/auth/login" className={linkStyle}>Log in</a></li>
                <li><a href="/auth/login?screen_hint=signup" className={linkStyle}>Register</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
