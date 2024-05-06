// const User = require('../models/User');
const Community = require('../models/Community');
// const { encryptPassword, comparePassword } = require('../utils/passwordUtils');
// const AuthenticationError = require('../errors/AuthenticationError');
const DatabaseError = require('../errors/DatabaseError');
const BadRequestError = require('../errors/BadRequestError');

exports.create = async (owner, name, description, members) => {
    try {
        // const encryptedPassword = await encryptPassword(password);
        const newCommunity = new Community({
            owner: owner, 
            name: name, 
            description: description, 
            members: members
        });
        const createdNewCommunity = await newCommunity.save();
        return createdNewCommunity;

    } catch (error) {
        // Duplicate key violation
        if ([11000, 11001].includes(error.code)) {
            throw new BadRequestError('Name already exists.');
        }
        // Default error
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
};