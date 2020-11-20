const Question = require('../../models/question/questionModel');
const Answer = require('../../models/answer/answerModel');

const createQuestion = (schema) => new Question(schema);
const createAnswer = (schema) => new Answer(schema);
const readQuestion = async (cond, proj, opts) => Question.findOne(cond, proj, opts);
const readQuestions = async (cond, proj, opts) => Question.find(cond, proj, opts);
const readAnswer = async (cond, proj, opts) => Answer.findOne(cond, proj, opts);
const readAnswers = async (cond, proj, opts) => Answer.find(cond, proj, opts);

module.exports = {
  createQuestion,
  readQuestion,
  readAnswers,
  readAnswer,
  createAnswer,
  readQuestions,
};
