const http = require('http');
const events = require('./events');
const server = require('./server');
require('dotenv').config();

const port = server.get('port');

events.bind(
    http.createServer(server).listen(port),
);
