const express = require('express');
const { createRoom, joinRoom } = require('../controllers/chatController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/chatrooms', authenticateToken, createRoom);
router.post('/joinroom', authenticateToken, joinRoom);

module.exports = router;
