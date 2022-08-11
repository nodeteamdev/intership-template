import bcrypt from 'bcrypt';

const ROUNDS_FOR_SALT = 6;

async function getPasswordHash(password: string) {
    return bcrypt.hash(password, ROUNDS_FOR_SALT);
}

async function isPasswordCorrect(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
}

export {
    getPasswordHash,
    isPasswordCorrect,
};
