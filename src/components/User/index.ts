import { Request, Response, NextFunction } from 'express';
import UserService from './service';
import UserValidation, { FindById } from './validation';
import ValidationError from '../../error/ValidationError';
import { IUser } from './model';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users: IUser[] = await UserService.findAll();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: error.message,
        details: null,
      });
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
async function findById(req: Request<FindById>, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.findById(req.params);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user: IUser | undefined = await UserService.findById(req.params.id);

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

    if (error instanceof ValidationError) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
    }

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
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user: IUser | undefined = await UserService.create(req.body);

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    if (error instanceof ValidationError) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
    }

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
async function updateById(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.updateById(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const updatedUser = await UserService.updateById(req.body.id, req.body);

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

    if (error instanceof ValidationError) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
    }

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
async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.deleteById(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const deletedUser = await UserService.deleteById(req.body.id);

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

    if (error instanceof ValidationError) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
    }

    return next(error);
  }
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
