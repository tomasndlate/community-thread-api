const httpStatus = require('../enums/responseCode.enum');

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Database Error';
        this.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
}

module.exports = DatabaseError;