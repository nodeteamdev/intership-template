const { ObjectId } = require('mongodb');
const MessagesService = require('./service');
const UsersService = require('../User/service');

function bind(socket, server) {
    socket.on('get-messages', async (data, cb) => {
        const lastMessages = await MessagesService.getLastMessages(data);
        cb({ data: { lastMessages } });
    });

    socket.on('get-chat-users', async (data, cb) => {
        const allUsersId = await MessagesService.getAllUsersId(socket.user._id, data);
        const allUsers = await UsersService.findAll({ _id: { $in: allUsersId } }, data);

        cb({ data: { allUsers } });
    });

    socket.on('post-message', async (data, cb) => {
        const { message, user } = data;
        const savedMessage = await MessagesService.create({
            body: message, userId: new ObjectId(user._id), fullName: user.fullName,
        });
        cb({ data: savedMessage });
        socket.emit('new-message', { data: { message: savedMessage, user: { _id: savedMessage.userId, fullName: savedMessage.fullName } } });
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
}

module.exports = { bind };
