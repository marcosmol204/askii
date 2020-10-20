const mongoose = require('mongoose');

const { Schema } = mongoose;
const { requiredString } = require('./configs');

const QuestionSchema = new Schema({
    question: requiredString,
    description: String,
    questionerName: configObject,
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = { Question, QuestionSchema };
