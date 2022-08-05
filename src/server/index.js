const http = require('http');
const socketIo = require('socket.io');
const events = require('./events');
const app = require('./server');

const server = http.createServer(app);

const socketRun = require('../components/Chat/socket');

const io = socketIo(server);

const port = app.get('port');

socketRun(io);

events.bind(
    server.listen(port),
);
