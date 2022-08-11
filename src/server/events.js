"use strict";
exports.__esModule = true;
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
    var addr = this.address();
    var port = (typeof addr === 'string') ? "pipe ".concat(addr) : "port ".concat(addr.port);
    console.log("Listening on ".concat(port));
}
/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bind(server) {
    var _this = this;
    server.on('error', function (error) { return _this.onError.bind(server)(error); });
    server.on('listening', this.onListening.bind(server));
}
exports["default"] = {
    onError: onError,
    onListening: onListening,
    bind: bind
};
