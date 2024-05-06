const HttpStatus = require('../../enums/httpStatusEnum');
const BadRequestError = require('../../errors/BadRequestError');
const ServerError = require('../../errors/ServerError');
const communities = require('../../services/communitiesService');
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