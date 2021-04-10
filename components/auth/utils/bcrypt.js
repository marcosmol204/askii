const bcrypt = require('bcrypt');
const { ErrorFactory } = require('../../../utils/errors/ApiError');

/**
 * @type async function
 * @desc compare a hashed password and an unhashed password
 * @param {String} password input password
 * @param {String} storedPassword user hashed password
 * @returns {boolean} true if the passwords match
 * @throws bcrypt errors
 */
const comparePassword = async (password, storedPassword) => {
  try {
    const match = await bcrypt.compare(password, storedPassword);
    return match;
  } catch (error) {
    throw new ErrorFactory(500, error.message);
  }
};

/**
  * @type async function
  * @desc hash a string
  * @param {String} password string to be hashed
  * @return {String} hashed string
  * @errors bcrypt errors
*/

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw ErrorFactory(500, error.message);
  }
};

module.exports = {
  comparePassword,
  hashPassword,
};
