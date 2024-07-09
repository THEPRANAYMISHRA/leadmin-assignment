const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const register = async (req, res, next) => {
    try {
        const { userId, deviceId, name, phone, password } = req.body;

        if (!userId || !deviceId || !name || !phone || !password) {
            return res.status(400).send('Provide all the details');
        }

        const [userExists] = await pool.query(
            'SELECT userId FROM Users WHERE userId = ?',
            [userId]
        );

        if (userExists.length > 0) {
            return res.status(400).send('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [rows] = await pool.query(
            'INSERT INTO Users (userId, password, deviceId, name, phone, availCoins, isPrime) VALUES (?, ?, ?, ?, ?, 0, false)',
            [userId, hashedPassword, deviceId, name, phone]
        );

        return res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        return next(new Error("Internal server error"));
    }
};

const login = async (req, res, next) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).send('Provide both userId and password');
        }

        const [userExists] = await pool.query(
            'SELECT userId, password FROM Users WHERE userId = ?',
            [userId]
        );

        if (userExists.length === 0) {
            return res.status(400).send('User not found');
        }

        const validPass = await bcrypt.compare(password, userExists[0].password);
        if (!validPass) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ userId: userExists[0].userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.header('Authorization', `Bearer ${token}`).send({ token });
    } catch (error) {
        console.error(error);
        return next(new Error("Internal server error"));
    }
};

module.exports = { register, login }
