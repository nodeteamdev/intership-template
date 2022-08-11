"use strict";
exports.__esModule = true;
var Joi = require("@hapi/joi");
var mongoose_1 = require("mongoose");
/**
 * @exports
 * @class Validation
 */
var Validation = /** @class */ (function () {
    /**
       * Creates an instance of Schema.
       * @constructor
       * @memberof JoiSchema
       */
    function Validation() {
        /**
             * @static
             * @type {string}
             * @memberof JoiSchema
             */
        this.messageObjectId = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
        this.Joi = Joi.extend({
            type: 'objectId',
            messages: {
                'objectId.base': this.messageObjectId
            },
            validate: function (value, helpers) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return {
                        value: value,
                        errors: helpers.error('objectId.base')
                    };
                }
                return {
                    value: value
                };
            }
        });
    }
    return Validation;
}());
exports["default"] = Validation;
