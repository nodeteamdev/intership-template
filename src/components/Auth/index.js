const UserValidation = require('../User/validation');
const AuthService = require('./service');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signUp(req, res, next) {
  try {
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const { email, password, fullName } = req.body;

    const userData = await AuthService.signUp(email, password, fullName);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ data: userData });
  } catch (error) {
    next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await AuthService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.status(200).json({ data: userData });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  refresh,
};
