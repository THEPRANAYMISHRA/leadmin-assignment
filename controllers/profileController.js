const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);

        if (!user) return res.status(404).send('User not found');

        return res.send(user);
    } catch (error) {
        return next(new Error("Internal server error"))
    }
};


module.exports = { getProfile }