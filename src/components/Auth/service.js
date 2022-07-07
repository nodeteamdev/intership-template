const jwt = require('jsonwebtoken');

const uuid = require('uuid');
const bcrypt = require('bcrypt');

const TokenModel = require('./model');
const UserService = require('../User/service');

const { tokens } = require('../../config/token');

function createToken(userId, value) {
    return TokenModel.create({ userId, value });
}

function findToken(token) {
    return TokenModel.findOne(token).exec();
}

function findTokenById(userId) {
    return TokenModel.findOne({ userId });
}

function removeRefreshTokenByUserId(userId) {
    return TokenModel.findOneAndRemove({ userId });
}

function removeRefreshTokenByValue(token) {
    return TokenModel.findOneAndRemove({ token });
}

function generateAccessToken(user) {
    const payload = {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
    };
    return {
        token: jwt.sign(
            payload,
            tokens.access.secret,
            { expiresIn: tokens.access.expiresIn },
        ),
    };
}
function generateRefreshToken(user) {
    const payload = {
        id: uuid.v4(),
        type: tokens.refresh.type,
        hash: user.hash,
    };
    return {
        id: payload.id,
        token: jwt.sign(
            payload,
            tokens.refresh.secret,
            { expiresIn: tokens.refresh.expiresIn },
        ),
    };
}

function checkRefreshCookie(token) {
    if (!token) {
        return false;
    }
    return true;
}

async function updateOrSaveToken(userId, token) {
    const findRefresh = findTokenById(userId);

    if (!findRefresh) {
        return createToken(userId, token);
    }
    await removeRefreshTokenByUserId(userId);
    return createToken(userId, token);
}
async function generateSignInTokens(user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await updateOrSaveToken(user.id, refreshToken.token);

    return { accessToken, refreshToken };
}

async function verifyUserByPassword(reqPassword, userPassword) {
    const validPassword = await bcrypt.compare(reqPassword, userPassword);
    return validPassword;
}

async function verifyUserByRefresh(refreshToken) {
    return jwt.verify(refreshToken, tokens.refresh.secret, async (error, data) => {
        if (error) {
            return false;
        }
        const user = await UserService.findByHash(data.hash);
        const accessToken = generateAccessToken(user);
        return { user, accessToken };
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    updateOrSaveToken,
    generateSignInTokens,
    verifyUserByRefresh,
    verifyUserByPassword,
    checkRefreshCookie,
    createToken,
    findToken,
    findTokenById,
    removeRefreshTokenByUserId,
    removeRefreshTokenByValue,
};
