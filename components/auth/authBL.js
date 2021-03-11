const { queryUser, createUser } = require('./authDA');

const { comparePassword, hashPassword } = require('./utils/bcrypt');
const { createToken, decodeToken, compareToken } = require('./utils/jwt');
const { sendMail } = require('./utils/nodemailer');

const {
  redisGET, redisSET,
  redisDEL, redisSADD,
  redisSREM,
  redisINCR, redisEXPIRE,
  redisSETWithEX,
  redisTTL,
} = require('./utils/redis');

const { ErrorFactory } = require('../../utils/errors/errorFactory');

const issueTokens = async (loginSchema) => {
  const { email, password } = loginSchema;
  const cond = { email };

  const user = await queryUser(cond);

  const isBanned = await redisGET(`${user.id}:is_blocked`, user.id);
  if (isBanned) {
    const ttl = await redisTTL(`${user.id}:is_blocked`);
    throw new ErrorFactory(400, `Account blocked for security reasons, please try again in ${ttl} seconds.`);
  }
  const correctPassword = await comparePassword(user, password);

  if (!correctPassword) {
    const current = await redisGET(`user:${user._id}:login_attempts`);
    if (current != null && +current === 3) {
      await redisSETWithEX(`${user.id}:is_blocked`, true, 30);
      throw new ErrorFactory(400, 'The system detected many failed attempts to identify and therefore blocked the account for a while');
    } else {
      await redisINCR(`user:${user._id}:login_attempts`);
      await redisEXPIRE(`user:${user._id}:login_attempts`, 10);
      throw new ErrorFactory(400, 'Invalid credentials');
    }
  }
  const accessToken = await createToken('24h', user._id, 'access');
  const refreshRoken = await createToken('1y', user._id, 'refresh');
  await redisSET(`refresh_token:${user.id}`, refreshRoken);
  await redisSADD('online_users', user.id);
  const tokens = {
    accessToken,
    refreshRoken,
  };
  return tokens;
};

const refreshTokens = async (refreshToken) => {
  const { sub } = await decodeToken(refreshToken, 'refresh');
  const cachedToken = await redisGET(`refresh_token:${sub}`);
  compareToken(refreshToken, cachedToken);

  const accessToken = await createToken('24h', sub, 'access');
  const refreshRoken = await createToken('1y', sub, 'refresh');
  await redisSET(`refresh_token:${sub}`, refreshRoken);

  const tokens = {
    accessToken,
    refreshRoken,
  };
  return tokens;
};

const removeRefreshToken = async (refreshToken) => {
  const { sub } = await decodeToken(refreshToken, 'refresh');
  const deletedAmount = await redisDEL(`refresh_token:${sub}`);
  if (deletedAmount < 1) {
    throw new ErrorFactory(400, 'User is already logged out');
  }
  await redisSREM('online_users', sub);
  return deletedAmount;
};

const recordUser = async (schema) => {
  const hashedPassword = await hashPassword(schema.password);
  const userSchema = { ...schema, status: 1 };
  userSchema.password = hashedPassword;
  const userDoc = createUser(userSchema);
  return userDoc.save();
};

const generatePassword = async (email) => {
  const cond = { email };
  const userDoc = await queryUser(cond);
  const newPassword = Math.random().toString(36).slice(-8);
  const hashedNewPassword = await hashPassword(newPassword);
  userDoc.password = hashedNewPassword;
  const info = await sendMail(email, 'New Password', `Your new password is: ${newPassword}`);
  return userDoc.save();
};

// const getStatistics = async () => {
//   const usersOnline = await redisSMEMBERS('counter:onlineUsers');
//   return { usersOnline };
// };

module.exports = {
  issueTokens,
  refreshTokens,
  removeRefreshToken,
  recordUser,
  generatePassword,
};
