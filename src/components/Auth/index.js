const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const ValidationError = require('../../error/ValidationError');
const AuthValidation = require('./validation');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function register(req, res, next) {
    try {
        const { error } = AuthValidation.register(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const data = await AuthService.register(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function login(req, res, next) {
    try {
        const { error } = AuthValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const data = await AuthService.login(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function refresh(req, res, next) {
    try {
        const { error } = AuthValidation.refreshToken(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const { refreshToken } = req.body;
        const { userId } = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        const tokens = await AuthService.generateTokens(userId);

        return res.status(200).send(tokens);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

module.exports = {
    register,
    login,
    refresh,
};
