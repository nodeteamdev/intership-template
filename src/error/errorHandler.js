function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { message: err.message });
}

module.exports = errorHandler;
