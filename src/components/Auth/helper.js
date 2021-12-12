const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const { JWT } = require('../../config/credentials');

function generateTokens(user) {
  const payload = {
    userId: user.id,
    firstName: user.firstName,
  };

  return {
    accessToken: jwt.sign(payload, JWT.secret, { expiresIn: JWT.tokens.access.expiresIn }),
    refreshToken: jwt.sign(payload, JWT.secret, { expiresIn: JWT.tokens.refresh.expiresIn }),
  };
}

// async function updateTokens(user) {
//   const payload = {
//     userId: user.id,
//     firstName: user.firstName,
//   };

//   const accessToken = jwt.sign(payload, JWT.secret, { expiresIn: JWT.tokens.access.expiresIn });
//   const refreshToken = jwt.sign(payload, JWT.secret, { expiresIn: JWT.tokens.refresh.expiresIn });

//   const oldRefreshToken = await AuthService.removeRefreshToken(user.id);
//   if (oldRefreshToken === undefined) {
//     throw new Error('Invalid token!');
//   }
//   await AuthService.saveToken(user.id, refreshToken);

//   return {
//     accessToken,
//     refreshToken,
//   };
// }

module.exports = {
  generateTokens,
};
