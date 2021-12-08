const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const AuthHelper = require('./helper');
const UserValidation = require('../User/validation');
const UserService = require('../User/service');
const ValidationError = require('../../error/ValidationError');
const { secret } = require('../../config/env').JWT;

const updateTokens = async (userId) => {
  const accessToken = await AuthHelper.generateAccessToken(userId);
  const refreshToken = await AuthHelper.generateRefreshToken();
  const newestTokens = await AuthHelper.replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.token,
    }));

  return newestTokens;
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
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const isUser = await AuthService.findByEmail(req.body.email);
    if (isUser === null) {
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      };

      const user = await UserService.create(userData);
      res.status(200).json({ data: user });
    } else {
      res.status(400).json({ message: 'Email already exists!' });
    }
  } catch (error) {
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
    const { email, password } = req.body;

    const user = await AuthService.findByEmail(email);
    if (user === null) {
      res.status(401).json({ message: 'User does not exist!' });
    } else {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        updateTokens(user._id).then((tokens) => res.json(tokens));
      } else {
        res.status(401).json({ message: 'Invalid credentials!' });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.name,
      details: error.message,
    });
    next(error);
  }
};

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;

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
  }

  const findToken = await AuthService.findTokenById({ tokenId: payload.id });
  if (findToken === null) {
    throw new Error('Invalid token!');
  }
  const newTokens = await updateTokens(findToken.userId);
  res.json(newTokens);

  return newTokens;
};

module.exports = {
  signIn,
  signUp,
  refreshTokens,
};
