const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateCertificate({ name, goal, startDate, endDate, carbonSaved, streak }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([800, 600]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    color: rgb(0.93, 1, 0.93) 
  });

  page.drawRectangle({
    x: 10,
    y: 10,
    width: 780,
    height: 580,
    borderColor: rgb(0, 0.6, 0.2),
    borderWidth: 2,
  });

  // Add logo
  const logoPath = path.join(__dirname, '../assets/images/ecosangam_logo.png');
  const logoBytes = fs.readFileSync(logoPath);
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.15);
  page.drawImage(logoImage, {
    x: 800 / 2 - logoDims.width / 2,
    y: 510,
    width: logoDims.width,
    height: logoDims.height
  });

  const centerX = (text, fontSize, fontUsed) =>
    (800 - fontUsed.widthOfTextAtSize(text, fontSize)) / 2;

  let y = 460;
  const lineGap = 30;

  // Title
  const title = 'Certificate of Sustainability';
  const titleSize = 28;
  page.drawText(title, {
    x: centerX(title, titleSize, fontBold),
    y,
    size: titleSize,
    font: fontBold,
    color: rgb(0, 0.6, 0.2)
  });

  // Subtitle
  y -= lineGap;
  const subtitle = 'This certificate is proudly awarded to';
  page.drawText(subtitle, {
    x: centerX(subtitle, 14, font),
    y,
    size: 14,
    font,
    color: rgb(0.2, 0.2, 0.2)
  });

  // Name
  y -= lineGap;
  page.drawText(name, {
    x: centerX(name, 20, fontBold),
    y,
    size: 20,
    font: fontBold,
    color: rgb(0.2, 0.4, 0.6)
  });
  // Underline name
  const nameWidth = fontBold.widthOfTextAtSize(name, 20);
  page.drawLine({
    start: { x: 400 - nameWidth / 2, y: y - 5 },
    end: { x: 400 + nameWidth / 2, y: y - 5 },
    thickness: 1,
    color: rgb(0.2, 0.4, 0.6)
  });

  // Description line
  y -= lineGap;
  page.drawText('for completing their sustainability goal', {
    x: centerX('for completing their sustainability goal', 13, font),
    y,
    size: 13,
    font,
    color: rgb(0.1, 0.1, 0.1)
  });

  y -= 20;
  page.drawText('and taking one step ahead to make Earth greener', {
    x: centerX('and taking one step ahead to make Earth greener', 13, font),
    y,
    size: 13,
    font,
    color: rgb(0.1, 0.1, 0.1)
  });

  // Details Section
  y -= 60;

  const details = [
    [`Eco Goal Completed: ${goal}`, fontBold],
    [`Total CO2 Saved: ${carbonSaved} kg`, fontBold],
    [`Streak: ${streak} days`, font],
    [`Goal Duration: ${startDate} to ${endDate}`, font],
    [`Issued by: EcoSangam`, fontBold]
  ];

  for (let i = 0; i < details.length; i++) {
    const [text, fontUsed] = details[i];
    const fontSize = i === 4 ? 13 : 14;
    y -= lineGap;
    page.drawText(text, {
      x: centerX(text, fontSize, fontUsed),
      y,
      size: fontSize,
      font: fontUsed,
      color: i === 4 ? rgb(0, 0.6, 0.2) : rgb(0.1, 0.1, 0.1)
    });

    // Underline for CO2
    if (i === 1) {
      const textWidth = fontUsed.widthOfTextAtSize(text, fontSize);
      page.drawLine({
        start: { x: 400 - textWidth / 2, y: y - 5 },
        end: { x: 400 + textWidth / 2, y: y - 5 },
        thickness: 1,
        color: rgb(0, 0.6, 0.2)
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  const fileName = `certificate_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, '../../certs', fileName);
  fs.writeFileSync(filePath, pdfBytes);
  return filePath;
}

module.exports = { generateCertificate };


