const UserService = require('../User/service');
const AuthService = require('../Auth/service');
const TokenValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
const chatRoom = async (req, res, next) => {
  try {
    const { error, value } = TokenValidation.Tokens(req.cookies);

    if (error) throw new ValidationError(error.details);

    const token = await AuthService.searchToken(value.refreshToken);

    const user = await UserService.findById(token.userId);
    res
      .status(200)
      .render('chat', { user_id: value.user_id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatRoom,
};
