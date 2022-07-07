const logger = require('../helpers/logger');

/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @returns throw error
 */
function onError(error) {
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
function onListening() {
    const addr = this.address();
    const bindStr = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    logger(`Listening on ${bindStr}`, 'server.onListening event', 'log');
}

/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bindServer(server) {
    server.on('error', (error) => onError.bind(server)(error));
    server.on('listening', onListening.bind(server));
}

module.exports = {
    bindServer,
};
