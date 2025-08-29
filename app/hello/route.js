// app/api/hello/route.js
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();
  console.log("DEBUG /api/hello userId:", userId);
  
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
