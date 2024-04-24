const { sendErrorResponse } = require('../utils/responseUtils');
const passport = require('../configs/passportConfig');

const loginMiddleware = (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if(!!error)
            sendErrorResponse(res, error.statusCode, error.message);
        
        if(!!user) 
            req.user = user;
        
        next();

    })(req, res, next);
} 

module.exports = loginMiddleware;