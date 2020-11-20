const { body, header } = require('express-validator');

const userSchema = [
  body('email').exists().withMessage('email is required'),
  body('email').isEmail().withMessage('email must be a correct email'),
  body('password').isLength({ min: 5 }).withMessage('password should contain at least 6 characters'),
  body('firstName').exists({ checkFalsy: true }).withMessage('firstName is required'),
  body('lastName').exists({ checkFalsy: true }).withMessage('lastName is required'),
];

const loginSchema = [
  body('email').exists({ checkFalsy: true }).withMessage('email is required'),
  body('password').isLength({ min: 5 }).withMessage('password should contain at least 6 characters'),
];

const refreshToken = [
  header('x-refresh-token').isJWT().withMessage('Valid JWT is requiered'),
];

module.exports = { userSchema, loginSchema, refreshToken };
