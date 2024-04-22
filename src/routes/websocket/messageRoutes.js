exports.postMessage = (io, socket) => {

  socket.on('send-message', async (data) => {
    console.log(`Received message: ${data.message} and ${data.sec}`);
    io.emit('message-received', `${data.message} and ${data.sec}`);
  })
  
}
