const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../User/model');
const UserValidation = require('../User/validation');
const ValidationError = require('../../error/ValidationError');
const config = require('../../config/env');

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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signIn(req, res, next) {
  try {
    // const { error } = UserValidation.create(req.body);

    // if (error) {
    //   throw new ValidationError(error.details);
    // }

    const candidate = await UserModel.findOne({ email: req.body.email });

    if (candidate) {
      // Check password
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

      if (passwordResult) {
        // Generate token
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id,
        }, config.jwt, { expiresIn: 60 * 60 });

        return res.status(200).json({
          token,
        });
      } return res.status(419).json({ message: 'Password or email incorrect.' });
    }
    // User not found. Error
    return res.status(404).json({
      data: {
        message: 'User with that email not found.',
      },
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
  signUp,
  signIn,
};
