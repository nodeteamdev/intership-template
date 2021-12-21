const http = require('http');
const AuthService = require('./service');
const UserValidation = require('../User/validation');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const config = require('../../config');
const AuthError = require('../../error/AuthError');
const auth = require('../shared/authMiddleware');

/**
 * @function
 * @name signUp
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function signUp(req, res) {
    const { value, error } = UserValidation.create(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    await AuthService.signUp(value);

    return res.status(200).json({
        data: {
            status: 200,
        },
    });
}

/**
 * @function
 * @name sendResetPassword
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function sendResetPassword(req, res) {
    const { value, error } = AuthValidation.checkMail(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const response = await AuthService.sendResetMail(value);

    return res.status(200).json({
        data: {
            status: 200,
            response,
        },
    });
}

/**
 * @function
 * @name resetPasswordPage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function resetPasswordPage(req, res) {
    const user = auth.checkToken(req.params.token);

    user.tokenMail = req.params.token;

    return res.render('resetPassword', { user });
}

/**
 * @function
 * @name resetPassword
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
 */
async function resetPassword(req, res) {
    const user = auth.checkToken(req.params.token);
    const { value, error } = AuthValidation.signIn(req.body);

    if (error) {
        throw new ValidationError(error.details);
    } else if (user.email !== value.email) {
        throw new ValidationError('Invalid email');
    }

    const result = await AuthService.updateById(user.id, value);

    return res.status(200).json(result);
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
 * @returns {Promise < any >}
 */
async function refreshToken(req, res) {
    const { cookies } = req;
    const user = auth.checkToken(cookies.refreshToken);
    const compared = await AuthService.compareTokens(user.id, cookies.refreshToken);

    if (!compared) {
        throw new AuthError(http.STATUS_CODES[401]);
    }

    const newTokens = AuthService.genTokens(user);

    await AuthService.updateToken({
        userId: user.id,
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
 * @returns {Promise < any >}
 */
async function payload(req, res) {
    return res.status(200).json({
        data: req.user,
    });
}

/**
 * @function
 * @name logout
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < any >}
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
    sendResetPassword,
    resetPasswordPage,
    resetPassword,
};
