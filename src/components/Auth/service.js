const http = require('http');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const AuthModel = require('./model');
const UserModel = require('../User/model');
const UserService = require('../User/service');
const AuthError = require('../../error/AuthError');
require('dotenv').config();

/**
 * @exports
 * @method signUp
 * @param profile - user credentials
 * @summary get list of all users
 * @returns {Promise<UserModel[]>}
 */
function signUp(profile) {
    return UserService.create(profile);
}

/**
 * @exports
 * @method signIn
 * @param profile - user credentials
 * @summary Signing in process
 * @returns { accessToken, refreshToken }
 */
async function signIn(profile) {
    const user = await UserModel.findOne({ email: profile.email }).exec();
    const match = await bcrypt.compare(profile.password, user.password);
    if (match) {
        return {
            accessToken: jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role,
            }, process.env.SECRET, { expiresIn: config.accessAge }),
            refreshToken: jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role,
            }, process.env.SECRET, { expiresIn: config.refreshAge }),
        };
    }
    throw new AuthError(http.STATUS_CODES[401]);
}

function genTokens(payload) {
    const data = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
    };
    return {
        accessToken: jwt.sign(data, process.env.SECRET, { expiresIn: config.accessAge }),
        refreshToken: jwt.sign(data, process.env.SECRET, { expiresIn: config.refreshAge }),
    };
}

/**
 * @exports
 * @method saveToken
 * @param profile.email - user email
 * @param profile.token - refresh token
 * @summary Save token
 * @returns {Promise<AuthModel>}
 */
async function saveToken(profile) {
    try {
        const tokens = await AuthModel.create(profile);
        return tokens;
    } catch (err) {
        if (err.code === 11000) {
            return AuthModel.updateOne({ email: profile.email }, profile).exec();
        }
        throw err;
    }
}

/**
 * @exports
 * @method updateToken
 * @param profile.email - user email
 * @param profile.token - refresh token
 * @summary Save token
 * @returns {Promise<AuthModel>}
 */
function updateToken(profile) {
    return AuthModel.updateOne({ email: profile.email }, profile).exec();
}

/**
 * @exports
 * @method compareTokens
 * @param email - user email
 * @param token - refresh token
 * @summary Compare tokens
 * @returns {Promise<Boolean>}
 */
async function compareTokens(email, token) {
    const user = await AuthModel.findOne({ email }).exec();
    return user.token === token;
}

/**
 * @exports
 * @method removeToken
 * @param token - refresh token
 * @summary Remove token
 * @returns {Promise<AuthModel>}
 */
function removeToken(token) {
    return AuthModel.deleteOne({ token }).exec();
}

module.exports = {
    signUp,
    signIn,
    genTokens,
    saveToken,
    updateToken,
    compareTokens,
    removeToken,
};
