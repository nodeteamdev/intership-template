import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import RefreshModel from '../components/User/models/refresh.model';

const { JWT_SECRET } = process.env;
const auth: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const token = await RefreshModel.refresh.findById({ _id: id }).exec();
    if (!token.accessToken) {
      throw new Error('A token is required for authentication');
    }
    try {
      const decoded: jwt.Jwt & jwt.JwtPayload & void = jwt.verify(token.accessToken, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      next(err);
      // message: 'Invalid Token'
    }
    return next();
  } catch (error) {
    next(error);
    //  message: 'User session expired, Log in to continue'
  }
};

export default auth;
