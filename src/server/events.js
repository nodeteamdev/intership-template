"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            console.error('Port requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port is already in use');
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
    const port = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${port}`);
}
/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bind(server) {
    server.on('error', (error) => this.onError.bind(server)(error));
    server.on('listening', this.onListening.bind(server));
}
exports.default = {
    onError,
    onListening,
    bind,
};
