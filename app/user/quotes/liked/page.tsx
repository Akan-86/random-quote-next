import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import LikedQuotes from "@/components/LikedQuotes";

export default async function LikedQuotesPage() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login?returnTo=/user/quotes/liked");
  return <LikedQuotes />;
}
