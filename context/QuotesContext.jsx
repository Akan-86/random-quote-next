"use client";

import { createContext, useContext, useState } from "react";
import { quotes as initialQuotes } from "@/quotes";

const userId = "user-akan";

/** @type {import("react").Context<{ quotes: typeof initialQuotes, userId: string, toggleLike: (quoteIndex: number) => void } | null>} */
const QuotesContext = createContext(null);

export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState(initialQuotes);

  function toggleLike(quoteIndex) {
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
