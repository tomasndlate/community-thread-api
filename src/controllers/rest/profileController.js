const HttpStatus = require('../../enums/httpStatusEnum');
const ServerError = require('../../errors/ServerError');
const { sendErrorResponse, sendJsonResponse } = require('../../utils/responseUtils');

exports.profile = (req, res) => {
    try {
        sendJsonResponse(res, HttpStatus.OK, req.user)
    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}