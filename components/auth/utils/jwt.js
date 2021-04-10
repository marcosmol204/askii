const jwt = require('jsonwebtoken');
const { ErrorFactory } = require('../../../utils/errors/ApiError');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

/**
  * @type async function
  * @desc create a token
  * @param {String} date expressed in seconds or a string describing a time span zeit/ms.
  * @param {String} id submiter id
  * @param {String} type 'access' or 'refesh'
  * @return {String} token
  * @errors issue with jwt
*/

const createToken = async (time, id, type) => {
  const options = { expiresIn: time };
  const payload = {
    sub: id,
  };
  const secret = type === 'access' ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
  try {
    const token = await jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw ErrorFactory(500, `Internal Server Error:${error.message}`);
  }
};

/**
  * @type async function
  * @desc decode a jwt token
  * @param {String} token JWT token
  * @param {String} type 'access' or 'refesh'
  * @return decoded token
  * @errors jwt errors.
*/

const decodeToken = async (token, type) => {
  const options = { algorithms: ['HS256'] };
  try {
    const decodedToken = type === 'access'
      ? await jwt.verify(token, JWT_ACCESS_SECRET, options)
      : await jwt.verify(token, JWT_REFRESH_SECRET, options);

    return decodedToken;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw ErrorFactory(401);
    } else {
      throw ErrorFactory(401, error.message);
    }
  }
};

/**
  * @type function
  * @desc compare two tokens
  * @param {String} tokenA token
  * @param {String} tokenB token
  * @return {Bolean} decoded token
  * @throw 401 error
*/

const compareTokens = (tokenA, tokenB) => {
  if (tokenA !== tokenB) {
    throw new ErrorFactory(401, 'Invalid refresh token');
  }
};

module.exports = {
  createToken,
  decodeToken,
  compareTokens,
};
