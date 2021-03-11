const { Router } = require('express');
const {
  validate,
} = require('../../utils/express-validator');
const {
  bodyNewUser,
  bodyLogin,
  headerRefreshToken,
  bodyEmail,
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
  validate(bodyNewUser),
  postRegister);

// As a user I can login
router.post('/log-in',
  validate(bodyLogin),
  postLogin);

// As a user I can refresh my tokens
router.post('/refresh-token',
  validate(headerRefreshToken),
  postRefreshToken);

// As a user I can logout
router.delete('/log-out',
  validate(headerRefreshToken),
  deleteLogout);

// As a user I can generate new password
router.post('/new-password',
  validate(bodyEmail),
  postNewPassword);

module.exports = router;
