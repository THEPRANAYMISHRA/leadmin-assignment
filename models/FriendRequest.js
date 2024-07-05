const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FriendRequest = sequelize.define('FriendRequest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    senderId: { type: DataTypes.STRING },
    receiverId: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
});

module.exports = FriendRequest;
