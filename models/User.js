const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    userId: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
    deviceId: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    availCoins: { type: DataTypes.INTEGER, defaultValue: 0 },
    password: { type: DataTypes.STRING },
    isPrime: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = User;
