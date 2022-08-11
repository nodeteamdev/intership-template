const SUPPORTED_CONTENT_TYPES = ['application/x-www-form-urlencoded', 'application/json'];

module.exports = (req, _res, next) => {
    const contentType = req.headers['content-type'];
    if (contentType !== undefined && SUPPORTED_CONTENT_TYPES.indexOf(contentType) === -1) {
        next(new Error('Unsupported Content-Type'));
    }
    next();
};
