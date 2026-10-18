import type { Quote } from "@/quotes";

export function toggleQuoteLike(quotes: Quote[], quoteIndex: number, userId?: string): Quote[] {
  if (!userId) return quotes;

  return quotes.map((quote, index) => {
    if (index !== quoteIndex) return quote;
    return {
      ...quote,
      likedBy: quote.likedBy.includes(userId)
        ? quote.likedBy.filter((id) => id !== userId)
        : [...quote.likedBy, userId],
    };
  });
}
