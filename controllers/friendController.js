const FriendRequest = require('../models/FriendRequest');

const sendFriendRequest = async (req, res) => {
    try {
        const { userId } = req.user;
        const { receiverId } = req.body;

        const request = new FriendRequest({ senderId: userId, receiverId });
        await request.save();

        return res.send('Friend request sent');
    } catch (error) {
        return next(new Error("Internal server error"))
    }
};

module.exports = { sendFriendRequest }
