const jwt = require('jsonwebtoken');
const UserToken = require('./token.model');

const accessKey = 'ACCESS_TOKEN_PRIVATE_KEY';
const refreshKey = 'REFRESH_TOKEN_PRIVATE_KEY';

async function generateAccessToken(userId) {
    const payload = { userId };
    const accessToken = jwt.sign(
        payload,
        accessKey,
        { expiresIn: '5m' },
    );
    return accessToken;
}

async function generateRefreshToken(userId) {
    const payload = { userId };
    const refreshToken = jwt.sign(
        payload,
        refreshKey,
        { expiresIn: '1h' },
    );
    const oldRefreshToken = await UserToken.findOne({ userId }).exec();
    if (oldRefreshToken === null) {
        await UserToken.create({ userId, refreshToken });
    } else {
        await UserToken.updateOne({ userId }, { token: refreshToken }).exec();
    }
    return refreshToken;
}

async function decodeAccessToken(token) {
    const decoded = await jwt.verify(token, accessKey);
    return decoded;
}

async function decodeRefreshToken(token) {
    const decoded = await jwt.verify(token, refreshKey);
    // const [userId] = decoded;
    return decoded;
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    decodeAccessToken,
    decodeRefreshToken,
};
