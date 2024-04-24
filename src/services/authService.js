const User = require('../models/User');
const { encryptPassword, comparePassword } = require('../utils/passwordUtils');
const AuthenticationError = require('../errors/AuthenticationError');
const DatabaseError = require('../errors/DatabaseError');

exports.createUser = async (username, password) => {
    try {
        const encryptedPassword = await encryptPassword(password);
        const newUser = new User({
            username: username,
            password: encryptedPassword
        });
        const createdNewUser = await newUser.save();
        return createdNewUser._id;

    } catch (error) {
        // Duplicate key violation
        if ([11000, 11001].includes(error.code)) {
            throw new AuthenticationError('Username already exists.');
        }
        // Default error
        throw new DatabaseError('Database error.');
    }
};