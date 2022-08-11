import http from 'http';
import logger from '../helpers/logger';

/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @returns throw error
 */
function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
    case 'EACCES':
        logger('Port requires elevated privileges', 'server.onError event', 'error');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        logger('Port is already in use', 'server.onError event', 'error');
        process.exit(1);
        break;
    default:
        throw error;
    }
}
/**
 * @function
 * @inner
 * @description log port to console
 */
function onListening(this: http.Server) {
    const addr = this.address();
    let bindStr = '-not detected-';
    if (addr !== null) {
        bindStr = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    }

    logger(`Listening on ${bindStr}`, 'server.onListening event', 'log');
}

/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bindServer(server: http.Server) {
    server.on('error', (error: NodeJS.ErrnoException) => onError.bind(server)(error));
    server.on('listening', onListening.bind(server));
}

export {
    // eslint-disable-next-line import/prefer-default-export
    bindServer,
};
