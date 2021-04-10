const { isRequired } = require('../globalConfigs.js');

const questionStatusEnum = Object.freeze({
  ACTIVE: 'active',
  EXPIRED: 'expired',
});

const questionTypeEnum = Object.freeze({
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  STRING: 'string',
});

const questionStatus = {
  type: String,
  enum: Object.values(questionStatusEnum),
};
const requiredQuestionType = {
  type: String,
  ...isRequired,
  enum: Object.values(questionTypeEnum),
};

module.exports = {
  questionStatus,
  requiredQuestionType,
  questionStatusEnum,
  questionTypeEnum,
};
