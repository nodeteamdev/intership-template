const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');

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
    const { error } = UserValidation.findById(req.params);

    if (error) {
        throw new ValidationError(error.details);
    }

    const user = await UserService.findById(req.params.id, { password: 0, refreshToken: 0 });
    if (!user) throw new NotFoundError('user not found');

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
    const { error } = UserValidation.create(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const user = await UserService.create(req.body);

    return res.status(200).json({
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

    const { _id } = req.user;
    const updatedUser = await UserService.updateById(_id, req.body);
    if (!updatedUser.modifiedCount) throw new NotFoundError('document not found');

    return res.status(200).json({
        data: updatedUser,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res) {
    const { _id } = req.user;
    const deletedUser = await UserService.deleteById(_id);
    if (!deletedUser.deletedCount) throw new NotFoundError('document not found');

    return res.status(200).json({
        data: deletedUser,
    });
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
