const UserModel = require('../User/model');
const TokenModel = require('./token-model');

/**
 * @exports
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findByEmail(email) {
  return UserModel.findOne({ email }).exec();
}

/**
 * @exports
 * @method findTokenById
 * @param {string} tokenId
 * @summary get a token
 * @returns
 */
function findTokenById(tokenId) {
  return TokenModel.findOne({ tokenId }).exec();
}

/**
 * @exports
 * @method remove refresh token
 * @param {string} tokenId
 * @summary remove old refresh token
 * @returns
 */
function removeRefreshToken(userId) {
  const result = TokenModel.findOneAndRemove({ userId }).exec();
  return result;
}

/**
 * @exports
 * @method createRefreshToken
 * @param {string} tokenId
 * @param {string} userId
 * @summary get a new refreshToken
 * @returns
 */
function createRefreshToken(tokenId, userId) {
  return TokenModel.create({ tokenId, userId });
}

module.exports = {
  findByEmail,
  removeRefreshToken,
  createRefreshToken,
  findTokenById,
};
