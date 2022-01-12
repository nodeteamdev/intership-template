const { Server } = require('socket.io');
const http = require('http');

const app = require('./app');

const port = app.get('port');
const events = require('./events');
const socketEvents = require('../components/Chat/socket');

const server = http.createServer(app);
const io = new Server(server);

socketEvents(io);

events.bind(
  server.listen(port),
);
