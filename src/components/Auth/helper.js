require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenModel = require('./model');

async function generateTokens(user) {
    try {
        const payload = {
            id: user._id,
            firstName: user.firstName,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '14m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });
        const userToken = await TokenModel.findOne({ userId: user.id });
        if (userToken) await userToken.remove();

        await new TokenModel({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = generateTokens;
