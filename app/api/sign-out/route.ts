import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // Trigger sign out on the server; nextCookies plugin will handle cookie clearing
    await auth.api.signOut({ headers: await headers() });
    return new Response(null, { status: 200 });
  } catch (e) {
    console.error("Sign out failed:", e);
    return new Response(JSON.stringify({ error: "Sign out failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
