const { pool } = require("../config/database");

const sendFriendRequest = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { receiverId } = req.body;

        const [receiver] = await pool.query('SELECT userId FROM Users WHERE userId = ?', [receiverId]);
        if (!receiver.length) {
            return res.status(404).send('Receiver not found');
        }

        await pool.query('INSERT INTO FriendRequests (senderId, receiverId) VALUES (?, ?)', [userId, receiverId]);

        return res.send('Friend request sent');
    } catch (error) {
        console.error(error);
        return next(new Error("Internal server error"));
    }
};

module.exports = { sendFriendRequest }
