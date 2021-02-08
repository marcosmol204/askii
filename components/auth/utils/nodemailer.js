const { transporter } = require('../../../src/init-nodemailer');

const sendMail = async (dest, subject, text) => {
  const mailOptions = {
    from: process.env.YAHOO_EMAIL,
    to: dest,
    subject,
    text,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
