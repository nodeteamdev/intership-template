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
 * @method searchByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function searchByEmail(email) {
  return UserModel.findOne({ email });
}

/**
 * @exports
 * @method searchRefreshToken
 * @param {string} userId
 * @summary get a token
 * @returns
 */
function searchTokenById(userId) {
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
  const isToken = TokenModel.findOne({ userId });
  if (isToken) {
    return TokenModel.findOneAndReplace({ userId }, { userId, token });
  }
  return TokenModel.create({ userId, token });
}

module.exports = {
  signUp,
  signIn,
  searchTokenById,
  removeRefreshToken,
  searchByEmail,
  saveToken,
};
