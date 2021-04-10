const { ApiError } = require('../../utils/errors/ApiError');

const saveErrorHandler = (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new ApiError(10));
  }
};

const updateOneErrorHandler = (error, doc, next) => {
  next(new ApiError(0, 500));
};

const checkNullHandler = (doc, next) => {
  if (doc === null) {
    next(new ApiError(11));
  }
  next();
};

module.exports = {
  saveErrorHandler, updateOneErrorHandler, checkNullHandler,
};
