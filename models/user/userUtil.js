const { ErrorFactory } = require('../../utils/errorFactory');

const saveErrorHandler = (error, doc, next) => {
  console.log('post save error hook');
  if (error.name === 'MongoError' && error.code === 11000) {
    const duplicatedKeys = Object.keys(error.keyPattern);
    next(new ErrorFactory(400, `${duplicatedKeys} is registered`));
  }
};

const updateOneErrorHandler = (error, doc, next) => {
  console.log('post updateOne error hook');
  next(new ErrorFactory(500, `Database error: ${error}`));
};

module.exports = {
  saveErrorHandler, updateOneErrorHandler,
};
