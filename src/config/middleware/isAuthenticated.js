const { verifyAcces } = require('../../components/Auth/service');
const UserService = require('../../components/User/service');
const UnauthorizedError = require('../../error/UnauthorizedError');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
module.exports = async function isAuthenticated(req, res, next) {
    const BearerToken = req.headers.authorization;
    if (BearerToken) {
        try {
            const [, token] = BearerToken.split(' ');
            const { _id } = verifyAcces(token);
            const {
                email,
                refreshToken,
            } = await UserService.findById(_id);
            if (!refreshToken) throw new UnauthorizedError('Not authorized');

            req.user = {
                _id, email,
            };
            return next();
        } catch (error) {
            const jwtError = new UnauthorizedError(error.message);
            res.status(jwtError.code).json({
                message: jwtError.name,
                details: jwtError.message,
            });
        }
    }
    const error = new UnauthorizedError('Not authorized');
    return res.status(error.code).json({
        message: error.name,
        details: error.message,
    });
};
