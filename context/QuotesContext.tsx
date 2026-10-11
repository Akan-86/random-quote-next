"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { quotes as initialQuotes, type Quote } from "@/quotes";

const userId = "user-akan";

type QuotesContextValue = {
  quotes: Quote[];
  userId: string;
  toggleLike: (quoteIndex: number) => void;
};

const QuotesContext = createContext<QuotesContextValue | null>(null);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  function toggleLike(quoteIndex: number) {
    setQuotes((previousQuotes) =>
      previousQuotes.map((quote, index) => {
        if (index !== quoteIndex) return quote;

        return {
          ...quote,
          likedBy: quote.likedBy.includes(userId)
            ? quote.likedBy.filter((id) => id !== userId)
            : [...quote.likedBy, userId],
        };
      })
    );
  }

  return (
    <QuotesContext.Provider value={{ quotes, userId, toggleLike }}>
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) throw new Error("useQuotes must be used inside QuotesProvider");
  return context;
}
