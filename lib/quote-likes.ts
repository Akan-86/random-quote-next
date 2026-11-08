import type { Quote } from "@/quotes";

export function toggleQuoteLike<T extends Quote>(quotes: T[], quoteIndex: number, userId?: string): T[] {
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
