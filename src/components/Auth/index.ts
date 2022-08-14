import { Request, Response, NextFunction } from 'express';
import UserToken from './token.model';
import User from '../User/model';
import TokenService from './service';
import AuthValidation from './validation';
import ValidationError from '../../error/ValidationError';

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = AuthValidation.validateUserData(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const savedUser: Promise<User> = await User.create(req.body);
    return res.status(201).json({ message: 'Account created sucessfully', data: savedUser });
  } catch (error) {
    return next(error);
  }
}

async function logIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = AuthValidation.validateUserData(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }
    const user = await User.findOne({ email: req.body.email, fullName: req.body.fullName });

    const accessToken = await TokenService.generateAccessToken(user.id);

    const refreshToken = await TokenService.generateRefreshToken(user.id);

    return res.status(200).json({
      message: 'Logged in sucessfully',
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return next(error);
  }
}

async function getTokens(req: Request, res: Response) {
  const { error } = AuthValidation.validateToken(req.body);

  if (error) {
    throw new ValidationError(error.details);
  }

  const { token } = req.body;
  const decoded = await TokenService.decodeRefreshToken(token);
  const accessToken = await TokenService.generateAccessToken(decoded.userId);
  const refreshToken = await TokenService.generateRefreshToken(decoded.userId);

  return res.status(200).json({
    message: 'Successfully completed',
    data: { accessToken, refreshToken },
  });
}

async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const [, token] = req.headers.authorization.split(' ');

    const decoded = await TokenService.decodeAccessToken(token);
    req.userData = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Your session is not valid.', data: error });
    next(error);
  }
}

async function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = AuthValidation.validateToken(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const { token } = req.body;
    const decoded = await TokenService.decodeRefreshToken(token);
    const refreshToken = await UserToken.findOne({ userId: decoded.userId }).exec();
    if (refreshToken === undefined) return res.status(401).json({ message: 'Invalid request. Token not defined' });
    if (refreshToken.token !== token) return res.status(401).json({ message: 'Invalid request. Token not valid' });
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Your session is not valid.', data: error });
  }
}

async function logOut(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.userData;

  try {
    const userToken = await UserToken.findOne({ userId });
    if (!userToken) {
      return res
        .status(200)
        .json({ message: 'Logged Out Sucessfully' });
    }

    await userToken.remove();
    return res.status(200).json({ message: 'Logged Out Sucessfully' });
  } catch (err) {
    return next(err);
  }
}

export default {
  signUp,
  logIn,
  getTokens,
  verifyAccessToken,
  verifyRefreshToken,
  logOut,
};
