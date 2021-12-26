const socketEvents = (io) => {
  const users = [];
  io.on('connection', (socket) => {
    console.log('New socket connected! >>', socket.id);

    socket.on('new-connection', (data) => {
      console.log('new-connection event received', data);
      // adds user to list
      users[socket.id] = data.username;
      console.log('users :>> ', users);

      socket.emit('welcome-message', {
        user: 'server',
        message: `Welcome to this Socket.io chat ${data.username}. There are ${
          Object.keys(users).length
        } users connected`,
      });
    });

    // handles message posted by client
    socket.on('new-message', (data) => {
      console.log(`👾 new-message from ${data.user}`);
      // broadcast message to all sockets except the one that triggered the event
      socket.broadcast.emit('broadcast-message', {
        user: users[data.user],
        message: data.message,
      });
    });
  });
};

module.exports = socketEvents;
