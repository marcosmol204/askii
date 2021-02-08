const {
  issueTokens,
  refreshTokens,
  recordUser,
  removeRefreshToken,
  generatePassword,
} = require('./authBL');

const postLogin = async (req, res, next) => {
  const loginSchema = req.body;
  try {
    const tokens = await issueTokens(loginSchema);
    res.setHeader('set-cookie', [`accessToken=${tokens.accessToken}; httponly; samesite=lax; path=/`]);
    return res.json({
      status: '200',
      message: 'Operation successful',
      responseTime: new Date(),
      data: { refeshToken: tokens.refreshRoken },
    });
  } catch (error) {
    return next(error);
  }
};

const postRefreshToken = async (req, res, next) => {
  const refreshToken = req.header('x-refresh-token');
  try {
    const tokens = await refreshTokens(refreshToken);
    return res.json({
      status: '200',
      message: 'Operation successful',
      responseTime: new Date(),
      data: { tokens },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteLogout = async (req, res, next) => {
  const refreshToken = req.header('x-refresh-token');
  try {
    await removeRefreshToken(refreshToken);
    res.clearCookie('accessToken');
    return res.json({
      status: '200',
      message: 'Operation successful',
      response_time: new Date(),
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

const postRegister = async (req, res, next) => {
  const userSchema = req.body;
  try {
    const userDoc = await recordUser(userSchema);
    return res.json({
      status: '200',
      message: 'Operation successful',
      response_time: new Date(),
      data: { _id: userDoc._id },
    });
  } catch (error) {
    return next(error);
  }
};

const postNewPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userDoc = await generatePassword(email);
    return res.json({
      status: '200',
      message: 'Operation successful',
      response_time: new Date(),
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postLogin,
  postRefreshToken,
  deleteLogout,
  postRegister,
  postNewPassword,
};

// const getStatistics = async (req, res, next) => {
//   try {
//     const statistics = await issueStatistics();
//     return res.json({
//       status: '200',
//       message: 'Operation successful',
//       response_time: new Date(),
//       data: statistics,
//     });
//   } catch (error) {
//     return next(error);
//   }
// };
