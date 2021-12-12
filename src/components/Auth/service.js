const UserModel = require('../User/model');
const TokenModel = require('./model');

/**
 * @exports
 * @method signUp
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function signUp(profile) {
  return UserModel.create(profile);
}

/**
 * @exports
 * @method signIn
 * @param {object} profile
 * @summary sign in
 * @returns {Promise<UserModel>}
 */
function signIn(profile) {
  return UserModel.findOne({ email: profile.email });
}

/**
 * @exports
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findByEmail(profile) {
  return UserModel.findOne({ email: profile.email });
}

/**
 * @exports
 * @method findTokenById
 * @param {string} tokenId
 * @summary get a token
 * @returns
 */
function findTokenByUserId(userId) {
  return TokenModel.findOne({ userId });
}

/**
 * @exports
 * @method remove refresh token
 * @param {string} userId
 * @summary remove old refresh token
 * @returns
 */
function removeRefreshToken(userId) {
  return TokenModel.findOneAndRemove({ userId });
}

/**
 * @exports
 * @method createRefreshToken
 * @param {string} userId
 * @param {string} token
 * @summary get a new refreshToken
 * @returns
 */
function saveToken(userId, token) {
  return TokenModel.create({ userId, token });
}

module.exports = {
  signUp,
  signIn,
  findTokenByUserId,
  removeRefreshToken,
  findByEmail,
  saveToken,
};
