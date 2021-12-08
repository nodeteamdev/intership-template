// const jwt = require('jsonwebtoken');
// const config = require('../../config/env');
// const { TokenModel } = require('../User/model');

// function generateTokens(payload) {
//   const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: '30m' });
//   const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30d' });
//   return {
//     accessToken,
//     refreshToken,
//   };
// }

// function validateAccessToken(token) {
//   try {
//     const userData = jwt.verify(token, config.JWT_ACCESS_SECRET);
//     return userData;
//   } catch (error) {
//     return null;
//   }
// }

// function validateRefreshToken(token) {
//   try {
//     const userData = jwt.verify(token, config.JWT_REFRESH_SECRET);
//     return userData;
//   } catch (error) {
//     return null;
//   }
// }

// async function saveToken(userId, refreshToken) {
//   const tokenData = await TokenModel.findOne({ user: userId });
//   if (tokenData) {
//     tokenData.refreshToken = refreshToken;
//     return tokenData.save();
//   }
//   const token = await TokenModel.create({ user: userId, refreshToken });
//   return token;
// }

// async function removeToken(refreshToken) {
//   const tokenData = await TokenModel.deleteOne({ refreshToken });
//   return tokenData;
// }

// async function findToken(refreshToken) {
//   const tokenData = await TokenModel.findOne({ refreshToken });
//   return tokenData;
// }

// module.exports = {
//   generateTokens,
//   validateAccessToken,
//   validateRefreshToken,
//   saveToken,
//   removeToken,
//   findToken,
// };
