/* eslint-disable max-len */
/**
 * Api bussines logic layer
 *  Dependencies:
 *    Api data access layer
 *    Bcrypt api
 *    ErrorFactory
 *    Question configs
 */
const {
  readQuestion,
  createQuestion,
  readAnswers,
  createAnswer,
  readAnswer,
  readQuestions,
} = require('./apiDA');
const { ErrorFactory } = require('../../utils/errors/ApiError');
const { questionStatusEnum } = require('../../models/question/questionConfigs');

/**
 * @desc async function that handles creating question logic POST /question
 * @param {Object} questionSchema object with the follow properties
 * @param {Number} questionSchema.askedAt unix date that represent when the question was asked
 * @param {String|null} questionSchema.askedBy ObjectId as string that represent who asked the question
 * @param {String} questionSchema.question what the question is
 * @param {String} questionSchema.description for extra information
 * @param {Number} questionSchema.expirationTime unix date represent when the question get expired
 * @param {Bolean} questionSchema.isAnonymous if true, no info about askedBy will be provided
 * @param {Enum} questionSchema.type check question type enum
 * @param {String[]} questionSchema.tags divide to
 * @returns {Document} new question document
 * @throws mongoose errors
 */
const recordQuestion = async (questionSchema) => {
  const status = questionStatusEnum.ACTIVE;
  const questionDoc = createQuestion({ status, ...questionSchema });
  return questionDoc.save();
};

/**
 * @desc async function that handles deleting question logic DELETE question/{id}
 * @param {String} questionId ObjectId as string
 * @param {String} deletedBy ObjectId as string
 * @returns {Promise<this>} delated document
 * @throws 403 - 'No permitions to delete this question'
 */
const removeQuestion = async (questionId, deletedBy) => {
  const cond = { _id: questionId };
  const questionDoc = await readQuestion(cond);
  if (questionDoc.askedBy.toString() !== deletedBy) {
    throw (new ErrorFactory(403, 'No permitions to delete this question'));
  }
  return questionDoc.remove();
};

/**
 * @desc async function that handles querying logic POST /login
 * @param {String} questionId ObjectId as string
 * @returns {Document} requested document
 * @throws mongoose errors
 */
const queryQuestion = async (questionId) => {
  const cond = { _id: questionId };
  const questionDoc = await readQuestion(cond);
  const documentCopy = { ...questionDoc };
  documentCopy.askedBy = documentCopy.isAnonymous === true ? null : questionDoc.askedBy;
  return questionDoc;
};
/**
 * @param {String} id question ObjectId
 * @returns {Document[]} collection of asnwers
 */
const queryQuestionAnswers = async (id) => {
  const cond = { questionId: id };
  const opts = { populate: { path: 'answeredBy', select: 'firstName lastName -_id' } };
  const proj = {};
  const answerCollection = await readAnswers(cond, proj, opts);
  const processedCollection = answerCollection.map((ans) => {
    const answerCopy = { ...ans };
    answerCopy.answeredBy = ans.isAnonymous === true ? null : ans.answeredBy;
    return answerCopy;
  });
  return processedCollection;
};

const queryAnswers = async (id) => {
  const cond = { answeredBy: id };
  const opts = { populate: { path: 'questionId', select: 'question' } };
  const proj = {};
  const answersQuery = await readAnswers(cond, proj, opts);
  return answersQuery;
};
/**
 * @param {Object} answerSchema
 * @param {String} answerSchema.questionId question to be answered id
 * @param {String|Boolean|Number} answerSchema.answer answer for the question
 * @param {Number} answerSchema.answeredAt unix date when the question whas answered
 * @returns {Document} new answer document
 */
const recordAnswer = async (answerSchema) => {
  const { questionId, answeredBy } = answerSchema;
  let answerDoc = await readAnswer({ questionId, answeredBy });
  if (answerDoc) {
    throw new ErrorFactory(400, 'The question can only be answered once');
  }
  answerDoc = createAnswer(answerSchema);
  return answerDoc.save();
};

const removeAnswer = async (answerId, deletedBy) => {
  // validate if is own answer
  const cond = { _id: answerId };
  const answerDoc = await readAnswer(cond);
  if (answerDoc.answeredBy.toString() !== deletedBy) {
    throw (new ErrorFactory(403, 'Attempt to delete an answer not answered by the applicant'));
  }
  return answerDoc.remove();
};

const queryQuestions = async (id) => {
  const cond = { askedBy: id };
  const opts = {
    sort: {
      askedAt: 1,
    },
  };
  const proj = {
    _id: 1, asker: 1, question: 1, status: 1, askedAt: 1,
  };
  return readQuestions(cond, proj, opts);
};

module.exports = {
  recordQuestion,
  removeQuestion,
  queryQuestion,
  queryQuestionAnswers,
  recordAnswer,
  removeAnswer,
  queryQuestions,
  queryAnswers,
};
