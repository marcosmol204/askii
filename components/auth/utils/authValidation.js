const { body, header } = require('express-validator');

const bodyNewUser = [
  body('email').exists().withMessage(13),
  body('email').isEmail().withMessage(15),
  body('password').isLength({ min: 6, max: 12 }).withMessage(16),
  body('firstName').exists({ checkFalsy: true }).withMessage(17),
  body('lastName').exists({ checkFalsy: true }).withMessage(18),
];

const bodyLogin = [
  body('email').exists({ checkFalsy: true }).withMessage(13),
  body('email').isEmail().withMessage(15),
  body('password').exists().withMessage(14),
];

const headerRefreshToken = [
  header('x-access-token').exists().withMessage(21),
  header('x-access-token').isJWT().withMessage(19),
];

const bodyEmail = [body('email').exists().withMessage(13)];

module.exports = {
  bodyNewUser,
  bodyLogin,
  headerRefreshToken,
  bodyEmail,
};
