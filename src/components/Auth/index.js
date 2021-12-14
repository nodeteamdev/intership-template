const bcrypt = require('bcrypt');
const UserService = require('../User/service');
const UserValidation = require('../User/validation');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const { HASH_SALT, BASE_URL, PORT } = require('../../config/credentials');
const { generateTokens, updateOrSaveToken, sendEmail } = require('./helper');
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
    const { error, value } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const isUser = await UserService.searchByEmail(value.email);

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

    const user = await UserService.create(userData);

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

    const isUser = await UserService.searchByEmail(value.email);
    if (isUser === null) {
      throw new AuthError('User does not exists!');
    }

    if (!bcrypt.compareSync(value.password, isUser.password)) {
      throw new AuthError('Invalid credentials!');
    }

    const tokens = generateTokens(isUser);

    updateOrSaveToken(isUser._id, tokens.refreshToken);
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function refreshToken(req, res, next) {
  try {
    const { error, value } = AuthValidation.refreshToken(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const requestToken = await AuthService.searchTokenByUserId(value.userId);

    if (requestToken.token !== value.token) {
      throw new AuthError('Token is invalid');
    }

    const user = await UserService.findById(value.userId);

    const tokens = generateTokens(user);
    updateOrSaveToken(value.userId, tokens.refreshToken);

    return res.status(200).json({
      newdata: tokens,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function forgotPassword(req, res, next) {
  try {
    const { error, value } = AuthValidation.forgotPassword(req.body);

    if (error || value.email === undefined) {
      throw new ValidationError(error.details);
    }

    const isUser = await UserService.searchByEmail(value.email);

    if (isUser === null) {
      throw new AuthError('User with this email does not exists!');
    }

    const newTokens = generateTokens(isUser);

    updateOrSaveToken(isUser.id, newTokens.accessToken);

    const link = `${BASE_URL}:${PORT}/v1/auth/password-reset/${isUser.id}/${newTokens.accessToken}`;

    const htmlMailPage = `
      <h2>Please click on given link to reset your password</h2>
      <p>${link}</p>
    `;

    sendEmail(isUser.email, 'Password reset', htmlMailPage);

    return res.status(200).json({
      info: 'Password reset link sent to your email account! Check spam folder also.',
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function resetPassword(req, res, next) {
  try {
    const { error, value } = AuthValidation.resetPassword(req.body);

    if (error) throw new ValidationError(error.details);
    console.log(req.params);
    const isUser = await UserService.findById(req.params.id);

    if (isUser === null) {
      throw new AuthError('Invalid or expired link');
    }

    const token = await AuthService.searchTokenByUserId(isUser.id);

    if (token === null) throw new AuthError('Invalid or expired link');

    const hashPassword = bcrypt.hashSync(value.password, HASH_SALT);

    await UserService.updateById(isUser.id, { password: hashPassword });

    return res.send('Password reset sucessfully!');
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
  forgotPassword,
  resetPassword,
};
