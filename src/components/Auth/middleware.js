const jwt = require('jsonwebtoken');
const { tokens } = require('../../config/token');

const isAuthorized = async function isAuth(req, res, next) {
    const token = req.cookies.access_token;
    let verifiedToken;
    if (token) {
        [, verifiedToken] = token.split(' ');
    }
    if (!token) {
        return res.status(401).json({
            message: 'Token is not provided, unauthorized!',
        });
    }
    try {
        const data = jwt.verify(verifiedToken, tokens.access.secret);
        req.user = {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        };
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                name: error.name,
                inner: error.inner,
                message: error.message,
            });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                name: error.name,
                message: error.message,
            });
        }
        return next(error);
    }
};

module.exports = isAuthorized;
