const User = require('../models/User');
const Community = require('../models/Community');
// const { encryptPassword, comparePassword } = require('../utils/passwordUtils');
// const AuthenticationError = require('../errors/AuthenticationError');
const DatabaseError = require('../errors/DatabaseError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');
const mongoose = require('mongoose');

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

exports.find = async (name, page, limit) => {
    try {
        
        const filterByName = name != '*' 
                ? { name: { $regex: new RegExp(name, 'i') } } 
                : {};
        
        const communities = await Community.find(filterByName).skip((page - 1) * limit).limit(limit);

        return communities;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.getByName = async (name) => {
    try {
        const community = await Community.findOne({name: name});

        if (!community)
            throw new NotFoundError('Community Not Found');

        return community;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.addMembers = async (userId, communityName, membersUsername) => {
    try {
        const membersIds = await mapUsernamesToIds(membersUsername);
        
        if (!membersIds)
            throw new BadRequestError('Bad Request: Not all usernames are correct')

        console.log(membersIds);
        const community = await Community.findOne({ name: communityName });
        
        if (community.owner.toString() != userId.toString())
            throw new AuthorizationError('Unathorized: User is not the community owner');
     
        const updatedResult = await Community.updateOne(
            { _id: community._id },
            { $addToSet: { members: { $each: membersIds } } }
        );

        console.log(updatedResult.ok)
        
        if (updatedResult.ok === 0)
            throw new DatabaseError('Database error.');

        return await Community.findOne({name: communityName});
        
    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

/**
 * Validate if users exist by their username and return array of ids.
 * @param {string[]} usernames Arrays of users id
 * @returns {ObjectId[] | null} Array of users id | Null if some username doesn't exist
 * @throws {DatabaseError} If an error occurs during the validation process
 */
const mapUsernamesToIds = async (usernames) => {
    try {
        const users = await User.find({ username: { $in: usernames } }).select({ _id: 1 });

        if (users.length != usernames.length)
            return null;
        
        return users;

    } catch (error) {
        throw new DatabaseError('Database error.');
    }    
};