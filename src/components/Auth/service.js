const bCrypt = require('bcrypt');

const authHelper = require('./auth.helper');
const Auth = require('./auth.model');

async function updateTokens(userId) {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken(userId);

    await authHelper.replaceDbRefreshToken(refreshToken.id, userId);
    return ({accessToken, refreshToken: refreshToken.token});
}

async function createNewUser(email, password) {
    const hashedPassword = bCrypt.hashSync(password, 10);
    return Auth.create({
        email, 
        hashedPassword,
    });
}

async function findUserByEmail(email) {
    return Auth.findOne({ email }).exec();
}


module.exports = {
    updateTokens,
    createNewUser,
    findUserByEmail,
}