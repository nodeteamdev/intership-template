const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const config = require('../../config');
const AuthModel = require('./model');
const UserModel = require('../User/model');
const UserService = require('../User/service');
const AuthError = require('../../error/AuthError');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail,
        pass: config.gpass,
    },
});

/**
 * @exports
 * @function genTokens
 * @param payload - user credentials
 * @summary generates tokens
 * @returns {Promise<UserModel[]>}
 */
function genTokens(payload) {
    const data = {
        id: payload.id || payload._id,
        email: payload.email,
        role: payload.role,
    };

    return {
        accessToken: jwt.sign(data, process.env.SECRET, { expiresIn: `${config.accessAge}s` }),
        refreshToken: jwt.sign(data, process.env.SECRET, { expiresIn: `${config.refreshAge}s` }),
    };
}

/**
 * @exports
 * @function signUp
 * @param profile - user credentials
 * @summary get list of all users
 * @returns {Promise<UserModel[]>}
 */
function signUp(profile) {
    return UserService.create(profile);
}

/**
 * @exports
 * @function signUp
 * @param profile - user credentials
 * @summary get list of all users
 * @returns {Promise<UserModel[]>}
 */
function updateById(id, profile) {
    const hash = bcrypt.hashSync(profile.password, config.saltRounds);

    return UserService.updateById(id, {
        password: hash,
    });
}

/**
 * @exports
 * @function sendResetMail
 * @param profile - user credentials
 * @summary sending mail
 * @returns {Promise<string>}
 */
async function sendResetMail(profile) {
    const user = await UserModel.findOne(profile, { password: 0 }).lean();
    let html = '';
    let response = null;
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    // generate token and link
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: `${config.mailAge}s` });
    user.tokenLink = `http://${config.hostname}:${config.port}/v1/auth/resetPassword/${token}`;

    // render mail content
    ejs.renderFile(path.join(__dirname, '../../views/mail.ejs'), { user }, (err, str) => {
        if (err) throw err;
        html = str;
    });

    const mailOptions = {
        from: config.gmail,
        to: user.email,
        subject: 'Reset password',
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        }
        response = info.response;
    });

    return response;
}

/**
 * @exports
 * @function updateToken
 * @param profile.email - user email
 * @param profile.token - refresh token
 * @summary Save token
 * @returns {Promise<AuthModel>}
 */
function updateToken(profile) {
    return AuthModel.updateOne({ userId: profile.id }, profile).lean();
}

/**
 * @exports
 * @function compareTokens
 * @param email - user email
 * @param token - refresh token
 * @summary Compare tokens
 * @returns {Promise<Boolean>}
 */
async function compareTokens(userId, token) {
    const user = await AuthModel.findOne({ userId }).lean();

    return user.token === token;
}

/**
 * @exports
 * @function removeToken
 * @param token - refresh token
 * @summary Remove token
 * @returns {Promise<AuthModel>}
 */
function removeToken(token) {
    return AuthModel.deleteOne({ token }).lean();
}

/**
 * @exports
 * @function saveToken
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
            return AuthModel.updateOne({ userId: profile.id }, profile).lean();
        }
        throw err;
    }
}

/**
 * @exports
 * @function signIn
 * @param profile - user credentials
 * @summary Signing in process
 * @returns { accessToken, refreshToken }
 */
async function signIn(profile) {
    const user = await UserModel.findOne({ email: profile.email }).lean();
    const match = await bcrypt.compare(profile.password, user.password);
    if (!match) throw new AuthError(http.STATUS_CODES[401]);

    const tokens = {
        accessToken: jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.SECRET, { expiresIn: config.accessAge }),
        refreshToken: jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.SECRET, { expiresIn: config.refreshAge }),
    };

    await saveToken({
        userId: user._id,
        token: tokens.refreshToken,
    });

    return tokens;
}

module.exports = {
    signUp,
    signIn,
    genTokens,
    saveToken,
    updateToken,
    compareTokens,
    removeToken,
    sendResetMail,
    updateById,
};
