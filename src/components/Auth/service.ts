import * as jwtFacade from './jwt.facade';
import AuthUserModel, { AuthUser } from './models/auth_users';
import RefreshTokenModel, { RefreshToken } from './models/refresh_tokens';
import { getPasswordHash, isPasswordCorrect } from './password.helper';

async function getAuthUserById(authUserId: string) {
    return AuthUserModel.findById(authUserId).exec();
}

async function createAuthUser(data: AuthUser & {password: string}) {
    const passwordHash = await getPasswordHash(data.password);
    return AuthUserModel.create({
        ...data,
        passwordHash,
    });
}

async function getAuthUserByEmailPassword(
    email: string,
    password: string,
) {
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

async function createAccessTokenForAuthUser(authUserId: string) {
    return jwtFacade.getAuthJWT(authUserId);
}

async function createRefreshTokenForAuthUser(authUserId: string) {
    const token = await jwtFacade.getAuthRefreshJWT(authUserId);

    const refreshTokenData = {
        authUserId,
        token,
    };
    await RefreshTokenModel.create(refreshTokenData);

    return token;
}

async function getAuthUserUsingRefreshToken(
    authUserId: string,
    token: string,
) {
    const payload = await jwtFacade.getPayloadFromJWT(token);

    if (
        payload === null
        || payload.authUserId !== authUserId
        || payload.tokenType !== jwtFacade.TokenType.refresh
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

async function removeAllRefreshTokensForAuthUser(authUserId: string): Promise<void> {
    RefreshTokenModel.deleteMany({
        authUserId,
    }).exec();
}

export {
    createAuthUser,
    getAuthUserById,
    getAuthUserByEmailPassword,
    createAccessTokenForAuthUser,
    createRefreshTokenForAuthUser,
    getAuthUserUsingRefreshToken,
    removeAllRefreshTokensForAuthUser,
};
