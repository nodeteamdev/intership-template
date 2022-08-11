import UserService from './service';
import { NextFunction, Request, Response } from 'express';
import { IUserModel } from './model';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const users: IUserModel[] = await UserService.findAll();

        res.status(200).json({
            data: users,
        });
    } catch (error) {
        next(error)
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: IUserModel | null = await UserService.findById(req.params.id)
  
      res.status(200).json({
        data: user
      })
    } catch (error) {
      if (error instanceof Error) {
        res.status(422).json({
          error: error.name,
          details: error.message
        })
      }  
      return next(error)
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const user: IUserModel | undefined = await UserService.create(req.body);

        return res.status(201).json({
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedUser: IUserModel | undefined | null = await UserService.updateById(req.body);

        return res.status(200).json({
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).json({
            message: "user deleted",
        });
    } catch (error) {
        next(error);
    }
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
