const http = require('http');
const { Server } = require('socket.io');
// const events = require('./events');
// const server = require('./server');
// const io = require('./socket');

// const port = server.get('port');
const httpServer = http.createServer();

const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] }, allowEIO3: true, maxHttpBufferSize: 1e6 });

io.on('connection', (socket) => {
    socket.on('message', () => {});

    socket.on('disconnect', () => {
        console.log('socket.id disconnected:>> ', socket.id);
    });
});

// events.bind(httpServer.listen(port));
httpServer.listen(3000, () => {
    console.log('listen :>> ');
});
