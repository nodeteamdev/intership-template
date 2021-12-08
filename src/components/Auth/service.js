const bcrypt = require('bcryptjs');
const jwt = require('./jwt');
const UserDTO = require('./dto');
const { UserModel } = require('../User/model');
const ApiError = require('../../error/ApiError');

/**
 * SignUp
 * @exports
 * @method updateById
 * @param {string} email
 * @param {string} password
 * @summary login user
 * @returns {Promise<void>}
 */
async function signUp(email, password, fullName) {
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw new ApiError.BadRequest(`Email: ${email} already exists.`);
  }

  const hashPassword = await bcrypt.hashSync(password, 3);

  const user = await UserModel.create({ email, password: hashPassword, fullName });

  const userDto = new UserDTO(user);
  const tokens = jwt.generateTokens({ ...userDto });
  await jwt.saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

/**
 * refresh
 * @exports
 * @method refresh
 * @param {string} refreshToken
 * @summary
 * @returns {Promise<void>}
 */
async function refresh(refreshToken) {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = jwt.validateRefreshToken(refreshToken);

  const tokenFromDb = await jwt.findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const user = await UserModel.findById(userData.id);
  const userDto = new UserDTO(user);
  const tokens = jwt.generateTokens({ ...userDto });

  await jwt.saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

module.exports = {
  signUp,
  refresh,
};
