const ErrorFactory = require('./errorFactory.js');

const isTrustedError = (error) => error.isOperational;

const crashIfUntrustedErrorOrSendResponse = async (error, res) => {
  if (!isTrustedError(error)) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
  const errorCopy = { ...error };
  errorCopy.status = error.status || 500;
  res.status(errorCopy.status);
  res.json({
    error: {
      status: error.status,
      name: error.name,
      message: error.message,
    },
  });
};

const errorHandler = async (error, res = null) => {
  // await logger.error(error);
  await crashIfUntrustedErrorOrSendResponse(error, res);
};

const notFoundHandler = (req, res, next) => next(new ErrorFactory(404, 'The requested resource is not found'));

module.exports = { errorHandler, isTrustedError, notFoundHandler };
