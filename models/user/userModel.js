/* eslint-disable global-require */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { requiredString, requiredUserStatus } = require('../configs');

const { Schema } = mongoose;

const { saveErrorHandler, updateOneErrorHandler } = require('./userUtil');

const UserSchema = new Schema({
  email: { ...requiredString, unique: true, lowercase: true },
  password: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  status: { ...requiredUserStatus, default: 1 },
});

UserSchema.post('save', saveErrorHandler);

UserSchema.post('updateOne', updateOneErrorHandler);

const User = mongoose.model('user', UserSchema);

module.exports = User;
