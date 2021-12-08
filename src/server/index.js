const http = require('http');
const events = require('./events');
const server = require('./server');
const db = require('../config/connection');

const port = server.get('port');

events.bind(
  http.createServer(server).listen(port),
  db(),
);
