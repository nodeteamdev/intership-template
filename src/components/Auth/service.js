const TokenModel = require('./model');

function createToken(userId, tokenId) {
    return TokenModel.create({ userId, tokenId });
}

function findToken(token) {
    return TokenModel.findOne(token).exec();
}

function findTokenById(userId) {
    return TokenModel.findOne({ userId });
}

function removeRefreshToken(userId) {
    return TokenModel.findOneAndRemove({ userId });
}

module.exports = {
    createToken,
    findToken,
    findTokenById,
    removeRefreshToken,
};
