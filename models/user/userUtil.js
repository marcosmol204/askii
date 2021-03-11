const { ErrorFactory } = require('../../utils/errors/errorFactory');

const saveErrorHandler = (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    const duplicatedKeys = Object.keys(error.keyPattern);
    next(new ErrorFactory(400, `${duplicatedKeys} is registered`));
  }
};

const updateOneErrorHandler = (error, doc, next) => {
  next(new ErrorFactory(500, `Database error: ${error}`));
};

const checkNullHandler = (doc, next) => {
  if (doc === null) {
    next(new ErrorFactory(400, 'Invalid credentials'));
  }
  next();
};

module.exports = {
  saveErrorHandler, updateOneErrorHandler, checkNullHandler,
};
