const jwt = require('jsonwebtoken');
const UserToken = require('./token_model');

async function generateAccessToken(user) {
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
        payload,
        'ACCESS_TOKEN_PRIVATE_KEY',
        { expiresIn: '1m' },
    );
    return accessToken;
}

async function generateRefreshToken(user) {
    const payload = { userId: user.id };
    const refreshToken = jwt.sign(
        payload,
        'REFRESH_TOKEN_PRIVATE_KEY',
        { expiresIn: '15m' },
    );
    const storedRefreshToken = await UserToken.findOne({ userId: user.id }).exec();
    if (storedRefreshToken === null) {
        await UserToken.create({ userId: user.id, token: refreshToken });
    } else {
        await UserToken.updateOne({ userId: user.id }, { token: refreshToken }).exec();
    }
    return refreshToken;
}

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'ACCESS_TOKEN_PRIVATE_KEY');
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({ status: false, message: 'Your session is not valid.', data: error });
    }
}

async function verifyRefreshToken(req, res, next) {
    const { token } = req.body;
    if (token === null) return res.status(401).json({ status: false, message: 'Invalid request' });
    try {
        const decoded = jwt.verify(token, 'REFRESH_TOKEN_PRIVATE_KEY');
        req.userData = decoded;
        const refreshToken = await UserToken.findOne({ userId: decoded.userId }).exec();
        if (refreshToken === undefined) return res.status(401).json({ status: false, message: 'Invalid request. Token not defined' });
        if (refreshToken.token !== token) return res.status(401).json({ status: false, message: 'Invalid request. Token not saved' });
        return next();
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Your session is not valid.', data: error });
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
};
