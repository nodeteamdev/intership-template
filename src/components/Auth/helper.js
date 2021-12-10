const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const { secret, tokens } = require('../../config/env').JWT;

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: tokens.access.type,
  };

  const options = { expiresIn: tokens.access.expiresIn };

  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
  };

  const options = { expiresIn: tokens.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  };
};

const replaceDbRefreshToken = async (tokenId, userId) => {
  const oldRefreshToken = await AuthService.removeRefreshToken(userId);
  if (oldRefreshToken === undefined) {
    throw new Error('Invalid token!');
  }
  return AuthService.createRefreshToken(tokenId, userId);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
};
