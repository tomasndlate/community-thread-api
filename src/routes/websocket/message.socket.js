const { sendMessage } = require("../../controllers/websocket/messageController");
const { socketAuth } = require("../../middleware/socketAuth");

exports.messageSocket = (io, socket) => {

    // socketAuth middleware that return user object and is sent to the next function
    socket.on('send-message', (data) => socketAuth(socket, data, (user) => sendMessage(io, socket, user, data)));

}
