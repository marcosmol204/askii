const mongoose = require('mongoose');

const { Schema } = mongoose;
const Question = require('../question/questionModel');
const {
  requiredNumber,
  requiredBool,
  requieredMixed,
} = require('../globalConfigs');

const {
  validateType,
  validateDate,
  validateOneAnswer,
  validateQuestion,
  castId,
  saveErrorHandler,
  removeErrorHandler,
} = require('./answerUtil');

const AnswerSchema = new Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  isAnonymous: requiredBool,
  answer: requieredMixed,
  explanation: String,
  answeredAt: requiredNumber,
});

AnswerSchema.pre('save', async function (next) {
  const questionDoc = await Question.findOne({ _id: this.questionId });
  validateQuestion(questionDoc); // check it
  validateOneAnswer(questionDoc.answeredBy, this.answeredBy);
  validateType(questionDoc.type, this.answer);
  validateDate(this.answeredAt, questionDoc.expirationDate);
  this.questionId = castId(this.questionId);
  next();
});

AnswerSchema.post('save', async function (next) {
  const questionDoc = await Question.findOne({ _id: this.questionId });
  questionDoc.answeredBy.push(this.answeredBy);
  questionDoc.save();
  next();
});

AnswerSchema.post('save', saveErrorHandler);

AnswerSchema.pre('remove', async function (next) {
  const questionDoc = await Question.findOne({ _id: this.questionId });
  questionDoc.answeredBy.pull(this.answeredBy);
  questionDoc.save();
  next();
});

AnswerSchema.post('remove', removeErrorHandler);

const Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
