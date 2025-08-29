import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { message } = await req.body;

    // Ensure API key exists in environment
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    if (!DEEPSEEK_API_KEY) {
      return res.status(500).json({ reply: "Deepseek API key is missing!" });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-r1-0528:free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Sorry, couldn't process.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: "Something went wrong." });
  }
}
