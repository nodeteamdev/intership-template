const socketEvents = (io) => {
  const users = [];
  let emails;

  // Functions

  function getConnectedPeople() {
    emails = Object.values(users);
    console.log(emails);
    return emails;
  }

  io.on('connection', (socket) => {
    console.log('New socket connected! >>', socket.id);

    socket.on('new-user', (email) => {
      users[socket.id] = email;
      socket.broadcast.emit('new-user-message', email);
      socket.broadcast.emit('users-list', getConnectedPeople());
      socket.emit('users-list', emails);
      console.log(`${email} joined to the chat!`);
    });

    socket.on('send-chat-message', (message) => {
      socket.broadcast.emit('chat-message', {
        message,
        email: users[socket.id],
      });
    });

    socket.on('user-typing', (email) => {
      socket.broadcast.emit('user-typing', email);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected! >>', socket.id);

      if (users[socket.id] !== undefined && users[socket.id] !== null) {
        socket.broadcast.emit('disconnect-message', users[socket.id]);
      }
      console.log(`${users[socket.id]} left the chat!`);
      delete users[socket.id];
      socket.broadcast.emit('users-list', getConnectedPeople());
    });
  });
};

module.exports = socketEvents;
