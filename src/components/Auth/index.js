const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const AuthService = require('./service');
const AuthHelper = require('./helper');
const UserService = require('../User/service');
const AuthValidation = require('./validation');
const AuthUtils = require('./utils');
const ValidationError = require('../../error/ValidationError');
const { tokens } = require('../../config/token');

async function signUp(req, res, next) {
    try {
        const { error, value } = AuthValidation.signUp(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await UserService.create({ ...value, password: hashedPassword });
        return res.status(201).json({
            data: user,
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

async function signIn(req, res, next) {
    try {
        const { error } = AuthValidation.signIn(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { email, password } = req.body;

        const user = await UserService.findByEmail({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized!',
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: 'Unauthorized!',
            });
        }
        user.hash = AuthUtils.randomString(10);
        user.save();
        const accessToken = AuthHelper.generateAccessToken(user);
        const refreshToken = AuthHelper.generateRefreshToken(user);

        AuthHelper.updateOrSaveToken(user.id, refreshToken.token);

        return res
            .cookie('access_token', `Bearer ${accessToken}`, { httpOnly: true, maxAge: 60 * 1000 })
            .cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                accessToken,
                refreshToken,
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

async function refresh(req, res, next) {
    const { refreshToken } = req.body;
    await jwt.verify(refreshToken, tokens.refresh.secret, async (error, data) => {
        try {
            const user = await UserService.findByHash(data.hash);
            if (data.hash === user.hash) {
                const accessToken = AuthHelper.generateAccessToken(user);
                return res
                    .cookie('access_token', `Bearer ${accessToken.accessToken}`, { httpOnly: true, maxAge: 60 * 1000 })
                    .status(200)
                    .json({
                        accessToken,
                    });
            }
            return res.status(403).json({
                name: error.name,
                message: error.message,
            });
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(403).json({
                    name: err.name,
                    inner: err.inner,
                    message: err.message,
                });
            }
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(403).json({
                    name: err.name,
                    message: err.message,
                });
            }

            return next(err);
        }
    });
}

async function logout(req, res, next) {
    try {
        return res
            .clearCookie('access_token')
            .clearCookie('refresh_token')
            .status(200)
            .json({
                message: 'Logged out!',
            });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        return next(error);
    }
}

module.exports = {
    signUp,
    signIn,
    logout,
    refresh,
};
