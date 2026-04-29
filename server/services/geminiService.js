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
  const fallbackTip =
    "Choose one reusable item you use daily, like a water bottle or shopping bag, and keep it near your keys so it becomes a habit. This reduces single-use waste and lowers the energy used to produce and transport disposable products. Start with one week, then add another reusable swap once the first habit feels easy.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text()?.trim();
    return text || fallbackTip;
  } catch (err) {
    console.error("Gemini API error:", err);
    return fallbackTip;
  }
}

module.exports = { generateTip };
