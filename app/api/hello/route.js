

import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId, sessionId } = auth();
  console.log("DEBUG /api/hello:", { userId, sessionId });

  if (!userId) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, userId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
