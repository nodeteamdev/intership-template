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
        this.code = '403';
        this.message = message;
        this.name = 'UNAUTHORIZED';
    }
}

module.exports = AuthError;
