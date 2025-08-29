// pages/api/keywords-chat.js
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { message } = await req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please send a message" });
    }

    const lowerMsg = message.toLowerCase();

    // Define keyword-based responses
    const responses = [
      { keywords: ["delivery", "ship"], reply: "We will reach you shortly regarding delivery." },
      { keywords: ["price", "cost"], reply: "Please check our pricing page for details." },
      { keywords: ["refund", "return"], reply: "Our refund team will contact you soon." },
      { keywords: ["hello", "hi", "hey"], reply: "Hello! How can I assist you today?" },
      { keywords: ["thank", "thanks"], reply: "You're welcome! 😊" },
      { keywords: ["support", "help"], reply: "Our support team is here to help you." },
    ];

    // Find the first matching keyword
    const matched = responses.find(r =>
      r.keywords.some(k => lowerMsg.includes(k))
    );

    return res.status(200).json({
      reply: matched ? matched.reply : "Sorry, I didn't understand that."
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ reply: "Something went wrong." });
  }
}
