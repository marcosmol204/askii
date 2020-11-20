const { queryUser, createUser } = require('./authDA');

const { comparePassword, hashPassword } = require('./utils/bcrypt');
const { createToken, decodeToken, compareToken } = require('./utils/jwt');
const { redisGet, redisSet, redisDel } = require('./utils/redis');
const { ErrorFactory } = require('../../utils/errorFactory');

const issueTokens = async (loginSchema) => {
  const { email, password } = loginSchema;
  const cond = { email };

  const user = await queryUser(cond);
  await comparePassword(user, password);

  const accessToken = await createToken('24h', user._id, 'access');
  const refreshRoken = await createToken('1y', user._id, 'refresh');
  await redisSet(user.id, refreshRoken);

  const tokens = {
    accessToken,
    refreshRoken,
  };

  return tokens;
};

const refreshTokens = async (refreshToken) => {
  const { sub } = await decodeToken(refreshToken, 'refresh');
  const cachedToken = await redisGet(sub);
  compareToken(refreshToken, cachedToken);

  const accessToken = await createToken('24h', sub, 'access');
  const refreshRoken = await createToken('1y', sub, 'refresh');
  await redisSet(sub, refreshRoken);

  const tokens = {
    accessToken,
    refreshRoken,
  };
  return tokens;
};

const removeRefreshToken = async (refreshToken) => {
  const { sub } = await decodeToken(refreshToken, 'refresh');
  const deletedAmount = await redisDel(sub);
  if (deletedAmount < 1) {
    throw new ErrorFactory(400, 'User is already logged out');
  }
  return deletedAmount;
};

const recordUser = async (schema) => {
  const hashedPassword = await hashPassword(schema.password);
  const userSchema = { ...schema, status: 1 };
  userSchema.password = hashedPassword;
  const userDoc = createUser(userSchema);
  return userDoc.save();
};

module.exports = {
  issueTokens, refreshTokens, removeRefreshToken, recordUser,
};
