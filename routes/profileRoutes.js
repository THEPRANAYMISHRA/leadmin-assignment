const express = require('express');
const { getProfile } = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authMiddleware');
const profileRouter = express.Router();

profileRouter.get('/profile/:userId', authenticateToken, getProfile);

module.exports = profileRouter;
