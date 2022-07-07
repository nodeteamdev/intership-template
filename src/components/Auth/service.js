const jwt = require('jsonwebtoken');
const {
    SECRET_ACCES_TOKEN,
    SECRET_REFRESH_TOKEN,
    ACCES_EXPAIR_TIME,
    REFRESH_EXPAIR_TIME,
} = require('./constants');

function parseTokens(_id) {
    const accessToken = jwt.sign({ _id }, SECRET_ACCES_TOKEN, {
        expiresIn: ACCES_EXPAIR_TIME,
    });
    const refreshToken = jwt.sign({ _id }, SECRET_REFRESH_TOKEN, {
        expiresIn: REFRESH_EXPAIR_TIME,
    });

    return {
        accessToken,
        refreshToken,
    };
}

function verifyAcces(token) {
    return jwt.verify(token, SECRET_ACCES_TOKEN);
}

function verifyRefresh(token) {
    return jwt.verify(token, SECRET_REFRESH_TOKEN);
}

module.exports = { parseTokens, verifyAcces, verifyRefresh };
