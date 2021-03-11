/* eslint-disable global-require */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { requiredString } = require('../globalConfigs');
const { requiredUserStatus } = require('./userConfigs');

const { Schema } = mongoose;

const {
  saveErrorHandler,
  updateOneErrorHandler,
  checkNullHandler,
} = require('./userUtil');

const UserSchema = new Schema({
  email: {
    ...requiredString, unique: true, lowercase: true, trim: true,
  },
  password: { ...requiredString, min: 6, max: 12 },
  firstName: requiredString,
  lastName: requiredString,
  status: { ...requiredUserStatus, default: 1 },
});

UserSchema.post('save', saveErrorHandler);

UserSchema.post('updateOne', updateOneErrorHandler);

UserSchema.post('findOne', checkNullHandler);

const User = mongoose.model('user', UserSchema);

module.exports = User;
