const UserService = require('../User/service');
const MessageService = require('./service');

const socketRun = (io) => {
    io.on('connection', (socket) => {
        socket.on('new::user', async (data) => {
            const currentTime = new Date().toLocaleTimeString();
            const currentTimeOffline = new Date();

            const user = await UserService.findById({ _id: data });

            user.socketId = socket.id;
            await user.save();

            const messages = await MessageService.findAll();
            const users = await UserService.findAll();

            io.emit('add::user', { users, time: currentTimeOffline.getTime() });
            io.emit('message::history', { messages, count: messages.length });
            io.emit('bot::mess', { message: `User ${user.fullName} connected`, name: 'OnixChat Bot', time: currentTime });
        });

        socket.on('disconnect', async () => {
            const user = await UserService.findBySocket({ socketId: socket.id });
            if (user) {
                const currentTime = new Date().toLocaleTimeString();
                const currentTimeOffline = new Date().getTime();
                user.socketId = null;
                user.offlineTime = currentTimeOffline;
                await user.save();
                io.emit('bot::mess', { message: `User ${user.name} disconnected`, name: 'OnixChat Bot', time: currentTime });
            }
        });

        socket.on('send::mess', async (data) => {
            const user = await UserService.findBySocket({ socketId: socket.id });

            const currentTime = new Date().toLocaleTimeString();

            const message = {
                name: user.fullName,
                message: data.message,
                time: currentTime,
            };
            await MessageService.create(message);
            const messNumb = await MessageService.count();

            io.emit('add::mess', {
                message: data.message, name: user.fullName, time: currentTime, count: messNumb,
            });
        });

        socket.on('user::typing', (data) => {
            socket.broadcast.emit('user::typing', {
                name: data.fullName,
            });
        });
    });
};

module.exports = socketRun;
