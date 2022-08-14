import * as http from 'http';
import { Address } from 'node:cluster';
/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @returns throw error
 */
function onError(error: NodeJS.ErrnoException): void {
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
function onListening(): void {
  const addr: Address = this.address();
  const port: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${port}`);
}

/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bind(server: http.Server): void {
  server.on('error', (error: Error) => this.onError.bind(server)(error));
  server.on('listening', this.onListening.bind(server));
}

export default {
  onError,
  onListening,
  bind,
};
