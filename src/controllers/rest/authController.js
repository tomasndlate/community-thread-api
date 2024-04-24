const authService = require('../../services/authService');
const authTokenUtils = require('../../utils/authTokenUtils');
const ServerError = require('../../errors/ServerError');
const { sendErrorResponse, sendJsonResponse } = require('../../utils/responseUtils');
const HttpStatus = require('../../enums/httpStatusEnum');

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = await authService.createUser(username, password);
        const accessToken = authTokenUtils.generateAuthToken(userId);
        sendJsonResponse(res, HttpStatus.CREATED, {accessToken: accessToken})
    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}

exports.login = (req, res) => {
    try {
        const accessToken = authTokenUtils.generateAuthToken(req.user._id);
        sendJsonResponse(res, HttpStatus.OK, {accessToken: accessToken})
    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}