const UserToken = require('./token.model');
const User = require('../User/model');
const TokenService = require('./service');

async function signUp(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User with given email already exist' });
        }
        const savedUser = await User.create(req.body);
        return res.status(201).json({ message: 'Account created sucessfully', data: savedUser });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: error });
        return next(error);
    }
}

async function logIn(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email, fullName: req.body.fullName });
        if (user === null) {
            return res.status(401).json({ message: "Invalid user's email or name" });
        }

        const accessToken = await TokenService.generateAccessToken(user.id);

        const refreshToken = await TokenService.generateRefreshToken(user.id);

        return res.status(200).json({
            message: 'Logged in sucessfully',
            data: { accessToken, refreshToken },
        });
    } catch (error) {
        res.status(400).json({
            message: 'Login fail',
        });
        return next(error);
    }
}

async function logOut(req, res, next) {
    try {
        const userToken = await UserToken.findOne({ token: req.body.refreshToken });
        if (!userToken) {
            return res
                .status(200)
                .json({ message: 'Logged Out Sucessfully' });
        }

        await userToken.remove();
        return res.status(200).json({ message: 'Logged Out Sucessfully' });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    signUp,
    logIn,
    logOut,
};
