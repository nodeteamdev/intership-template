const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

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
        // res.status(500).json({
        //     error: error.message,
        //     details: null,
        // });

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
async function findByEmail(req, res, next) {
    try {
        const { error } = UserValidation.findByEmail(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findByEmail(req.body.email);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     return res.status(422).json({
        //         error: error.name,
        //         details: error.message,
        //     });
        // }

        // res.status(500).json({
        //     message: error.name,
        //     details: error.message,
        // });

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
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        // const olduser = await UserService.findByEmail(req.body.email);
        // if (olduser) {
        //     return res.status(400).json({ message: 'User with given email already exist' });
        // }
        const user = await UserService.create(req.body);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     return res.status(422).json({
        //         message: error.name,
        //         details: error.message,
        //     });
        // }

        // res.status(500).json({
        //     message: error.name,
        //     details: error.message,
        // });

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
async function updateByEmail(req, res, next) {
    try {
        const { error } = UserValidation.updateByEmail(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const updatedUser = await UserService.updateByEmail(req.body.email, req.body);

        return res.status(200).json({
            data: updatedUser,
        });
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     return res.status(422).json({
        //         message: error.name,
        //         details: error.message,
        //     });
        // }

        // res.status(500).json({
        //     message: error.name,
        //     details: error.message,
        // });

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
async function deleteByEmail(req, res, next) {
    try {
        const { error } = UserValidation.deleteByEmail(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const deletedUser = await UserService.deleteByEmail(req.body.email);

        return res.status(200).json({
            data: deletedUser,
        });
    } catch (error) {
        // if (error instanceof ValidationError) {
        //     return res.status(422).json({
        //         message: error.name,
        //         details: error.message,
        //     });
        // }

        // res.status(500).json({
        //     message: error.name,
        //     details: error.message,
        // });

        return next(error);
    }
}

module.exports = {
    findAll,
    findByEmail,
    create,
    updateByEmail,
    deleteByEmail,
};
