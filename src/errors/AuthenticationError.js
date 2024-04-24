const httpStatus = require('../enums/httpStatusEnum');

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Authentication Error';
        this.statusCode = httpStatus.UNAUTHORIZED;
    }
}

module.exports = AuthenticationError;