const UserService = require('../User/service');

const socketEvents = (io) => {
  const users = [];
  let names;

  function getConnectedPeople() {
    names = Object.values(users);
    return names;
  }

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('new-connect', async (data) => {
      const u = await UserService.searchOne({ _id: data });
      const userInfo = {
        id: `${data}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        picture: u.picture || '/assets/def.jpg',
      };

      socket.emit('new-connect', userInfo);
    });

    socket.on('new-user', (user) => {
      users[socket.id] = user;
      // socket.broadcast.emit('new-user-message', user.firstName);
      socket.broadcast.emit('users-list', getConnectedPeople());
      socket.emit('users-list', names);
    });

    socket.on('send-chat-message', (message) => {
      if (users[socket.id] === null) {
        socket.emit('reload');
        return;
      }
      socket.broadcast.emit('chat-message', {
        message,
        name: users[socket.id].firstName,
      });
    });

    socket.on('user-typing', (data) => {
      const fName = users[data.socket_id].firstName;
      socket.broadcast.emit('user-typing', {
        firstName: fName,
      });
    });

    socket.on('disconnect', () => {
      if (users[socket.id] !== undefined && users[socket.id] !== null) {
        socket.broadcast.emit('disconnect-message', users[socket.id]);
      }
      console.log(`User disconnected: ${socket.id}`);
      delete users[socket.id];
      socket.broadcast.emit('users-list', getConnectedPeople());
    });
  });
};

module.exports = socketEvents;
