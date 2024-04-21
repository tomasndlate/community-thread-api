const socketIO = require('socket.io');

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

        socket.on('send-message', (roomId, message) => {
            // console.log(`Received message: ${message}`);
            io.to(roomId).emit('message-received', message);
        });

    });

    return io;
};