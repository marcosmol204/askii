const mongoose = require('mongoose');
const { ErrorFactory } = require('../../utils/errorFactory');

const validateType = (type, answer) => {
  if (type === 0 && typeof answer !== 'boolean') {
    throw new ErrorFactory(400, 'answer must be a boolean');
  }
  if (type === 1 && typeof answer !== 'number') {
    throw new ErrorFactory(400, 'answer must be a number');
  }
  if (type === 2 && typeof answer !== 'string') {
    throw new ErrorFactory(400, 'answer must be a string');
  }
};

const validateDate = (askedAt, expirationDate) => {
  if (askedAt >= expirationDate) {
    throw new ErrorFactory(400, 'answers time is over');
  }
};

const validateQuestion = (doc) => {
  if (!doc) {
    throw new ErrorFactory(400, 'Invalid question id');
  }
};

const validateOneAnswer = (answeredBy, id) => {
  if (answeredBy.includes(id)) {
    throw new ErrorFactory(400, 'The user has already answered this question');
  }
};

const castId = (id) => mongoose.Types.ObjectId(id);

const saveErrorHandler = (error, doc, next) => {
  if ((error.name === 'MongoError' && error.code === 11000)) {
    const duplicatedKeys = Object.keys(error.keyPattern);
    next(new ErrorFactory(400, `${duplicatedKeys} is registered`));
  }
};

const removeErrorHandler = (error, doc, next) => {
  console.log('post remove error hook');
  next(new ErrorFactory(400, error));
};

module.exports = {
  validateType,
  validateDate,
  validateOneAnswer,
  validateQuestion,
  castId,
  saveErrorHandler,
  removeErrorHandler,
};
