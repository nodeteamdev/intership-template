const http = require('http');
const AuthService = require('./service');
const UserService = require('../User/service');
const UserValidation = require('../User/validation');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const config = require('../../config');
const AuthError = require('../../error/AuthError');

/**
 * @function
 * @name signUp
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signUp(req, res) {
    const { value, error } = UserValidation.create(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    await UserService.create(value);

    return res.status(200).json({
        data: {
            status: 200,
        },
    });
}

/**
 * @function
 * @name signIn
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signIn(req, res) {
    const { value, error } = AuthValidation.signIn(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const tokens = await AuthService.signIn(value);

    await AuthService.saveToken({
        userId: value.email,
        token: tokens.refreshToken,
    });

    res.cookie('accessToken', tokens.accessToken, { maxAge: config.accessAge });
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: config.refreshAge });

    return res.status(200).json({
        data: tokens,
    });
}

/**
 * @function
 * @name rereshToken
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function refreshToken(req, res) {
    const { user, cookies } = req;
    const compared = await AuthService.compareTokens(user.email, cookies.refreshToken);

    if (!compared) {
        throw new AuthError(http.STATUS_CODES[401]);
    }

    const newTokens = AuthService.genTokens(user);

    await AuthService.updateToken({
        user: user.email,
        token: newTokens.refreshToken,
    });

    res.cookie('accessToken', newTokens.accessToken, { maxAge: config.accessAge });
    res.cookie('refreshToken', newTokens.refreshToken, { maxAge: config.refreshAge });

    return res.status(200).json({
        data: newTokens,
    });
}

/**
 * @function
 * @name payload
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function payload(req, res) {
    const { user } = req.user;

    return res.status(200).json({
        data: user,
    });
}

/**
 * @function
 * @name logout
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function logout(req, res) {
    await AuthService.removeToken(req.cookies.refreshToken);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200).json({
        data: {
            status: 200,
        },
    });
}

module.exports = {
    signUp,
    signIn,
    payload,
    logout,
    refreshToken,
};
