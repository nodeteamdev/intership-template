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
/**
 * @exports
 * @extends Error
 */
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    /**
       * @constructor
       * @param {object} message
       */
    function ValidationError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'E_MISSING_OR_INVALID_PARAMS';
        return _this;
    }
    return ValidationError;
}(Error));
exports["default"] = ValidationError;
