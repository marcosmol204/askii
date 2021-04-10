/* eslint-disable global-require */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { requiredString } = require('../globalConfigs');
const { requiredUserStatus } = require('./userConfigs');
const { hashPassword } = require('../../components/auth/utils/bcrypt');

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
  refreshToken: { type: String, default: '' },
  loginAttempts: { type: Number, default: 0 },
});

UserSchema.virtual('isLogged').get(function () {
  return this.refreshToken !== '';
});

UserSchema.virtual('isBanned').get(function () {
  return this.loginAttempts > 3;
});

UserSchema.pre('save', async function (next) {
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
  next();
});

UserSchema.post('save', saveErrorHandler);

UserSchema.post('updateOne', updateOneErrorHandler);

UserSchema.post('findOne', checkNullHandler);

const User = mongoose.model('user', UserSchema);

module.exports = User;
