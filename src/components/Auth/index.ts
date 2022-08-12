import { Request, Response } from 'express';
import AuthError from '../../error/AuthError';
import * as AuthService from './service';

async function registerUsingEmailAndPassword(req: Request, res: Response) {
    const authUser = await AuthService.createAuthUser(req.body);
    const accessToken = await AuthService.createAccessTokenForAuthUser(authUser.id.toString());
    const refreshToken = await AuthService.createRefreshTokenForAuthUser(authUser.id.toString());

    res.status(201).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function loginUsingEmailAndPassword(req: Request, res: Response) {
    const { email, password } = req.body;
    const authUser = await AuthService.getAuthUserByEmailPassword(email, password);
    if (authUser === null) {
        throw new AuthError();
    }
    const accessToken = await AuthService.createAccessTokenForAuthUser(authUser.id.toString());
    const refreshToken = await AuthService.createRefreshTokenForAuthUser(authUser.id.toString());

    res.status(200).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function getNewAccessAndRefreshToken(req: Request, res: Response) {
    const { id: authUserId, refreshToken: token } = req.body;
    const authUser = await AuthService.getAuthUserUsingRefreshToken(authUserId, token);
    if (authUser === null) {
        throw new AuthError();
    }
    const accessToken = await AuthService.createAccessTokenForAuthUser(authUser.id.toString());
    const refreshToken = await AuthService.createRefreshTokenForAuthUser(authUser.id.toString());

    res.status(200).json({
        data: authUser,
        accessToken,
        refreshToken,
    });
}

async function removeRefreshToken(req: Request, res: Response) {
    const { id: authUserId, refreshToken: token } = req.body;
    const authUser = await AuthService.getAuthUserUsingRefreshToken(authUserId, token);
    if (authUser === null) {
        throw new AuthError();
    }

    res.status(200).json({
        data: authUser,
    });
}

async function removeAllRefreshTokens(req: Request, res: Response) {
    const { email, password } = req.body;
    const authUser = await AuthService.getAuthUserByEmailPassword(email, password);
    if (authUser === null) {
        throw new AuthError();
    }
    await AuthService.removeAllRefreshTokensForAuthUser(authUser.id.toString());

    res.status(200).json({
        data: authUser,
    });
}

export {
    registerUsingEmailAndPassword,
    loginUsingEmailAndPassword,
    getNewAccessAndRefreshToken,
    removeRefreshToken,
    removeAllRefreshTokens,
};
