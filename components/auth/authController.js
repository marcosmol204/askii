const {
  issueTokens,
  issueAccessToken,
  recordUser,
  removeRefreshToken,
  generatePassword,
} = require('./authBL');

const Response = require('../../utils/Response');

const postLogin = async (req, res, next) => {
  const loginSchema = req.body;
  const resObject = await issueTokens(loginSchema).catch((error) => next(error));
  if (resObject) {
    res.cookie('refreshToken', resObject.tokens.refreshToken, {
      maxAge: 30 * 24 * 3600,
      path: '/',
      httpOnly: true,
    });
    return res.json(new Response(
      {
        accessToken: resObject.tokens.accessToken,
      },
    ));
  }
};

const postRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies('refreshToken');
  const accessToken = await issueAccessToken(refreshToken).catch((error) => next(error));
  if (accessToken) {
    return res.json(new Response({ accessToken }));
  }
};

const deleteLogout = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const prom = await removeRefreshToken(refreshToken).catch((error) => next(error));
  if (prom) {
    res.clearCookie('refreshToken');
    return res.json(new Response(null, 200, 'The user is logged out'));
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
    return res.json(new Response(200, `New password was sent to ${info.accepted[0]}`));
  }
};

module.exports = {
  postLogin,
  postRefreshToken,
  deleteLogout,
  postRegister,
  postNewPassword,
};
