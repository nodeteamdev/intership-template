const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { SECRET, TOKENS } = require('./constants').JWTS;

const Token = require('./token.model');

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: TOKENS.access.type,
    };
    const options = { expiresIn: TOKENS.access.expiresIn };

    return jwt.sign(payload, SECRET, options);
};

const generateRefreshToken = () => {
    const payload = {
        id: uuidv4(),
        type: TOKENS.refresh.type,
    };
    const options = { expiresIn: TOKENS.refresh.expiresIn };

    return {
        id: payload.id,
        token: jwt.sign(payload, SECRET, options),
    };
};

async function replaceDbRefreshToken(tokenId, userId) {
    await Token.findOneAndRemove({ userId }).exec();
    return Token.create({ tokenId, userId });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
};
