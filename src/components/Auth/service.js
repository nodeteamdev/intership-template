const jwt = require('jsonwebtoken');

const AuthModel = require('./model');

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
}

function authFindByEmail(email) {
  return AuthModel.findOne(email).exec();
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authFindByEmail,
};
