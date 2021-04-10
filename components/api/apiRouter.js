const { Router } = require('express');
const { validate } = require('../../utils/express-validator');
const { questionSchema, answerSchema } = require('./utils/apiValidations');

const {
  postQuestion, deleteQuestion,
  getQuestion, postAnswer,
  deleteAnswer, getQuestions,
} = require('./apiController');

const { authAPI } = require('../auth');

const router = Router();

// Every user can read a question
router.get('/question/:questionId',
  getQuestion);

// Every user can answer once a question(also anonymously).
router.post('/answer',
  validate(answerSchema),
  postAnswer);

// Authorization middleware
router.use(authAPI.authorize());

// As a registered user I can create a question
router.post('/question',
  validate(questionSchema),
  postQuestion);

// As a registered user I can get see all the question I asked [id, title, type]
router.get('/questions',
  getQuestions);

// As a user I can delete a question
router.delete('/question/:questionId',
  deleteQuestion);

// As a user I can delete an answer
router.delete('/answer/:answerId',
  deleteAnswer);

module.exports = router;

// // As a user I can see all the answers to a question I asked.
// router.get('/answers/question/:questionId',
//   getQuestionAnswers);

// As a user I can see the answer I answered.
// router.get('/answers',
//   getAnswers);
