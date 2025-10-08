import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { sendSignUpEmail } from "@/lib/inngest/functions";

// Expose the Inngest serve handler at /api/inngest for the Next.js App Router
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendSignUpEmail],
});
