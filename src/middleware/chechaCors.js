module.exports = (_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,'
        + ' Content-Type, Accept,'
        + ' Authorization,'
        + ' Access-Control-Allow-Credentials',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
