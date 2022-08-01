const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] }, allowEIO3: true, maxHttpBufferSize: 1e6 });

io.on('connection', (socket) => {
    console.log('socket.id :>> ', socket.id);
    socket.on('message', (...args) => {
        console.log('args :>> ', args);
    });

    socket.on('disconnected', () => {
        console.log('disconnected :>> ');
    });
});

httpServer.listen(3000, () => {
    console.log('listen :>> ');
});
