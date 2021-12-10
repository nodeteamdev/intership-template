const ValidationError = require('./ValidationError');
const AuthError = require('./AuthError');

const errorHandler = (fn) => (...args) => fn(...args).catch(args[2]);

const errorsMiddleware = (err, req, res, next) => {
    switch (err) {
    case ValidationError:
        res.status(422).json({
            message: err.name,
            details: err.message,
        });
        return;
    case AuthError:
        res.status(err.statusCode).json({
            message: err.name,
            details: err.message,
        });
        return;
    default:
        console.error(err);
        res.status(500).json({
            message: err.name,
            details: err.message,
        });
    }
    next();
};

module.exports = { errorHandler, errorsMiddleware };
