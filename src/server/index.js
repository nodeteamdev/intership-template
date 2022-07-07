const http = require('http');
require('./dotenv');
const events = require('./events');
const server = require('./server');

const port = server.get('port');

events.bindServer(
    http.createServer(server).listen(port),
);
