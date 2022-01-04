const UserService = require('../User/service');
const AuthService = require('../Auth/service');
const TokenValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
const chatRoom = async (req, res, next) => {
  try {
    const { error, value } = TokenValidation.Tokens(req.cookies);

    if (error) throw new ValidationError(error.details);

    const token = await AuthService.searchToken(value.refreshToken);

    const user = await UserService.findById(token.userId);

    res
      .status(200)
      .render('chat', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        id: user.id,

      });
  } catch (error) {
    next(error);
  }
};

const socketEvents = (io) => {
  const users = [];
  let fullNames;
  let clients = 0;

  const getConnectedPeople = () => {
    fullNames = Object.values(users);
    console.log(fullNames);
    return fullNames;
  };

  io.on('connection', (socket) => {
    clients++;
    socket.emit('newclientconnect', { description: 'Hey, welcome!' });
    socket.broadcast.emit('newclientconnect', { description: `${clients} clients connected!` });

    console.info(`New socket connection: ${socket.id}`);

    socket.on('new-user', (fullName) => {
      users[socket.id] = fullName;
      socket.broadcast.emit('new-user-message', fullName);
      socket.broadcast.emit('users-list', getConnectedPeople());
      socket.emit('users-list', fullNames);
      console.info(`${fullName} joined the chat!`);
    });

    socket.on('send-chat-message', (message) => {
      if (users[socket.id] == null) {
        socket.emit('reload');
        return;
      }
      socket.broadcast.emit('chat-message', {
        message,
        firstName: users[socket.id].firstName,
      });
    });

    socket.on('user-typing', (fullName) => {
      socket.broadcast.emit('user-typing', fullName);
    });

    socket.on('disconnect', () => {
      clients--;
      if (users[socket.id] !== undefined && users[socket.id] !== null) {
        socket.broadcast.emit('disconnect-message', users[socket.id]);
      }
      socket.broadcast.emit('broadcast', { description: `${clients} clients connected` });
      console.log(`${users[socket.id]} left the chat!`);
      delete users[socket.id];
      socket.broadcast.emit('users-list', getConnectedPeople());
    });
  });
};

module.exports = {
  socketEvents,
  chatRoom,
};
