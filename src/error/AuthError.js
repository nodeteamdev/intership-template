/**
 * @exports
 * @extends Error
 */
class AuthError extends Error {
  /**
   * @constructor
   * @param {object} message
   */
  constructor(message) {
    super();
    this.message = message;
    this.name = 'E_AUTHENTICATE_ERROR';
  }
}

module.exports = AuthError;
