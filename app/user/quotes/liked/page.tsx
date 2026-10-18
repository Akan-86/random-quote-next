"use client";

import { PageTitle, SectionTitle, BodyText } from "@/components/Typography";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useQuotes } from "@/context/QuotesContext";
import { QuoteCard } from "@/components/QuoteCard";
import { AppButton } from "@/components/AppButton";
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
      <PageTitle>Words to come back to.</PageTitle>
      <BodyText role="status" className="mb-10 mt-4">{likedQuotes.length} liked {likedQuotes.length === 1 ? "quote" : "quotes"}</BodyText>
      {likedQuotes.length === 0 ? (
        <QuoteCard className="items-center border-dashed py-16 text-center">
          <Heart aria-hidden="true" className="mb-5 size-9 text-primary" />
          <SectionTitle>Your collection starts here</SectionTitle>
          <BodyText className="mb-6 mt-3 max-w-sm">Like a quote on the Discover page and find it here. A few words can make a difference.</BodyText>
          <AppButton asChild variant="default"><Link href="/">Discover quotes</Link></AppButton>
        </QuoteCard>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {likedQuotes.map((quote) => (
            <li key={quote.index}>
              <QuoteCard isLiked className="h-full">
                <blockquote className="flex-1">
                  <QuoteText>{quote.quote}</QuoteText>
                  <AuthorText>{quote.author}</AuthorText>
                </blockquote>
                <div className="mt-6 border-t pt-6">
                  <LikeButton isLiked={true} onClick={() => toggleLike(quote.index)} />
                </div>
              </QuoteCard>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
