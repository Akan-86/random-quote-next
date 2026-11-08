"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/AppButton";
import { BodyText, PageTitle } from "@/components/Typography";
import { QuoteCard } from "@/components/QuoteCard";
import { useQuotes } from "@/context/QuotesContext";
import type { Quote } from "@/quotes";

type FieldErrors = { quote?: string; author?: string };
type EditableQuote = { id: string; quote: Quote["quote"]; author: Quote["author"] };

export function QuoteEditor({ existingQuote }: { existingQuote?: EditableQuote }) {
  const router = useRouter();
  const { addQuote, updateQuote, userId, isLoading } = useQuotes();
  const [quote, setQuote] = useState(existingQuote?.quote ?? "");
  const [author, setAuthor] = useState(existingQuote?.author ?? "");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    const cleanQuote = quote.trim();
    const cleanAuthor = author.trim();

    if (cleanQuote.length < 10) nextErrors.quote = "Quote must be at least 10 characters.";
    else if (cleanQuote.length > 500) nextErrors.quote = "Quote must be 500 characters or fewer.";
    if (cleanAuthor.length < 2) nextErrors.author = "Author must be at least 2 characters.";
    else if (cleanAuthor.length > 80) nextErrors.author = "Author must be 80 characters or fewer.";

    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) return;
    if (!userId || isLoading) {
      setFormError("Please wait for your account to finish loading, then try again.");
      return;
    }

    if (existingQuote) {
      if (!updateQuote(existingQuote.id, cleanQuote, cleanAuthor)) {
        setFormError("Only the person who created this quote can edit it.");
        return;
      }
    } else if (!addQuote(cleanQuote, cleanAuthor)) {
      setFormError("Please log in before creating a quote.");
      return;
    }

    router.push("/user/quotes/mine");
  }

  const heading = existingQuote ? "Edit your quote" : "Create a quote";

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[70vh] max-w-3xl px-5 py-12 sm:px-8">
      <PageTitle>{heading}</PageTitle>
      <BodyText className="mb-8 mt-4">Share a thought and the name of the person who said it.</BodyText>
      <QuoteCard>
        <form className="space-y-6 px-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label className="font-medium" htmlFor="quote">Quote</label>
            <textarea id="quote" name="quote" rows={5} maxLength={500} value={quote} onChange={(event) => setQuote(event.target.value)} aria-invalid={!!errors.quote} aria-describedby={errors.quote ? "quote-error" : "quote-help"} className="w-full rounded-md border bg-background px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
            <p id="quote-help" className="text-sm text-muted-foreground">10–500 characters.</p>
            {errors.quote && <p id="quote-error" className="text-sm text-destructive">{errors.quote}</p>}
          </div>
          <div className="space-y-2">
            <label className="font-medium" htmlFor="author">Author</label>
            <input id="author" name="author" type="text" maxLength={80} value={author} onChange={(event) => setAuthor(event.target.value)} aria-invalid={!!errors.author} aria-describedby={errors.author ? "author-error" : "author-help"} className="w-full rounded-md border bg-background px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
            <p id="author-help" className="text-sm text-muted-foreground">2–80 characters.</p>
            {errors.author && <p id="author-error" className="text-sm text-destructive">{errors.author}</p>}
          </div>
          {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
          <div className="flex flex-wrap gap-3 pb-6">
            <AppButton type="submit" variant="default" disabled={isLoading}>{existingQuote ? "Save changes" : "Create quote"}</AppButton>
            <AppButton onClick={() => router.push("/user/quotes/mine")}>Cancel</AppButton>
          </div>
        </form>
      </QuoteCard>
    </main>
  );
}
