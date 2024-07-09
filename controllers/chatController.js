const { pool } = require("../config/database");

const createRoom = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const [user] = await pool.query('SELECT isPrime FROM Users WHERE userId = ?', [userId]);

        if (!user.length) {
            return res.status(404).send('User not found');
        }

        if (!user[0].isPrime) {
            return res.status(403).send('Only prime members can create rooms');
        }
        const [room] = await pool.query('INSERT INTO ChatRooms (creatorId) VALUES (?)', [userId]);

        // Also add creator to the room memnbers list
        await pool.query('INSERT INTO RoomParticipants (roomId, userId) VALUES (?, ?)', [room.insertId, userId]);

        return res.status(201).send({ roomId: room.insertId, creatorId: userId });
    } catch (error) {
        console.error(error);
        return next(new Error("Internal server error"));
    }
};

const joinRoom = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { roomId } = req.body;

        const [room] = await pool.query('SELECT * FROM ChatRooms WHERE roomId = ?', [roomId]);

        if (!room.length) {
            return res.status(404).send('Room not found');
        }

        const [user] = await pool.query('SELECT * FROM Users WHERE userId = ?', [userId]);

        if (!user.length) {
            return res.status(404).send('User not found');
        }

        const [participants] = await pool.query('SELECT COUNT(*) AS count FROM RoomParticipants WHERE roomId = ?', [roomId]);

        if (participants[0].count >= 6) {
            return res.status(403).send('Room is full');
        }

        if (!user[0].isPrime) {
            const [joinedRooms] = await pool.query('SELECT COUNT(*) AS count FROM RoomParticipants WHERE userId = ?', [userId]);

            if (joinedRooms[0].count > 1 && user[0].availCoins < 150) {
                return res.status(403).send('Insufficient coins');
            }

            await pool.query('UPDATE Users SET availCoins = availCoins - 150 WHERE userId = ?', [userId]);
        }

        await pool.query('INSERT INTO RoomParticipants (roomId, userId) VALUES (?, ?)', [roomId, userId]);

        return res.send({ roomId, userId });
    } catch (error) {
        console.error(error);
        return next(new Error("Internal server error"));
    }
};



module.exports = { createRoom, joinRoom }