/**
 * @exports
 * @extends Error
 */
class AuthError extends Error {
  /**
     * @constructor
     * @param {object} status
     * @param {object} message
     */
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = AuthError;
