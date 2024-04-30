const authService = require('../../services/authService');
const authTokenUtils = require('../../utils/authTokenUtils');
const ServerError = require('../../errors/ServerError');
const { sendErrorResponse, sendJsonResponse } = require('../../utils/responseUtils');
const HttpStatus = require('../../enums/httpStatusEnum');

exports.signup = async (req, res) => {
    try {
        console.log(req.body)
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;

        const userId = await authService.createUser(email, username, password, name);
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