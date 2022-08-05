const http = require('http');

const events = require('./events');
const server = require('./server');
const io = require('../config/socket');

const httpServer = http.createServer(server);

io.init(httpServer);

events.bind(httpServer.listen(process.env.PORT || 3000));
