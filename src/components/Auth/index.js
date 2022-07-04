const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../User/model');
const AuthModel = require('./model');

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
}

async function verifyToken(req, res, next) {
  try {
    const authHeader = await req.headers.authorization;
    const token = await authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.authData = authData;

      return null;
    });
  } catch (err) {
    res.sendStatus(err);
  }

  return next();
}

async function getUser(req, res, next) {
  try {
    const user = await UserModel.findOne({ fullName: 'John Hey' }).exec();

    return res.json(user) || res.json();
  } catch (err) {
    return next(err);
  }
}

async function getTokens(req, res, next) {
  try {
    const user = await UserModel.findOne({ fullName: 'John Hey' }).exec();

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const accToken = generateAccessToken(user);
    const refToken = generateRefreshToken(user);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    AuthModel.insertMany({
      fullName: user.fullName,
      email: user.email,
      password: hashedPassword,
      accessToken: accToken,
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

async function getRefreshToken(req, res, next) {
  try {
    const user = await AuthModel.findOne({ fullName: 'John Hey' }).exec();

    if (!user) {
      res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const { refreshToken } = user;

    if (refreshToken == null) {
      res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, authData) => {
      if (err) {
        return res.sendStatus(403);
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
  verifyToken,
  getUser,
  getTokens,
  getRefreshToken,
  deleteToken,
};
