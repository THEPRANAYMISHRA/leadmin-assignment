const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const socketIo = require("socket.io")
const io = socketIo(server);
const pool = require('./config/database');
require("dotenv").config()

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ room }) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('chatMessage', ({ room, message }) => {
        io.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const testDatabaseConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Database connected');
        server.listen(4200, () => {
            console.log('Server started on port 4500');
        });
    } catch (err) {
        console.error('Error connecting to the database', err);
        process.exit(1); // Exit the process with failure
    }
};

testDatabaseConnection();
