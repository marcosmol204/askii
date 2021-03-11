const {
  issueTokens,
  refreshTokens,
  recordUser,
  removeRefreshToken,
  generatePassword,
} = require('./authBL');
const Response = require('../../utils/Response');

const postLogin = async (req, res, next) => {
  const loginSchema = req.body;
  const tokens = await issueTokens(loginSchema).catch((error) => next(error));
  if (tokens) {
    res.setHeader('set-cookie', [`accessToken=${tokens.accessToken}; httponly; samesite=lax; path=/`]);
    return res.json(new Response({ refeshToken: tokens.refreshRoken }));
  }
};

const postRefreshToken = async (req, res, next) => {
  const refreshToken = req.header('x-refresh-token');
  const tokens = await refreshTokens(refreshToken).catch((error) => next(error));
  if (tokens) {
    res.setHeader('set-cookie', [`accessToken=${tokens.accessToken}; httponly; samesite=lax; path=/`]);
    return res.json(new Response({ tokens }));
  }
};

const deleteLogout = async (req, res, next) => {
  const refreshToken = req.header('x-refresh-token');
  const prom = await removeRefreshToken(refreshToken).catch((error) => next(error));
  if (prom) {
    res.clearCookie('accessToken');
    return res.json(new Response());
  }
};

const postRegister = async (req, res, next) => {
  const userSchema = req.body;
  const userDoc = await recordUser(userSchema).catch((error) => next(error));
  if (userDoc) {
    return res.json(new Response({ _id: userDoc._id }));
  }
};

// improve mail experience
const postNewPassword = async (req, res, next) => {
  const { email } = req.body;
  const info = await generatePassword(email).catch((error) => next(error));
  if (info) {
    return res.json(new Response());
  }
};

module.exports = {
  postLogin,
  postRefreshToken,
  deleteLogout,
  postRegister,
  postNewPassword,
};
