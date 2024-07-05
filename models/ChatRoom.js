const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatRoom = sequelize.define('ChatRoom', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creatorId: { type: DataTypes.STRING },
    participants: { type: DataTypes.JSON }
});

module.exports = ChatRoom;
