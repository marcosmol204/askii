class Response {
  constructor(data = null, status = 200, message = 'Operation successful') {
    this.status = status;
    this.message = message;
    this.responseTime = new Date();
    this.data = { ...data };
  }
}

module.exports = Response;
