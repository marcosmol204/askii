const jwt = require('jsonwebtoken');
const { ErrorFactory } = require('../../../utils/errorFactory');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

/**
  * @type function
  * @desc create a token
  * @param date expiration time ( see jwt documentation )
  * @param id submiter id
  * @param role  number role (see roleEnum )
  * @type access or refesh
  * @return token
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
  * @type function
  * @desc decode a jwt token
  * @param token JWT token
  * @param string access or refesh
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
  * @param string JWT token
  * @param string JWT token
  * @return decoded token
  * @errors 401 error.
*/

const compareToken = (tokenA, tokenb) => {
  if (tokenA !== tokenb) {
    throw new ErrorFactory(401, 'Invalid refresh token');
  }
};

module.exports = {
  createToken,
  decodeToken,
  compareToken,
};
