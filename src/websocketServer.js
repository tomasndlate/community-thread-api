const socketIO = require('socket.io');
const {threadSocket} = require('./routes/websocket/thread.socket');
const { messageSocket } = require('./routes/websocket/message.socket');

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

        // Websocket Routes
        threadSocket(io, socket);
        messageSocket(io, socket);
    });

    return io;
};