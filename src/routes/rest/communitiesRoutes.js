const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { createCommunity, getCommunities, getCommunity, putCommunityMembers, putJoinCommunity, getCommunityMembers } = require('../../controllers/rest/communitiesController');

// Create community
router.post('/', authMiddleware, createCommunity);

// Get all communities (optional params)
router.get('/', getCommunities);

// TODO: Change from name to nameID
// Get community by name
router.get('/:community', getCommunity);

// Add members to a community
router.put('/:community/members', authMiddleware, putCommunityMembers);

// Get community members
router.get('/:community/members', getCommunityMembers);

// Join a community
router.put('/:community/join', authMiddleware, putJoinCommunity);

module.exports = router;