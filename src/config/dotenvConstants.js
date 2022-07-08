require('dotenv').config();

module.exports = {
    TOKENS: {
        access: {
            secret: process.env.ACCESS_TOKEN_SECRET,
            type: 'access',
            expiresIn: process.env.ACCESS_EXPIRES_IN,
        },
        refresh: {
            secret: process.env.REFRESH_TOKEN_SECRET,
            type: 'refresh',
            expiresIn: process.env.REFRESH_EXPIRES_IN,
        },
    },
    HASH_SALT: process.env.HASH_SALT,
}