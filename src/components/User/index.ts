import { Request, Response, NextFunction } from 'express';
import { UpdateResult, DeleteResult } from 'mongodb';
import { User } from './model';
import UserService from './service';
import UserValidation from './validation';
import ValidationError from '../../error/ValidationError';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users: User[] = await UserService.findAll();

    res.status(200).json({
      data: users,
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
 * @returns {Promise < void >}
 */
async function findByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error } = UserValidation.findByEmail(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user: User | null = await UserService.findByEmail(req.body.email);

    res.status(200).json({
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
 * @returns {Promise < void >}
 */
async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user: User = await UserService.create(req.body);

    res.status(200).json({
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
async function updateByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error } = UserValidation.updateByEmail(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const updatedUser: UpdateResult = await UserService.updateByEmail(req.body.email, req.body);

    res.status(200).json({
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
async function deleteByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error } = UserValidation.deleteByEmail(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const deletedUser: DeleteResult = await UserService.deleteByEmail(req.body.email);

    res.status(200).json({
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  findAll,
  findByEmail,
  create,
  updateByEmail,
  deleteByEmail,
};
