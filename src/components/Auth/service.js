const TokenModel = require('./model');

/**
 * @exports
 * @method searchRefreshToken
 * @param {string} userId
 * @summary get a token
 * @returns
 */
function searchTokenByUserId(userId) {
  return TokenModel.findOne({ userId });
}

/**
 * @exports
 * @method searchRefreshToken
 * @param {string} userId
 * @summary get a token
 * @returns
 */
function searchToken(token) {
  return TokenModel.findOne({ token });
}

/**
 * @exports
 * @method remove refresh token
 * @param {string} userId
 * @summary Remove refreshToken from database
 * @returns
 */
function removeRefreshToken(userId) {
  return TokenModel.findOneAndRemove({ userId }).lean();
}

/**
 * @exports
 * @method createRefreshToken
 * @param {string} userId
 * @param {string} token
 * @summary saving refreshToken in Database
 * @returns
 */
function saveToken(userId, token) {
  return TokenModel.create({ userId, token });
}

module.exports = {
  searchTokenByUserId,
  removeRefreshToken,
  saveToken,
  searchToken,
};
