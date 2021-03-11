const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  debug: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendMail = async (dest, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: dest,
    subject,
    text,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
