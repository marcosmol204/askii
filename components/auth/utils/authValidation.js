const { body, header } = require('express-validator');

const bodyNewUser = [
  body('email').exists().withMessage('parameter:email is required'),
  body('email').isEmail().withMessage('parameter:email is not valid'),
  body('password').isLength({ min: 6, max: 12 }).withMessage('parameter:password should contain between 6-12 characters'),
  body('firstName').exists({ checkFalsy: true }).withMessage('parameter:firstName is required'),
  body('lastName').exists({ checkFalsy: true }).withMessage('parameter:lastName is required'),
];

const bodyLogin = [
  body('email').exists({ checkFalsy: true }).withMessage('parameter:email is required'),
  body('password').exists().withMessage('parameter:password is requiered'),
];

const headerRefreshToken = [
  header('x-refresh-token').isJWT().withMessage('Valid JWT is requiered'),
];

const bodyEmail = [body('email').exists().withMessage('Email is required')];

module.exports = {
  bodyNewUser,
  bodyLogin,
  headerRefreshToken,
  bodyEmail,
};
