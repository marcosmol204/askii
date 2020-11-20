/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  requiredString,
  requiredDate,
  requiredBool,
  requiredQuestionStatus,
  requiredQuestionType,
} = require('../configs');

const { saveErrorHandler } = require('./questionUtil');

const QuestionSchema = new Schema({
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  answeredBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
  askedAt: requiredDate,
  question: requiredString,
  description: String,
  duration: {
    type: Number, required: true, min: 1, max: 30,
  },
  isAnonymous: requiredBool,
  status: requiredQuestionStatus,
  type: requiredQuestionType,
  tags: { type: [String], ref: 'user', default: [] },
});

QuestionSchema.virtual('expirationDate').get(function () {
  const dayInMilliseconds = 86400000;
  return this.askedAt + (this.duration * dayInMilliseconds);
});

QuestionSchema.post('save', saveErrorHandler);

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
