const jwt = require('jsonwebtoken');
const Joi = require('joi');
const AuthService = require('./service');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function register(req, res, next) {
    try {
        const data = await AuthService.register(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
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
        const schema = Joi.object({
            email: Joi.string().email().required(),
            fulName: Joi.string().required(),
            password: Joi.string().required(),
            _id: Joi.string().required(),

        });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const data = await AuthService.login(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
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
async function refreshToken(req, res, next) {
    const { refreshToken: token } = req.body;

    if (token) {
        try {
            const { userId } = jwt.verify(token, process.env.REFRESH_KEY);
            const tokens = await AuthService.refreshToken(userId);
            res.status(200).send(tokens);
            return;
        } catch (error) {
            res.status(400).send('Invalid Token');
            next(error);
            return;
        }
    }
    res.status(400).send('A refresh token is required');
}

module.exports = {
    register,
    login,
    refreshToken,
};
