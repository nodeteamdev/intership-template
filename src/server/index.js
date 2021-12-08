const http = require('http');
const events = require('./events');
const server = require('./server');
const database = require('../config/connection');

const port = server.get('port');

database()
  .on('error', console.log)
  .on('disconnected', database());

events.bind(
  http.createServer(server).listen(port),
);
