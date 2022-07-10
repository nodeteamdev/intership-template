function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ message: err.message });
    } else {
        next(err);
    }
}

module.exports = clientErrorHandler;
