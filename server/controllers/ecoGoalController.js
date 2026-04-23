const { generateCertificate } = require('../services/certificateService');
const { sendCertificateEmail } = require('../services/mailService');
const fs = require('fs');

async function completeEcoGoal(req, res) {
  try {
    const { name, email, goal, startDate, endDate, carbonSaved, streak } = req.body;

    const filePath = await generateCertificate({ name, goal, startDate, endDate, carbonSaved, streak });
    await sendCertificateEmail({ name, email, filePath });

    res.status(200).json({ message: 'Certificate sent successfully!' });

    setTimeout(() => {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.error('File cleanup failed:', e.message);
      }
    }, 10000);
  } catch (err) {
    console.error('Error sending certificate:', err);
    res.status(500).json({ message: 'Failed to generate or send certificate.' });
  }
}

module.exports = { completeEcoGoal };
