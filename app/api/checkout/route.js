export async function POST(req) {
  try {
    const { items, address } = await req.json();

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: "No items in order" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!address) {
      return new Response(
        JSON.stringify({ ok: false, error: "No shipping address provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Simulate order creation (no Stripe)
    console.log("Order created:", { items, address });

    return new Response(
      JSON.stringify({ ok: true, message: "Order created successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
