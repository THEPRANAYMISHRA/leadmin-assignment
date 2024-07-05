const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

const createRoom = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const user = await User.findByPk(userId);

        if (!user.isPrime) return res.status(403).send('Only prime members can create rooms');

        const room = await ChatRoom.create({ creatorId: userId, participants: [userId] });
        return res.send(room);
    } catch (error) {
        return next(new Error("Internal server error"))
    }
};

const joinRoom = async (req, res) => {
    try {
        const { userId } = req.user;
        const { roomId } = req.body;

        const room = await ChatRoom.findByPk(roomId);
        if (!room) return res.status(404).send('Room not found');

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).send('User not found');

        if (room.participants.length >= 6) return res.status(403).send('Room is full');

        if (!user.isPrime) {
            const joinedRooms = await ChatRoom.findAll({ where: { participants: { [Op.contains]: [userId] } } });

            if (joinedRooms.length > 1 && user.availCoins < 150) {
                return res.status(403).send('Insufficient coins');
            }

            user.availCoins -= 150;
            await user.save();
        }

        room.participants.push(userId);
        await room.save();
        return res.send(room);
    } catch (error) {
        return next(new Error("Internal server error"))
    }
};


module.exports = { createRoom, joinRoom }