import Stripe from "stripe";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return new Response(JSON.stringify({ ok: false, error: "sessionId required" }), { status: 400 });
    }

    // get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent"] });

    if (!session) {
      return new Response(JSON.stringify({ ok: false, error: "Session not found" }), { status: 404 });
    }

    // check payment status (Stripe sets payment_status)
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ ok: false, error: "Payment not completed" }), { status: 400 });
    }

    // find the pending order we created earlier
    const order = await Order.findOne({ stripeSessionId: sessionId });
    if (!order) {
      return new Response(JSON.stringify({ ok: false, error: "Order record not found" }), { status: 404 });
    }

    // update order to paid
    order.paymentStatus = "paid";
    order.status = "processing";
    order.paidAt = new Date();
    await order.save();

    // clear user's cart (if user exists)
    const clerkId = session.metadata?.clerkId;
    if (clerkId) {
      const dbUser = await User.findOne({ clerkId });
      if (dbUser) {
        await Cart.findOneAndUpdate({ userId: dbUser._id }, { items: [] });
      }
    }

    return new Response(JSON.stringify({ ok: true, order }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("verify error:", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
