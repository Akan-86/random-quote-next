"use client";

import { PageTitle, BodyText, Caption } from "@/components/Typography";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useQuotes } from "@/context/QuotesContext";
import { QuoteCard } from "@/components/QuoteCard";
import { AppButton } from "@/components/AppButton";
import { LikeButton } from "@/components/LikeButton";
import { QuoteText } from "@/components/QuoteText";
import { AuthorText } from "@/components/AuthorText";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { quotes, userId, toggleLike } = useQuotes();
  const [index, setIndex] = useState(0);
  const currentQuote = quotes[index];
  const isLiked = currentQuote.likedBy.includes(userId);

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <Badge variant="secondary" className="mb-6">A moment of inspiration</Badge>
        <PageTitle className="max-w-md lg:text-6xl">A little perspective.<br /><span className="text-primary">A brighter day.</span></PageTitle>
        <BodyText className="mt-6 max-w-sm">Take a breath, discover a thought, and save the words that stay with you.</BodyText>
      </div>
      <QuoteCard isLiked={isLiked}>
        <Quote aria-hidden="true" className="mb-6 size-9 text-primary" />
        <div aria-live="polite" aria-atomic="true">
          <blockquote>
            <QuoteText>{currentQuote.quote}</QuoteText>
            <AuthorText>{currentQuote.author}</AuthorText>
          </blockquote>
          <Caption className="mt-8">Quote {index + 1} of {quotes.length}</Caption>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <div className="flex gap-2">
            <AppButton onClick={() => setIndex((previous) => (previous - 1 + quotes.length) % quotes.length)}><ArrowLeft aria-hidden="true" />Previous</AppButton>
            <AppButton onClick={() => setIndex((previous) => (previous + 1) % quotes.length)}>Next<ArrowRight aria-hidden="true" /></AppButton>
          </div>
          <LikeButton isLiked={isLiked} onClick={() => toggleLike(index)} />
        </div>
      </QuoteCard>
    </main>
  );
}
