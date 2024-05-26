const { ResponseCode } = require('../enums/responseCode.enum');

class OkResponse {
    /** Error Constructor Input
     * @param {Object} reponse
     * @param {string} reponse.status - status value (eg. error or success)
     * @param {string} reponse.code - status code (eg. 400 | 401 | 403 | 404 | 409 | 500)
     * @param {string} reponse.message - general error message (eg. Invalid input data9
     * @param { Object<string, Object> } reponse.data - specify fields details errors
     */
    constructor({ 
        status = "success",
        code = ResponseCode.OK,
        message = "Ok",
        data = []
    } = {}) {
        this.message = message;
        this.status = status;
        this.code = code;
        this.data = data;
    }

    getResponse() {
        return {
            status: this.status,
            code: this.code,
            message: this.message,
            data: this.data
        }
    }

}

module.exports = {
    OkResponse
};