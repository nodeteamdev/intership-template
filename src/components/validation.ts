import Joi, { object, string } from 'joi';
import { Types } from 'mongoose';

/**
 * @exports
 * @class Validation
 */
abstract class Validation {
    customJoi: any;

    /**
         * @static
         * @type {string}
         * @memberof JoiSchema
         */
     readonly messageObjectId: string = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';

    /**
     * Creates an instance of Schema.
     * @constructor
     * @memberof JoiSchema
     */
    constructor() {
        this.customJoi = Joi.extend((joi) => ({
            type: 'objectId',
            base: joi.string(),
            validate(
                value: any,
                helpers: Joi.CustomHelpers,
            ): Object | string {
                if (!Types.ObjectId.isValid(value)) {
                    return {
                            value,
                            errors: helpers.error('objectId.base'),
                        };
                }

                return value;
            },
        }));
    }
}

export default Validation;
