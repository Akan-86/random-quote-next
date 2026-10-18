import { Auth0Provider } from "@auth0/nextjs-auth0";
import type { Metadata } from "next";
import "./globals.css";
import { QuotesProvider } from "@/context/QuotesContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Random Quote",
  description: "A little perspective for your day. Discover quotes and keep your favorites together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Auth0Provider>
          <QuotesProvider>
            <a href="#main-content" className="sr-only z-50 rounded-md bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
            <SiteHeader />
            {children}
            <footer className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted-foreground sm:px-8">Pause. Reflect. Keep going.</footer>
          </QuotesProvider>
          </Auth0Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
