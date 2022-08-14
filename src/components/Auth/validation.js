"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("../validation"));
/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends validation_1.default {
    /**
       * @param {String} profile.email
       * @param {String} profile.fullName
       * @returns
       * @memberof AuthValidation
       */
    validateUserData(profile) {
        return this.Joi
            .object({
            email: this.Joi.string().email().required(),
            fullName: this.Joi
                .string()
                .min(1)
                .max(30)
                .required(),
        })
            .validate(profile);
    }
    /**
       * @param {String} data.email - objectEmail
       * @returns
       * @memberof UserValidation
       */
    validateToken(data) {
        return this.Joi
            .object({
            token: [
                this.Joi.string(),
                this.Joi.number(),
            ],
        })
            .validate(data);
    }
}
exports.default = new AuthValidation();
