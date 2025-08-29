import connectDB from "@/config/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const { id, name, email, imageUrl } = await req.json();

  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      await User.create({ _id: id, name, email, imageUrl });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
