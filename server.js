const WebSocket = require('ws');
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const io = socketIo(server);
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

server.listen(4500, () => {
    console.log('Server started on port 4500');
});
