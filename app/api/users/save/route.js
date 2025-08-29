import connectDB from "@/config/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  try {
    const { id, name, email, imageUrl } = await req.json();
    if (!id || !name || !email) {
      return new Response("Missing fields", { status: 400 });
    }

    // Upsert user
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, imageUrl },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return new Response(JSON.stringify({ ok: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to save user: " + err.message, { status: 500 });
  }
}
