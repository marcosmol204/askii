const errorsMessages = {
  0: 'Something was wrong',
  10: 'The email is registered',
  11: 'Invalid credentials',
  12: 'The user is already logged',
  13: 'Body:email is required',
  14: 'Body:password is required',
  15: 'Body:email is not valid',
  16: 'Body:password should contain between 6-12 characters',
  17: 'Body:firstName is required',
  18: 'Body:lastName is required',
  19: 'Header:x-access-token is not a valid JWT',
  20: 'The user is already logged out',
  21: 'Header:x-access-token is required',
  404: 'No endpoint found',
};

class ApiError extends Error {
  constructor(errorCode = 0, status = 400) {
    super();
    this.status = status;
    this.errorCode = errorCode;
    this.errorMessage = errorsMessages[errorCode];
    this.isOperational = true;
  }
}

module.exports = { ApiError };
