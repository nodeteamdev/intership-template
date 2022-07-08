const bcrypt = require('bcrypt');

const User = require('./model');
const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const { clientErrorHandler } = require('../../error/errors');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
  try {
    const users = await UserService.findAll();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });

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
async function findById(req, res, next) {
  try {
    const { error } = UserValidation.findById(req.params);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user = await UserService.findById(req.params.id);

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
        details: error.message,
      });
    }

    clientErrorHandler(error);

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
async function create(req, res, next) {
  try {
    const { error, value } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    await new User({ ...value, password: hashedPassword }).save();

    return res.status(200).json({
      message: 'user created',
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    clientErrorHandler(error);

    return next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
  try {
    const { error, value } = UserValidation.updateById(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const updatedUser = await UserService.updateById(value.id, req.body);

    return res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    clientErrorHandler(error);

    return next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
  try {
    const { error, value } = UserValidation.deleteById(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const deletedUser = await UserService.deleteById(value.id);

    return res.status(200).json({
      data: deletedUser,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    clientErrorHandler(error);

    return next(error);
  }
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
