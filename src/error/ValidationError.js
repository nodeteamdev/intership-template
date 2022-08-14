"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @exports
 * @extends Error
 */
class ValidationError extends Error {
    /**
       * @constructor
       * @param {object} message
       */
    constructor(message) {
        super();
        this.message = message;
        this.name = 'E_MISSING_OR_INVALID_PARAMS';
    }
}
exports.default = ValidationError;
