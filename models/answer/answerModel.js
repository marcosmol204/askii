const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  requiredNumber,
  requiredString,
  requiredMixed,
} = require('../globalConfigs');

const {
  validateType,
  checkIfUserAnswered,
  saveErrorHandler,
} = require('./answerUtil');

const AnswerSchema = new Schema({
  questionId: requiredString,
  answeredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  answer: requiredMixed,
  explanation: String,
  answeredAt: requiredNumber,
});

AnswerSchema.pre('save', validateType);
AnswerSchema.post('save', saveErrorHandler);

const Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
