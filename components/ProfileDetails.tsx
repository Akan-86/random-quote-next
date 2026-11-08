"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { QuoteCard } from "@/components/QuoteCard";
import { BodyText, PageTitle } from "@/components/Typography";

export function ProfileDetails() {
  const { user, isLoading } = useUser();
  if (isLoading || !user) {
    return <main id="main-content" className="mx-auto max-w-3xl px-5 py-12"><BodyText role="status">Loading your profile…</BodyText></main>;
  }

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[70vh] max-w-3xl px-5 py-12 sm:px-8">
      <PageTitle>Your profile</PageTitle>
      <BodyText className="mb-8 mt-4">Your account information from Auth0.</BodyText>
      <QuoteCard>
        <dl className="space-y-6 break-words">
          <div><dt className="font-semibold">Name</dt><dd>{user.name ?? user.nickname ?? "Not provided"}</dd></div>
          <div><dt className="font-semibold">Email</dt><dd>{user.email ?? "Not provided"}</dd></div>
          <div><dt className="font-semibold">Email verified</dt><dd>{user.email_verified ? "Yes" : "No"}</dd></div>
          <div><dt className="font-semibold">User ID</dt><dd>{user.sub}</dd></div>
        </dl>
      </QuoteCard>
    </main>
  );
}
