require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!global.fetch) {
  global.fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateTip(
  prompt = "Give me one detailed, everyday sustainability tip that is practical and easy to follow. The tip should not be concise—explain the reasoning behind it, how it positively impacts the environment, and offer actionable steps to implement it in daily life. Keep the response clear, educational, and under 100 words. Avoid technical jargon. This is meant for a general audience trying to adopt eco-friendly habits."
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text()?.trim();
    return text || "Try carrying a reusable water bottle instead of buying plastic ones.";
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error("Could not fetch sustainability tip.");
  }
}

module.exports = { generateTip };
