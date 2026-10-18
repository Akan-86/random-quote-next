import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { QuoteCard } from "@/components/QuoteCard";
import { PageTitle, BodyText } from "@/components/Typography";

export default async function ProfilePage() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login?returnTo=/user/profile");

  const { user } = session;
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
