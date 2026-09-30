"use client";

import Link from "next/link";
import { useQuotes } from "@/context/QuotesContext";
import { Card } from "@/components/Card";
import { QuoteText } from "@/components/QuoteText";
import { AuthorText } from "@/components/AuthorText";
import { LikeButton } from "@/components/LikeButton";

export default function LikedQuotes() {
  const { quotes, userId, toggleLike } = useQuotes();
  const likedQuotes = quotes
    .map((quote, index) => ({ ...quote, index }))
    .filter((quote) => quote.likedBy.includes(userId));

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-12">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-white">Liked quotes</h1>
        <Link href="/" className="mt-4 inline-block text-violet-300 underline underline-offset-4">
          Back to quotes
        </Link>
        <p aria-live="polite" className="my-6 text-slate-300">
          {likedQuotes.length === 0
            ? "No liked quotes yet. Like a quote on the main page to see it here."
            : `${likedQuotes.length} liked ${likedQuotes.length === 1 ? "quote" : "quotes"}`}
        </p>
        <div className="space-y-6">
          {likedQuotes.map((quote) => (
            <Card key={quote.index} className="border-rose-400 bg-rose-50">
              <blockquote>
                <QuoteText>{quote.quote}</QuoteText>
                <AuthorText>{quote.author}</AuthorText>
              </blockquote>
              <div className="mt-6">
                <LikeButton isLiked={true} onClick={() => toggleLike(quote.index)} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
