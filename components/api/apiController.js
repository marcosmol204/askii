const {
  recordQuestion,
  removeQuestion,
  queryQuestion,
  queryQuestionAnswers,
  recordAnswer,
  removeAnswer,
  queryQuestions,
  queryAnswers,
} = require('./apiBL');

const postQuestion = async (req, res, next) => {
  const schema = req.body;
  const askedBy = req.sub;
  try {
    const question = await recordQuestion({ askedBy, ...schema });
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        questionId: question._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const deletedBy = req.sub;
    const question = await removeQuestion(questionId, deletedBy);
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        questionId: question._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await queryQuestion(questionId);
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        question,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getQuestionAnswers = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const answers = await queryQuestionAnswers(questionId);
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        answers,
      },
    });
  } catch (error) {
    next(error);
  }
};

const postAnswer = async (req, res, next) => {
  try {
    const answeredBy = req.sub;
    const schema = req.body;
    const answer = await recordAnswer({ ...schema, answeredBy });
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        answerId: answer._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAnswer = async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const deletedBy = req.sub;
    const answer = await removeAnswer(answerId, deletedBy);
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        answer,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const id = req.sub;
    const questions = await queryQuestions(id);
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        questions,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAnswers = async (req, res, next) => {
  try {
    const answeredBy = req.sub;
    const answers = await queryAnswers(answeredBy);
    res.json({
      status: '200',
      message: 'The question was successfully created',
      responseTime: new Date(),
      data: {
        answers,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postQuestion,
  deleteQuestion,
  getQuestion,
  getQuestionAnswers,
  postAnswer,
  deleteAnswer,
  getQuestions,
  getAnswers,
};
