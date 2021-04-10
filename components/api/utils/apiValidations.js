const { body } = require('express-validator');
const { questionTypeEnum } = require('../../../models/question/questionConfigs');

const isNumeric = (n) => !Number.isNaN(Number.parseFloat(n)) && Number.isFinite(n);

const isValidTimestamp = (_timestamp) => {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
};

const isValidExpirationTime = (expirationTime, askedAt) => expirationTime > askedAt;

const questionsTypesArray = Object.values(questionTypeEnum);

const questionSchema = [
  body('question').exists().withMessage('"question" is required'),
  body('question').isString().withMessage('"question" must be a string'),
  body('question').isLength({ min: 6 }).withMessage('"question" must contain at least 6 letters'),
  body('description').isString().withMessage('"description" must be a string,is optional'),
  body('askedAt').exists().withMessage('"askedAt" is required'),
  body('askedAt').custom((num) => isValidTimestamp(num)).withMessage('"askedAt" must be a unix time(number)'),
  body('isAnonymous').exists().withMessage('"isAnonymous" is required'),
  body('isAnonymous').isBoolean().withMessage('"isAnonymous" must be boolean'),
  body('type').exists().withMessage('"type" is required'),
  body('type').custom((type) => questionsTypesArray.indexOf(type) > 0).withMessage(`"type" must be ${questionsTypesArray.toString()}`),
  body('tags').isArray().withMessage('"tags" must be a string array'),
  body('expirationTime').exists().withMessage('"expiredAt" is required'),
  body('expirationTime').custom((value, { req }) => isValidExpirationTime(value, req.body.askedAt)).withMessage('"expiredAt" must be bigger than "askedAt'),
];

const answerSchema = [
  body('questionId').exists().withMessage('Parameter:questionId is required'),
  body('questionId').isMongoId().withMessage('Parameter:questionId must be a string'),
  body('answer').exists().withMessage('Parameter:answer is required'),
  body('answeredAt').exists().withMessage('Parameter:answeredAt is required'),
  body('answeredAt').custom((str) => isValidTimestamp(str)).withMessage('Parameter:answeredAt must be a unix date'),
];

module.exports = { questionSchema, answerSchema };