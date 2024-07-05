const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res, next) => {
    try {
        const { userId, deviceId, name, phone, password } = req.body;

        if (!userId || !deviceId || !name || !phone || !password) {
            return res.status(400).send('Provide all the details');
        }

        const userExists = await User.findOne({ where: { userId } });
        if (userExists) return res.status(400).send('User already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ userId, deviceId, name, phone, availCoins: 0, password: hashedPassword });
        await user.save();

        return res.send('User registered successfully');
    } catch (error) {
        return next(new Error("Internal server error"))
    }
};
const login = async (req, res, next) => {
    try {
        const { userId, password } = req.body;

        const user = await User.findOne({ where: { userId } });
        if (!user) return res.status(400).send('User not found');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
        return res.header('Authorization', token).send(token);
    } catch (error) {
        return next(new Error("Internal server error"))
    }
};

module.exports = { register, login }
