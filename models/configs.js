const { Schema } = require('mongoose');

const rolesEnum = [0, 1];
// roles:
// 0 ADMIN
// 1 USER
const userStatusEnum = [0, 1];
// user status:
// 0 DISABLED
// 1 ACTIVE
const questionStatusEnum = [0, 1];
// question status:
// 0 ACTICE
// 1 EXPIRED
const questionTypeEnum = [0, 1, 2];
// question type
// 0 BINARY
// 1 NUMERIC
// 2 STRING
const questionDurationEnum = [0, 1, 2];
// question type
// 0 1h = 3600000
// 1 1d = 86400000
// 2 1w = 604800000
const isRequired = { required: true };
const requiredString = { type: String, ...isRequired };
const requiredDate = { type: Number, ...isRequired };
const requiredBool = { type: Boolean, ...isRequired };
const requieredMixed = { type: Schema.Types.Mixed, required: true };
// QUESTION
const requiredQuestionStatus = { type: Number, ...isRequired, enum: questionStatusEnum };
const requieredQuestionDuration = { type: Number, ...isRequired, enum: questionDurationEnum };
// USER
const requiredRole = { type: Number, ...isRequired, enum: rolesEnum };
const requiredUserStatus = { type: Number, ...isRequired, enum: userStatusEnum };
const requiredQuestionType = { type: Number, ...isRequired, enum: questionTypeEnum };

module.exports = {
  requiredRole,
  questionStatusEnum,
  requiredQuestionStatus,
  requiredUserStatus,
  requiredQuestionType,
  requieredQuestionDuration,
  requiredString,
  requiredBool,
  requiredDate,
  requieredMixed,
};
