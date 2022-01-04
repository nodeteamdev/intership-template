const { Server } = require('socket.io');
const http = require('http');

const app = require('./app');

const port = app.get('port');
const events = require('./events');
const ChatComponent = require('../components/Chat').socketEvents;

const server = http.createServer(app);
const io = new Server(server);

ChatComponent(io);

events.bind(
  server.listen(port),
);
