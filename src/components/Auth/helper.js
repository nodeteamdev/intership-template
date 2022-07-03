const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const AuthService = require('./service');

const { tokens } = require('../../config/token');

function generateAccessToken(user) {
    const payload = {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
    };
    const accessToken = jwt.sign(
        payload,
        tokens.access.secret,
        { expiresIn: tokens.access.expiresIn },
    );
    return {
        accessToken,
    };
}
function generateRefreshToken(user) {
    const payload = {
        id: uuid.v4(),
        type: tokens.refresh.type,
        hash: user.hash,
    };
    return {
        id: payload.id,
        token: jwt.sign(
            payload,
            tokens.refresh.secret,
            { expiresIn: tokens.refresh.expiresIn },
        ),
    };
}

async function updateOrSaveToken(userId, token) {
    const findRefresh = await AuthService.findTokenById(userId);

    let result;

    if (!findRefresh) {
        result = await AuthService.createToken(userId, token);
    } else {
        await AuthService.removeRefreshToken(userId);
        result = await AuthService.createToken(userId, token);
    }

    return result;
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    updateOrSaveToken,
};
