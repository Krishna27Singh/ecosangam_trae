const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const extractJsonPayload = (rawText) => {
  if (!rawText) return null;

  const cleaned = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch (nestedErr) {
      return null;
    }
  }
};

const toNumber = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(String(value || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const buildFallbackAnalysis = (inputType = '') => {
  const normalized = String(inputType).toLowerCase();

  const presets = {
    receipt: {
      items: [
        { name: 'Dairy Item', estimatedEmissionKg: 1.4, category: 'food' },
        { name: 'Packaged Grocery', estimatedEmissionKg: 1.1, category: 'grocery' },
        { name: 'Delivery / Transport Impact', estimatedEmissionKg: 0.8, category: 'transport' }
      ],
      tips: [
        'Choose local or seasonal items when possible.',
        'Buy in bulk to reduce packaging emissions.',
        'Combine orders to reduce delivery-related emissions.'
      ]
    },
    food: {
      items: [
        { name: 'Cooked Meal', estimatedEmissionKg: 2.2, category: 'meal' },
        { name: 'Protein Component', estimatedEmissionKg: 2.5, category: 'food' },
        { name: 'Packaging / Extras', estimatedEmissionKg: 0.6, category: 'packaging' }
      ],
      tips: [
        'Add more plant-based meals during the week.',
        'Avoid food waste by planning portions.',
        'Use reusable containers for takeout and storage.'
      ]
    },
    product: {
      items: [
        { name: 'Packaged Product', estimatedEmissionKg: 1.7, category: 'product' },
        { name: 'Plastic Packaging', estimatedEmissionKg: 0.9, category: 'packaging' },
        { name: 'Retail Transport', estimatedEmissionKg: 0.7, category: 'transport' }
      ],
      tips: [
        'Prefer low-packaging or refill options.',
        'Choose durable products over single-use alternatives.',
        'Buy only what you need to reduce waste.'
      ]
    },
    utility: {
      items: [
        { name: 'Electricity Usage', estimatedEmissionKg: 6.2, category: 'energy' },
        { name: 'Water Heating', estimatedEmissionKg: 2.1, category: 'energy' },
        { name: 'Appliance Standby Load', estimatedEmissionKg: 1.3, category: 'energy' }
      ],
      tips: [
        'Switch to efficient appliances and LED lighting.',
        'Turn off standby devices at night.',
        'Set AC/heater to efficient temperature ranges.'
      ]
    }
  };

  const profile = normalized.includes('receipt')
    ? presets.receipt
    : normalized.includes('food') || normalized.includes('meal')
      ? presets.food
      : normalized.includes('utility') || normalized.includes('bill')
        ? presets.utility
        : presets.product;

  const totalEmissionKg = Number(
    profile.items.reduce((sum, item) => sum + item.estimatedEmissionKg, 0).toFixed(2)
  );
  const sustainabilityScore = Math.max(35, Math.min(85, Math.round(100 - totalEmissionKg * 6)));

  return {
    items: profile.items,
    totalEmissionKg,
    sustainabilityScore,
    tips: profile.tips,
    aiFallback: true
  };
};

async function analyzeEcoImage({ base64Image, mimeType, inputType }) {
  const prompt = `
You are EcoSangam AI Scanner.
Analyze this image of ${inputType}.

Task:
1) Detect all meaningful items/foods/products/services from the image.
2) For each detected item, estimate carbon emission in kg CO2.
3) Compute total emission.
4) Return sustainabilityScore between 0 and 100 (higher is better).
5) Give 3-5 personalized reduction tips.

Return STRICT JSON only (no markdown, no explanation), in this exact schema:
{
  "items": [
    {
      "name": "string",
      "estimatedEmissionKg": 0,
      "category": "string"
    }
  ],
  "totalEmissionKg": 0,
  "sustainabilityScore": 0,
  "tips": ["string"]
}

Rules:
- Keep numbers realistic and concise.
- If uncertain, provide best-effort estimates.
- Never return null; always return valid defaults.
  `.trim();

  const modelNames = ['gemini-2.5-flash'];
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType
          }
        }
      ]);

      const text = result?.response?.text?.() || '';
      const parsed = extractJsonPayload(text);

      if (!parsed) {
        continue;
      }

      const items = Array.isArray(parsed.items)
        ? parsed.items.map((item) => ({
            name: item?.name || 'Unknown item',
            estimatedEmissionKg: toNumber(item?.estimatedEmissionKg),
            category: item?.category || 'general'
          }))
        : [];

      const totalFromItems = items.reduce((sum, item) => sum + item.estimatedEmissionKg, 0);
      const totalEmissionKg = toNumber(parsed.totalEmissionKg) || totalFromItems;
      const sustainabilityScore = Math.max(0, Math.min(100, Math.round(toNumber(parsed.sustainabilityScore) || 0)));
      const tips = Array.isArray(parsed.tips) && parsed.tips.length
        ? parsed.tips.slice(0, 5).map((tip) => String(tip))
        : [
            'Choose plant-forward meals more often.',
            'Combine shopping trips to reduce transport emissions.',
            'Pick low-packaging products when available.'
          ];

      return {
        items,
        totalEmissionKg: Number(totalEmissionKg.toFixed(2)),
        sustainabilityScore,
        tips,
        aiFallback: false
      };
    } catch (error) {
      lastError = error;
      // Rate limit / transient errors: small wait and try next model.
      await sleep(900);
    }
  }

  console.error('Eco scanner AI unavailable, using fallback:', lastError?.message || lastError);
  return {
    ...buildFallbackAnalysis(inputType),
    warning: 'AI quota or availability issue. Returned fallback estimate.'
  };
}

module.exports = { analyzeEcoImage };
