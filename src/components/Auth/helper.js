const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const { tokens } = require('../../config/credentials').JWT;

function generateTokens(user) {
  const payload = {
    userId: user.id,
    firstName: user.firstName,
  };

  return {
    accessToken: jwt.sign(payload, tokens.access.secret, { expiresIn: tokens.access.expiresIn }),
    refreshToken: jwt.sign(payload, tokens.refresh.secret, { expiresIn: tokens.refresh.expiresIn }),
  };
}

async function updateOrSaveToken(userId, token) {
  const isToken = await AuthService.searchTokenByUserId(userId);

  let result;

  if (isToken === null) {
    console.log('isToken = null');
    result = await AuthService.saveToken(userId, token);
  } else {
    console.log(isToken);
    await AuthService.removeRefreshToken(userId);
    result = await AuthService.saveToken(userId, token);
  }

  return result;
}

module.exports = {
  generateTokens,
  updateOrSaveToken,
};
