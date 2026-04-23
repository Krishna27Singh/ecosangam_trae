const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecosangam2025@gmail.com',
    pass: 'pgvo vzvj pmyd pmgj' 
  }
});

async function sendCertificateEmail({ name, email, filePath }) {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>EcoSangam – Eco Goal Certificate</title>
    <style>
        body    { margin:0; font-family:'Segoe UI',Roboto,sans-serif;background:#f6f9fc;color:#333; }
        .outer  { width:100%; padding:40px 0; }
        .card   { max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden;
                  box-shadow:0 6px 16px rgba(0,0,0,0.08); }
        .header { background:#28a745; padding:30px; text-align:center; }
        .header h1 { margin:0; color:#fff; font-size:28px; letter-spacing:1px; }
        .badge  { display:inline-block; background:#fff; color:#28a745; border-radius:50px;
                  padding:6px 14px; font-size:13px; margin-top:12px; }
        .content{ padding:30px 40px; line-height:1.6; font-size:16px; }
        .content h2 { color:#28a745; margin:0 0 12px; font-size:20px; }
        .cta    { text-align:center; margin:40px 0 10px; }
        .btn    { background:#28a745; color:#fff; text-decoration:none; padding:14px 28px; border-radius:30px;
                  font-size:15px; display:inline-block; transition:opacity .2s; }
        .btn:hover { opacity:.85; }
        .footer { font-size:12px; color:#777; text-align:center; padding-bottom:25px; }
        @media(max-width:600px){
            .content{padding:24px 25px;}
            .card   {border-radius:0;}
        }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="card">
        <div class="header">
          <h1>EcoSangam</h1>
          <div class="badge">Certificate Earned</div>
        </div>
        <div class="content">
          <h2>Congratulations, ${name}! 🎉</h2>
          <p>You’ve successfully completed your eco goal on EcoSangam! 🌱<br /><br />
          Attached is your official certificate.</p>
          <p>We thank you for making the world a greener place 💚.</p>
          <div class="cta">
            <a class="btn" href="https://ecosangam.example.com/dashboard">View My Dashboard</a>
          </div>
        </div>
        <div class="footer">
          You’re receiving this email because you completed a certified goal on EcoSangam.<br>
          © 2025 EcoSangam. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>`;

  const mailOptions = {
    from: '"EcoSangam" <ecosangam2025@gmail.com>',
    to: email,
    subject: '🎉 Your Eco Goal Completion Certificate!',
    html: htmlBody,
    attachments: [
      {
        filename: path.basename(filePath),
        content: fs.createReadStream(filePath)
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendCertificateEmail };
