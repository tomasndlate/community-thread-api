const httpStatus = require('../enums/httpStatusEnum');

class NotFoundError extends Error {

    constructor(message, status = httpStatus.NOT_FOUND) {
        super(message);
        this.name = 'Not Found Error';
        this.statusCode = status;
    }
}

module.exports = NotFoundError;