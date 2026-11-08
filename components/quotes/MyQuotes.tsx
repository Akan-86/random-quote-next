"use client";

import Link from "next/link";
import { useQuotes } from "@/context/QuotesContext";
import { AppButton } from "@/components/AppButton";
import { AuthorText } from "@/components/AuthorText";
import { QuoteCard } from "@/components/QuoteCard";
import { BodyText, PageTitle } from "@/components/Typography";
import { QuoteText } from "@/components/QuoteText";

export function MyQuotes() {
  const { quotes, userId } = useQuotes();
  const myQuotes = quotes.filter((quote) => quote.createdBy === userId && !!quote.id);

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[70vh] max-w-6xl px-5 py-12 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><PageTitle>My quotes</PageTitle><BodyText className="mt-3">Quotes you have created.</BodyText></div>
        <AppButton asChild variant="default"><Link href="/user/quotes/new">Create quote</Link></AppButton>
      </div>
      {myQuotes.length === 0 ? (
        <QuoteCard className="items-center border-dashed py-12 text-center">
          <BodyText className="mb-5">You haven’t created a quote yet.</BodyText>
          <AppButton asChild variant="default"><Link href="/user/quotes/new">Create your first quote</Link></AppButton>
        </QuoteCard>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {myQuotes.map((quote) => (
            <li key={quote.id}>
              <QuoteCard className="h-full">
                <blockquote className="flex-1"><QuoteText>{quote.quote}</QuoteText><AuthorText>{quote.author}</AuthorText></blockquote>
                <div className="border-t px-6 pt-5"><AppButton asChild><Link href={`/user/quotes/${encodeURIComponent(quote.id)}/edit`}>Edit quote</Link></AppButton></div>
              </QuoteCard>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
