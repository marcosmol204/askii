const User = require('../models/userModel');
const Question = require('../models/questionModel');
const { ErrorFactory } = require('./errorFactory');

/**
  * @type Util.
  * @desc Create user(model) document.
  * @param Object UserSchema
  * @return Document
  * @errors Mongoose documentation.
*/

const createUser = (schema) => new User(schema);

/**
  * @type util
  * @desc Finds a matching document, removes it, and passes the found document
  *  (if any) to the callback.
  * @param [conditions] «Object»
  * @return Promise<BulkWriteOpResultObject>.
  * @errors Mongoose documentation.
*/

const deleteUser = async (id) => {
  try {
    const userDoc = await User.deleteOne({ _id: id });
    return userDoc;
  } catch (error) {
    throw new ErrorFactory(500, `Database error${error.message}`);
  }
};

/**
  * @type util
  * @desc Finds a matching document, update it, and passes the updated document
  *  (if any) to the callback.
  * @param [conditions] «Object»
  * @return Promise<document>.
  * @errors Mongoose documentation.
*/

const updateUser = async (id, update) => {
  const options = { new: true, runValidators: true };
  try {
    const userDoc = await User.findByIdAndUpdate(id, update, options);
    return userDoc;
  } catch (error) {
    throw new ErrorFactory(500, `Database error${error.message}`);
  }
};

/**
  * @type util
  * @desc query an User document
  * @param [conditions] «Object»
  * @return Promise<document>.
  * @errors Mongoose documentation.
*/

const queryUser = async (cond, proj, opts) => {
  const userDoc = await User.findOne(cond, proj, opts);
  if (!userDoc) {
    throw new ErrorFactory(400, 'Database error: user not exists');
  }
  return userDoc;
};

const queryQuestion = async (cond, proj, opts) => {
  const qstDoc = await User.findOne(cond, proj, opts);
  if (!qstDoc) {
    throw new ErrorFactory(400, 'Database error: question not exists');
  }
  return qstDoc;
};

const queryUsers = async (cond, proj, opts) => {
  try {
    const query = await User.find(cond, proj, opts);
    return query;
  } catch (error) {
    throw new ErrorFactory(500, `Database error${error.message}`);
  }
};

const checkUser = async (filter) => {
  const exists = await User.exists(filter);
  if (!exists) { throw new ErrorFactory(400, 'Invalid user id'); }
};

const checkQuestion = async (filter) => {
  const exists = await Question.exists(filter);
  if (!exists) { throw new ErrorFactory(400, 'Invalid question id'); }
};

const createQuestion = (schema) => new Question(schema);

module.exports = {
  createUser,
  queryUser,
  deleteUser,
  updateUser,
  queryUsers,
  checkUser,
  checkQuestion,
  createQuestion,
  queryQuestion,
};
