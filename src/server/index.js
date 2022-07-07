const http = require('http');
require('dotenv').config();
const events = require('./events');
const server = require('./server');

const port = server.get('port');

events.bindServer(
    http.createServer(server).listen(port),
);
