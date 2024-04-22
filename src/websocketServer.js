const socketIO = require('socket.io');
const messageRoutes = require('./routes/websocket/messageRoutes');

module.exports = (server) => {
    const io = socketIO(server, {
        cors: {origin: '*'}
    });

    // New websocket connection
    io.on('connection', (socket) => {
        console.log('User connected!');

        // Disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected!');
        });

        socket.on('join-room', (roomId) => {
            socket.join(roomId);
        })

        // Websocket Routes
        messageRoutes.postMessage(io, socket);
    });

    return io;
};