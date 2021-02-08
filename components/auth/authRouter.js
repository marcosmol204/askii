const { Router } = require('express');
const {
  validate,
} = require('../../utils/express-validator');
const {
  loginSchema, userSchema, refreshToken, mail,
} = require('./utils/authValidation');

const {
  postLogin,
  postRefreshToken,
  deleteLogout,
  postRegister,
  postNewPassword,
} = require('./authController');

const router = Router();

// As a user I can register
router.post('/sing-up',
  validate(userSchema),
  postRegister);

// As a user I can login
router.post('/log-in',
  validate(loginSchema),
  postLogin);

// As a user I can refresh my tokens
router.post('/refresh-token',
  validate(refreshToken),
  postRefreshToken);

// As a user I can logout
router.delete('/log-out',
  validate(refreshToken),
  deleteLogout);

// As a user I can generate new password
router.post('/new-password',
  validate(mail),
  postNewPassword);

module.exports = router;

// As a admin I can get statistics about users
// router.get('/auth/statistics',
//   validate(refreshToken),
//   getStatistics);
