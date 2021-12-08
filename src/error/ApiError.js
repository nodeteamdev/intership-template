/**
 * @exports
 * @extends Error
 */
class ApiError extends Error {
  /**
     * @constructor
     * @param {object} message
     */
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    this.name = 'E_MISSING_OR_INVALID_PARAMS';
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Unauthorized user');
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
}

module.exports = ApiError;
