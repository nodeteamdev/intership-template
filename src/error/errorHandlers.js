"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("./ValidationError"));
function logErrors(err, req, res, next) {
    console.error('logErrors', err.toString());
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    console.error('clientError', err.toString());
    if (err instanceof ValidationError_1.default) {
        res.status(422).json({
            error: err.name,
            details: err.message,
        });
    }
    else {
        next(err);
    }
}
function errorHandler(err, req, res) {
    console.error('lastErrors', err.toString());
    res.status(500).json({
        message: err.name,
        details: err.message,
    });
}
exports.default = {
    clientErrorHandler,
    logErrors,
    errorHandler,
};
