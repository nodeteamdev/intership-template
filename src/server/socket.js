const { Server } = require('socket.io');

function init(httpServer) {
    const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] }, allowEIO3: true, maxHttpBufferSize: 1e6 });

    io.on('connection', (socket) => {
        socket.on('message', () => {});

        socket.on('disconnect', () => {
            console.log('socket.id disconnected:>> ', socket.id);
        });
    });
}

module.exports = { init };
