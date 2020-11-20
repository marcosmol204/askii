const { validationResult } = require('express-validator');
const { body } = require('express-validator');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const validationArray = validationResult(req);
  if (validationArray.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    error:
        {
          status: 400,
          message: 'Bad Request',
          errors: validationArray.array(),
        },
  });
};

// question
// expirationDate
// isAnonymous
// status
// type
// tags
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
}

const questionSchema = [
  body('question').exists().withMessage('question must be a string,is required'),
  body('question').isLength({ min: 6 }).withMessage('question length min. 6 letters'),
  body('description').isString().withMessage('description must be a string,optional'),
  body('askedAt').exists().withMessage('askedAt is requiered'),
  body('askedAt').custom((num) => isValidTimestamp(num)).withMessage('expirationDate must be a unix time(number)'),
  body('isAnonymous').exists().withMessage('isAnonymous is required'),
  body('isAnonymous').isBoolean().withMessage('isAnonymous must be boolean'),
  body('type').exists().withMessage('type must be a number, is required'),
  body('type').custom((type) => type >= 0 && type < 3).withMessage('type must be 0,1 or 2'),
  body('duration').exists().withMessage('duration must be a number, is requiered'),
  body('duration').isInt({ min: 1, max: 30 }).withMessage('duration must be a number beetween 1-30'),
  body('tags').exists().withMessage('tags must be a string array,is required'),
  body('tags').isArray().withMessage('tags must be a string array'),
];

const answerSchema = [
  body('isAnonymous').exists().withMessage('isAnonymous is required'),
  body('isAnonymous').isBoolean().withMessage('isAnonymous must be a boolean'),
  body('answer').exists().withMessage('answer is required'),
  body('answeredAt').exists().withMessage('date is required'),
  body('answeredAt').custom((str) => isValidTimestamp(str)).withMessage('answeredAt must be a date'),
];

module.exports = {
  validate, questionSchema, answerSchema,
};
