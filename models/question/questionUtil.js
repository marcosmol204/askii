const { ErrorFactory } = require('../../utils/errors/errorFactory');

const saveErrorHandler = (error, doc, next) => {
  console.log('hook: post save(error');
  if ((error.name === 'MongoError' && error.code === 11000)) {
    const duplicatedKeys = Object.keys(error.keyPattern);
    next(new ErrorFactory(400, `${duplicatedKeys} is registered`));
  }
  next();
};

module.exports = { saveErrorHandler };
