import { Address } from 'cluster';
import http from 'http';

/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bindPort: string = typeof port ==='string' ? `Pipe ${port}`: `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        console.error(`${bindPort} requires elevated privileges`);
        process.exit(1);
    case 'EADDRINUSE':
        console.error(`${bindPort} is already in use`);
        process.exit(1);
    default:
        throw error;
    }
}
/**
 * @function
 * @inner
 * @description log port to console
 */
function onListening(): void {
    const addr: Address = this.address();
    const bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log(`Listening on ${bind}`);
}

/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bind(server: http.Server, port: number): void {
    server.on('error', (error: Error) => this.onError.bind(server)(error));
    server.on('listening', this.onListening.bind(server));
}

export default {
    onError,
    onListening,
    bind,
};
