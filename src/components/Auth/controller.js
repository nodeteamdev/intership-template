const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authService = require('./service');
const Token = require('./token.model');
const authHelper = require('./auth.helper');

const { SECRET } = require('./constants').JWTS;

async function signUp(req, res) {
    const authUser = await authService.createNewUser(
        req.body.email,
        req.body.password
    );

    const userId = authUser._id;
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken(userId);
    const tokenId = refreshToken.id;

    Token.create({ tokenId, userId });

    res.status(201).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function signIn(req, res) {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);
    try {
        if (!user) {
            res.status(401).json({ messsage: 'User does not exist' });
        }
        const isValid = bCrypt.compareSync(password, user.hashedPassword);
        if (isValid) {
            authService
                .updateTokens(user._id)
                .then((tokens) => res.json({ data: tokens }));
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function refreshTokens(req, res) {
    const { refreshToken } = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, SECRET);
        if (payload.type !== 'refresh') {
            res.status(400).json({ message: 'Invalid token!' });
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({ messages: 'Token expired!' });
            return;
        }
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: 'Invalid token!' });
            return;
        }
    }

    Token.findOne({ tokenId: payload.id })
        .exec()
        .then((token) => {
            if (token === null) {
                throw new Error('Invalid token');
            }
            return authService.updateTokens(token.userId);
        })
        .then((tokens) => res.json({ data: tokens }))
        .catch((err) => res.status(400).json({ message: err.message }));
}

async function logOut(req, res, next) {
    try {
        const { userId } = req.body;
        await Token.findOneAndRemove({ userId }).exec();
        return res.status(200).json({ message: 'User has been logged out' });
    } catch (error) {
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
    refreshTokens,
    logOut,
};
