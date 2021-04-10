/* eslint-disable func-names */
const mongoose = require('mongoose');
const { ErrorFactory } = require('../../utils/errors/ApiError');

const { Schema } = mongoose;
const {
  requiredString,
  requiredNumber,
  requiredBool,
} = require('../globalConfigs');

const {
  questionStatus,
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
  status: { ...questionStatus, default: questionStatusEnum.ACTIVE },
  type: { ...requiredQuestionType },
  tags: { type: [String], ref: 'user', default: [] },
});

QuestionSchema.virtual('isExpired').get(function () {
  return this.expirationTime - this.askedAt >= 0;
});

QuestionSchema.post('save', saveErrorHandler);

QuestionSchema.pre('findOne', async function (next) {
  if (this.status === questionStatusEnum.EXPIRED) {
    next(new ErrorFactory(400, 'The question is expired'));
  }
  if (this.isExpired && this.status === questionStatusEnum.ACTIVE) {
    this.status = questionStatusEnum.EXPIRED;
    await this.save();
    next(new ErrorFactory(400, 'The question is expired'));
  }
  next();
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
