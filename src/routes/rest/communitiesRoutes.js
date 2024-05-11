const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { createCommunity, getCommunities, getCommunity } = require('../../controllers/rest/communitiesController');

// Create community
router.post('/', authMiddleware, createCommunity);

router.get('/', getCommunities);

router.get('/:community', getCommunity);

module.exports = router;