const jwt = require('jsonwebtoken');
const UserModel = require('../../User/model');
const Token = require('../service');
const sendEmail = require('./sendEmail');
const ValidationError = require('../../../error/ValidationError');
const RestPasswordValidation = require('./restPasswordValidation');

async function forgotPassword(req, res, next) {
    try {
        const { error } = RestPasswordValidation.forgotPassword(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("user with given email doesn't exist");
        }
        const userId = user._id;
        // eslint-disable-next-line no-unused-vars
        const { accessToken, refreshToken } = await Token.generateTokens(userId);

        const link = `http://localhost:3000/v1/auth/password-reset/${refreshToken}`;
        await sendEmail(user.email, 'Password reset', link);

        return res.send('password reset link sent to your email account');
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

function renderResetPassword(req, res) {
    res.render('./forgot-password');
}

async function confirmPassword(req, res, next) {
    try {
        const { error } = RestPasswordValidation.confirmPassword(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { password1, refreshToken } = req.body;
        const { userId } = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        const user = await UserModel.findById(userId);

        if (!user) return res.status(400).send('invalid link or expired');

        user.password = password1;
        await user.save();

        return res.send('password reset successfully.');
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    forgotPassword,
    renderResetPassword,
    confirmPassword,
};
