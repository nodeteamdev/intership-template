const { Server } = require('socket.io');
const MessagesGateway = require('../components/Messages/gateways');
const isAuthenticatedWs = require('./middleware/isAutintificatedWs');
const UserService = require('../components/User/service');

function init(httpServer) {
    const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] }, allowEIO3: true, maxHttpBufferSize: 1e6 });

    io.on('connection', async (socket) => {
        const isAuthenticated = await isAuthenticatedWs(socket);
        if (!isAuthenticated) return socket.disconnect();

        await UserService.updateById(socket.user._id, { isOnline: true, onlineAt: new Date() });
        socket.user = { ...socket.user, isOnline: true, onlineAt: new Date() };
        socket.broadcast.emit('new-online', (socket.user));
        MessagesGateway.bind(socket, io);

        socket.on('disconnected', async () => {
            await UserService.updateById(socket.user._id, {
                isOnline: false, onlineAt: new Date(),
            });
            socket.user = { ...socket.user, isOnline: false, onlineAt: new Date() };
            socket.broadcast.emit('new-offline', (socket.user));
        });

        return true;
    });
}

module.exports = { init };
