"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { quotes as initialQuotes, type StoredQuote } from "@/quotes";
import { toggleQuoteLike } from "@/lib/quote-likes";

type QuoteContextValue = {
  quotes: StoredQuote[];
  userId: string | undefined;
  isLoading: boolean;
  toggleLike: (quoteIndex: number) => void;
  addQuote: (quote: string, author: string) => string | null;
  updateQuote: (quoteId: string, quote: string, author: string) => boolean;
};

const QuotesContext = createContext<QuoteContextValue | null>(null);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const userId = user?.sub;
  const [quotes, setQuotes] = useState<StoredQuote[]>(() =>
    initialQuotes.map((quote, index) => ({ ...quote, id: `seed-${index + 1}` }))
  );
  function toggleLike(quoteIndex: number) {
    if (!userId || isLoading) return;
    setQuotes((previous) => toggleQuoteLike(previous, quoteIndex, userId));
  }

  function addQuote(quote: string, author: string) {
    if (!userId || isLoading) return null;
    const id = crypto.randomUUID();
    setQuotes((previous) => [{ id, quote, author, likedBy: [], createdBy: userId }, ...previous]);
    return id;
  }

  function updateQuote(quoteId: string, quote: string, author: string) {
    if (!userId || isLoading) return false;
    const existing = quotes.find((item) => item.id === quoteId);
    if (!existing || existing.createdBy !== userId) return false;
    setQuotes((previous) => previous.map((item) =>
      item.id === quoteId && item.createdBy === userId ? { ...item, quote, author } : item
    ));
    return true;
  }

  return (
    <QuotesContext.Provider value={{ quotes, userId, isLoading, toggleLike, addQuote, updateQuote }}>
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) throw new Error("useQuotes must be used inside QuotesProvider");
  return context;
}
