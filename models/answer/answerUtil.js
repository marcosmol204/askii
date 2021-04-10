const { ErrorFactory } = require('../../utils/errors/ApiError');
const Question = require('../question/questionModel');

const validateType = async function (next) {
  const questionDocument = await Question.findById(this.questionId);
  // eslint-disable-next-line valid-typeof
  if (typeof this.answer !== questionDocument.type) {
    next(new ErrorFactory(400, `The answer must be ${questionDocument.type}`));
  }
  next();
};

const saveErrorHandler = (error, doc, next) => {
  if ((error.name === 'MongoError' && error.code === 11000)) {
    const duplicatedKeys = Object.keys(error.keyPattern);
    next(new ErrorFactory(400, `${duplicatedKeys} is registered`));
  }
};

module.exports = {
  validateType,
  saveErrorHandler,
};
