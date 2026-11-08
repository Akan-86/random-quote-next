"use client";

import { useParams } from "next/navigation";
import { BodyText } from "@/components/Typography";
import { QuoteEditor } from "@/components/quotes/QuoteEditor";
import { useQuotes } from "@/context/QuotesContext";

export default function EditQuotePage() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const { quotes, userId } = useQuotes();
  const quote = quotes.find((item) => item.id === quoteId);

  if (!quote || !userId || quote.createdBy !== userId) {
    return <main id="main-content" className="mx-auto max-w-3xl px-5 py-12"><BodyText role="alert">This quote isn’t available to edit from your account.</BodyText></main>;
  }

  return <QuoteEditor key={quote.id} existingQuote={quote} />;
}
