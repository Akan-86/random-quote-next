import type { Metadata } from "next";
import "./globals.css";
import { QuotesProvider } from "@/context/QuotesContext";

export const metadata: Metadata = {
  title: "Random Quote",
  description: "A little perspective for your day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><QuotesProvider>{children}</QuotesProvider></body>
    </html>
  );
}
