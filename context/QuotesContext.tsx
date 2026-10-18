"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { toggleQuoteLike } from "@/lib/quote-likes";
import { useUser } from "@auth0/nextjs-auth0";
import { quotes as initialQuotes, type Quote } from "@/quotes";


type QuotesContextValue = {
  quotes: Quote[];
  userId: string | undefined;
  isLoading: boolean;
  toggleLike: (quoteIndex: number) => void;
};

const QuotesContext = createContext<QuotesContextValue | null>(null);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const userId = user?.sub;
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  function toggleLike(quoteIndex: number) {
    if (!userId || isLoading) return;
    setQuotes((previousQuotes) => toggleQuoteLike(previousQuotes, quoteIndex, userId));
  }

  return (
    <QuotesContext.Provider value={{ quotes, userId, isLoading, toggleLike }}>
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) throw new Error("useQuotes must be used inside QuotesProvider");
  return context;
}
