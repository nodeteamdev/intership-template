import { createSecretKey } from 'crypto';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import logger from '../../helpers/logger';

enum TokenType {
    access = 'access',
    refresh = 'refresh',
}

if (process.env.JWT_SECRET === undefined) {
    logger('process.env.JWT_SECRET is not specified', 'jwt.facade', 'error');
    process.exit(1);
}

const alg = 'HS256';
const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');

type PayloadAuth = {
    authUserId: string,
    tokenType: TokenType,
};

function getPayloadFromAuthUser(authUserId: string, tokenType: TokenType): PayloadAuth {
    return {
        authUserId,
        tokenType,
    };
}

async function getJWT(payload: PayloadAuth & JWTPayload, expiresIn = '') {
    return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretKey);
}

async function getAuthJWT(authUserId: string) {
    return getJWT(
        getPayloadFromAuthUser(authUserId, TokenType.access),
        process.env.JWT_AUTH_TOKEN_EXPIRES_IN,
    );
}

async function getAuthRefreshJWT(authUserId: string) {
    return getJWT(
        getPayloadFromAuthUser(authUserId, TokenType.refresh),
        process.env.JWT_AUTH_REFRESH_TOKEN_EXPIRES_IN,
    );
}

async function getPayloadFromJWT(jwt: string): Promise<PayloadAuth | null> {
    try {
        const { payload } = await jwtVerify(jwt, secretKey);
        return payload as PayloadAuth;
    } catch {
        return null;
    }
}

export {
    TokenType,
    getAuthJWT,
    getAuthRefreshJWT,
    getPayloadFromJWT,
};
