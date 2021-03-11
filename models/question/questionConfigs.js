const { isRequired } = require('../globalConfigs.js');

const questionStatusEnum = Object.freeze({
  ACTIVE: 0,
  EXPIRED: 1,
});

const questionTypeEnum = Object.freeze({
  BINARY: 0,
  NUMERIC: 1,
  TEXT: 2,
});

const requiredQuestionStatus = { type: Number, ...isRequired, enum: Object.values(questionStatusEnum) };
const requieredQuestionType = { type: Number, ...isRequired, enum: Object.values(questionTypeEnum) };

module.exports = {
  requiredQuestionStatus,
  requieredQuestionType,
  questionStatusEnum,
  questionTypeEnum,
};
