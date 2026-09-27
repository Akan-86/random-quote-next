"use client";

import { useState } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { QuoteText } from "@/components/QuoteText";
import { AuthorText } from "@/components/AuthorText";

const userId = "user-akan";

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [index, setIndex] = useState(0);
  const currentQuote = quotes[index];
  const isLiked = currentQuote.likedBy.includes(userId);

  function handleLike() {
    setQuotes((previousQuotes) =>
      previousQuotes.map((quote, quoteIndex) => {
        if (quoteIndex !== index) return quote;

        const alreadyLiked = quote.likedBy.includes(userId);
        return {
          ...quote,
          likedBy: alreadyLiked
            ? quote.likedBy.filter((id) => id !== userId)
            : [...quote.likedBy, userId],
        };
      })
    );
  }

  function handlePrevious() {
    setIndex((previousIndex) => (previousIndex - 1 + quotes.length) % quotes.length);
  }

  function handleNext() {
    setIndex((previousIndex) => (previousIndex + 1) % quotes.length);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-12">
      <div className="w-full max-w-xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-violet-300">A MOMENT OF INSPIRATION</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Random Quote<span className="text-violet-400">.</span></h1>
          <p className="mt-4 text-slate-300">A little perspective for your day.</p>
        </header>

        <Card>
          <blockquote aria-live="polite">
            <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 font-serif text-4xl text-violet-700">“</span>
            <QuoteText>{currentQuote.quote}</QuoteText>
            <AuthorText>{currentQuote.author}</AuthorText>
            <p className="mt-4 text-sm text-slate-500">Quote {index + 1} of {quotes.length}</p>
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleLike} aria-pressed={isLiked}>
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </Card>
        <p className="mt-6 text-center text-xs tracking-wide text-slate-400">Pause. Reflect. Keep going.</p>
      </div>
    </main>
  );
}
