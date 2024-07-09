const express = require('express');
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const profileRoutes = require('./routes/profileRoutes');
const friendRoutes = require('./routes/friendRoutes');

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', profileRoutes);
app.use('/api', friendRoutes);

app.use(errorHandler);
module.exports = app;
