require('dotenv').config();
const bcrypt = require('bcrypt');
const generateTokens = require('./helper');
const User = require('../User/model');
const UserService = require('../User/service');

const {
    signUpBodyValidation,
    logInBodyValidation,
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
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }

        const user = await UserService.findByEmail(value.email);
        if (user) {
            return res
                .status(400)
                .json({ error: true, message: 'User with given email already exist' });
        }

        const hashPassword = bcrypt.hashSync(value.password, Number(process.env.SALT));

        await new User({ ...value, password: hashPassword }).save();

        return res
            .status(201)
            .json({ error: false, message: 'Account created sucessfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: 'Internal Server Error' });
        next(err);
    }
}

async function logIn(req, res, next) {
    try {
        const { error, value } = logInBodyValidation(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }

        const user = await UserService.findByEmail(value.email);
        if (!user) {
            return res
                .status(401)
                .json({ error: true, message: 'Invalid email or password' });
        }

        const verifiedPassword = bcrypt.compareSync(value.password, user.password);

        if (!verifiedPassword) {
            return res
                .status(401)
                .json({ error: true, message: 'Invalid email or password' });
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
        res.status(500).json({ error: true, message: 'Internal Server Error' });
        next(err);
    }
}

module.exports = {
    signUp,
    logIn,
};
