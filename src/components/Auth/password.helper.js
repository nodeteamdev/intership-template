const bcrypt = require('bcrypt');

const ROUNDS_FOR_SALT = 6;

async function getPasswordHash(password) {
    return bcrypt.hash(password, ROUNDS_FOR_SALT);
}

async function isPasswordCorrect(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

module.exports = {
    getPasswordHash,
    isPasswordCorrect,
};
