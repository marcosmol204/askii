const { errorHandler } = require('./errorHandler');

module.exports = () => {
  process.on('uncaughtException', (error) => {
    errorHandler(error);
  });

  process.on('unhandledRejection', (reason) => {
    throw reason;
  });
};
