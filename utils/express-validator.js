const { validationResult } = require('express-validator');
const { ApiError } = require('./errors/ApiError');

const validate = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorCode = errors.array()[0].msg;
  return next(new ApiError(errorCode));
};

module.exports = {
  validate,
};
