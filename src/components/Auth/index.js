const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

async function register(req, res, next) {
    try {
        const { error } = AuthValidation.register(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = await AuthService.register(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            error: error.message,
            details: null,
        });

        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const { error } = AuthValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = await AuthService.login(req.body);

        return res.status(200).json({
            data,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

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
