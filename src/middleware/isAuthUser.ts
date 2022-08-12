import { Request, Response, NextFunction } from 'express';
import * as jwtFacade from '../components/Auth/jwt.facade';
import * as AuthService from '../components/Auth/service';
import AuthError from '../error/AuthError';

const isAuthUser = async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (accessToken === undefined) {
        return next(new AuthError());
    }

    const payload = await jwtFacade.getPayloadFromJWT(accessToken);
    if (
        payload === null
        || payload.tokenType !== jwtFacade.TokenType.access
        || !payload.authUserId
    ) {
        return next(new AuthError());
    }
    // NOTE: not required in the example, I guess
    const authUser = await AuthService.getAuthUserById(payload.authUserId);
    if (authUser === null) {
        return next(new AuthError());
    }

    return next();
};

export default isAuthUser;
