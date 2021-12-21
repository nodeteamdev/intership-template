const http = require('http');
const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const AuthError = require('../../error/AuthError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res) {
    const users = await UserService.findAll();

    res.status(200).json({
        data: users,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res) {
    const { error } = UserValidation.checkId(req.params);

    if (error) {
        throw new ValidationError(error.details);
    }

    const user = await UserService.findById(req.params.id);

    return res.status(200).json({
        data: user,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res) {
    const { value, error } = UserValidation.create(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    if (req.user.role !== 'Admin') {
        throw new AuthError(http.STATUS_CODES[403], 403);
    }

    const user = await UserService.create(value);

    res.status(201).json({
        data: user,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res) {
    const { error } = UserValidation.updateById(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    if (req.user.role === 'Admin') {
        const updatedUser = await UserService.updateById(req.body.id, req.body);

        return res.status(200).json({
            data: updatedUser,
        });
    }
    throw new AuthError(http.STATUS_CODES[403], 403);
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res) {
    const { error } = UserValidation.checkId(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    if (req.user.role === 'Admin') {
        const deletedUser = await UserService.deleteById(req.body.id);

        return res.status(200).json({
            data: deletedUser,
        });
    }
    throw new AuthError(http.STATUS_CODES[403], 403);
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
