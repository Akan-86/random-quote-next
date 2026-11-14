"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/AppButton";
import { BodyText, PageTitle } from "@/components/Typography";
import { QuoteCard } from "@/components/QuoteCard";
import { useQuotes } from "@/context/QuotesContext";
import { quoteCategories, type Quote, type QuoteCategory } from "@/quotes";

type FieldErrors = { quote?: string; author?: string };
type EditableQuote = { id: string; quote: Quote["quote"]; author: Quote["author"]; category?: QuoteCategory };
type TextField = keyof FieldErrors;

function validateField(field: TextField, value: string) {
  const cleanValue = value.trim();
  if (field === "quote") {
    if (!cleanValue) return "Please enter a quote.";
    if (cleanValue.length < 10) return "Quote must be at least 10 characters.";
    if (cleanValue.length > 500) return "Quote must be 500 characters or fewer.";
  } else {
    if (!cleanValue) return "Please enter the author’s name.";
    if (cleanValue.length < 2) return "Author must be at least 2 characters.";
    if (cleanValue.length > 80) return "Author must be 80 characters or fewer.";
  }
  return undefined;
}

export function QuoteEditor({ existingQuote }: { existingQuote?: EditableQuote }) {
  const router = useRouter();
  const { addQuote, updateQuote, userId, isLoading } = useQuotes();
  const [quote, setQuote] = useState(existingQuote?.quote ?? "");
  const [author, setAuthor] = useState(existingQuote?.author ?? "");
  const [category, setCategory] = useState<QuoteCategory | "">(existingQuote?.category ?? "");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  function handleBlur(field: TextField, value: string) {
    setErrors((previous) => ({ ...previous, [field]: validateField(field, value) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {
      quote: validateField("quote", quote),
      author: validateField("author", author),
    };
    setErrors(nextErrors);
    setFormError("");
    if (Object.values(nextErrors).some(Boolean)) return;
    if (!userId || isLoading) {
      setFormError("Please wait for your account to finish loading, then try again.");
      return;
    }

    const cleanQuote = quote.trim();
    const cleanAuthor = author.trim();
    const selectedCategory = category || undefined;
    if (existingQuote) {
      if (!updateQuote(existingQuote.id, cleanQuote, cleanAuthor, selectedCategory)) {
        setFormError("Only the person who created this quote can edit it.");
        return;
      }
    } else if (!addQuote(cleanQuote, cleanAuthor, selectedCategory)) {
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
            <textarea id="quote" name="quote" rows={5} required minLength={10} maxLength={500} value={quote} onChange={(event) => { setQuote(event.target.value); if (errors.quote) handleBlur("quote", event.target.value); }} onBlur={() => handleBlur("quote", quote)} aria-invalid={errors.quote ? true : undefined} aria-describedby={errors.quote ? "quote-error quote-help" : "quote-help"} className="w-full rounded-md border bg-background px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
            <div className="flex justify-between text-sm text-muted-foreground"><p id="quote-help">10–500 characters.</p><p aria-live="polite">{quote.length}/500</p></div>
            {errors.quote && <p id="quote-error" className="text-sm text-destructive">{errors.quote}</p>}
          </div>
          <div className="space-y-2">
            <label className="font-medium" htmlFor="author">Author</label>
            <input id="author" name="author" type="text" required minLength={2} maxLength={80} value={author} onChange={(event) => { setAuthor(event.target.value); if (errors.author) handleBlur("author", event.target.value); }} onBlur={() => handleBlur("author", author)} aria-invalid={errors.author ? true : undefined} aria-describedby={errors.author ? "author-error author-help" : "author-help"} className="w-full rounded-md border bg-background px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
            <div className="flex justify-between text-sm text-muted-foreground"><p id="author-help">2–80 characters.</p><p aria-live="polite">{author.length}/80</p></div>
            {errors.author && <p id="author-error" className="text-sm text-destructive">{errors.author}</p>}
          </div>
          <div className="space-y-2">
            <label className="font-medium" htmlFor="category">Category <span className="text-muted-foreground">(optional)</span></label>
            <select id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value as QuoteCategory | "")} className="w-full rounded-md border bg-background px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <option value="">No category</option>
              {quoteCategories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
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
