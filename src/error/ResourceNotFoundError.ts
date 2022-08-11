/**
 * @exports
 * @extends Error
 */
class ResourceNotFoundError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = 'E_RESOURCE_NOT_FOUND';
    }
}

module.exports = ResourceNotFoundError;
