const jwt = require('jsonwebtoken');
const TokenModel = require('./model');
const { TOKENS } = require('../../config/dotenvConstants');

function generateTokens(user) {
    const payload = {
        userId: user.id,
        nickName: user.nickName,
    };

    return {
        accessToken: jwt.sign(payload, TOKENS.access.secret, { expiresIn: TOKENS.access.expiresIn }),
        refreshToken: jwt.sign(payload, TOKENS.refresh.secret, { expiresIn: TOKENS.refresh.expiresIn }),
    };
};

async function findUserData(userId) {
    return TokenModel.findOne({ userId });  // why const { refreshToken } = undefined ?
}

function searchToken(refreshToken) {
    return TokenModel.findOne({ refreshToken }).lean();
}

function createRefreshToken(userId, refreshToken) {
    return TokenModel.create({userId, refreshToken});
}

function removeRefreshToken(userId) {
    return TokenModel.findOneAndRemove({ userId });
}

async function updateOrSaveToken(id, Token) {
    const refreshToken = await findRefreshToken(id);
    if(!refreshToken) {
        return createRefreshToken(id, Token);
    }
    await removeRefreshToken(id);

    return createRefreshToken(id, Token);
}

module.exports = {
    generateTokens,
    createRefreshToken,
    findUserData,
    removeRefreshToken,
    updateOrSaveToken,
}
