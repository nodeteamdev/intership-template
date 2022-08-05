require('dotenv').config({ path: `${process.cwd()}../../.env` });

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);
module.exports = {
    tokens: {
        access: {
            secret: process.env.ACCESS_TOKEN_SECRET,
            type: 'access',
            expiresIn: '1m',
        },
        refresh: {
            secret: process.env.REFRESH_TOKEN_SECRET,
            type: 'refresh',
            expiresIn: '1 day',
        },
    },
};
