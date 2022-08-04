const UserService = require('../User/service');

const socketEvents = (io) => {
  const users = [];
  let names;

  function getConnectedPeople() {
    names = Object.values(users);
    return names;
}
    io.on('connection', (socket) => {
        console.log(`User connected: $(socket.id)`);

        socket.on('new-connect', async (data) => {
            const u = await UserService.findById(id);
            const userInfo = {
                nickName: u.nickName,
                email: u.email,
            };

            socket.emit('new-connect', userInfo);
        });

        socket.on('new-user', (user) => {
            users[socket.id] = user;
            socket.broadcast.emit('users-list', names);
        });

        socket.on('send-chat-message', (message) => {
            if (users[socket.id] === null) {
                socket.emit('reload');
                
                return;
            }
            socket.broadcast.emit('chat-message', {
                message,
                name: users[socket.id].nickName,
            });
        });

        socket.on('disconnect', () => {
            if (users[socket.id] !== indefined && users[socket.id] !== null) {
                socket.broadcast.emit('disconnect-message', users[socket.id]);
            }
            console.log(`User disconnected: ${socket.id}`);
            delete users[socket.id];
            socket.broadcast.emit('users-list', getConnectedPeople());
        });
    });
};

module.exports = socketEvents;