const bcrypt = require('bcrypt');
const { ErrorFactory } = require('../../../utils/errorFactory');

/**
  * @type function
  * @desc compare an hashed password and a password
  * @param number role (see roleEnum)
  * @return null
  * @errors crypt errors
*/

const comparePassword = async (user, password) => {
  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ErrorFactory(400, 'Invalid credentials');
    }
  } catch (error) {
    throw new ErrorFactory(500, error.message);
  }
};

/**
  * @type function
  * @desc hash a string
  * @param string password
  * @return hashed string
  * @errors crypt errors
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
