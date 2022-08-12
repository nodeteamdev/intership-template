/* eslint-disable import/first */
import http from 'http';
import dotenvConfig from './dotenv';

dotenvConfig();

import * as events from './events';
import server from './server';

const port = server.get('port');

events.bindServer(
    http.createServer(server).listen(port),
);
