const ValidationError = require('./ValidationError');

function logErrors(err, req, res, next) {
    console.error('logErrors Wow Yay!', err.toString());
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    console.error('clientErrors ', err.toString());
    res.send(500, { error: err.toString() });
    if (req.xhr) {
        console.error(err);
        res.send(500, { error: err.toString() });
    } else if (err instanceof ValidationError) {
        res.status(422).json({
            error: err.name,
            details: err.message,
        });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res) {
    console.error('lastErrors ', err.toString());
    res.send(500, { error: err.toString() });
}

module.exports = {
    clientErrorHandler,
    logErrors,
    errorHandler,
};
