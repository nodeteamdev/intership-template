import { Request, Response, NextFunction } from 'express';
import UserService from './service';
import UserValidation from './validation';
import ValidationError from '../../error/ValidationError';

async function newUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.newUser(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const data: object = await UserService.newUser(req.body);
    res.status(201).send({
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.getUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const { id } = req.params;
    const user = await UserService.getUser(id);

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users: object[] = await UserService.getUsers();

    if (!users) {
      throw new Error('Users not found');
    }

    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.updateUser(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const { id } = req.params;
    const updates: string[] = Object.keys(req.body);
    const user: object = await UserService.updateUser(id, updates, req.body);
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.deleteUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const { id } = req.params;
    const result: string = await UserService.deleteUser(id);
    res.status(200).send({
      message: result,
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.loginUser(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const result: object = await UserService.loginUser(req.body);
    res.status(200).send({
      ...result,
      message: 'login successful',
    });
  } catch (error) {
    next(error);
  }
}

async function refreshTokenUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.refreshTokenUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const { id } = req.params;
    const tokens: object = await UserService.refreshTokenUser(id);
    res.status(200).send({
      data: tokens,
      message: 'Refresh token successful',
    });
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = UserValidation.logoutUser(req.params);
    if (error) {
      throw new ValidationError(error.details);
    }

    const { id } = req.params;
    const result: string = await UserService.logoutUser(id);
    res.status(200).send({
      message: result,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  newUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  refreshTokenUser,
  logoutUser,
};
