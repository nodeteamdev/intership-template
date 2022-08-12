import { Request, Response } from 'express';
import { checkResourceIsFound } from '../../helpers/restResponse';
import * as UserService from './service';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise<void>}
 */
async function findAll(_req: Request, res: Response) {
    const users = await UserService.findAll();

    res.status(200).json({
        data: users,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise<void>}
 */
async function findById(req: Request, res: Response) {
    const user = await UserService.findById(req.params.id);
    checkResourceIsFound(user);

    res.status(200).json({
        data: user,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise<void>}
 */
async function create(req: Request, res: Response) {
    const user = await UserService.create(req.body);

    res.status(201).json({
        data: user,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise<void>}
 */
async function updateById(req: Request, res: Response) {
    const updatedUser = await UserService.updateById(req.body.id, req.body);
    checkResourceIsFound(updatedUser);

    res.status(200).json({
        data: updatedUser,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise<void>}
 */
async function deleteById(req: Request, res: Response) {
    const deletedUser = await UserService.deleteById(req.body.id);
    checkResourceIsFound(deletedUser);

    res.status(200).json({
        data: deletedUser,
    });
}

export {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
