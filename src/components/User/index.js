const jwt = require('jsonwebtoken');
const UserService = require('./service');
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
            res.sendStatus(403).json({ message: 'Forbidden to watch users' });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
            message: 'Forbidden to watch users',
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
            const user = await UserService.findById(req.params.id);

            return res.status(200).json({
                data: user,
            });
        }
        return res.sendStatus(403).json({ message: 'Forbidden to update users' });
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
            const user = await UserService.create(req.body);

            return res.status(200).json({
                data: user,
            });
        }
        return res.sendStatus(403).json({ message: 'Forbidden to create users' });
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
            const updatedUser = await UserService.updateById(req.body.id, req.body);

            return res.status(200).json({
                data: updatedUser,
            });
        }
        return res.sendStatus(403).json({ message: 'Forbidden to update users' });
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
            const deletedUser = await UserService.deleteById(req.body.id);

            return res.status(200).json({
                data: deletedUser,
            });
        }
        return res.sendStatus(403).json({ message: 'Forbidden to delete users' });
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
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
