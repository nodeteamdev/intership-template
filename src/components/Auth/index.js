const bcrypt = require('bcryptjs');
const UserModel = require('../User/model');
const UserValidation = require('../User/validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
  try {
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const candidate = await UserModel.findOne({ email: req.body.email });

    if (candidate) {
      return res.status(419).json({
        Error: 'Email occupied',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;

    const user = new UserModel({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      fullName: req.body.fullName,
    });

    await user.save();
    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      message: error.name,
      details: error.message,
    });

    return next(error);
  }
}

module.exports = {
  create,
};
