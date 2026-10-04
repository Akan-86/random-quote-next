"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useQuotes } from "@/context/QuotesContext";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
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
        <h1 className="max-w-md font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">A little perspective.<br /><span className="text-primary">A brighter day.</span></h1>
        <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">Take a breath, discover a thought, and save the words that stay with you.</p>
      </div>
      <Card isLiked={isLiked}>
        <Quote aria-hidden="true" className="mb-6 size-9 text-primary" />
        <div aria-live="polite" aria-atomic="true">
          <blockquote>
            <QuoteText>{currentQuote.quote}</QuoteText>
            <AuthorText>{currentQuote.author}</AuthorText>
          </blockquote>
          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">Quote {index + 1} of {quotes.length}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <div className="flex gap-2">
            <Button onClick={() => setIndex((previous) => (previous - 1 + quotes.length) % quotes.length)}><ArrowLeft aria-hidden="true" />Previous</Button>
            <Button onClick={() => setIndex((previous) => (previous + 1) % quotes.length)}>Next<ArrowRight aria-hidden="true" /></Button>
          </div>
          <LikeButton isLiked={isLiked} onClick={() => toggleLike(index)} />
        </div>
      </Card>
    </main>
  );
}
