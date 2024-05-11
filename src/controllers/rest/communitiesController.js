const HttpStatus = require('../../enums/httpStatusEnum');
const BadRequestError = require('../../errors/BadRequestError');
const ServerError = require('../../errors/ServerError');
const Community = require('../../models/Community');
const communitiesService = require('../../services/communitiesService');
const { sendErrorResponse, sendJsonResponse } = require('../../utils/responseUtils');

exports.createCommunity = async (req, res) => {
    try {
        const ownerId = req.user._id;
        const name = req.body.name;
        const description = req.body.description;
        const membersId = req.body.members;

        if (!ownerId)
            throw new BadRequestError('Invalid owner')
        if (!name)
            throw new BadRequestError('Invalid name')

        const community = await communities.create(ownerId, name, description, membersId);

        sendJsonResponse(res, HttpStatus.CREATED, community);
    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}

exports.getCommunities = async (req, res) => {
    try {
        const { name = '*', page = 1, limit = 20 } = req.query;
        
        // TODO: Handle the name parameter for not allowed digits
        const filterName = name;
        const filterPage = parseInt(page);
        const filterLimit = parseInt(limit);

        if (isNaN(filterPage) || filterPage < 1)
            throw new BadRequestError('Invalid page number');
        
        if (isNaN(filterLimit) || filterLimit < 1)
            throw new BadRequestError('Invalid page size');
        
        const communities = await communitiesService.find(filterName, filterPage, filterLimit);

        sendJsonResponse(res, HttpStatus.OK, communities);
    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}

exports.getCommunity = async (req, res) => {
    try {
        const { community } = req.params;

        const communityResult = await communitiesService.getByName(community);

        sendJsonResponse(res, HttpStatus.OK, communityResult);

    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        sendErrorResponse(res, error.statusCode, error.message);
    }
}