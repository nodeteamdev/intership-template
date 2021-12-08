const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const AuthHelper = require('./helper');
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
// /**
//  * @function
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  * @returns {Promise < void >}
//  */
// const signUp = async (req, res, next) => {
//   try {

//   } catch (error) {
//     res.status(500).json({
//       message: error.name,
//       details: error.message,
//     });
//     next(error);
//   }
// };

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
  refreshTokens,
};
