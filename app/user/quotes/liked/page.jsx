"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useQuotes } from "@/context/QuotesContext";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { QuoteText } from "@/components/QuoteText";
import { AuthorText } from "@/components/AuthorText";
import { LikeButton } from "@/components/LikeButton";

export default function LikedQuotes() {
  const { quotes, userId, toggleLike } = useQuotes();
  const likedQuotes = quotes
    .map((quote, index) => ({ ...quote, index }))
    .filter((quote) => quote.likedBy.includes(userId));

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[70vh] max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Words to come back to.</h1>
      <p role="status" className="mb-10 mt-4 text-muted-foreground">{likedQuotes.length} liked {likedQuotes.length === 1 ? "quote" : "quotes"}</p>
      {likedQuotes.length === 0 ? (
        <Card className="items-center border-dashed py-16 text-center">
          <Heart aria-hidden="true" className="mb-5 size-9 text-primary" />
          <h2 className="text-xl font-semibold">Your collection starts here</h2>
          <p className="mb-6 mt-3 max-w-sm text-muted-foreground">Like a quote on the Discover page and find it here. A few words can make a difference.</p>
          <Button asChild variant="default"><Link href="/">Discover quotes</Link></Button>
        </Card>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {likedQuotes.map((quote) => (
            <li key={quote.index}>
              <Card isLiked className="h-full">
                <blockquote className="flex-1">
                  <QuoteText>{quote.quote}</QuoteText>
                  <AuthorText>{quote.author}</AuthorText>
                </blockquote>
                <div className="mt-6 border-t pt-6">
                  <LikeButton isLiked={true} onClick={() => toggleLike(quote.index)} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
