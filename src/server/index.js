const http = require('http');
const events = require('./events');
const server = require('./server');

const port = server.get('port');

events.init(
    http.createServer(server).listen(port),
);
