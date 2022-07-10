const ValidationError = require('./ValidationError');

function logErrors(err, req, res, next) {
    console.error('logErrors', err.toString());
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    console.error('clientError', err.toString());

    if (err instanceof ValidationError) {
        res.status(422).json({
            error: err.name,
            details: err.message,
        });
    } else {
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

module.exports = {
    clientErrorHandler,
    logErrors,
    errorHandler,
};
