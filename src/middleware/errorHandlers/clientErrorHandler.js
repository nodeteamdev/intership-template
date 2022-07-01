const ValidationError = require('../../error/ValidationError');

module.exports = (error, _req, res, next) => {
    console.log(error instanceof ValidationError);
    if (error instanceof ValidationError) {
        // 422 Validation response
        res.status(422).json({
            message: error.name,
            details: error.message,
        });
    } else if (process.env.DEBUG === true) {
        // unhandled client error response with DEBUG flag
        res.status(500).json({
            message: error.name,
            details: error.message,
        });
    } else {
        // unhandled client error response without DEBUG flag
        res.status(500).json({
            message: 'Internal Server Error',
            details: 'Oops, something\'s broken... Please leave us short feedback so we can fix it faster.',
        });
    }

    // pass to the next error middleware
    next(error);
};
