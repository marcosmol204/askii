const User = require('../../models/user/userModel');

const queryUser = async (cond, proj = {}, opts = {}) => User.findOne(cond, proj, opts);
const updateUser = async (cond, proj = {}, opts = {}) => User.findOneAndUpdate(cond, proj, opts);
const createUser = (schema) => new User(schema);
module.exports = { queryUser, createUser, updateUser };
