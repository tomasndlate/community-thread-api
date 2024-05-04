const { sendErrorResponse } = require('../utils/responseUtils');
const passport = require('../configs/passportConfig');

const loginMiddleware = (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        try {
            if (!!error) 
                throw error;

            if(!!user) 
                req.user = user;

            next(); 
            
        } catch (error) {
            error = !error.statusCode ? new ServerError('Internal error.') : error;
            sendErrorResponse(res, error.statusCode, error.message);
        }
        
    })(req, res, next);
} 

module.exports = loginMiddleware;