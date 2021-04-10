const nodemailer = require('nodemailer');
const { ErrorFactory } = require('../../../utils/errors/ApiError');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  debug: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

/**
 * @param {String} dest email destination
 * @param {String} subject email subject
 * @param {String} html html template
 * @returns {SentMessageInfo} info object
 * @throws nodemailer errors
 */
const sendMail = async (dest, subject, html) => {
  const mailOptions = {
    from: 'appdev204a@gmail.com',
    to: dest,
    subject,
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new ErrorFactory(500, error.message);
  }
};

module.exports = { sendMail };
