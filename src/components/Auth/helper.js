const jwt = require('jsonwebtoken');
const { tokens } = require('../../config/credentials').JWT;

function generateTokens(user) {
  const payload = {
    userId: user.id,
    firstName: user.firstName,
  };

  return {
    accessToken: jwt.sign(payload, tokens.access.secret, { expiresIn: tokens.access.expiresIn }),
    refreshToken: jwt.sign(payload, tokens.access.secret, { expiresIn: tokens.refresh.expiresIn }),
  };
}

module.exports = {
  generateTokens,
};
