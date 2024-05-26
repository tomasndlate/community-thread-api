const authService = require('../services/authService');
const authTokenUtils = require('../utils/authTokenUtils');
const {InternalServerError} = require('../errors/InternalServer.error');
const { sendErrorResponse, sendJsonResponse } = require('../utils/responseUtils');
const {ResponseCode} = require('../enums/responseCode.enum');
const {BadRequestError} = require('../errors/BadRequest.error');
const { CreatedResponse } = require('../responses/Created.response');

const signup = async (req, res) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;

        let detailsError = [];

        if(!email)
            detailsError.push({
                field: 'email',
                errorCode: 'INVALID_EMAIL_ERROR', 
                message: 'Email not valid'
            })
        if(!username)
            detailsError.push({
                field: 'username',
                errorCode: 'INVALID_USERNAME_ERROR', 
                message: 'Username not valid'
            })
        if(!password)
            detailsError.push({
                field: 'password',
                errorCode: 'INVALID_PASSWORD_ERROR', 
                message: 'Password not valid'
            })
        if(!name)
            detailsError.push({
                field: 'name',
                errorCode: 'INVALID_NAME_ERROR', 
                message: 'Name not valid'
            })
        
        if (!!detailsError.length)
            throw new BadRequestError({
                details: detailsError
            })

        const user = await authService.createUser(email, username, password, name);
        const accessToken = authTokenUtils.generateAuthToken(user._id);

        const response = new CreatedResponse({
            message: 'User created',
            data: {
                User: user,
                AuthToken: {
                    accessToken: accessToken
                }
            }
        })


        res.status(response.code).json(response.getResponse());
    } catch (error) {
        error = !error.status ? new InternalServerError() : error;
        res.status(error.code).json(error.getError());
    }
}

const login = (req, res) => {
    try {
        const accessToken = authTokenUtils.generateAuthToken(req.user._id);
        sendJsonResponse(res, ResponseCode.OK, {accessToken: accessToken})
    } catch (error) {
        error = !error.status ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}

module.exports = {
    signup,
    login
}