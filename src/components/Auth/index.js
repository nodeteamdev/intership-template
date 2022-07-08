const AuthSevice = require('./service');
const UsersService = require('../User/service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const AuthError = require('../../error/UnauthorizedError');
const NotFoundError = require('../../error/NotFoundError');
const ConflictError = require('../../error/ConflictError');

async function signUp(req, res) {
    const { error, value } = AuthValidation.signUp(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const userExistens = await UsersService.findByEmail(value.email);
    if (userExistens) throw new ConflictError('such user already exists');
    const user = await UsersService.create(value);

    return res.status(201).json({
        data: user,
    });
}

async function login(req, res) {
    const { error, value } = AuthValidation.login(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const { email, password } = value;
    const user = await UsersService.findByEmail(email);

    if (!user) throw new NotFoundError('user not found');
    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
        throw new AuthError('Invalid login or password');
    }
    const { _id } = user;
    const { accessToken, refreshToken } = AuthSevice.parseTokens(_id);

    await UsersService.updateById(_id, { $set: { refreshToken } });

    return res.status(200).json({
        data: {
            user: {
                _id,
                email,
            },
            accessToken,
            refreshToken,
        },
    });
}

async function refreshTokens(req, res) {
    const oldToken = req.body.refreshToken;
    const { _id } = AuthSevice.verifyRefresh(oldToken);

    const user = await UsersService.findById(_id, { email: 1, refreshToken: 1 });

    if (!user) throw new NotFoundError('user not found');
    if (user?.refreshToken === oldToken) {
        const { accessToken, refreshToken } = AuthSevice.parseTokens(_id);
        await UsersService.updateById(_id, { $set: { refreshToken } });

        return res.status(200).json({
            data: {
                user: {
                    _id,
                    email: user.email,
                },
                accessToken,
                refreshToken,
            },
        });
    }
    return null;
}

async function logout(req, res) {
    const { _id } = req.user;
    const user = await UsersService.findById(_id, { refreshToken: 1 });
    if (!user) throw new NotFoundError('user not found');
    if (user?.refreshToken) {
        await UsersService.updateById(_id, { $set: { refreshToken: null } });
    }

    return res.status(204).json({ data: { message: 'logout' } });
}

module.exports = {
    signUp,
    login,
    refreshTokens,
    logout,
};
