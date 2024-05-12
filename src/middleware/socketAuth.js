const NotFoundError = require("../errors/NotFoundError");
const ServerError = require("../errors/ServerError");
const User = require("../models/User");
const { validateAuthToken } = require("../utils/authTokenUtils");

exports.socketAuth = async (socket, data, next) => {
    try {
        const userId = await validateAuthToken(data.accessToken);
        const user = await User.findOne({_id: userId});

        if (!user)
                throw new NotFoundError('User not found');
        
        next(user);

    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        socket.emit('error-send-message', { code: error.statusCode, message: error.message });
    }
} 