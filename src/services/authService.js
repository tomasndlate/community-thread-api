const User = require('../models/User');
const { encryptPassword } = require('../utils/passwordUtils');
const AuthenticationError = require('../errors/Unauthorized.error');
const DatabaseError = require('../errors/DatabaseError');
const { ConflictError } = require('../errors/Conflict.error');
const ServerError = require('../errors/InternalServer.error');

exports.createUser = async (email, username, password, name) => {
    try {
        const existentEmail = await User.findOne({email: email});
        const existentUsername = await User.findOne({username: username});
        let detailsError = [];

        if (!!existentEmail)
            detailsError.push({
                field: 'email',
                errorCode: 'EXISTENT_EMAIL_ERROR', 
                message: 'Email already exists'
            })
            
        if (!!existentUsername)
            detailsError.push({
                field: 'username',
                errorCode: 'EXISTENT_USERNAME_ERROR', 
                message: 'Username already exists'
            })

        if (!!detailsError.length)
            throw new ConflictError({
                message: 'User already exists.',
                details: detailsError
            })
            
        const encryptedPassword = await encryptPassword(password);
        const newUser = new User({
            email: email,
            username: username,
            password: encryptedPassword,
            name: name
        });
        const createdNewUser = await newUser.save();
        return {
            _id: createdNewUser._id,
            email: createdNewUser.email,
            username: createdNewUser.username,
            name: createdNewUser.name
        };

    } catch (error) {
        error = !error.status ? new ServerError.InternalServerError() : error;
        throw error;
    }
};