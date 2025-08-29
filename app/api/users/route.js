// /app/api/users/route.js
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { email, name, imageUrl } = await req.json();

    // assign admin role only for your email
    const ADMIN_EMAIL = "aneesh.rajx@gmail.com";
    const role = email === ADMIN_EMAIL ? "admin" : "user";

    // Find by email → update or insert
    const user = await User.findOneAndUpdate(
      { email },
      {
        _id: userId, // Clerk ID
        email,
        name,
        imageUrl: imageUrl || "",
        role,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Update all related Cart & Order documents
    await Cart.updateMany(
      { userId },
      { $set: { userName: name, userEmail: email } }
    );

    await Order.updateMany(
      { userId },
      { $set: { userName: name, userEmail: email } }
    );

    return new Response(JSON.stringify({ ok: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err.code === 11000) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response("Error saving user: " + err.message, { status: 500 });
  }
}

// GET: Fetch all users (only admin allowed)
export async function GET() {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // check if current user is admin
  const currentUser = await User.findById(userId);
  if (!currentUser || currentUser.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const users = await User.find({});
    return new Response(JSON.stringify({ ok: true, users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response("Error fetching users: " + err.message, { status: 500 });
  }
}
