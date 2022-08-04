const http = require('http');
const { Server } = require('socket.io');
const events = require('./events');
const app = require('./server');
const socketEvents = require('../components/Chat/socket');

const server = http.createServer(app);
const port = app.get('port');
const io = new Server(server);

socketEvents(io);

events.bind(
    server.listen(port),
);
