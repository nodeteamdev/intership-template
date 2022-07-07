/**
 * @exports
 * @extends Error
 */
class NotFoundError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = 'DOCUMENT_NOT_FOUND';
    }
}

module.exports = NotFoundError;
