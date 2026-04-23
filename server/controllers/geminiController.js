const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


exports.undoImpact = async (req, res) => {
  try {
    const carbonFootprint = req.body.result || 0;

    const prompt = `
You are EcoSangam, an AI-powered sustainability assistant helping users reduce and neutralize their carbon emissions.

The user has emitted approximately **${carbonFootprint} tons of CO₂ per year** from household activities.

Give a set of **personalized, actionable suggestions** to neutralize or reduce this carbon footprint. Start your suggestions with:
"**EcoSangam suggests you to...**"

Instructions:
- create a short response but not too short. 
- Make your tone friendly and motivational.
- Use both **technical** and **layman terms** (e.g., "install solar panels" and then explain in plain terms why and how it helps).
- Give 4–6 suggestions, ordered by impact.
- Quantify impact where possible (e.g., "can reduce 1.5 tons/year").
- Include tips for **daily behavior**, **lifestyle changes**, and **offsetting options** (like tree planting or clean energy contributions).
- End with a short note like: "Every small step helps the planet breathe better."
    `.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    console.log("Generated Eco Advice:", summary);
    res.json({ summary });
  } catch (error) {
    console.error("Eco impact suggestion failed:", error);
    res.status(500).json({ error: 'Failed to generate sustainability advice' });
  }
};



