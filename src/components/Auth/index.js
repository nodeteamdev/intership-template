const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const AuthError = require('../../error/AuthError');
const { HASH_SALT } = require('../../config/credentials');
const { generateTokens } = require('./helper');

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

    const isUser = await AuthService.findByEmail(value.email);

    if (isUser) {
      throw new AuthError(403, 'Email already exist!');
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
      throw new AuthError(401, 'User does not exist!');
    }

    if (!bcrypt.compareSync(value.password, user.password)) {
      throw new AuthError(401, 'Invalid credentials!');
    }

    const tokens = generateTokens(user);
    await AuthService.saveToken(user._id, tokens.refreshToken);

    return res.status(200).json({
      data: {
        tokens,
        user,
      },
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
    const { error, value } = AuthValidation.token(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    return res.status(201).json({
      data: value,
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

// asdasd
// async function refreshTokens(req, res, next) {
//   const { error, value } = AuthValidation.token(req.body);

//   if (error) {
//     throw new ValidationError(error.details);
//   }

//   try {
//     payload = jwt.verify(value.refreshToken, JWT.secret);
//     if (payload.type !== 'refresh') {
//       res.status(400).json({ message: 'Invalid token!' });
//     }
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       return res.status(422).json({
//         message: error.name,
//         details: error.message,
//       });
//     }
//     if (error instanceof jwt.TokenExpiredError) {
//       return res.status(400).json({ message: 'Token expired!' });
//     } if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(400).json({ message: 'Invalid token!' });
//     }
//     next(error);
//   }

//   const token = await AuthService.findTokenById({ tokenId: payload.id });
//   if (token === null) {
//     throw new Error('Invalid token!');
//   }
//   const newTokens = await updateTokens(token.userId);
//   res.json(newTokens);
// }

module.exports = {
  signUp,
  signIn,
  refreshToken,
};
