const { Router } = require('express');
const { validate } = require('../../utils/express-validator');
const { questionSchema, answerSchema } = require('./utils/apiValidations');

const {
  postQuestion, deleteQuestion,
  getQuestion, getQuestionAnswers,
  postAnswer, deleteAnswer,
  getQuestions, getAnswers,
} = require('./apiController');

const { authAPI } = require('../auth');

const router = Router();

// Authorization middleware
router.use(authAPI.authorize());

// As a user I can ask a question (also anonymously).
router.post('/question',
  validate(questionSchema),
  postQuestion);

// As a user I can see all the question I asked.
router.get('/questions',
  getQuestions);

// As a user I can see all the answers to a question I asked.
router.get('/answers/question/:questionId',
  getQuestionAnswers);

// As a user I can see the answer I answered.
router.get('/answers',
  getAnswers);

// As a user I can answer once a question(also anonymously).
router.post('/answer',
  validate(answerSchema),
  postAnswer);

// As a user I can delete a question
router.delete('/question/:questionId',
  deleteQuestion);

// As a user I can delete an answer
router.delete('/answer/:answerId',
  deleteAnswer);

// Read a question
router.get('/question/:questionId',
  getQuestion);

module.exports = router;

// // As a user I can edit a question.
// router.put('/question/:questionId',
//   validate(questionSchema),
//   fetchQuestion);

// // As a user I can edit an answer
// router.put('/answer/:answerId',
//   validate(answerSchema),
//   putAnswer);
