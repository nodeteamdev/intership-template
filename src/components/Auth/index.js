const jwt = require('jsonwebtoken');
const http = require('http');

const AuthService = require('./service');
const UserService = require('../User/service');
const AuthValidation = require('./validation');
const AuthUtils = require('./utils');
const ValidationError = require('../../error/ValidationError');

async function signUp(req, res, next) {
    try {
        const { error, value } = AuthValidation.signUp(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.create(value);
        return res.status(201).json({
            data: user,
        });
    } catch (error) {
        return next(error);
    }
}

async function signIn(req, res, next) {
    try {
        const { error, value } = AuthValidation.signIn(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findByEmail({ email: value.email });

        if (!user) {
            return res.status(401).json({
                message: http.STATUS_CODES[401],
            });
        }

        const validPassword = await AuthService.verifyUserByPassword(value.password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: http.STATUS_CODES[401],
            });
        }
        user.hash = AuthUtils.randomString(10);
        user.save();
        const tokens = await AuthService.generateSignInTokens(user);

        return res
            .cookie('access_token', `Bearer ${tokens.accessToken.token}`, { httpOnly: true, maxAge: 60 * 1000 })
            .cookie('refresh_token', tokens.refreshToken.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                tokens,
            });
    } catch (error) {
        return next(error);
    }
}

async function refresh(req, res, next) {
    const { validateError, value } = AuthValidation.refresh(req.body);
    if (validateError) {
        throw new ValidationError(validateError.details);
    } try {
        const cookie = req.cookies.refresh_token;
        const checkToken = AuthService.checkRefreshCookie(cookie);
        if (!checkToken) {
            return res.status(401).json({
                error: http.STATUS_CODES[401],
            });
        }
        const verify = await AuthService.verifyUserByRefresh(value.refreshToken);
        if (!verify) {
            return res.status(400).json({
                error: new jwt.JsonWebTokenError('Invalid token'),
            });
        }
        return res
            .cookie('access_token', `Bearer ${verify.accessToken.token}`, { httpOnly: true, maxAge: 60 * 1000 })
            .status(200)
            .json({
                token: verify.accessToken,
            });
    } catch (error) {
        return next(error);
    }
}

async function logout(req, res, next) {
    try {
        const cookieToken = req.cookies.refresh_token;
        await AuthService.removeRefreshTokenByValue(cookieToken);
        return res
            .clearCookie('access_token')
            .clearCookie('refresh_token')
            .status(200)
            .json({
                message: 'Logged out!',
            });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    signUp,
    signIn,
    logout,
    refresh,
};
