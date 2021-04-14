const { decodeToken } = require('./utils/jwt');

/**
  * @type async middleware function
  * @desc checks if a user has authorization and add the submiter id to the request parameter
  * @return call to the next function with\out error
  * @errors jwt errors
*/
const authorize = () => async (req, res, next) => {
  try {
    const { accessToken } = req.headers;
    const decodedToken = await decodeToken(accessToken, 'access');
    req.sub = decodedToken.sub;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { authorize };
