const { ResponseCode } = require('../enums/responseCode.enum');

class BadRequestError extends Error {

    /** Error Constructor Input
     * @param {Object} error
     * @param {string} error.status - status value (eg. error or success)
     * @param {string} error.code - status code (eg. 400 | 401 | 403 | 404 | 409 | 500)
     * @param {string} error.message - general error message (eg. Invalid input data9
     * @param { [{
     *      field: string,
     *      errorCode: string, 
     *      message: string
     * }] } error.details - specify fields details errors
     * @param {string} error.details.field - field name (eg. username)
     * @param {string} error.details.errorCode - field error (eg. INVALID_USERNAME_ERROR)
     * @param {string} error.details.message - field error message (eg. Username not valid)
     */
    constructor({ 
        status = "error",
        code = ResponseCode.BAD_REQUEST,
        message = "Invalid input data",
        details = []
    } = {}) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }

    getError() {
        return {
            status: this.status,
            code: this.code,
            message: this.message,
            details: this.details
        }
    }

}

module.exports = {
    BadRequestError
};