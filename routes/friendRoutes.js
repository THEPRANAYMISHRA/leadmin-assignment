const express = require('express');
const { sendFriendRequest } = require('../controllers/friendController');
const authenticateToken = require('../middlewares/authMiddleware');
const friendRequestRouter = express.Router();

friendRequestRouter.post('/friend-requests', authenticateToken, sendFriendRequest);

module.exports = friendRequestRouter;
