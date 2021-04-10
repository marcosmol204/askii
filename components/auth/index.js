/**
 * Authentication module api
 *  Dependencies:
 *    Authentication router
 *    Authentication API
 */
const authRouter = require('./authRouter');
const authAPI = require('./authAPI');

module.exports = {
  authRouter,
  authAPI,
};
