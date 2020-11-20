const {
  issueTokens,
  refreshTokens,
  recordUser,
  removeRefreshToken,
} = require('./authBL');

const postLogin = async (req, res, next) => {
  const loginSchema = req.body;
  try {
    const tokens = await issueTokens(loginSchema);
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

module.exports = {
  postLogin, postRefreshToken, deleteLogout, postRegister,
};
