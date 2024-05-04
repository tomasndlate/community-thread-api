const httpStatus = require('../enums/httpStatusEnum');

class AuthorizationError extends Error {

    constructor(message, status = httpStatus.UNAUTHORIZED) {
        super(message);
        this.name = 'Authorization Error';
        this.statusCode = status;
    }
}

module.exports = AuthorizationError;