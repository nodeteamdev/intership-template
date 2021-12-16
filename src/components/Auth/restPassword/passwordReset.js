const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../../User/model');
const Token = require('../service');
const sendEmail = require('./sendEmail');

async function password(req, res, next) {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("user with given email doesn't exist");
        }
        const userId = user._id;
        // eslint-disable-next-line no-unused-vars
        const { accessToken, refreshToken } = await Token.refreshToken(userId);

        const link = `http://localhost:3000/v1/auth/password-reset/${refreshToken}`;
        await sendEmail(user.email, 'Password reset', link);

        return res.send('password reset link sent to your email account');
    } catch (error) {
        return next(error);
    }
}

function renderResetPassword(req, res) {
    res.render('./fogot-password');
}

async function confirmPassword(req, res, next) {
    try {
        const schema = Joi.object().keys({
            password1: Joi.string().required(),
            password2: Joi.valid(Joi.ref('password1')).required(),
            refreshToken: [Joi.string(), Joi.number()],
        }).and('refreshToken');

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const { password1, refreshToken } = req.body;
        const { userId } = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        const user = await UserModel.findById(userId);
        if (!user) return res.status(400).send('invalid link or expired');

        user.password = password1;
        await user.save();

        return res.send('password reset sucessfully.');
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    password,
    renderResetPassword,
    confirmPassword,
};
