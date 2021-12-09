/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthService = require('./service');
// const UserValidation = require('../User/validation');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const userModel = require('../User/model');

const refreshTokens = [];

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signUp(req, res, next) {
    try {
        const { error } = AuthValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthService.signUp(req.body);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        console.log('Not sign up!');
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function signIn(req, res, next) {
    try {
        const { error } = AuthValidation.loginUser(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {
            console.log('Pass is correct');
        } else {
            console.log('Wroing password in auth/index.js');
            res.send('Wrong password');
        }

        console.log({ email, password });
        // jwt.sign({ email, password }, 'secretkey', { expiresIn: '1m' }, (_error, token) => {
        //     res.json({ token });
        // });
        const accessToken = jwt.sign({ email, password }, 'secretkey', { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email, password }, 'RefreshSecretkey', { expiresIn: '10h' });
        refreshTokens.push(refreshToken);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function refreshToken(req, res, next) {
    try {
        const refToken = req.body.refreshToken;
        if (refToken == null) return res.send('Empty token');
        if (!refreshTokens.includes(refToken)) return res.send('Not Super good');
        jwt.verify(refToken, 'RefreshSecretkey', (err, email) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign({ email }, 'secretkey', { expiresIn: '1m' });
            res.json({ accessToken });
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
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
    signUp,
    signIn,
    refreshToken,
};
