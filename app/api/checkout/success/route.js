// app/api/checkout/success/route.js


export async function POST(req) {
  try {
    const { session_id, order } = await req.json();

    if (!order) {
      return new Response(JSON.stringify({ ok: false, error: "No order provided" }), { status: 400 });
    }

    // Add order to in-memory storage
    addOrder(order);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
