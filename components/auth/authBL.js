/**
 * Authentication bussines logic layer
 *  Dependencies:
 *    Authentication data access layer
 *    Bcrypt api
 *    Jwt api
 *    Nodemailer api
 *    ErrorFactory
 */
const { queryUser, createUser } = require('./authDA');
const { comparePassword, hashPassword } = require('./utils/bcrypt');
const { createToken, decodeToken, compareTokens } = require('./utils/jwt');
const { sendMail } = require('./utils/nodemailer');
const { ApiError } = require('../../utils/errors/ApiError');

/**
 * @desc async function that handle login logic POST /login
 * @param {Object} loginSchema
 * @param {String} loginSchema.email user email
 * @param {String} loginSchema.password user password
 * @returns {Object} Access and refesh token
 * @throws 400 - 'The user is already logged'
 * @throws 400 - 'Invalid credentials'
 * @throws 500 - mongoose,jwt
 */
const issueTokens = async (loginSchema) => {
  const { email, password } = loginSchema;

  const cond = { email };
  const userDocument = await queryUser(cond);

  const { isLogged } = userDocument;
  if (isLogged) {
    throw new ApiError(12);
  }

  const storedPassword = userDocument.password;
  const isCorrectPassword = await comparePassword(password, storedPassword);
  if (!isCorrectPassword) {
    await userDocument.update({ $inc: { loginAttempts: 1 } });
    throw new ApiError(11);
  }

  const accessToken = await createToken('60s', userDocument._id, 'access');
  const refreshToken = await createToken('1y', userDocument._id, 'refresh');
  await userDocument.update({ $set: { refreshToken } });

  const userData = {
    userFirstName: userDocument.firstName,
    userId: userDocument._id,
  };
  const tokens = {
    accessToken,
    refreshToken,
  };
  return { userData, tokens };
};

/**
 * @desc async function that handle refresh logic /refresh-token
 * @param {String} refreshToken current refresh token
 * @returns {String} Access token
 * @throws 500 - mongoose,jwt,bcrypt
 */
const issueAccessToken = async (refreshToken) => {
  const { sub } = await decodeToken(refreshToken, 'refresh');
  const cond = { _id: sub };
  const userDocument = await queryUser(cond);

  const savedToken = userDocument.refreshToken;
  compareTokens(refreshToken, savedToken);

  const accessToken = await createToken('60s', sub, 'access');

  return accessToken;
};

/**
 * @desc async function that handle logout logic /logout
 * @param {String} refreshToken current refresh token
 * @returns {String} Access token
 * @throws 400 - 'The user is already logged out'
 * @throws 500 - mongoose,jwt,bcrypt
 */
const removeRefreshToken = async (refreshToken) => {
  const { sub } = await decodeToken(refreshToken, 'refresh');
  const cond = { _id: sub };
  const userDocument = await queryUser(cond);

  const { isLogged } = userDocument;

  if (!isLogged) {
    throw new ApiError(20);
  }

  return userDocument.update({ $set: { refreshToken: '' } });
};

/**
 * @desc async function that handle sign in logic /sign-in
 * @param {Object} userSchema
 * @param {String} userSchema.email new user email
 * @param {String} userSchema.password new user password
 * @param {String} userSchema.firstName new user first name
 * @param {String} userSchema.lastName new user last name
 * @returns {String}  Access token
 * @throws 500 - mongoose
 */
const recordUser = async (userSchema) => {
  const userDoc = createUser(userSchema);
  return userDoc.save();
};

/**
 * @desc async function that handle new password logic /new-password
 * @param {String} email user email
 * @returns {Promise<SentMessageInfo>} Message information object
 * @throws 500 - monogoose,bcrypt,nodemailer
 */
const generatePassword = async (email) => {
  const cond = { email };
  const userDoc = await queryUser(cond);
  const newPassword = Math.random().toString(36).slice(-8);
  const hashedNewPassword = await hashPassword(newPassword);
  userDoc.password = hashedNewPassword;
  await userDoc.save();
  return sendMail(email, 'New Password',
    `<div style="display:flex;align-items:center;flex-direction:column"><h1>Hello ${userDoc.firstName}</h1><h2>Your new password is</h2><h3>${newPassword}</h3></div>`);
};

module.exports = {
  issueTokens,
  issueAccessToken,
  removeRefreshToken,
  recordUser,
  generatePassword,
};
