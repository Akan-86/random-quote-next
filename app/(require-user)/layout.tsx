import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function RequireUserLayout({ children }: { children: ReactNode }) {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login?returnTo=/user/profile");
  return children;
}
