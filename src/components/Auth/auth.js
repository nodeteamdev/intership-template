const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authHelper = require('./authHelper');

const Auth = require('./model_auth');
const Token = require('./token');

const secret = 'secret key access token jwt';

const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken(userId);

    return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token,
        }));
}

const signIn = (req, res) => {
    console.log(req.body);
    const {email, password } = req.body;
    Auth.findOne({ email })
        .exec()
        .then((user) => {
            if(!user) {
                res.status(401).json({ messsage: 'User does not exist' });
            }

            const isValid = bCrypt.compareSync(password, user.password);
            if (isValid) {
                updateTokens(user._id).then(tokens => res.json(tokens));
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(err => res.status(500).json({ message: err.message }))
};

const refreshTokens = (req, res) => {
    const { refreshToken } = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, secret);
        if (payload.type !== 'refresh') {
            res.status(400).json({ message: 'Invalid token!' });
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({ messages: 'Token expired!' });
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
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
            return updateTokens(token.userId);
        })
        .then(tokens => res.json(tokens))
        .catch(err => res.status(400).json({ message: err.message }));
}



module.exports = {
    signIn,
    refreshTokens,
}