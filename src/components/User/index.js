/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
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
        const verification = jwt.verify(req.token, 'secretkey');
        if (verification) {
            const users = await UserService.findAll();
            res.status(200).json({
                data: users,
            });
        } else {
            // console.log(err);
            console.log('Forbidden to watch users');
            res.sendStatus(403);
        }
    } catch (error) {
        console.log('Error in find all');
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
        const verification = jwt.verify(req.token, 'secretkey');
        if (verification) {
            const { error } = UserValidation.findById(req.params);

            if (error) {
                throw new ValidationError(error.details);
            }

            const user = await UserService.findById(req.params.id);

            return res.status(200).json({
                data: user,
            });
        }
        console.log('Forbidden to update user');
        res.sendStatus(403);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
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
async function create(req, res, next) {
    try {
        const verification = jwt.verify(req.token, 'secretkey');
        if (verification) {
            const { error } = UserValidation.create(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const user = await UserService.create(req.body);

            return res.status(200).json({
                data: user,
            });
        }
        console.log('Forbidden to create user');
        res.sendStatus(403);
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
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const verification = jwt.verify(req.token, 'secretkey');
        if (verification) {
            const { error } = UserValidation.updateById(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const updatedUser = await UserService.updateById(req.body.id, req.body);

            return res.status(200).json({
                data: updatedUser,
            });
        }
        console.log('Forbidden to update user');
        res.sendStatus(403);
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
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const verification = jwt.verify(req.token, 'secretkey');
        if (verification) {
            const { error } = UserValidation.deleteById(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const deletedUser = await UserService.deleteById(req.body.id);

            return res.status(200).json({
                data: deletedUser,
            });
        }
        console.log('Forbidden to update user');
        res.sendStatus(403);
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
// My code ////////////////////////
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function loginUser(req, res, next) {
    try {
        const { error } = UserValidation.loginUser(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        // const loggedUser = await UserService.deleteById(req.body.id);
        const userLoginData = req.body;
        console.log(userLoginData);
        jwt.sign({ userLoginData }, 'secretkey', { expiresIn: '1m' }, (_error, token) => {
            res.json({ token });
        });
        // return res.send('Logging user');
        // return res.status(200).json({
        //     data: deletedUser,
        // });
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
// My code ////////////////////////

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    // My code //
    loginUser,
    // My code //
};
