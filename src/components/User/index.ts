import { NextFunction, Request, Response } from 'express';

import UserService from './service';
import UserValidation from './validation';
import ValidationError from '../../error/ValidationError';
import { IFindById } from './interfaces/find-by-id.interface';
import { ICreate } from './interfaces/create.interface';
import { IDeleteById } from './interfaces/delete-by-id.interface';
import { IUpdateById } from './interfaces/update-by-id.interface';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await UserService.findAll();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: error.message,
        details: null,
      });
      return;
    }
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
async function findById(
  req: Request<IFindById, any, any>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { error } = UserValidation.findById(req.params);

    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    const user = await UserService.findById(req.params.id);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        error: error.name,
        details: error.message,
      });
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
      return;
    }

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
async function create(
  req: Request<any, any, ICreate>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    const user = await UserService.create(req.body);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message,
      });
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
      return;
    }

    next(error);
  }
}

// /**
//  * @function
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  * @returns {Promise<void>}
//  */
async function updateById(
  req: Request<any, any, IUpdateById>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { error } = UserValidation.updateById(req.body);

    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    const updatedUser = await UserService.updateById(req.body.id, req.body);

    res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message,
      });
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
      return;
    }

    next(error);
  }
}

// /**
//  * @function
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  * @returns {Promise<void>}
//  */
async function deleteById(
  req: Request<any, any, IDeleteById>,
  res: Response,
  next: NextFunction,
): Promise<object | void> {
  try {
    const { error } = UserValidation.deleteById(req.body);

    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    const deletedUser = await UserService.deleteById(req.body.id);

    res.status(200).json({
      data: deletedUser,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message,
      });
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
      return;
    }

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
