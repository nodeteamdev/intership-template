const { Error } = require('mongoose');
const ValidationError = require('../error/ValidationError');
const AuthError = require('../error/UnauthorizedError');
const NotFoundError = require('../error/NotFoundError');
const ConflictError = require('../error/ConflictError');

module.exports = function withCatch(route) {
    return async function intersept(req, res, next) {
        try {
            await route(req, res, next);
            return null;
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(422).json({
                    message: error.name,
                    details: error.message,
                });
            }

            if (error instanceof AuthError) {
                return res.status(401).json({
                    message: error.name,
                    details: error.message,
                });
            }

            if (error instanceof ConflictError) {
                return res.status(409).json({
                    message: error.name,
                    details: error.message,
                });
            }

            if (error instanceof NotFoundError) {
                return res.status(404).json({
                    message: error.name,
                    details: error.message,
                });
            }
            console.error('error:', error);
            if (error instanceof Error.CastError) return res.status(404).send(error);
            res.status(500).send(error);
            return next(error);
        }
    };
};
