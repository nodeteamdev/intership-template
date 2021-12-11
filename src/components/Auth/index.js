const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const AuthHelper = require('./helper');
const AuthValidation = require('./validation');
const UserService = require('../User/service');
const ValidationError = require('../../error/ValidationError');
const { secret } = require('../../config/env').JWT;

const updateTokens = async (userId) => {
  const accessToken = AuthHelper.generateAccessToken(userId);
  const refreshToken = AuthHelper.generateRefreshToken(userId);
  AuthHelper.replaceDbRefreshToken(refreshToken.id, userId);

  return {
    accessToken,
    refreshToken: refreshToken.token,
  };
};
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
const signUp = async (req, res, next) => {
  try {
    const { error, value } = AuthValidation.signUp(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const isUser = await AuthService.findByEmail(value.email);

    if (isUser) {
      res.status(403).json({ error: 'Email already exists!' });
    }

    const user = await UserService.create(value);

    res.status(201).json({ data: user });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      message: error.name,
      details: error.message,
    });
    next(error);
  }
};

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
const signIn = async (req, res, next) => {
  try {
    const { error, value } = AuthValidation.signIn(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user = await AuthService.findByEmail(value.email);

    if (user === null) {
      res.status(401).json({ error: 'User does not exist!' });
    } else {
      const isValid = bcrypt.compareSync(value.password, user.password);

      if (!isValid) {
        res.status(401).json({ error: 'Invalid credentials!' });
      } else {
        res.json()
        updateTokens(user.id).then((tokens) => res.json(tokens));
      }
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }
    res.status(500).json({
      message: error.name,
      details: error.message,
    });
    next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  const { error, refreshToken } = AuthValidation.token(req.body);

  let payload;

  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Invalid token!' });
      return;
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token!' });
    }
    next(error);
  }

  const token = await AuthService.findTokenById({ tokenId: payload.id });
  if (token === null) {
    throw new Error('Invalid token!');
  }
  const newTokens = await updateTokens(token.userId);
  res.json(newTokens);
};

module.exports = {
  signIn,
  signUp,
  refreshTokens,
};
