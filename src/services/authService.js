const User = require('../models/User');
const { encryptPassword, comparePassword } = require('../utils/passwordUtils');
const AuthenticationError = require('../errors/AuthenticationError');
const DatabaseError = require('../errors/DatabaseError');

exports.createUser = async (email, username, password, name) => {
    try {
        const encryptedPassword = await encryptPassword(password);
        const newUser = new User({
            email: email,
            username: username,
            password: encryptedPassword,
            name: name
        });
        const createdNewUser = await newUser.save();
        return createdNewUser._id;

    } catch (error) {
        // Duplicate key violation
        if ([11000, 11001].includes(error.code)) {
            console.log(error)
            throw new AuthenticationError('Username already exists.');
        }
        // Default error
        throw new DatabaseError('Database error.');
    }
};