const {
  readQuestion, createQuestion, readAnswers, createAnswer, readAnswer, readQuestions,
} = require('./apiDA');

const { ErrorFactory } = require('../../utils/errorFactory');

const recordQuestion = async (schema) => {
  const status = 0; // ACTIVE
  const questionDoc = createQuestion({ status, ...schema });
  return questionDoc.save();
};

const removeQuestion = async (questionId, deletedBy) => {
  const cond = { _id: questionId };
  const questionDoc = await readQuestion(cond);
  if (questionDoc.askedBy.toString() !== deletedBy) {
    throw (new ErrorFactory(403, 'Attempt to delete a question not asked by the applicant'));
  }
  return questionDoc.remove();
};

const queryQuestion = async (id) => {
  const cond = { _id: id };
  const opts = {};
  const proj = {};
  const questionDoc = await readQuestion(cond, proj, opts);
  questionDoc.askedBy = questionDoc.isAnonymous === true ? null : questionDoc.askedBy;
  return questionDoc;
};

const queryQuestionAnswers = async (id) => {
  const cond = { questionId: id };
  const opts = { populate: { path: 'answeredBy', select: 'firstName lastName -_id' } };
  const proj = {};
  const answerCollection = await readAnswers(cond, proj, opts);
  answerCollection.forEach((ans) => ans.answeredBy = ans.isAnonymous === true ? null : ans.answeredBy);
  return answerCollection;
};

const queryAnswers = async (id) => {
  const cond = { answeredBy: id };
  const opts = { populate: { path: 'questionId', select: 'question' } };
  const proj = {};
  const answersQuery = await readAnswers(cond, proj, opts);
  return answersQuery;
};

const recordAnswer = async (schema) => {
  const answerDoc = createAnswer(schema);
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

// const editQuestion = async (id, schema) => {
//   const editSchema = { ...schema };
//   delete editSchema.askedAt;
//   const cond = { _id: id };
//   // const opts = {};
//   // const proj = {};
//   const questionDoc = await readQuestion(cond);
//   return questionDoc.updateOne(schema);
// };

// const editAnswer = async (id, schema) => {
//   const cond = { _id: id };
//   const proj = {};
//   const options = {};
//   const answerDoc = await readAnswer(cond, proj, options);
//   return answerDoc.updateOne(schema);
// };
