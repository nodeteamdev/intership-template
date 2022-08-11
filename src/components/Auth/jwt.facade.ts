const { createSecretKey } = require('crypto');
const jose = require('jose');

const tokenTypes = {
    access: 'access',
    refresh: 'refresh',
};

const alg = 'HS256';
const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');

function getPayloadFromAuthUser(authUser, tokenType) {
    return {
        authUserId: authUser.id,
        tokenType,
    };
}

async function getJWT(payload, expiresIn = '') {
    return new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretKey);
}

async function getAuthJWT(authUser) {
    return getJWT(
        getPayloadFromAuthUser(authUser, tokenTypes.access),
        process.env.JWT_AUTH_TOKEN_EXPIRES_IN,
    );
}

async function getAuthRefreshJWT(authUser) {
    return getJWT(
        getPayloadFromAuthUser(authUser, tokenTypes.refresh),
        process.env.JWT_AUTH_REFRESH_TOKEN_EXPIRES_IN,
    );
}

async function getPayloadFromJWT(jwt) {
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secretKey);
        if (protectedHeader.alg !== alg) {
            // NOTE: is this useful?
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}

module.exports = {
    tokenTypes,
    getAuthJWT,
    getAuthRefreshJWT,
    getPayloadFromJWT,
};
