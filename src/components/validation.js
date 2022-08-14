"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("@hapi/joi"));
const mongoose_1 = require("mongoose");
/**
 * @exports
 * @class Validation
 */
class Validation {
    /**
       * Creates an instance of Schema.
       * @constructor
       * @memberof JoiSchema
       */
    constructor() {
        /**
             * @static
             * @type {string}
             * @memberof JoiSchema
             */
        this.messageObjectId = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
        this.Joi = Joi.extend({
            type: 'objectId',
            messages: {
                'objectId.base': this.messageObjectId,
            },
            validate(value, helpers) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return {
                        value,
                        errors: helpers.error('objectId.base'),
                    };
                }
                return {
                    value,
                };
            },
        });
    }
}
exports.default = Validation;
