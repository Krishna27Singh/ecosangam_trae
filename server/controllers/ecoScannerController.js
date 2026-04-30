const { analyzeEcoImage } = require('../services/ecoScannerService');

async function scanEcoImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    const inputType = req.body?.inputType || 'receipt or food/product image';
    const base64Image = req.file.buffer.toString('base64');

    const analysis = await analyzeEcoImage({
      base64Image,
      mimeType: req.file.mimetype,
      inputType
    });

    return res.status(200).json({
      ...analysis,
      scannedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Eco scanner failed:', error);
    // Last safety net: API still returns a valid payload shape so UI never breaks.
    return res.status(200).json({
      items: [],
      totalEmissionKg: 0,
      sustainabilityScore: 55,
      tips: [
        'Try scanning a clearer image with proper lighting.',
        'Reduce packaging-heavy purchases where possible.',
        'Choose local and seasonal options to reduce transport impact.'
      ],
      scannedAt: new Date().toISOString(),
      aiFallback: true,
      warning: 'AI scanner temporarily unavailable. Fallback result returned.'
    });
  }
}

module.exports = { scanEcoImage };
