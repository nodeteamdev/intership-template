const UserToken = require('./token.model');
const User = require('../User/model');
const TokenService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

async function signUp(req, res, next) {
    try {
        const { error } = AuthValidation.validateUserData(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const savedUser = await User.create(req.body);
        return res.status(201).json({ message: 'Account created sucessfully', data: savedUser });
    } catch (error) {
        return next(error);
    }
}

async function logIn(req, res, next) {
    try {
        const { error } = AuthValidation.validateUserData(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const user = await User.findOne({ email: req.body.email, fullName: req.body.fullName });

        const accessToken = await TokenService.generateAccessToken(user.id);

        const refreshToken = await TokenService.generateRefreshToken(user.id);

        return res.status(200).json({
            message: 'Logged in sucessfully',
            data: { accessToken, refreshToken },
        });
    } catch (error) {
        return next(error);
    }
}

async function getTokens(req, res) {
    const { error } = AuthValidation.validateToken(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const { token } = req.body;
    const decoded = await TokenService.decodeRefreshToken(token);
    const accessToken = await TokenService.generateAccessToken(decoded.userId);
    const refreshToken = await TokenService.generateRefreshToken(decoded.userId);

    return res.status(200).json({
        message: 'Successfully completed',
        data: { accessToken, refreshToken },
    });
}

async function verifyAccessToken(req, res, next) {
    try {
        const [, token] = req.headers.authorization.split(' ');

        const decoded = await TokenService.decodeAccessToken(token);
        req.userData = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Your session is not valid.', data: error });
        next(error);
    }
}

async function verifyRefreshToken(req, res, next) {
    try {
        const { error } = AuthValidation.validateToken(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { token } = req.body;
        const decoded = await TokenService.decodeRefreshToken(token);
        const refreshToken = await UserToken.findOne({ userId: decoded.userId }).exec();
        if (refreshToken === undefined) return res.status(401).json({ message: 'Invalid request. Token not defined' });
        if (refreshToken.token !== token) return res.status(401).json({ message: 'Invalid request. Token not valid' });
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Your session is not valid.', data: error });
    }
}

async function logOut(req, res, next) {
    const { userId } = req.userData;

    try {
        const userToken = await UserToken.findOne({ userId });
        if (!userToken) {
            return res
                .status(200)
                .json({ message: 'Logged Out Sucessfully' });
        }

        await userToken.remove();
        return res.status(200).json({ message: 'Logged Out Sucessfully' });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    signUp,
    logIn,
    getTokens,
    verifyAccessToken,
    verifyRefreshToken,
    logOut,
};
