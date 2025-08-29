import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Cart from "@/models/Cart";

export async function GET(req) {
  await connectDB();
  const { userId } = auth({ req }); // Pass req!
  if (!userId) return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401 });

  try {
    const cart = await Cart.findOne({ userId });
    return new Response(JSON.stringify({ ok: true, cart: cart || { items: [] } }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const { userId } = auth({ req });
  if (!userId) return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401 });

  try {
    const { product } = await req.json();
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [product] });
    } else {
      const index = cart.items.findIndex(item => item.productId === product.productId);
      if (index > -1) {
        cart.items[index].quantity += product.quantity;
      } else {
        cart.items.push(product);
      }
    }

    await cart.save();
    return new Response(JSON.stringify({ ok: true, cart }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
