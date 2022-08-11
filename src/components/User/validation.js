"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var validation_1 = require("../validation");
/**
 * @exports
 * @class
 * @extends Validation
 */
var UserValidation = /** @class */ (function (_super) {
    __extends(UserValidation, _super);
    function UserValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * @param {String} data.email - objectEmail
       * @returns
       * @memberof UserValidation
       */
    UserValidation.prototype.findByEmail = function (data) {
        return this.Joi
            .object({
            // id: this.Joi.objectId(),
            email: this.Joi.string().email().required()
        })
            .validate(data);
    };
    /**
       * @param {String} profile.email
       * @param {String} profile.fullName
       * @returns
       * @memberof UserValidation
       */
    UserValidation.prototype.create = function (profile) {
        return this.Joi
            .object({
            email: this.Joi.string().email().required(),
            fullName: this.Joi
                .string()
                .min(1)
                .max(30)
                .required()
        })
            .validate(profile);
    };
    /**
       * @param {String} data.email - objectEmail
       * @param {String} data.fullName
       * @returns
       * @memberof UserValidation
       */
    UserValidation.prototype.updateByEmail = function (data) {
        return this.Joi
            .object({
            // id: this.Joi.objectId(),
            email: this.Joi.string().email().required(),
            fullName: this.Joi
                .string()
                .min(1)
                .max(30)
                .required()
        })
            .validate(data);
    };
    /**
       * @param {String} data.email - objectEmail
       * @returns
       * @memberof UserValidation
       */
    UserValidation.prototype.deleteByEmail = function (data) {
        return this.Joi
            .object({
            // id: this.Joi.objectId(),
            email: this.Joi.string().email().required()
        })
            .validate(data);
    };
    return UserValidation;
}(validation_1["default"]));
exports["default"] = new UserValidation();
