const jwt = require('jsonwebtoken');

const configAccess = process.env.ACCESS_KEY;

const verifyToken = (req, res, next) => {
    const token = req.get('x-access-token');

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, configAccess);

        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

module.exports = {
    verifyToken,
};
