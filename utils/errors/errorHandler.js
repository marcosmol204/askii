const mongoose = require('mongoose');

const { ApiError } = require('./ApiError.js');
const Response = require('../Response');

const isTrustedError = (error) => error.isOperational;

const crashIfUntrustedErrorOrSendResponse = async (error, res) => {
  if (!isTrustedError(error)) {
    // eslint-disable-next-line no-process-exit
    await mongoose.connection.close();
    process.exit(1);
  }
  const errorCopy = { ...error };
  errorCopy.status = error.status || 500;
  res.status(errorCopy.status);
  res.json(new Response(null, errorCopy.status, errorCopy.errorMessage));
};

const errorHandler = async (error, res = null) => {
  await crashIfUntrustedErrorOrSendResponse(error, res);
};

const notFoundHandler = (req, res, next) => next(new ApiError(404, 404));

module.exports = { errorHandler, isTrustedError, notFoundHandler };
