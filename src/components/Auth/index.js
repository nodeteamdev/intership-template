const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const { HASH_SALT, JWT } = require('../../config/credentials');
const { generateTokens } = require('./helper');
const { ValidationError, AuthError } = require('../../error');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signUp(req, res, next) {
  try {
    const { error, value } = AuthValidation.signUp(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const isUser = await AuthService.searchByEmail(value.email);

    if (isUser) {
      throw new AuthError('Email already exists!');
    }

    const hashPassword = bcrypt.hashSync(value.password, HASH_SALT);
    const userData = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashPassword,
    };

    const user = await AuthService.signUp(userData);

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    if (error instanceof AuthError) {
      return res.status(403).json({
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
 * @returns {accessToken, refreshToken}
 */
async function signIn(req, res, next) {
  try {
    const { error, value } = AuthValidation.signIn(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user = await AuthService.signIn(value);
    if (user === null) {
      throw new AuthError('User does not exists!');
    }

    if (!bcrypt.compareSync(value.password, user.password)) {
      throw new AuthError('Invalid credentials!');
    }

    const tokens = generateTokens(user);
    await AuthService.saveToken(user._id, tokens.refreshToken);

    return res.status(200).json({
      data: tokens,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    if (error instanceof AuthError) {
      return res.status(401).json({
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
// asd

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function refreshToken(req, res, next) {
  try {
    const { error, value } = jwt.verify(res.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    if (value.token === null) {
      throw new AuthError('Token Not Found');
    }

    const requestToken = await AuthService.searchRefreshToken(value.id);

    if (requestToken.token !== value.token) {
      throw new AuthError('Token is invalid');
    }

    const tokens = generateTokens(value);

    await AuthService.saveToken(user.id, tokens.refreshToken);
    return res.status(200).json({
      data: tokens,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    if (error instanceof AuthError) {
      return res.status(401).json({
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
