require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ValidationError = require('../../error/ValidationError');
const generateTokens = require('./helper');
const User = require('../User/model');
const UserService = require('../User/service');

const {
    signUpBodyValidation,
    logInBodyValidation,
    refreshTokenBodyValidation,
} = require('./validation');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signUp(req, res, next) {
    try {
        const { error, value } = signUpBodyValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = await UserService.findByEmail(value.email);
        if (user) {
            return res.status(400).json({ message: 'User with given email already exist' });
        }
        await new User({ ...value, password: value.password }).save();
        return res.status(201).json({ message: 'Account created sucessfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        next(err);
    }
}

async function logIn(req, res, next) {
    try {
        const { error, value } = logInBodyValidation(req.body);
        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findByEmail(value.email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const verifiedPassword = bcrypt.compareSync(value.password, user.password);

        if (!verifiedPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        return res.status(200)
            .cookie('accessToken', `Bearer ${accessToken}`, {
                maxAge: 1000 * 60 * 30, httpOnly: true,
            })
            .cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24, httpOnly: true,
            }).json({ message: 'Logged in sucessfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
        next(err);
    }
}

async function updateRefreshToken(req, res, next) {
    try {
        const { error, value } = refreshTokenBodyValidation({ refreshToken: req.cookies.refreshToken });
        if (error) {
            return res.status(401).json({ message: error.details[0].message });
        }
        const payload = jwt.verify(value.refreshToken, process.env.REFRESH_SECRET_KEY);
        const user = await UserService.findById(payload.id);
        const { accessToken, refreshToken } = await generateTokens(user);
        return res.status(200)
            .cookie('accessToken', `Bearer ${accessToken}`, {
                maxAge: 1000 * 60 * 30, httpOnly: true,
            })
            .cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24, httpOnly: true,
            });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUp,
    logIn,
    updateRefreshToken,
};
