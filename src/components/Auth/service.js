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
  return UserModel.create(profile).lean().exec();
}

/**
 * @exports
 * @method signIn
 * @param {object} profile
 * @summary sign in
 * @returns {Promise<UserModel>}
 */
async function signIn(profile) {
  return UserModel.findOne({ email: profile.email }).lean().exec();
}

/**
 * @exports
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findByEmail(email) {
  return UserModel.findOne({ email }).lean().exec();
}

/**
 * @exports
 * @method findTokenById
 * @param {string} tokenId
 * @summary get a token
 * @returns
 */
function findTokenByUserId(userId) {
  return TokenModel.findOne({ userId }).lean();
}

/**
 * @exports
 * @method remove refresh token
 * @param {string} tokenId
 * @summary remove old refresh token
 * @returns
 */
function removeRefreshToken(userId) {
  return TokenModel.findOneAndRemove({ userId }).lean();
}

/**
 * @exports
 * @method createRefreshToken
 * @param {string} tokenId
 * @param {string} userId
 * @summary get a new refreshToken
 * @returns
 */
async function saveToken(userId, token) {
  return TokenModel.create({ userId, token }).lean().exec();
}

module.exports = {
  signUp,
  signIn,
  findTokenByUserId,
  removeRefreshToken,
  findByEmail,
  saveToken,
};
