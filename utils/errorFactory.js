class AppError extends Error {
    constructor(message, status, name) {
        super(message);

        this.status = status;
        this.name = name;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

function ErrorFactory(type, message) {
    switch (type) {
        case 404:
            return new AppError(message, 404, 'Not Found');
        case 400:
            return new AppError(message, 400, 'Bad Request');
        case 401:
            return new AppError(message, 401, 'Unauthorized');
        case 500:
            return new AppError(message, 500, 'Internal Server Error');
        default:
            return null;
    }
}

module.exports = { ErrorFactory };
