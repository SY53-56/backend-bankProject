const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"The Backend Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRegisterEmail = async (userEmail, name) => {
  const subject = "Welcome to The Backend Ledger";
  const html = `
    <h1>Hello ${name},</h1>
    <p>Thank you for registering. We are excited to have you on board!</p>
    <br>
    <p>Best regards,<br>The Backend Ledger Team</p>
  `;
  await sendEmail(userEmail, subject, "Welcome!", html);
};

// Exporting as an object so you can use multiple functions
module.exports = { sendRegisterEmail, sendEmail };