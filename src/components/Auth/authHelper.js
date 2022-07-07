const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Token = require('./token');

const jsonwebtokens = {
    secret : 'secret key access token jwt',
    tokens: {
        access: {
            type: 'access',
            expiresIn: '2m',
        },
        refresh: {
            type: 'refresh',
            expiresIn: '5m',
        },
    },
}

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: jsonwebtokens.tokens.access.type,
    };
    const options = { expiresIn: jsonwebtokens.tokens.access.expiresIn };

    return jwt.sign( payload, jsonwebtokens.secret, options);
}

const generateRefreshToken = () => {
    const payload = {
        id: uuidv4(),
        type: jsonwebtokens.tokens.refresh.type,
    };
    const options = { expiresIn: jsonwebtokens.tokens.refresh.expiresIn };
    console.log(`Payload: ${payload.id}`);

    return {
        id: payload.id,
        token: jwt.sign(payload, jsonwebtokens.secret, options),
    };
};

const replaceDbRefreshToken = (tokenId, userId) => 
    Token.findOneAndRemove({ userId })
        .exec()
        .then(() => Token.create({ tokenId, userId }));

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
};