const { Server } = require('socket.io');
const http = require('http');

const app = require('./app');

const port = app.get('port');
const events = require('./events');
const ChatComponent = require('../components/Chat');

const server = http.createServer(app);
const io = new Server(server);

ChatComponent(io);

events.bind(
  server.listen(port),
);

// io.sockets.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('message', (msg) => {
//     socket.emit('message', msg);
//     console.log(`message: ${msg}`);
//   });
//   socket.on('disconnect', () => {
//     console.log('Client disconnect');
//   });
// });

// io.on('connection', (socket) => {
//   console.log(socket);
//   console.log('a user connected');
// });
