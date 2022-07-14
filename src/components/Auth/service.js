require('dotenv').config();
const jwt = require('jsonwebtoken');

function parseTokens(_id) {
    const accessToken = jwt.sign({ _id }, process.env.SECRET_ACCES_TOKEN, {
        expiresIn: process.env.ACCES_EXPAIR_TIME,
    });
    const refreshToken = jwt.sign({ _id }, process.env.SECRET_REFRESH_TOKEN, {
        expiresIn: process.env.REFRESH_EXPAIR_TIME,
    });

    return {
        accessToken,
        refreshToken,
    };
}

function verifyAcces(token) {
    return jwt.verify(token, process.env.SECRET_ACCES_TOKEN);
}

function verifyRefresh(token) {
    return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
}

module.exports = { parseTokens, verifyAcces, verifyRefresh };
