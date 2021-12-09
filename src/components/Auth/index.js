const jwt = require('jsonwebtoken');
const AuthService = require('./service');

async function register(req, res, next) {
    try {
        const data = await AuthService.register(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const data = await AuthService.login(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        return next(error);
    }
}
async function refreshToken(req, res) {
    const { refreshToken: token } = req.body;
    console.log(token);

    if (!token) {
        res.status(400).send('A refresh token is required');
    }
    try {
        console.log('hi');
        console.log(process.env.REFRESH_KEY);
        const { userId } = jwt.verify(token, process.env.REFRESH_KEY);
        console.log(userId);
        const tokens = await AuthService.refreshToken(userId);
        res.status(200).send(tokens);
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid Token');
    }
}

module.exports = {
    register,
    login,
    refreshToken,
};
