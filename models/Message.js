const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomId: { type: DataTypes.INTEGER },
    senderId: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT }
});

module.exports = Message;
