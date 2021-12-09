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

module.exports = {
    register,
    login,
};
