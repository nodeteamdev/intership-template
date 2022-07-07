const jwt = require('jsonwebtoken');
const { tokens } = require('../../config/token');

const isAuthorized = async (req, res, next) => {
    const token = req.cookies.access_token?.split(' ');
    if (!token) {
        return res.status(401).json({
            message: 'Token is not provided, unauthorized!',
        });
    }
    try {
        const data = jwt.verify(token[1], tokens.access.secret);
        req.user = {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        };
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = isAuthorized;
