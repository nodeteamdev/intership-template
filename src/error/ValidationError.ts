import Joi from 'joi';

/**
 * @exports
 * @extends Error
 */
class ValidationError extends Error {
    /**
     * @constructor
     * @param {Joi.ValidationErrorItem[]} details
     */
    constructor(public details: Joi.ValidationErrorItem[]) {
        super();
        this.message = '';
        this.name = 'E_MISSING_OR_INVALID_PARAMS';
    }
}

export default ValidationError;
