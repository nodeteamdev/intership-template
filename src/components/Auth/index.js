const AuthError = require('../../error/AuthError');
const AuthService = require('./service');

async function registerUsingEmailAndPassword(req, res) {
    const authUser = await AuthService.createAuthUser(req.body);
    const accessToken = await AuthService.createAccessTokenForAuthUser(authUser);
    const refreshToken = await AuthService.createRefreshTokenForAuthUser(authUser);

    res.status(201).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function loginUsingEmailAndPassword(req, res) {
    const { email, password } = req.body;
    const authUser = await AuthService.getAuthUserByEmailPassword(email, password);
    if (authUser === null) {
        throw new AuthError();
    }
    const accessToken = await AuthService.createAccessTokenForAuthUser(authUser);
    const refreshToken = await AuthService.createRefreshTokenForAuthUser(authUser);

    res.status(200).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function getNewAccessAndRefreshToken(req, res) {
    const { id: authUserId, refreshToken: token } = req.body;
    const authUser = await AuthService.getAuthUserUsingRefreshToken(authUserId, token);
    if (authUser === null) {
        throw new AuthError();
    }
    const accessToken = await AuthService.createAccessTokenForAuthUser(authUser);
    const refreshToken = await AuthService.createRefreshTokenForAuthUser(authUser);

    res.status(200).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function removeRefreshToken(req, res) {
    const { id: authUserId, refreshToken: token } = req.body;
    const authUser = await AuthService.getAuthUserUsingRefreshToken(authUserId, token);
    if (authUser === null) {
        throw new AuthError();
    }

    res.status(200).json({
        data: authUser,
    });
}

async function removeAllRefreshTokens(req, res) {
    const { email, password } = req.body;
    const authUser = await AuthService.getAuthUserByEmailPassword(email, password);
    if (authUser === null) {
        throw new AuthError();
    }
    await AuthService.removeAllRefreshTokensForAuthUser(authUser);

    res.status(200).json({
        data: authUser,
    });
}

module.exports = {
    registerUsingEmailAndPassword,
    loginUsingEmailAndPassword,
    getNewAccessAndRefreshToken,
    removeRefreshToken,
    removeAllRefreshTokens,
};
