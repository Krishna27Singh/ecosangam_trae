const { generateTip } = require("../services/geminiService");

exports.getTip = async (req, res) => {
  try {
    const { prompt } = req.body;
    const tip = await generateTip(prompt);
    res.status(200).json({ tip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
