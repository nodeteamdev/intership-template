const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connected! >>', socket.id);

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log(`Message added to chat! >> ${msg}`);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected! >>', socket.id);
    });
  });
};

module.exports = socketEvents;
