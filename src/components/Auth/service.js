const jwtFacade = require('./jwt.facade');
const AuthUserModel = require('./models/auth_users');
const RefreshTokenModel = require('./models/refresh_tokens');
const { getPasswordHash, isPasswordCorrect } = require('./password.helper');

async function getAuthUserById(authUserId) {
    return AuthUserModel.findById(authUserId).exec();
}

async function createAuthUser(data) {
    const passwordHash = await getPasswordHash(data.password);
    return AuthUserModel.create({
        ...data,
        passwordHash,
    });
}

async function getAuthUserByEmailPassword(email, password) {
    const authUser = await AuthUserModel.findOne({ email }).select('+passwordHash').exec();
    if (
        authUser === null
        || await isPasswordCorrect(password, authUser.passwordHash) === false
    ) {
        // IDEA: throw AuthUserInvalidPasswordError
        return null;
    }
    return authUser;
}

async function createAccessTokenForAuthUser(authUser) {
    return jwtFacade.getAuthJWT(authUser);
}

async function createRefreshTokenForAuthUser(authUser) {
    const token = await jwtFacade.getAuthRefreshJWT(authUser);

    const refreshTokenData = {
        authUserId: authUser.id,
        token,
    };
    await RefreshTokenModel.create(refreshTokenData);

    return token;
}

async function getAuthUserUsingRefreshToken(authUserId, token) {
    const payload = await jwtFacade.getPayloadFromJWT(token);

    if (
        payload === null
        || payload.authUserId !== authUserId
        || payload.tokenType !== jwtFacade.tokenTypes.refresh
    ) {
        return null;
    }

    // NOTE: refresh token is deleted here in this implementation
    const refreshToken = await RefreshTokenModel.findOneAndDelete({
        authUserId,
        token,
    }).exec();

    if (refreshToken === null) {
        return null;
    }

    return AuthUserModel.findById(refreshToken.authUserId).exec();
}

async function removeAllRefreshTokensForAuthUser(authUser) {
    return RefreshTokenModel.deleteMany({
        authUserId: authUser.id,
    }).exec();
}

module.exports = {
    createAuthUser,
    getAuthUserById,
    getAuthUserByEmailPassword,
    createAccessTokenForAuthUser,
    createRefreshTokenForAuthUser,
    getAuthUserUsingRefreshToken,
    removeAllRefreshTokensForAuthUser,
};
