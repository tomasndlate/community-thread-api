const httpStatus = require('../enums/httpStatusEnum');

class BadRequestError extends Error {

    constructor(message, status = httpStatus.BAD_REQUEST) {
        super(message);
        this.name = 'Bad Request Error';
        this.statusCode = status;
    }
}

module.exports = BadRequestError;