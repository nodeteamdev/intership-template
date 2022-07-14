const http = require('http');
const events = require('./events');
const server = require('./server');

const PORT = server.get('port');

events.bind(
    http.createServer(server).listen(PORT),
);
