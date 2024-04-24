const httpStatus = require('../enums/httpStatusEnum');

class AuthenticationError extends Error {

    constructor(message, status = httpStatus.UNAUTHORIZED) {
        super(message);
        this.name = 'Authentication Error';
        this.statusCode = status;
    }
}

module.exports = AuthenticationError;