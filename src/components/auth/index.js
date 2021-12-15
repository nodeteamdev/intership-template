const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const AuthService = require('./service');
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
        const { error } = AuthValidation.signIn(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        // const validPassword = bcrypt.compareSync(password, user.password);
        const validPassword = user.password;
        if (!validPassword) {
            res.status(403).json({ message: 'Wrong password' });
        }

        const accessToken = jwt.sign({ email, password }, 'secretkey', { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email, password }, 'RefreshSecretkey', { expiresIn: '10h' });
        refreshTokens.push(refreshToken);

        return res.json({ accessToken, refreshToken });
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
async function refreshAccessToken(req, res, next) {
    try {
        const refToken = req.body.refreshToken;
        if (refToken == null) return res.sendStatus(403).json({ message: 'Empty token' });
        if (!refreshTokens.includes(refToken)) return res.sendStatus(403).json({ message: 'Token is not valid' });
        jwt.verify(refToken, 'RefreshSecretkey', (err, email) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign({ email }, 'secretkey', { expiresIn: '1m' });
            return res.json({ accessToken });
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
    return undefined;
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function forgotPassword(req, res, next) {
    try {
        res.render('../../views/pages/forgotPassword');
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
    return undefined;
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function confirmEmail(req, res, next) {
    try {
        const { email } = req.body;
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: '0.0.0.0',
            port: 1025,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email,
            subject: 'Hello there ✔', // Subject line
            text: `Please enter new password: http://127.0.0.1:3000/v1/auth/newPasswordForm?email=${email}`, // plain text body
            html: `<a href="http://127.0.0.1:3000/v1/auth/newPasswordForm?email=${email}">Please enter new password!</a>`, // html body
        });

        return res.status(200).json({ message: 'Sended message!' });
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
async function newPasswordForm(req, res, next) {
    try {
        const userEmail = req.query.email;
        res.render('../../views/pages/newPasswordForm', { email: userEmail });
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
    return undefined;
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function resetPassword(req, res, next) {
    try {
        const { confirmPassword, email } = req.body;
        const { password } = req.body;

        if (password !== confirmPassword) {
            res.status(200).json({ message: 'Can`t reset password! Passwords in the fields must be the same' });
        } else {
            const resetedUser = AuthService.resetPassword(email, password);
            console.log(resetedUser);
            res.status(200).json({ message: 'Password reseted successfully' });
        }
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
    return undefined;
}

module.exports = {
    signUp,
    signIn,
    refreshAccessToken,
    confirmEmail,
    forgotPassword,
    newPasswordForm,
    resetPassword,
};
