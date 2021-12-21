const errorHandler = (fn) => (...args) => fn(...args).catch(args[2]);

const errorsMiddleware = (err, req, res, next) => {
    switch (err.name) {
        case 'E_MISSING_OR_INVALID_PARAMS':
            res.status(422).json({
                message: err.name,
                details: err.message,
            });
            break;
        case 'E_AUTHENTICATION_FAILED':
            res.status(err.statusCode).json({
                message: err.name,
                details: err.message,
            });
            break;
        default:
            if (err.code === 11000) {
                res.status(422).json({
                    message: err.code,
                    details: 'Cannot create duplicate of data',
                });
                break;
            }
            console.error(err);
            res.status(500).json({
                message: err.name,
                details: err.message,
            });
            break;
    }
    next();
};

module.exports = { errorHandler, errorsMiddleware };
