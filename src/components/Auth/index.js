const jwt = require('jsonwebtoken');

const AuthModel = require('./model');
const { generateAccessToken, generateRefreshToken } = require('./service');

const { userFindByEmail } = require('../User/service');
const { authFindByEmail } = require('./service');

async function getUser(req, res, next) {
  try {
    const user = await userFindByEmail(req.params.email);

    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function logIn(req, res, next) {
  try {
    const user = await userFindByEmail(req.params.email);

    if (!user) {
      return res.status(401).json({
        message: 'The user wasn\'t found',
      });
    }

    const accToken = generateAccessToken(user);
    const refToken = generateRefreshToken(user);

    AuthModel.insertMany({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      refreshToken: refToken,
    });

    return res.json({
      data: {
        accToken,
        refToken,
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function refreshTokens(req, res, next) {
  try {
    const user = await authFindByEmail(req.params.email);

    if (!user) {
      res.status(401).json({
        message: 'The user wasn\'t found',
      });
    }

    const { refreshToken } = user;

    if (refreshToken == null) {
      res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ message: 'Not found' });
      }

      const accToken = generateAccessToken({ fullName: authData.fullName });
      return res.json({ accessToken: accToken });
    });
  } catch (err) {
    next(err);
  }
}

async function deleteToken(req, res, next) {
  try {
    await AuthModel.updateOne({ fullName: 'John Hey' }, { refreshToken: '' });

    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  logIn,
  refreshTokens,
  deleteToken,
};
