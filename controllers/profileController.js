const { pool } = require("../config/database");

const getProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const [user] = await pool.query('SELECT * FROM Users WHERE userId = ?', [userId]);

        if (!user.length) {
            return res.status(404).send('User not found');
        }

        return res.send(user[0]);
    } catch (error) {
        console.error(error);
        return next(new Error("Internal server error"));
    }
};


module.exports = { getProfile }