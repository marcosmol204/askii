const { decodeToken } = require('./utils/jwt');
/**
  * @type middleware
  * @desc checks if a user has authorization and add to the req the request sub
  * @param number role (see roleEnum)
  * @return call to the next function
  * @errors mongoose/jwt errors
*/

const authorize = () => async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    const decodedToken = await decodeToken(accessToken, 'access');
    req.sub = decodedToken.sub;
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
  * @type function
  * @desc populate a answer collection
  * @param object conditions
  * @param object projection
  * @param object options
  * @return user document
  * @errors mongoose errors
*/

const populateUser = async (document) => document.populate({ populate: { path: 'answeredBy', select: 'firstName lastName _id' } }).execPopulate();

module.exports = { authorize, populateUser };
