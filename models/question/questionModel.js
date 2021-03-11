/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  requiredString,
  requiredNumber,
  requiredBool,
} = require('../globalConfigs');

const {
  requiredQuestionStatus,
  requiredQuestionType,
  questionStatusEnum,
} = require('./questionConfigs');
const { saveErrorHandler } = require('./questionUtil');

const QuestionSchema = new Schema({
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  askedAt: requiredNumber,
  question: requiredString,
  description: String,
  expirationTime: requiredNumber,
  isAnonymous: requiredBool,
  status: { ...requiredQuestionStatus },
  type: { ...requiredQuestionType, default: questionStatusEnum.ACTIVE },
  tags: { type: [String], ref: 'user', default: [] },
});

QuestionSchema.virtual('isExpired').get(function () {
  return this.expirationTime - this.askedAt >= 0;
});

QuestionSchema.post('save', saveErrorHandler);

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
