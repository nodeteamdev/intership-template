module.exports.verifyToken = function (req, res, next) {
    const bearerHeader = req.get('authorization');
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        res.sendStatus(403).json('Forbidden without token');
    }
};
