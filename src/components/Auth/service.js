const jwt = require('jsonwebtoken');
const UserToken = require('./token.model');

const accessKey = 'ACCESS_TOKEN_PRIVATE_KEY';
const refreshKey = 'REFRESH_TOKEN_PRIVATE_KEY';

async function generateAccessToken(userId) {
    const payload = { userId };
    const accessToken = jwt.sign(
        payload,
        accessKey,
        { expiresIn: '1m' },
    );
    return accessToken;
}

async function generateRefreshToken(userId) {
    const payload = { userId };
    const refreshToken = jwt.sign(
        payload,
        refreshKey,
        { expiresIn: '15m' },
    );
    const storedRefreshToken = await UserToken.findOne({ userId }).exec();
    if (storedRefreshToken === null) {
        await UserToken.create({ userId, refreshToken });
    } else {
        await UserToken.updateOne({ userId }, { token: refreshToken }).exec();
    }
    return refreshToken;
}

async function getAccessToken(req, res) {
    const { token } = req.body;
    const decoded = jwt.verify(token, refreshKey);
    const accessToken = await generateAccessToken(decoded);
    const refreshToken = await generateRefreshToken(decoded.userId);

    return res.status(200).json({
        message: 'Successfully completed',
        data: { accessToken, refreshToken },
    });
}

function verifyToken(req, res, next) {
    try {
        const [, token] = req.headers.authorization.split(' ');
        const decoded = jwt.verify(token, accessKey);
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Your session is not valid.', data: error });
        next(error);
    }
}

async function verifyRefreshToken(req, res, next) {
    const { token } = req.body;
    if (token === null) return res.status(401).json({ message: 'Invalid request' });
    try {
        const decoded = jwt.verify(token, refreshKey);
        const refreshToken = await UserToken.findOne({ userId: decoded.userId }).exec();
        if (refreshToken === undefined) return res.status(401).json({ message: 'Invalid request. Token not defined' });
        if (refreshToken.token !== token) return res.status(401).json({ message: 'Invalid request. Token not valid' });
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Your session is not valid.', data: error });
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    getAccessToken,
    verifyToken,
    verifyRefreshToken,
};
