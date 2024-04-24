const httpStatus = require('../enums/httpStatusEnum');

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Server Error';
        this.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
}

module.exports = ServerError;