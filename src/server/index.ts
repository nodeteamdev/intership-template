import http from 'http';
import events from './events';
import server from './server';

const port: number = server.get('port');

events.bind(http.createServer(server).listen(port), port);
