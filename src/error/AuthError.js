/**
 * @exports
 * @extends Error
 */
class AuthError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode || 401;
        this.name = 'E_AUTHENTICATION_FAILED';
    }
}

module.exports = AuthError;
