const jwt = require('jsonwebtoken');

const ValidationError = require('./ValidationError');

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).json({ error: 'Something failed!' });
    } else {
        next(err);
    }
}
function errorHandler(error, req, res) {
    if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({
            name: error.name,
            message: error.message,
        });
    }
    if (error instanceof jwt.TokenExpiredError) {
        return res.status(400).json({
            name: error.name,
            message: error.message,
        });
    }
    if (error instanceof ValidationError) {
        return res.status(403).json({
            name: error.name,
            message: error.message,
        });
    }
    return res.status(500).json({
        error: error.message,
        details: null,
    });
}
module.exports = {
    logErrors, clientErrorHandler, errorHandler,
};
