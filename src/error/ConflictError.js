/**
 * @exports
 * @extends Error
 */
class ConflictError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = 'CONFLICT_LOGINS';
    }
}

module.exports = ConflictError;
