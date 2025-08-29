// app/api/orders/route.js
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();
  const { userId } = auth();
  
  if (!userId) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { items, total, shippingAddress, paymentStatus } = await req.json();

    const order = new Order({
      userId,
      products: items,
      total,
      shippingAddress,
      paymentStatus: paymentStatus || "pending",
      status: "pending",
    });

    await order.save();
    return new Response(JSON.stringify({ ok: true, order }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}