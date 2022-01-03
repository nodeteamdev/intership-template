const socketEvents = (io) => {
  io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
      io.emit('chat message', {
        message: data.message,
        name: data.name,
      });
    });
  });
};

module.exports = socketEvents;
