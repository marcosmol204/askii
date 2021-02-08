const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

module.exports = { transporter };
