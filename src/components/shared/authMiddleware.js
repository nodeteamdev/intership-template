const jwt = require('jsonwebtoken');
const AuthError = require('../../error/AuthError');

/**
 * @param {String} profile.token
 * @returns {payload}
 */
function checkToken(token) {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        throw new AuthError(error.message);
    }
}

/**
 * @param {express.Request} req
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
    req.user = checkToken(req.cookies.accessToken);
    next();
};

module.exports = {
    authMiddleware,
    checkToken,
};
